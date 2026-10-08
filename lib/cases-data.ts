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
  industry: string;
  serviceSlugs: string[];
  challenge: string;
  solution: string;
  results: string[];
}

export const CASE_STUDIES: CaseStudy[] = [];
