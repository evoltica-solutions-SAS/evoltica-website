import type { FileRef, Id, IsoDate } from "./common";
import type { Role } from "./identity";

export const TICKET_STATUSES = ["ABIERTO", "EN_PROGRESO", "ESPERANDO_CLIENTE", "RESUELTO", "CERRADO"] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_PRIORITIES = ["BAJA", "MEDIA", "ALTA", "CRITICA"] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export interface Ticket {
  id: Id;
  number: string;
  organizationId: Id;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  contractedServiceId?: Id;
  createdById: Id;
  assigneeId?: Id;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

export interface TicketMessage {
  id: Id;
  ticketId: Id;
  authorId: Id;
  authorName: string;
  authorRole: Role;
  body: string;
  createdAt: IsoDate;
  attachments: FileRef[];
  /** Nota interna del equipo: nunca se entrega al cliente. */
  internal: boolean;
}

export interface TicketWithMessages extends Ticket {
  messages: TicketMessage[];
}

/** Límites de adjuntos: los aplica el servidor (la UI solo los anticipa). */
export const ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxBytes: 10 * 1024 * 1024,
  mimeTypes: ["image/png", "image/jpeg", "image/webp", "application/pdf", "text/plain", "text/csv"],
} as const;
