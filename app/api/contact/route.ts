import { NextRequest, NextResponse } from "next/server";

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

    // Primary channel: email via environment variable webhook/SMTP
    // This is designed for easy integration with Resend, SendGrid, or any email provider
    const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "comercial@evoltica.com";

    if (emailWebhookUrl) {
      // Integration with Resend, Nodemailer webhook, Make, n8n, etc.
      const webhookResponse = await fetch(emailWebhookUrl, {
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
      });

      if (!webhookResponse.ok) {
        console.error(
          "Webhook notification failed:",
          await webhookResponse.text()
        );
        // Non-blocking: we still return success to the user
      }
    } else {
      // Fallback: log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log("📧 New contact form submission:", sanitizedData);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tu solicitud fue recibida. Te contactaremos en menos de 4 horas hábiles.",
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
