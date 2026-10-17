import type { Id, IsoDate } from "./common";

export const ROLES = ["CLIENTE", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export type UserStatus = "ACTIVO" | "INVITADO" | "BLOQUEADO";

/** Empresa cliente. Un usuario CLIENTE pertenece a una organización. */
export interface Organization {
  id: Id;
  legalName: string;
  /** NIT u otro identificador tributario. */
  taxId?: string;
  email?: string;
  phone?: string;
  city?: string;
  createdAt: IsoDate;
}

export interface User {
  id: Id;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  /** Solo para CLIENTE. Un ADMIN no pertenece a una organización cliente. */
  organizationId?: Id;
  lastLoginAt?: IsoDate;
  createdAt: IsoDate;
}

/** Lo que el servidor sabe del usuario autenticado en una petición. */
export interface Session {
  user: Pick<User, "id" | "name" | "email" | "role" | "organizationId">;
  expiresAt: IsoDate;
}
