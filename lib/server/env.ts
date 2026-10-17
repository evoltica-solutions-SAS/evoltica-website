import "server-only";

/**
 * Entorno de demostración del portal: SOLO en `next dev`.
 *
 * `process.env.NODE_ENV` se fija al compilar: en cualquier `next build`
 * (producción, previews de Vercel) esta constante es `false` y el código de
 * demostración queda inalcanzable. No hay variable de entorno que lo active en
 * producción, a propósito.
 */
export const PORTAL_DEMO_ENABLED = process.env.NODE_ENV === "development";

/**
 * Prototipo de las solicitudes comerciales (Fase 4): SOLO en `next dev`, con el
 * mismo criterio. En producción los formularios no se muestran y el servidor no
 * acepta envíos hasta que exista persistencia segura y un canal de recepción
 * (decisión 2026-10-10).
 */
export const COMMERCIAL_PROTOTYPE_ENABLED = process.env.NODE_ENV === "development";
