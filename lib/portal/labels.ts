import type {
  BillingCycle,
  CloudResourceKind,
  CloudResourceStatus,
  ContractedServiceStatus,
  InvoiceStatus,
  NotificationKind,
  PaymentStatus,
  ProductKind,
  ProductStatus,
  SubscriptionStatus,
  TicketPriority,
  TicketStatus,
} from "@/lib/domain";

/**
 * Etiquetas humanas y "tono" visual de cada estado del dominio.
 *
 * Los tonos usan SOLO la paleta de marca (DESIGN_SYSTEM): no hay rojo ni ámbar.
 * Lo que exige atención ("attention") se marca con contraste alto + ícono, y
 * el estado siempre va escrito: el color nunca es la única señal.
 */
export type StatusTone = "success" | "progress" | "info" | "attention" | "neutral" | "muted";

export interface StatusMeta {
  label: string;
  tone: StatusTone;
}

export const SERVICE_STATUS: Record<ContractedServiceStatus, StatusMeta> = {
  EN_IMPLEMENTACION: { label: "En implementación", tone: "progress" },
  ACTIVO: { label: "Activo", tone: "success" },
  SUSPENDIDO: { label: "Suspendido", tone: "attention" },
  FINALIZADO: { label: "Finalizado", tone: "muted" },
};

export const SUBSCRIPTION_STATUS: Record<SubscriptionStatus, StatusMeta> = {
  ACTIVA: { label: "Activa", tone: "success" },
  EN_MORA: { label: "En mora", tone: "attention" },
  PAUSADA: { label: "Pausada", tone: "neutral" },
  CANCELADA: { label: "Cancelada", tone: "muted" },
};

export const PRODUCT_STATUS: Record<ProductStatus, StatusMeta> = {
  ACTIVO: { label: "Activo", tone: "success" },
  VENCIDO: { label: "Vencido", tone: "attention" },
  CANCELADO: { label: "Cancelado", tone: "muted" },
};

export const INVOICE_STATUS: Record<InvoiceStatus, StatusMeta> = {
  PENDIENTE: { label: "Pendiente", tone: "info" },
  PAGADA: { label: "Pagada", tone: "success" },
  VENCIDA: { label: "Vencida", tone: "attention" },
  ANULADA: { label: "Anulada", tone: "muted" },
};

export const PAYMENT_STATUS: Record<PaymentStatus, StatusMeta> = {
  PENDIENTE: { label: "En verificación", tone: "info" },
  APROBADO: { label: "Aprobado", tone: "success" },
  RECHAZADO: { label: "Rechazado", tone: "attention" },
  REEMBOLSADO: { label: "Reembolsado", tone: "muted" },
};

export const TICKET_STATUS: Record<TicketStatus, StatusMeta> = {
  ABIERTO: { label: "Abierto", tone: "info" },
  EN_PROGRESO: { label: "En progreso", tone: "progress" },
  ESPERANDO_CLIENTE: { label: "Esperando tu respuesta", tone: "attention" },
  RESUELTO: { label: "Resuelto", tone: "success" },
  CERRADO: { label: "Cerrado", tone: "muted" },
};

export const TICKET_PRIORITY: Record<TicketPriority, StatusMeta> = {
  BAJA: { label: "Baja", tone: "muted" },
  MEDIA: { label: "Media", tone: "neutral" },
  ALTA: { label: "Alta", tone: "info" },
  CRITICA: { label: "Crítica", tone: "attention" },
};

export const CLOUD_STATUS: Record<CloudResourceStatus, StatusMeta> = {
  EN_LINEA: { label: "En línea", tone: "success" },
  DETENIDO: { label: "Detenido", tone: "attention" },
  MANTENIMIENTO: { label: "Mantenimiento", tone: "progress" },
  DESCONOCIDO: { label: "Sin datos", tone: "muted" },
};

export const BACKUP_STATUS: Record<"COMPLETO" | "FALLIDO" | "EN_CURSO", StatusMeta> = {
  COMPLETO: { label: "Completo", tone: "success" },
  FALLIDO: { label: "Fallido", tone: "attention" },
  EN_CURSO: { label: "En curso", tone: "progress" },
};

export const CLOUD_KIND: Record<CloudResourceKind, string> = {
  VPS: "VPS",
  SERVIDOR: "Servidor",
  HOSTING_ERP: "Hosting ERP",
};

export const PRODUCT_KIND: Record<ProductKind, string> = {
  LICENCIA: "Licencia",
  PLAN: "Plan",
  OTRO: "Otro",
};

export const BILLING_CYCLE: Record<BillingCycle, string> = {
  MENSUAL: "Mensual",
  TRIMESTRAL: "Trimestral",
  SEMESTRAL: "Semestral",
  ANUAL: "Anual",
};

export const NOTIFICATION_KIND: Record<NotificationKind, string> = {
  TICKET: "Soporte",
  FACTURA: "Facturación",
  SERVICIO: "Servicios",
  SISTEMA: "Sistema",
};
