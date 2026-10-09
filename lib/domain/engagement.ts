import type { FileRef, Id, IsoDate } from "./common";

export type NotificationKind = "TICKET" | "FACTURA" | "SERVICIO" | "SISTEMA";

export interface Notification {
  id: Id;
  userId: Id;
  kind: NotificationKind;
  title: string;
  body: string;
  /** Ruta interna del portal a la que lleva la notificación. */
  href?: string;
  createdAt: IsoDate;
  readAt?: IsoDate;
}

export interface Download {
  id: Id;
  organizationId: Id;
  title: string;
  category: "MANUAL" | "ACTA" | "INSTALADOR" | "OTRO";
  file: FileRef;
  publishedAt: IsoDate;
}

/** Registro obligatorio de las acciones administrativas. */
export interface AuditEntry {
  id: Id;
  actorId: Id;
  action: string;
  target: string;
  at: IsoDate;
}
