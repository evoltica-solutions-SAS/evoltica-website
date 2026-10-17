import type { MediaAsset } from "@/lib/media";

/**
 * Casos de éxito publicados. Estructura: reto → solución → resultado.
 *
 * TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — agregar casos reales con
 * autorización escrita del cliente. No publicar cifras que el cliente no haya
 * aprobado. Mientras el arreglo esté vacío, /casos-de-exito muestra un estado
 * honesto ("en documentación") y se marca como noindex.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  /** Categoría / industria visible sobre el título. */
  industry: string;
  /** Titular del caso (el resultado en una frase). */
  title: string;
  /** Resumen de 1–2 frases para la tarjeta. */
  summary: string;
  serviceSlugs: string[];
  challenge: string;
  solution: string;
  /** Resultados aprobados por el cliente. */
  results: string[];
  /** Imagen REAL del proyecto (con autorización). Sin ella se usa una composición de marca. */
  cover?: MediaAsset;
}

export const CASE_STUDIES: CaseStudy[] = [];
