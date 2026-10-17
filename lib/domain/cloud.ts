import type { Id, IsoDate } from "./common";

export type CloudResourceKind = "VPS" | "SERVIDOR" | "HOSTING_ERP";
export type CloudResourceStatus = "EN_LINEA" | "DETENIDO" | "MANTENIMIENTO" | "DESCONOCIDO";

export interface Backup {
  id: Id;
  createdAt: IsoDate;
  sizeBytes?: number;
  status: "COMPLETO" | "FALLIDO" | "EN_CURSO";
}

/** Recurso de infraestructura del cliente. Solo lectura en la primera versión. */
export interface CloudResource {
  id: Id;
  organizationId: Id;
  contractedServiceId?: Id;
  name: string;
  kind: CloudResourceKind;
  /** Proveedor real (p. ej. Proxmox, Hetzner, Contabo), según lo informe el backend. */
  provider?: string;
  region?: string;
  status: CloudResourceStatus;
  specs: { vcpu?: number; ramGb?: number; diskGb?: number; os?: string };
  /** Uso actual en porcentaje, si el monitoreo lo expone. */
  usage?: { cpu?: number; ram?: number; disk?: number; sampledAt: IsoDate };
  ipAddress?: string;
  backups: Backup[];
}
