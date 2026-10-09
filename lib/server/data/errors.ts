/** Errores de la capa de datos que la UI sabe explicar (ADR-012). */

/** No hay backend real configurado (ADR-013 pendiente). */
export class BackendNotConfiguredError extends Error {
  constructor() {
    super("El backend del portal aún no está configurado.");
    this.name = "BackendNotConfiguredError";
  }
}

/** El entorno de demostración no persiste ni envía nada. */
export class DemoReadOnlyError extends Error {
  constructor() {
    super("Entorno de demostración: la acción no se guardó ni se envió.");
    this.name = "DemoReadOnlyError";
  }
}
