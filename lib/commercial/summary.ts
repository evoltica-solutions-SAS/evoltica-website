import type { CommercialRequestInput } from "@/lib/domain";
import {
  COMPANY_SIZE_LABELS,
  MEETING_MODE_LABELS,
  PROCESS_LABELS,
  REQUEST_KIND_LABELS,
  SECTOR_LABELS,
  TIME_SLOT_LABELS,
  TIMELINE_LABELS,
} from "./options";

/** Tope del texto que se precarga en WhatsApp o en el correo. */
const MAX_SUMMARY = 1800;

/**
 * Resumen en texto plano de una solicitud, para que la persona lo envíe ella
 * misma por un canal real (WhatsApp o correo) mientras el formulario no guarde
 * ni envíe nada. Solo incluye lo que la persona escribió.
 */
export function buildRequestSummary(input: CommercialRequestInput, solutionTitle?: string): string {
  const lines: string[] = [`Solicitud de ${REQUEST_KIND_LABELS[input.kind].toLowerCase()}`];
  const add = (label: string, value?: string) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  if (input.kind === "DIAGNOSTICO") {
    add("Qué quiero resolver", input.problem);
    add("Procesos", input.processes.map((process) => PROCESS_LABELS[process]).join(", "));
    add("Tamaño", COMPANY_SIZE_LABELS[input.companySize]);
    add("Sector", input.sector && SECTOR_LABELS[input.sector]);
    add("Herramientas actuales", input.currentTools);
  } else if (input.kind === "CONSULTORIA") {
    add("Tema", input.topic);
    add("Modalidad preferida", input.meetingMode && MEETING_MODE_LABELS[input.meetingMode]);
  } else {
    add("Qué necesito", input.need);
    add("Alcance estimado", input.estimatedScope);
    add("Plazo deseado", input.desiredTimeline && TIMELINE_LABELS[input.desiredTimeline]);
  }
  add("Solución de interés", solutionTitle);
  if (input.kind !== "COTIZACION") {
    add("Franjas preferidas", input.availability.map((slot) => TIME_SLOT_LABELS[slot]).join(", "));
  }
  add("Nombre", input.contact.name);
  add("Empresa", input.contact.company);
  add("Correo", input.contact.email);
  add("Teléfono", input.contact.phone);

  const summary = lines.join("\n");
  return summary.length > MAX_SUMMARY ? `${summary.slice(0, MAX_SUMMARY - 1)}…` : summary;
}
