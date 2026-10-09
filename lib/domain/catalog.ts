import type { IsoDate, Money } from "./common";
import type { ServiceLineSlug } from "./services";

/**
 * Catálogo de soluciones (ADR-014). Una solución pertenece a una línea de
 * servicio (categoría) y se ofrece bajo una modalidad comercial.
 */

export const COMMERCIAL_MODES = ["COMPRA_DIRECTA", "SUSCRIPCION", "COTIZACION", "CONSULTORIA", "PERSONALIZADO"] as const;
export type CommercialMode = (typeof COMMERCIAL_MODES)[number];

/** Modalidades que exigen un precio aprobado antes de publicarse. */
export const PRICED_MODES: readonly CommercialMode[] = ["COMPRA_DIRECTA", "SUSCRIPCION"];

export type PublicationStatus = "BORRADOR" | "PUBLICADA" | "ARCHIVADA";

/**
 * Precio aprobado por Evoltica. Sin este registro una solución no puede
 * venderse con precio (BUSINESS_CONTEXT § Política de precios).
 */
export interface ApprovedPrice {
  amount: Money;
  billing: "UNICO" | "MENSUAL" | "ANUAL";
  /** Condiciones comerciales que acompañan al precio (alcance, exclusiones). */
  conditions: string;
  approvedBy: string;
  approvedAt: IsoDate;
  validUntil?: IsoDate;
}

export interface Solution {
  slug: string;
  line: ServiceLineSlug;
  title: string;
  /** Descripción corta (fuente: lib/services-data.ts). */
  summary: string;
  mode: CommercialMode;
  status: PublicationStatus;
  /** Lo que cubre la solución. Solo contenido confirmado; puede estar vacío. */
  scope: string[];
  /** Condiciones previas del cliente. Solo contenido confirmado; puede estar vacío. */
  requirements: string[];
  /** Plataformas o herramientas con las que se trabaja (confirmadas en el sitio). */
  tools: string[];
  /** Tipos de cliente declarados para la línea. */
  idealFor: string[];
  price?: ApprovedPrice;
  keywords: string[];
}

/** Regla de publicación: una modalidad con precio necesita un precio aprobado. */
export function catalogViolations(solution: Solution): string[] {
  const problems: string[] = [];
  if (PRICED_MODES.includes(solution.mode) && !solution.price) {
    problems.push(`"${solution.slug}" usa la modalidad ${solution.mode} sin precio aprobado.`);
  }
  if (!PRICED_MODES.includes(solution.mode) && solution.price) {
    problems.push(`"${solution.slug}" tiene precio pero su modalidad (${solution.mode}) no lo usa.`);
  }
  return problems;
}
