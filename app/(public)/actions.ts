"use server";

import { REQUEST_KINDS, type RequestKind } from "@/lib/domain";
import type { CommercialFieldErrors } from "@/lib/commercial/validation";
import { submitCommercialRequest } from "@/lib/server/services/commercial-requests";

export interface CommercialFormState {
  status: "idle" | "invalid" | "prototype" | "unavailable";
  message?: string;
  fieldErrors?: CommercialFieldErrors;
}

/** Mensajes revisados: ninguno afirma guardado, envío, recepción ni agenda. */
const MESSAGES = {
  prototype:
    "Versión de prueba: revisamos que tus respuestas estén completas, pero esta solicitud no se guardó ni se envió a Evoltica.",
  unavailable:
    "Este formulario todavía no está habilitado y no recibe solicitudes. Escríbenos por WhatsApp o por correo.",
} as const;

/**
 * Envío de diagnóstico, consultoría o cotización. Una server action es un
 * endpoint público: el tipo se valida aquí y el servicio vuelve a validar todo.
 */
export async function submitCommercialRequestAction(kind: RequestKind, formData: FormData): Promise<CommercialFormState> {
  if (!(REQUEST_KINDS as readonly string[]).includes(kind)) {
    return { status: "invalid", message: "Tipo de solicitud no válido." };
  }

  const outcome = await submitCommercialRequest(kind, formData);
  switch (outcome.status) {
    case "UNAVAILABLE":
      return { status: "unavailable", message: MESSAGES.unavailable };
    case "INVALID": {
      const count = Object.keys(outcome.errors).length;
      return {
        status: "invalid",
        message: count === 1 ? "Revisa 1 campo." : `Revisa ${count} campos.`,
        fieldErrors: outcome.errors,
      };
    }
    case "PROTOTYPE":
      return { status: "prototype", message: MESSAGES.prototype };
  }
}
