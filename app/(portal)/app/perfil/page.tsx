import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { KeyValueList } from "@/components/portal/KeyValueList";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getPortalContext } from "@/lib/server/portal";
import { signOutAction } from "../actions";

export const metadata: Metadata = { title: "Perfil y configuración" };

const fieldClass =
  "w-full rounded-md border border-white/[0.12] bg-background px-3 py-2.5 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60";

export default async function PortalProfilePage() {
  const { session, repo } = await getPortalContext();
  const organization = await repo.getOrganization(session);

  return (
    <>
      <PageHeader title="Perfil y configuración" description="Tus datos, los de tu organización y tus preferencias." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Tus datos">
          <KeyValueList
            items={[
              { label: "Nombre", value: session.user.name },
              { label: "Correo", value: session.user.email },
              { label: "Rol", value: "Cliente" },
            ]}
          />
          <p className="mt-4 text-xs text-slate-500">
            Para cambiar estos datos, crea un ticket: el equipo de Evoltica los actualiza en el sistema de origen.
          </p>
        </Panel>

        <Panel title="Organización">
          <KeyValueList
            items={[
              { label: "Razón social", value: organization?.legalName ?? "—" },
              { label: "NIT", value: organization?.taxId ?? "—" },
              { label: "Correo", value: organization?.email ?? "—" },
              { label: "Teléfono", value: organization?.phone ?? "—" },
              { label: "Ciudad", value: organization?.city ?? "—" },
            ]}
          />
        </Panel>

        <Panel title="Seguridad">
          <IntegrationNote className="mb-5">
            El cambio de contraseña se habilita cuando se apruebe el proveedor de identidad (ADR-013). Nunca se guardan
            contraseñas en el sitio en texto plano.
          </IntegrationNote>
          <form aria-label="Cambiar contraseña">
            <fieldset disabled className="space-y-4">
              <div>
                <label htmlFor="p-actual" className="mb-1.5 block text-sm text-slate-300">
                  Contraseña actual
                </label>
                <input id="p-actual" type="password" autoComplete="current-password" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="p-nueva" className="mb-1.5 block text-sm text-slate-300">
                  Nueva contraseña
                </label>
                <input id="p-nueva" type="password" autoComplete="new-password" className={fieldClass} />
              </div>
              <button type="submit" className="btn-secondary">
                Cambiar contraseña
              </button>
            </fieldset>
          </form>
        </Panel>

        <Panel title="Preferencias y sesión">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <span>
              <span className="block text-sm text-white">Tema claro</span>
              <span className="block text-xs text-slate-500">Se guarda en este navegador.</span>
            </span>
            <ThemeToggle />
          </div>
          <form action={signOutAction} className="pt-5">
            <button type="submit" className="btn-secondary">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Cerrar sesión
            </button>
          </form>
        </Panel>
      </div>
    </>
  );
}
