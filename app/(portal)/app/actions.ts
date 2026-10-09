"use server";

import { redirect } from "next/navigation";
import { getAuthProvider } from "@/lib/server/auth/providers";

/** Cierra la sesión (hoy solo existe la de demostración) y vuelve al acceso. */
export async function signOutAction(): Promise<void> {
  await getAuthProvider().signOut();
  redirect("/login");
}
