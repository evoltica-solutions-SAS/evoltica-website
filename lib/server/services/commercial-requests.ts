import "server-only";
import { PUBLISHED_SOLUTIONS } from "@/lib/catalog";
import { HONEYPOT_FIELD, parseCommercialRequest, type CommercialFieldErrors } from "@/lib/commercial/validation";
import { COMMERCIAL_PROTOTYPE_ENABLED } from "@/lib/server/env";
import type { RequestKind } from "@/lib/domain";

/**
 * Servicio de aplicación de las solicitudes comerciales (Fase 4).
 *
 * Hoy NO existe adaptador persistente: nada se guarda ni se envía.
 * - Producción: `UNAVAILABLE` sin procesar los datos (no hay persistencia ni canal).
 * - `next dev`: valida y responde `PROTOTYPE` (no guarda, no envía).
 * La Fase 5 añadirá el adaptador real (repositorio + outbox) detrás de esta misma
 * función: las pantallas no cambian. Ver ADR-015.
 */
export type SubmissionOutcome =
  | { status: "UNAVAILABLE" }
  | { status: "INVALID"; errors: CommercialFieldErrors }
  | { status: "PROTOTYPE" };

const PUBLISHED_SLUGS: ReadonlySet<string> = new Set(PUBLISHED_SOLUTIONS.map((solution) => solution.slug));

export async function submitCommercialRequest(kind: RequestKind, formData: FormData): Promise<SubmissionOutcome> {
  if (!COMMERCIAL_PROTOTYPE_ENABLED) return { status: "UNAVAILABLE" };

  // Campo trampa lleno: se descarta en silencio con la misma respuesta.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot !== "") return { status: "PROTOTYPE" };

  const { input, errors } = parseCommercialRequest(kind, formData, PUBLISHED_SLUGS);
  if (!input) return { status: "INVALID", errors };

  // Prototipo: la solicitud es válida, pero no se guarda ni se envía a nadie.
  return { status: "PROTOTYPE" };
}
