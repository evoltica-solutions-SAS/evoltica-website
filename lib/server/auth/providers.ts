import "server-only";
import { cookies } from "next/headers";
import type { Session } from "@/lib/domain";
import { DEMO_SESSION_COOKIE } from "@/lib/auth-cookies";
import { PORTAL_DEMO_ENABLED } from "@/lib/server/env";
import type { AuthProvider, AuthResult } from "./contracts";

const notConfigured = async (): Promise<AuthResult<never>> => ({ ok: false, error: "NOT_CONFIGURED" });

/**
 * Sin proveedor de identidad aprobado (ADR-013): nadie inicia sesión, ninguna
 * credencial se acepta y no existe sesión. Es el comportamiento de producción hoy.
 */
const notConfiguredProvider: AuthProvider = {
  signIn: notConfigured,
  signUp: notConfigured,
  requestPasswordReset: notConfigured,
  resetPassword: notConfigured,
  getSession: async () => null,
  signOut: async () => {},
};

/**
 * Entorno de demostración (solo `next dev`). Tampoco acepta credenciales: la
 * única forma de entrar es el botón explícito "Entrar al entorno de
 * demostración", que emite una cookie con una sesión CLIENTE ficticia.
 */
const demoProvider: AuthProvider = {
  ...notConfiguredProvider,
  getSession: async (): Promise<Session | null> => {
    const store = await cookies();
    if (store.get(DEMO_SESSION_COOKIE)?.value !== "1") return null;
    // Condición literal (no la constante importada) para que el compilador elimine
    // este import en producción: los datos ficticios no llegan al bundle del servidor.
    if (process.env.NODE_ENV !== "development") return null;
    const { DEMO_SESSION } = await import("@/lib/server/data/adapters/demo/fixtures");
    return DEMO_SESSION;
  },
  signOut: async () => {
    (await cookies()).delete(DEMO_SESSION_COOKIE);
  },
};

export function getAuthProvider(): AuthProvider {
  return PORTAL_DEMO_ENABLED ? demoProvider : notConfiguredProvider;
}

/** Abre la sesión de demostración. Lanza si se invoca fuera de `next dev`. */
export async function startDemoSession(): Promise<void> {
  if (!PORTAL_DEMO_ENABLED) throw new Error("El entorno de demostración no está disponible.");
  (await cookies()).set(DEMO_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 8 * 60 * 60,
  });
}
