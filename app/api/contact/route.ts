import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/site-config";

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const serviceLabels: Record<string, string> = {
  "consultoria-empresarial": "Consultoría Empresarial",
  "erp-y-automatizacion": "ERP y Automatización",
  "infraestructura-y-cloud": "Infraestructura y Cloud",
  "servicios-administrados": "Servicios Administrados",
  "desarrollo-e-integraciones": "Desarrollo e Integraciones",
};

function validateEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[+\d\s\-()]{7,20}$/.test(phone);
}

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

const WEBHOOK_TIMEOUT_MS = 10_000;

/**
 * Respuesta cuando la solicitud NO llegó a Evoltica. El mensaje es seguro para
 * el usuario (sin detalles internos) y ofrece canales directos reales.
 */
function notDelivered(code: "CHANNEL_UNAVAILABLE" | "DELIVERY_FAILED", status: 502 | 503) {
  return NextResponse.json(
    {
      success: false,
      code,
      message: `No pudimos enviar tu solicitud y no quedó registrada. Escríbenos por WhatsApp al ${SITE.phoneDisplay} o a ${SITE.email}.`,
    },
    { status }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } =
      body as ContactPayload;

    // Server-side validation
    const validationErrors: string[] = [];

    if (!name || sanitize(name).length < 2) {
      validationErrors.push("El nombre debe tener al menos 2 caracteres");
    }
    if (!company || sanitize(company).length < 2) {
      validationErrors.push("El nombre de la empresa es obligatorio");
    }
    if (!email || !validateEmail(email)) {
      validationErrors.push("El correo electrónico no es válido");
    }
    if (!phone || !validatePhone(phone)) {
      validationErrors.push("El teléfono no es válido");
    }
    if (!service || !serviceLabels[service]) {
      validationErrors.push("Selecciona un servicio válido");
    }
    if (!message || sanitize(message).length < 20) {
      validationErrors.push("El mensaje debe tener al menos 20 caracteres");
    }
    if (message && sanitize(message).length > 2000) {
      validationErrors.push("El mensaje no puede superar 2000 caracteres");
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: validationErrors.join(". ") },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: sanitize(name),
      company: sanitize(company),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      service: serviceLabels[service],
      message: sanitize(message),
      submittedAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
    };

    // Único canal de entrega: el webhook configurado (EMAIL_WEBHOOK_URL).
    // El éxito se responde SOLO si el canal acepta la solicitud (HTTP 2xx).
    // Sin canal o con fallo, la solicitud NO se entregó y se responde error:
    // nunca se confirma una recepción que no ocurrió (auditoría Fase 3, A1).
    const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "comercial@evoltica.com";

    if (!emailWebhookUrl) {
      console.error("Contact API: EMAIL_WEBHOOK_URL no está configurada; la solicitud no se entregó.");
      if (process.env.NODE_ENV === "development") {
        console.log("📧 Solicitud de contacto NO entregada (sin canal en desarrollo):", sanitizedData);
      }
      return notDelivered("CHANNEL_UNAVAILABLE", 503);
    }

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(emailWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EMAIL_WEBHOOK_SECRET || ""}`,
        },
        body: JSON.stringify({
          to: notificationEmail,
          subject: `[EVOLTICA] Nueva consultoría: ${sanitizedData.service} — ${sanitizedData.company}`,
          data: sanitizedData,
        }),
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      });
    } catch (error) {
      // Red caída, DNS o tiempo agotado. Sin datos personales en el log.
      console.error("Contact API: el canal de entrega no respondió:", error instanceof Error ? error.name : "unknown");
      return notDelivered("DELIVERY_FAILED", 502);
    }

    if (!webhookResponse.ok) {
      console.error(`Contact API: el canal de entrega rechazó la solicitud (HTTP ${webhookResponse.status}).`);
      return notDelivered("DELIVERY_FAILED", 502);
    }

    // 2xx solo prueba que el canal aceptó la solicitud, no que un correo llegó
    // ni que alguien la leyó: el mensaje no afirma más que eso.
    return NextResponse.json(
      {
        success: true,
        message: "Tu solicitud se envió a nuestro canal de atención.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Error interno del servidor. Por favor intenta de nuevo o contáctanos directamente por WhatsApp.",
      },
      { status: 500 }
    );
  }
}

// Only POST is allowed
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
