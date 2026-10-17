import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, authFieldClass } from "@/components/portal/AuthCard";

export const metadata: Metadata = { title: "Recuperar contraseña" };

/** Solicitud de recuperación: enviará un enlace de un solo uso por correo (pendiente de ADR-013). */
export default function RecoverPasswordPage() {
  return (
    <AuthCard
      title="Recuperar contraseña"
      description="Te enviaremos un enlace de un solo uso para crear una contraseña nueva."
      footer={
        <Link href="/login" className="text-white underline underline-offset-4">
          Volver a iniciar sesión
        </Link>
      }
    >
      <form aria-label="Recuperar contraseña">
        <fieldset disabled className="space-y-4">
          <div>
            <label htmlFor="rp-email" className="mb-1.5 block text-sm text-slate-300">
              Correo de tu cuenta
            </label>
            <input id="rp-email" type="email" autoComplete="email" className={authFieldClass} />
          </div>
          <button type="submit" className="btn-primary w-full">
            Enviar enlace
          </button>
        </fieldset>
      </form>
    </AuthCard>
  );
}
