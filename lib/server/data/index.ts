import "server-only";
import { PORTAL_DEMO_ENABLED } from "@/lib/server/env";
import type { BackendAdapter, ClientPortalRepository } from "./contracts";
import { BackendNotConfiguredError } from "./errors";

/**
 * Sin backend aprobado (ADR-013), cualquier llamada falla de forma explícita.
 * En la práctica nunca se alcanza: sin proveedor de identidad no hay sesión y
 * el área privada redirige a /login antes de pedir datos.
 */
const notConfiguredRepository = new Proxy({} as ClientPortalRepository, {
  // `then` queda indefinido: si no, `await` trataría el proxy como una promesa.
  get: (_target, property) =>
    property === "then"
      ? undefined
      : async () => {
          throw new BackendNotConfiguredError();
        },
});

export function getBackendAdapter(): BackendAdapter {
  return PORTAL_DEMO_ENABLED ? "demo" : "none";
}

/**
 * Punto único de acceso a datos del portal. Fase 6: aquí se conecta el adaptador real.
 * El adaptador demo se importa bajo una condición literal de compilación: en
 * producción el compilador elimina el import y los datos ficticios no se empaquetan.
 */
export async function getClientRepository(): Promise<ClientPortalRepository> {
  if (process.env.NODE_ENV === "development") {
    return (await import("./adapters/demo/repository")).demoClientRepository;
  }
  return notConfiguredRepository;
}
