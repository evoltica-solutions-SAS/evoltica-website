"use server";

import { getPortalContext } from "@/lib/server/portal";
import { BackendNotConfiguredError, DemoReadOnlyError } from "@/lib/server/data/errors";

export interface MarkReadState {
  message?: string;
}

/** Marca como leídas las notificaciones del propio usuario (el repositorio limita el alcance). */
export async function markAllReadAction(_prev: MarkReadState, formData: FormData): Promise<MarkReadState> {
  const { session, repo } = await getPortalContext();
  const ids = formData
    .getAll("id")
    .filter((value): value is string => typeof value === "string")
    .slice(0, 100);
  try {
    await repo.markNotificationsRead(session, ids);
    return {};
  } catch (error) {
    if (error instanceof DemoReadOnlyError) {
      return { message: "Entorno de demostración: el estado de las notificaciones no se guarda." };
    }
    if (error instanceof BackendNotConfiguredError) return { message: "El sistema de notificaciones aún no está conectado." };
    throw error;
  }
}
