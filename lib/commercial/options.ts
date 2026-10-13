import type {
  CompanySize,
  DesiredTimeline,
  MeetingMode,
  ProcessArea,
  RequestKind,
  Sector,
  TimeSlot,
} from "@/lib/domain";

/**
 * Etiquetas de las listas cerradas de la Fase 4. Las claves viven en
 * lib/domain/commercial.ts; aquí solo el texto que ve la persona.
 */

export const PROCESS_LABELS: Record<ProcessArea, string> = {
  INVENTARIO: "Inventario",
  VENTAS_POS: "Ventas / POS",
  COMPRAS: "Compras",
  CRM: "Clientes (CRM)",
  NOMINA_RRHH: "Nómina / RRHH",
  CONTABILIDAD_FINANZAS: "Contabilidad / finanzas",
  INFRAESTRUCTURA: "Servidores e infraestructura",
  SOPORTE_TI: "Soporte TI",
  DOCUMENTOS: "Documentos",
  OTRO: "Otro",
};

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  "1_10": "1 a 10 personas",
  "11_50": "11 a 50 personas",
  "51_200": "51 a 200 personas",
  MAS_200: "Más de 200 personas",
};

export const SECTOR_LABELS: Record<Sector, string> = {
  RESTAURANTES: "Restaurantes",
  DISTRIBUCION: "Distribuidoras",
  TALLERES: "Talleres",
  CONSTRUCCION: "Constructoras",
  SERVICIOS: "Empresas de servicios",
  OTRO: "Otro",
};

/** Dentro del horario publicado (SITE.officeHours). */
export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  MANANA: "Mañanas (8:00 a. m. – 12:00 m.)",
  TARDE: "Tardes (12:00 m. – 6:00 p. m.)",
};

export const MEETING_MODE_LABELS: Record<MeetingMode, string> = {
  VIRTUAL: "Virtual",
  PRESENCIAL: "Presencial",
};

export const TIMELINE_LABELS: Record<DesiredTimeline, string> = {
  MENOS_1_MES: "Menos de 1 mes",
  UNO_A_TRES_MESES: "De 1 a 3 meses",
  MAS_3_MESES: "Más de 3 meses",
  SIN_DEFINIR: "Aún no lo sé",
};

export const REQUEST_KIND_LABELS: Record<RequestKind, string> = {
  DIAGNOSTICO: "Diagnóstico",
  CONSULTORIA: "Consultoría",
  COTIZACION: "Cotización",
};

/** Opción de solución que reciben los formularios (subconjunto serializable del catálogo). */
export interface SolutionOption {
  slug: string;
  title: string;
  lineTitle: string;
  /** Nota de activación ya publicada en la línea (p. ej. Desarrollo e Integraciones). */
  note?: string;
}
