import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, authFieldClass } from "@/components/portal/AuthCard";

export const metadata: Metadata = { title: "Crear cuenta" };

/**
 * Registro: interfaz preparada, deshabilitada. Falta decidir la modalidad
 * (abierto, por invitación o con aprobación) y publicar la política de
 * tratamiento de datos (Ley 1581) antes de habilitarlo.
 */
export default function RegisterPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      description="Las cuentas del portal son para empresas que ya son clientes de Evoltica."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-white underline underline-offset-4">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form aria-label="Crear cuenta">
        <fieldset disabled className="space-y-4">
          <div>
            <label htmlFor="r-nombre" className="mb-1.5 block text-sm text-slate-300">
              Nombre completo
            </label>
            <input id="r-nombre" autoComplete="name" className={authFieldClass} />
          </div>
          <div>
            <label htmlFor="r-empresa" className="mb-1.5 block text-sm text-slate-300">
              Empresa
            </label>
            <input id="r-empresa" autoComplete="organization" className={authFieldClass} />
          </div>
          <div>
            <label htmlFor="r-email" className="mb-1.5 block text-sm text-slate-300">
              Correo corporativo
            </label>
            <input id="r-email" type="email" autoComplete="email" className={authFieldClass} />
          </div>
          <div>
            <label htmlFor="r-password" className="mb-1.5 block text-sm text-slate-300">
              Contraseña
            </label>
            <input id="r-password" type="password" autoComplete="new-password" className={authFieldClass} />
          </div>
          <label className="flex items-start gap-3 text-sm text-slate-400">
            <input type="checkbox" className="mt-1" />
            <span>Acepto la política de tratamiento de datos personales (pendiente de publicación).</span>
          </label>
          <button type="submit" className="btn-primary w-full">
            Crear cuenta
          </button>
        </fieldset>
      </form>
    </AuthCard>
  );
}
