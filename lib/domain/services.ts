import type { Id, IsoDate, Money } from "./common";

/**
 * Línea de servicio: siempre una de las 5 de lib/services-data.ts (BUSINESS_CONTEXT).
 * Se referencia por slug para no duplicar el catálogo público.
 */
export type ServiceLineSlug =
  | "consultoria-empresarial"
  | "erp-y-automatizacion"
  | "infraestructura-y-cloud"
  | "servicios-administrados"
  | "desarrollo-e-integraciones";

export type ContractedServiceStatus = "EN_IMPLEMENTACION" | "ACTIVO" | "SUSPENDIDO" | "FINALIZADO";

/** Un servicio que una organización tiene (o tuvo) contratado. */
export interface ContractedService {
  id: Id;
  organizationId: Id;
  serviceLine: ServiceLineSlug;
  name: string;
  status: ContractedServiceStatus;
  startedAt: IsoDate;
  endsAt?: IsoDate;
  renewsAt?: IsoDate;
  /** Pares etiqueta/valor que el backend quiera mostrar (plan, alcance, responsable...). */
  details: { label: string; value: string }[];
}

export type BillingCycle = "MENSUAL" | "TRIMESTRAL" | "SEMESTRAL" | "ANUAL";
export type SubscriptionStatus = "ACTIVA" | "EN_MORA" | "PAUSADA" | "CANCELADA";

export interface Subscription {
  id: Id;
  organizationId: Id;
  contractedServiceId?: Id;
  plan: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodEnd: IsoDate;
  /** Lo define el backend: el sitio nunca inventa precios. */
  amount?: Money;
}

/** Definición pendiente del negocio (licencias, planes, otros). Ver docs/architecture. */
export type ProductKind = "LICENCIA" | "PLAN" | "OTRO";
export type ProductStatus = "ACTIVO" | "VENCIDO" | "CANCELADO";

export interface Product {
  id: Id;
  organizationId: Id;
  name: string;
  kind: ProductKind;
  status: ProductStatus;
  quantity?: number;
  expiresAt?: IsoDate;
}

export type OrderStatus = "BORRADOR" | "CONFIRMADO" | "EN_CURSO" | "COMPLETADO" | "CANCELADO";

export interface Order {
  id: Id;
  number: string;
  organizationId: Id;
  status: OrderStatus;
  createdAt: IsoDate;
  lines: { description: string; quantity: number; total?: Money }[];
  total?: Money;
}
