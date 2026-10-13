import type { Id, IsoDate } from "./common";

/**
 * Solicitudes comerciales (Fase 4, ADR-014): diagnóstico, consultoría y
 * cotización. Diseño funcional en
 * .claude/docs/architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md.
 *
 * Las listas son cerradas: el servidor rechaza cualquier valor fuera de ellas.
 */

export const REQUEST_KINDS = ["DIAGNOSTICO", "CONSULTORIA", "COTIZACION"] as const;
export type RequestKind = (typeof REQUEST_KINDS)[number];

/** Procesos que el diagnóstico pregunta (paso 1). */
export const PROCESS_AREAS = [
  "INVENTARIO",
  "VENTAS_POS",
  "COMPRAS",
  "CRM",
  "NOMINA_RRHH",
  "CONTABILIDAD_FINANZAS",
  "INFRAESTRUCTURA",
  "SOPORTE_TI",
  "DOCUMENTOS",
  "OTRO",
] as const;
export type ProcessArea = (typeof PROCESS_AREAS)[number];

export const COMPANY_SIZES = ["1_10", "11_50", "51_200", "MAS_200"] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

/** Tipos de cliente ya declarados en BUSINESS_CONTEXT + "otro". */
export const SECTORS = ["RESTAURANTES", "DISTRIBUCION", "TALLERES", "CONSTRUCCION", "SERVICIOS", "OTRO"] as const;
export type Sector = (typeof SECTORS)[number];

/** Franjas PREFERIDAS dentro del horario publicado: no son citas. */
export const TIME_SLOTS = ["MANANA", "TARDE"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];

/** Preferencia de formato de la reunión; el equipo propone el definitivo. */
export const MEETING_MODES = ["VIRTUAL", "PRESENCIAL"] as const;
export type MeetingMode = (typeof MEETING_MODES)[number];

export const DESIRED_TIMELINES = ["MENOS_1_MES", "UNO_A_TRES_MESES", "MAS_3_MESES", "SIN_DEFINIR"] as const;
export type DesiredTimeline = (typeof DESIRED_TIMELINES)[number];

/** Datos de contacto mínimos. El teléfono es opcional: el correo basta para responder. */
export interface ContactData {
  name: string;
  company: string;
  email: string;
  phone?: string;
}

export interface DiagnosisInput {
  kind: "DIAGNOSTICO";
  problem: string;
  processes: ProcessArea[];
  companySize: CompanySize;
  sector?: Sector;
  currentTools?: string;
  solution?: string;
  availability: TimeSlot[];
  contact: ContactData;
}

export interface ConsultationInput {
  kind: "CONSULTORIA";
  topic: string;
  solution?: string;
  meetingMode?: MeetingMode;
  /** Al menos una franja: el equipo propone el horario dentro de ellas. */
  availability: TimeSlot[];
  contact: ContactData;
}

export interface QuoteRequestInput {
  kind: "COTIZACION";
  /** Slug de una solución publicada del catálogo. */
  solution: string;
  need: string;
  estimatedScope?: string;
  desiredTimeline?: DesiredTimeline;
  contact: ContactData;
}

export type CommercialRequestInput = DiagnosisInput | ConsultationInput | QuoteRequestInput;

/**
 * Estados de una solicitud persistida (Fase 5, sin implementar). Hoy ninguna
 * solicitud se guarda: no existe ninguna entidad con estos estados.
 */
export const REQUEST_STATUSES = ["NUEVA", "EN_REVISION", "CONTACTADA", "CALIFICADA", "COTIZACION_CREADA", "DESCARTADA"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

/** Contrato de la Fase 5: solicitud registrada con referencia pública no secuencial. */
export interface CommercialRequest {
  id: Id;
  reference: string;
  kind: RequestKind;
  status: RequestStatus;
  input: CommercialRequestInput;
  createdAt: IsoDate;
}
