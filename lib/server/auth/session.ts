import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { Role, Session } from "@/lib/domain";
import { HOME_BY_ROLE } from "./contracts";
import { getAuthProvider } from "./providers";

/** Sesión de la petición actual (memoizada por render). */
export const getSession = cache(async (): Promise<Session | null> => getAuthProvider().getSession());

/**
 * Autorización en el servidor. Se llama en el layout Y en cada página/acción del
 * área privada: el middleware solo redirige de forma optimista y no basta.
 * - Sin sesión → /login.
 * - Con otro rol → al inicio de su propia área (un ADMIN nunca ve /app).
 */
export async function requireRole(role: Role): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== role) redirect(HOME_BY_ROLE[session.user.role]);
  return session;
}
