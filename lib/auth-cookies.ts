/**
 * Nombres de las cookies de sesión (ADR-012). Módulo sin dependencias de servidor
 * porque también lo usa middleware.ts (runtime edge).
 */

/** Cookie del proveedor de identidad real. Ningún código la emite hasta ADR-013. */
export const SESSION_COOKIE = "evoltica-session";

/** Cookie del entorno de demostración. Solo se emite en `next dev`. */
export const DEMO_SESSION_COOKIE = "evoltica-demo-session";

/** Destino seguro tras iniciar sesión: solo rutas internas del portal (evita redirecciones abiertas). */
export function safePortalPath(next: string | null | undefined): string {
  // Solo "/app", "/app/…" o "/app?…": nunca otra ruta, otro origen, "/appx",
  // barras invertidas ni segmentos "..".
  return next && /^\/app(?:[/?#]|$)/.test(next) && !/\\|\.\./.test(next) ? next : "/app";
}
