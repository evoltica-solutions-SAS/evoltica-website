import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getPortalContext, getPortalOverview } from "@/lib/server/portal";
import { signOutAction } from "@/app/(portal)/app/actions";
import { DemoBanner } from "./DemoBanner";
import { PortalNav } from "./PortalNav";

function AccountBlock({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-white"
        aria-hidden="true"
      >
        {name.charAt(0)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-white">{name}</span>
        <span className="block truncate text-xs text-slate-400">{email}</span>
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Cerrar sesión</span>
        </button>
      </form>
    </div>
  );
}

/**
 * Estructura del portal de clientes: navegación propia, barra superior, aviso
 * de demostración y <main>. No usa nada del chrome público (navbar, footer,
 * intro, cortina, WhatsApp).
 */
export async function PortalShell({ children }: { children: React.ReactNode }) {
  const { session, repo, isDemo } = await getPortalContext();
  const [organization, overview] = await Promise.all([repo.getOrganization(session), getPortalOverview()]);
  const account = <AccountBlock name={session.user.name} email={session.user.email} />;
  const unread = overview.unreadNotifications;

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <PortalNav
        organizationName={organization?.legalName ?? "Mi organización"}
        unreadNotifications={unread}
        account={account}
      />
      <div className="flex min-w-0 flex-col">
        <div className="hidden h-16 items-center justify-end gap-4 border-b border-white/[0.08] px-10 lg:flex">
          <Link
            href="/app/notificaciones"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Notificaciones{unread > 0 ? ` (${unread} sin leer)` : ""}</span>
            {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
          </Link>
          <ThemeToggle />
          <div className="w-64 border-l border-white/[0.08] pl-4">{account}</div>
        </div>
        {isDemo && <DemoBanner />}
        <main id="main-content" className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
