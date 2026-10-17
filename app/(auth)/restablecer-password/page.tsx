import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, authFieldClass } from "@/components/portal/AuthCard";

export const metadata: Metadata = { title: "Nueva contraseña" };

/**
 * Destino del enlace de recuperación (?token=…). Cuando exista el proveedor, el
 * token se valida en el servidor (un solo uso, vencimiento corto) antes de
 * mostrar el formulario.
 */
export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Nueva contraseña"
      description="Elige una contraseña nueva para tu cuenta."
      footer={
        <Link href="/login" className="text-white underline underline-offset-4">
          Volver a iniciar sesión
        </Link>
      }
    >
      <form aria-label="Crear nueva contraseña">
        <fieldset disabled className="space-y-4">
          <div>
            <label htmlFor="np-1" className="mb-1.5 block text-sm text-slate-300">
              Nueva contraseña
            </label>
            <input id="np-1" type="password" autoComplete="new-password" className={authFieldClass} />
          </div>
          <div>
            <label htmlFor="np-2" className="mb-1.5 block text-sm text-slate-300">
              Confirmar contraseña
            </label>
            <input id="np-2" type="password" autoComplete="new-password" className={authFieldClass} />
          </div>
          <button type="submit" className="btn-primary w-full">
            Guardar contraseña
          </button>
        </fieldset>
      </form>
    </AuthCard>
  );
}
