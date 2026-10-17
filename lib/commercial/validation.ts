import {
  COMPANY_SIZES,
  DESIRED_TIMELINES,
  MEETING_MODES,
  PROCESS_AREAS,
  SECTORS,
  TIME_SLOTS,
  type CommercialRequestInput,
  type CompanySize,
  type ContactData,
  type DesiredTimeline,
  type MeetingMode,
  type ProcessArea,
  type RequestKind,
  type Sector,
  type TimeSlot,
} from "@/lib/domain";

/**
 * Validación de las solicitudes comerciales (Fase 4). Pura y compartida: el
 * formulario la anticipa y el servidor la vuelve a aplicar con los mismos datos
 * (nunca se confía en el cliente). Las reglas de contacto coinciden con
 * app/api/contact/route.ts.
 */

export const COMMERCIAL_RULES = {
  problem: { min: 10, max: 500 },
  topic: { min: 10, max: 500 },
  need: { min: 20, max: 1000 },
  currentTools: { max: 200 },
  estimatedScope: { max: 300 },
  name: { min: 2, max: 100 },
  company: { min: 2, max: 100 },
  email: { max: 200 },
} as const;

/** Nombre de cada campo en el formulario (atributo `name`). */
export const FIELD_NAMES = {
  problem: "problema",
  processes: "procesos",
  companySize: "tamano",
  sector: "sector",
  currentTools: "herramientas",
  solution: "solucion",
  availability: "disponibilidad",
  topic: "tema",
  meetingMode: "modalidad",
  need: "necesidad",
  estimatedScope: "alcance",
  desiredTimeline: "plazo",
  name: "nombre",
  company: "empresa",
  email: "correo",
  phone: "telefono",
} as const;

export type CommercialField = keyof typeof FIELD_NAMES;
export type CommercialFieldErrors = Partial<Record<CommercialField, string>>;

/** Campo trampa para bots: oculto a personas y a lectores de pantalla. */
export const HONEYPOT_FIELD = "sitio_web";

/** Campos de cada paso del diagnóstico, para validar paso a paso. */
export const DIAGNOSIS_STEPS: CommercialField[][] = [
  ["problem", "processes"],
  ["companySize", "sector", "currentTools"],
  ["solution"],
  ["name", "company", "email", "phone", "availability"],
];

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_PATTERN = /^[+\d\s\-()]{7,20}$/;

/** Mismo tratamiento que /api/contact (SECURITY_GUIDE § Sanitización). */
function sanitize(value: string): string {
  return value.trim().replace(/[<>]/g, "");
}

function text(formData: FormData, field: CommercialField): string {
  const value = formData.get(FIELD_NAMES[field]);
  return typeof value === "string" ? sanitize(value) : "";
}

function list(formData: FormData, field: CommercialField): string[] {
  return formData
    .getAll(FIELD_NAMES[field])
    .filter((value): value is string => typeof value === "string")
    .map(sanitize);
}

function oneOf<T extends string>(allowed: readonly T[], value: string): value is T {
  return (allowed as readonly string[]).includes(value);
}

function allOf<T extends string>(allowed: readonly T[], values: string[]): values is T[] {
  return values.every((value) => oneOf(allowed, value)) && new Set(values).size === values.length;
}

function lengthError(value: string, rule: { min?: number; max: number }, label: string): string | undefined {
  if (rule.min !== undefined && value.length < rule.min) return `${label}: escribe al menos ${rule.min} caracteres.`;
  if (value.length > rule.max) return `${label}: admite hasta ${rule.max} caracteres.`;
  return undefined;
}

function parseContact(formData: FormData, errors: CommercialFieldErrors): ContactData {
  const contact: ContactData = {
    name: text(formData, "name"),
    company: text(formData, "company"),
    email: text(formData, "email").toLowerCase(),
  };
  const phone = text(formData, "phone");

  const nameError = lengthError(contact.name, COMMERCIAL_RULES.name, "Nombre");
  if (nameError) errors.name = nameError;
  const companyError = lengthError(contact.company, COMMERCIAL_RULES.company, "Empresa");
  if (companyError) errors.company = companyError;
  if (!EMAIL_PATTERN.test(contact.email) || contact.email.length > COMMERCIAL_RULES.email.max) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  if (phone) {
    if (PHONE_PATTERN.test(phone)) contact.phone = phone;
    else errors.phone = "Ingresa un teléfono válido (7 a 20 dígitos) o deja el campo vacío.";
  }
  return contact;
}

export interface ParsedCommercialRequest {
  input?: CommercialRequestInput;
  errors: CommercialFieldErrors;
}

/**
 * Lee y valida un envío. `validSolutions` son los slugs publicados del
 * catálogo (el servidor los toma de lib/catalog.ts). Devuelve `input` solo si
 * no hay errores.
 */
export function parseCommercialRequest(
  kind: RequestKind,
  formData: FormData,
  validSolutions: ReadonlySet<string>
): ParsedCommercialRequest {
  const errors: CommercialFieldErrors = {};
  const contact = parseContact(formData, errors);
  const solution = text(formData, "solution");
  const availability = list(formData, "availability");

  if (solution && !validSolutions.has(solution)) errors.solution = "Elige una solución de la lista.";
  if (!allOf(TIME_SLOTS, availability)) errors.availability = "Elige franjas de la lista.";

  if (kind === "DIAGNOSTICO") {
    const problem = text(formData, "problem");
    const processes = list(formData, "processes");
    const companySize = text(formData, "companySize");
    const sector = text(formData, "sector");
    const currentTools = text(formData, "currentTools");

    const problemError = lengthError(problem, COMMERCIAL_RULES.problem, "Qué quieres resolver");
    if (problemError) errors.problem = problemError;
    if (processes.length === 0) errors.processes = "Elige al menos un proceso.";
    else if (!allOf(PROCESS_AREAS, processes)) errors.processes = "Elige procesos de la lista.";
    if (!oneOf(COMPANY_SIZES, companySize)) errors.companySize = "Elige el tamaño de tu empresa.";
    if (sector && !oneOf(SECTORS, sector)) errors.sector = "Elige un sector de la lista.";
    const toolsError = lengthError(currentTools, COMMERCIAL_RULES.currentTools, "Herramientas actuales");
    if (toolsError) errors.currentTools = toolsError;

    if (Object.keys(errors).length > 0) return { errors };
    return {
      errors,
      input: {
        kind,
        problem,
        processes: processes as ProcessArea[],
        companySize: companySize as CompanySize,
        sector: (sector || undefined) as Sector | undefined,
        currentTools: currentTools || undefined,
        solution: solution || undefined,
        availability: availability as TimeSlot[],
        contact,
      },
    };
  }

  if (kind === "CONSULTORIA") {
    const topic = text(formData, "topic");
    const meetingMode = text(formData, "meetingMode");

    const topicError = lengthError(topic, COMMERCIAL_RULES.topic, "Tema");
    if (topicError) errors.topic = topicError;
    if (meetingMode && !oneOf(MEETING_MODES, meetingMode)) errors.meetingMode = "Elige una modalidad de la lista.";
    if (availability.length === 0 && !errors.availability) {
      errors.availability = "Elige al menos una franja en la que prefieras la reunión.";
    }

    if (Object.keys(errors).length > 0) return { errors };
    return {
      errors,
      input: {
        kind,
        topic,
        solution: solution || undefined,
        meetingMode: (meetingMode || undefined) as MeetingMode | undefined,
        availability: availability as TimeSlot[],
        contact,
      },
    };
  }

  // COTIZACION
  const need = text(formData, "need");
  const estimatedScope = text(formData, "estimatedScope");
  const desiredTimeline = text(formData, "desiredTimeline");

  if (!solution && !errors.solution) errors.solution = "Elige la solución que quieres cotizar.";
  const needError = lengthError(need, COMMERCIAL_RULES.need, "Qué necesitas");
  if (needError) errors.need = needError;
  const scopeError = lengthError(estimatedScope, COMMERCIAL_RULES.estimatedScope, "Alcance estimado");
  if (scopeError) errors.estimatedScope = scopeError;
  if (desiredTimeline && !oneOf(DESIRED_TIMELINES, desiredTimeline)) errors.desiredTimeline = "Elige un plazo de la lista.";

  if (Object.keys(errors).length > 0) return { errors };
  return {
    errors,
    input: {
      kind,
      solution,
      need,
      estimatedScope: estimatedScope || undefined,
      desiredTimeline: (desiredTimeline || undefined) as DesiredTimeline | undefined,
      contact,
    },
  };
}
