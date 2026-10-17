/**
 * Material visual REAL de Evoltica (fotografías, capturas de proyectos propios).
 *
 * TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — hoy el repositorio no contiene
 * fotografías ni capturas reales. Cuando existan, ubícalas en public/media/ y
 * regístralas aquí: los componentes las muestran automáticamente.
 *
 * Reglas: solo material propio o autorizado. Nunca capturas de sistemas de
 * clientes sin permiso escrito, ni fotografías de stock presentadas como propias.
 */
export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const BRAND_MEDIA: {
  /** Foto de operación real (equipo trabajando, oficina, bodega de un cliente con permiso). Se muestra dentro de la trama del hero. */
  hero: MediaAsset | null;
} = {
  hero: null,
};
