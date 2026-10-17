import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { AuthCard, authFieldClass } from "@/components/portal/AuthCard";
import { PORTAL_DEMO_ENABLED } from "@/lib/server/env";
import { getSession } from "@/lib/server/auth/session";
import { HOME_BY_ROLE } from "@/lib/server/auth/contracts";
import { SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";
import { pickText, type SearchParams } from "@/lib/portal/params";
import { redirect } from "next/navigation";
import { enterDemoAction } from "../actions";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession();
  if (session) redirect(HOME_BY_ROLE[session.user.role]);
  const next = pickText((await searchParams).next, 200);

  return (
    <AuthCard
      title="Iniciar sesión"
      description="Consulta tus servicios, facturas y tickets de soporte."
      footer={
        <>
          ¿Necesitas ayuda ahora? Escríbenos a{" "}
          <a href={`mailto:${SITE.email}`} className="text-white underline underline-offset-4">
            {SITE.email}
          </a>{" "}
          o por{" "}
          <a href={getWhatsAppUrl("Hola, soy cliente y necesito soporte.")} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
            WhatsApp
          </a>
          .
        </>
      }
    >
      <form aria-label="Iniciar sesión">
        <fieldset disabled className="space-y-4">
          <div>
            <label htmlFor="l-email" className="mb-1.5 block text-sm text-slate-300">
              Correo
            </label>
            <input id="l-email" type="email" autoComplete="email" className={authFieldClass} />
          </div>
          <div>
            <label htmlFor="l-password" className="mb-1.5 block text-sm text-slate-300">
              Contraseña
            </label>
            <input id="l-password" type="password" autoComplete="current-password" className={authFieldClass} />
          </div>
          <button type="submit" className="btn-primary w-full">
            Ingresar
          </button>
        </fieldset>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/recuperar-password" className="text-slate-400 hover:text-white">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link href="/registro" className="text-slate-400 hover:text-white">
          Crear cuenta
        </Link>
      </div>

      {PORTAL_DEMO_ENABLED && (
        <form action={enterDemoAction} className="mt-6 rounded-md border border-dashed border-secondary/50 p-4">
          <input type="hidden" name="next" value={next ?? ""} />
          <p className="flex items-center gap-2 text-sm font-medium text-white">
            <FlaskConical className="h-4 w-4 text-secondary-400" aria-hidden="true" />
            Solo en desarrollo
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Abre el portal con datos ficticios. No es un inicio de sesión y no existe en producción.
          </p>
          <button type="submit" className="btn-secondary mt-3 w-full">
            Entrar al entorno de demostración
          </button>
        </form>
      )}
    </AuthCard>
  );
}
