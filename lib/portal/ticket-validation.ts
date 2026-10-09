import { ATTACHMENT_LIMITS, TICKET_PRIORITIES, type TicketPriority } from "@/lib/domain";

/**
 * Reglas de tickets compartidas: el formulario las anticipa y el servidor las
 * vuelve a aplicar (nunca se confía en el cliente).
 */
export const TICKET_RULES = {
  subject: { min: 5, max: 120 },
  body: { min: 10, max: 5000 },
} as const;

export interface AttachmentInput {
  name: string;
  mimeType: string;
  size: number;
}

export type TicketFieldErrors = Partial<Record<"subject" | "body" | "priority" | "service" | "attachments", string>>;

export function validateAttachments(files: AttachmentInput[]): string | undefined {
  if (files.length > ATTACHMENT_LIMITS.maxFiles) return `Puedes adjuntar hasta ${ATTACHMENT_LIMITS.maxFiles} archivos.`;
  const megabytes = ATTACHMENT_LIMITS.maxBytes / (1024 * 1024);
  for (const file of files) {
    if (!(ATTACHMENT_LIMITS.mimeTypes as readonly string[]).includes(file.mimeType)) {
      return `"${file.name}" no es un tipo permitido (imágenes PNG/JPG/WebP, PDF, TXT o CSV).`;
    }
    if (file.size > ATTACHMENT_LIMITS.maxBytes) return `"${file.name}" supera ${megabytes} MB.`;
    if (file.size === 0) return `"${file.name}" está vacío.`;
  }
  return undefined;
}

export function validateBody(body: string): string | undefined {
  if (body.length < TICKET_RULES.body.min) return `Escribe al menos ${TICKET_RULES.body.min} caracteres.`;
  if (body.length > TICKET_RULES.body.max) return `El texto admite hasta ${TICKET_RULES.body.max} caracteres.`;
  return undefined;
}

export function validateTicketText(subject: string, body: string): TicketFieldErrors {
  const errors: TicketFieldErrors = {};
  if (subject.length < TICKET_RULES.subject.min) errors.subject = `Escribe un asunto de al menos ${TICKET_RULES.subject.min} caracteres.`;
  else if (subject.length > TICKET_RULES.subject.max) errors.subject = `El asunto admite hasta ${TICKET_RULES.subject.max} caracteres.`;
  const bodyError = validateBody(body);
  if (bodyError) errors.body = bodyError;
  return errors;
}

export function isPriority(value: unknown): value is TicketPriority {
  return typeof value === "string" && (TICKET_PRIORITIES as readonly string[]).includes(value);
}

/** Lee la lista de metadatos de adjuntos enviada por el formulario (JSON). */
export function parseAttachmentMeta(raw: FormDataEntryValue | null): AttachmentInput[] | null {
  if (raw === null || raw === "") return [];
  if (typeof raw !== "string" || raw.length > 5000) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return null;
    const files = value.map((item) => {
      const { name, mimeType, size } = (item ?? {}) as Record<string, unknown>;
      if (typeof name !== "string" || typeof mimeType !== "string" || typeof size !== "number") throw new Error();
      return { name: name.slice(0, 200), mimeType, size };
    });
    return files;
  } catch {
    return null;
  }
}
