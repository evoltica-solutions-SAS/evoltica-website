import type { FileRef, Id, IsoDate, Money } from "./common";

export type InvoiceStatus = "PENDIENTE" | "PAGADA" | "VENCIDA" | "ANULADA";

/**
 * Factura emitida por el sistema contable (factura electrónica DIAN).
 * El portal solo la muestra: nunca la genera ni la modifica.
 */
export interface Invoice {
  id: Id;
  number: string;
  organizationId: Id;
  issuedAt: IsoDate;
  dueAt: IsoDate;
  total: Money;
  /** Saldo pendiente. 0 cuando está pagada. */
  balance: Money;
  status: InvoiceStatus;
  lines: { description: string; quantity: number; total: Money }[];
  /** Código único de factura electrónica (DIAN), si aplica. */
  cufe?: string;
  pdf?: FileRef;
}

export type PaymentStatus = "PENDIENTE" | "APROBADO" | "RECHAZADO" | "REEMBOLSADO";

/** El estado de un pago solo lo cambia el webhook verificado del proveedor. */
export interface Payment {
  id: Id;
  organizationId: Id;
  invoiceId?: Id;
  amount: Money;
  method?: string;
  provider?: string;
  providerReference?: string;
  status: PaymentStatus;
  createdAt: IsoDate;
  paidAt?: IsoDate;
  receipt?: FileRef;
}
