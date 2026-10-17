"use server";

import { redirect } from "next/navigation";
import { safePortalPath } from "@/lib/auth-cookies";
import { startDemoSession } from "@/lib/server/auth/providers";

/**
 * Entrar al entorno de demostración (solo `next dev`). No recibe credenciales:
 * no es un inicio de sesión. Fuera de desarrollo, startDemoSession lanza.
 */
export async function enterDemoAction(formData: FormData): Promise<void> {
  await startDemoSession();
  redirect(safePortalPath(String(formData.get("next") ?? "")));
}
