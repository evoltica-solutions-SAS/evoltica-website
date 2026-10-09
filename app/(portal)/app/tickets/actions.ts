"use server";

import { redirect } from "next/navigation";
import { getPortalContext } from "@/lib/server/portal";
import { BackendNotConfiguredError, DemoReadOnlyError } from "@/lib/server/data/errors";
import {
  isPriority,
  parseAttachmentMeta,
  validateBody,
  validateAttachments,
  validateTicketText,
  type TicketFieldErrors,
} from "@/lib/portal/ticket-validation";

export interface TicketFormState {
  status: "idle" | "invalid" | "demo" | "unavailable";
  message?: string;
  fieldErrors?: TicketFieldErrors;
  /** Lo que la persona escribió, para no perderlo si el envío no procede. */
  values?: Partial<Record<"subject" | "body" | "priority" | "service", string>>;
}

const DEMO_MESSAGE = {
  create: "Entorno de demostración: los datos son válidos, pero el ticket no se guardó ni se envió al equipo de soporte.",
  reply: "Entorno de demostración: la respuesta es válida, pero no se guardó ni se envió al equipo de soporte.",
};
const UNAVAILABLE_MESSAGE = "El sistema de soporte aún no está conectado. Escríbenos por WhatsApp o correo mientras tanto.";

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

function backendState(error: unknown, kind: keyof typeof DEMO_MESSAGE, values: TicketFormState["values"]): TicketFormState {
  if (error instanceof DemoReadOnlyError) return { status: "demo", message: DEMO_MESSAGE[kind], values };
  if (error instanceof BackendNotConfiguredError) return { status: "unavailable", message: UNAVAILABLE_MESSAGE, values };
  throw error;
}

/**
 * Crear ticket. Autoriza (sesión CLIENTE), valida en el servidor, comprueba que
 * el servicio pertenece a la organización y delega en el repositorio.
 * Los archivos no se suben aquí: ver AttachmentStorage en contracts.ts.
 */
export async function createTicketAction(_prev: TicketFormState, formData: FormData): Promise<TicketFormState> {
  const { session, repo } = await getPortalContext();

  const subject = text(formData, "asunto");
  const body = text(formData, "descripcion");
  const priority = text(formData, "prioridad");
  const serviceId = text(formData, "servicio");
  const attachments = parseAttachmentMeta(formData.get("adjuntos"));
  const values = { subject, body, priority, service: serviceId };

  const fieldErrors = validateTicketText(subject, body);
  if (!isPriority(priority)) fieldErrors.priority = "Elige una prioridad.";
  if (attachments === null) fieldErrors.attachments = "No pudimos leer los adjuntos. Vuelve a seleccionarlos.";
  else {
    const attachmentError = validateAttachments(attachments);
    if (attachmentError) fieldErrors.attachments = attachmentError;
  }
  if (serviceId && !(await repo.getService(session, serviceId))) {
    fieldErrors.service = "El servicio seleccionado no pertenece a tu organización.";
  }
  if (Object.keys(fieldErrors).length > 0 || !isPriority(priority)) {
    return { status: "invalid", message: "Revisa los campos marcados.", fieldErrors, values };
  }

  let ticketId: string;
  try {
    const ticket = await repo.createTicket(session, {
      subject,
      body,
      priority,
      contractedServiceId: serviceId || undefined,
      attachmentIds: [],
    });
    ticketId = ticket.id;
  } catch (error) {
    return backendState(error, "create", values);
  }
  redirect(`/app/tickets/${ticketId}`);
}

/** Responder un ticket propio. Mismas garantías que la creación. */
export async function replyTicketAction(_prev: TicketFormState, formData: FormData): Promise<TicketFormState> {
  const { session, repo } = await getPortalContext();
  const ticketId = text(formData, "ticket");
  const body = text(formData, "respuesta");
  const attachments = parseAttachmentMeta(formData.get("adjuntos"));

  const ticket = ticketId ? await repo.getTicket(session, ticketId) : null;
  if (!ticket) return { status: "invalid", message: "El ticket no existe o no pertenece a tu organización." };
  if (ticket.status === "CERRADO") return { status: "invalid", message: "El ticket está cerrado. Crea uno nuevo si necesitas ayuda." };

  const fieldErrors: TicketFieldErrors = {};
  const bodyError = validateBody(body);
  if (bodyError) fieldErrors.body = bodyError;
  if (attachments === null) fieldErrors.attachments = "No pudimos leer los adjuntos. Vuelve a seleccionarlos.";
  else {
    const attachmentError = validateAttachments(attachments);
    if (attachmentError) fieldErrors.attachments = attachmentError;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", message: "Revisa los campos marcados.", fieldErrors, values: { body } };
  }

  try {
    await repo.replyTicket(session, { ticketId: ticket.id, body, attachmentIds: [] });
  } catch (error) {
    return backendState(error, "reply", { body });
  }
  redirect(`/app/tickets/${ticket.id}`);
}
