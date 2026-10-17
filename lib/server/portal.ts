import "server-only";
import { cache } from "react";
import { requireRole } from "@/lib/server/auth/session";
import { getBackendAdapter, getClientRepository } from "@/lib/server/data";

/**
 * Contexto de cada página del portal: exige sesión CLIENTE (autorización en el
 * servidor, no solo en el layout) y entrega el repositorio. Toda consulta pasa
 * la sesión, así el adaptador limita los datos a su organización.
 */
export const getPortalContext = cache(async () => {
  const session = await requireRole("CLIENTE");
  return { session, repo: await getClientRepository(), isDemo: getBackendAdapter() === "demo" };
});

/** Resumen de la cuenta, compartido por el shell (contadores) y el dashboard en el mismo render. */
export const getPortalOverview = cache(async () => {
  const { session, repo } = await getPortalContext();
  return repo.getOverview(session);
});
