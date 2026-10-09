/**
 * Tipos base del dominio del portal y la administración (ADR-012).
 * Puros: sin I/O ni dependencias de framework. Los comparten servidor y cliente.
 */

/** Identificador opaco: lo asigna el backend (Odoo u otro, ver ADR-013). */
export type Id = string;

/** Fecha en ISO 8601 (UTC). Se formatea en la UI con es-CO. */
export type IsoDate = string;

/** Monto con su moneda. COP se maneja en pesos enteros. */
export interface Money {
  amount: number;
  currency: "COP" | "USD";
}

/** Página de resultados de un listado. */
export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}

/** Archivo servido por el backend (adjunto, factura PDF, descarga). */
export interface FileRef {
  id: Id;
  name: string;
  size: number;
  mimeType: string;
  /** URL firmada o ruta proxy del servidor; nunca una ruta pública permanente. */
  url: string;
}
