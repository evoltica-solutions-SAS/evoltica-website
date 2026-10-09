import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Briefcase, FileText, LifeBuoy, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { StatCard } from "@/components/portal/StatCard";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { EmptyState } from "@/components/portal/EmptyState";
import { getPortalContext, getPortalOverview } from "@/lib/server/portal";
import { describeDue, formatDate, formatDateTime, formatMoney } from "@/lib/portal/format";
import { INVOICE_STATUS, SERVICE_STATUS, TICKET_PRIORITY, TICKET_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Resumen" };

export default async function PortalDashboardPage() {
  const { session, repo } = await getPortalContext();
  const [overview, services, tickets, invoices, notifications] = await Promise.all([
    getPortalOverview(),
    repo.listServices(session, { pageSize: 5 }),
    repo.listTickets(session, { pageSize: 50 }),
    repo.listInvoices(session, { pageSize: 50 }),
    repo.listNotifications(session, { pageSize: 4 }),
  ]);

  const openTickets = tickets.items
    .filter((t) => t.status === "ABIERTO" || t.status === "EN_PROGRESO" || t.status === "ESPERANDO_CLIENTE")
    .slice(0, 4);
  const dueInvoices = invoices.items.filter((inv) => inv.status === "PENDIENTE" || inv.status === "VENCIDA");
  const upcoming = [
    ...dueInvoices.map((inv) => ({
      id: inv.id,
      label: `Factura ${inv.number}`,
      date: inv.dueAt,
      href: `/app/facturacion/${inv.id}`,
      status: INVOICE_STATUS[inv.status],
    })),
    ...overview.upcomingRenewals.map((r) => ({ ...r, label: `Renovación · ${r.label}`, status: undefined })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const { services: byStatus } = overview;

  return (
    <>
      <PageHeader
        title="Resumen"
        description={`Hola, ${session.user.name}. Así está tu cuenta hoy.`}
        actions={
          <Link href="/app/tickets/nuevo" className="btn-primary">
            Crear ticket
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Servicios activos"
          value={byStatus.ACTIVO}
          detail={byStatus.SUSPENDIDO ? `${byStatus.SUSPENDIDO} suspendido(s)` : "Ninguno suspendido"}
          href="/app/servicios"
          icon={Briefcase}
        />
        <StatCard
          label="Suscripciones activas"
          value={overview.activeSubscriptions}
          detail={overview.upcomingRenewals[0] ? `Próxima renovación ${describeDue(overview.upcomingRenewals[0].date)}` : "Sin renovaciones próximas"}
          href="/app/suscripciones"
          icon={RefreshCw}
        />
        <StatCard
          label="Tickets abiertos"
          value={overview.openTickets}
          detail="Incluye los que esperan tu respuesta"
          href="/app/tickets"
          icon={LifeBuoy}
        />
        <StatCard
          label="Facturas por pagar"
          value={overview.pendingInvoices.count}
          detail={
            overview.pendingInvoices.balance
              ? `${formatMoney(overview.pendingInvoices.balance)}${overview.pendingInvoices.overdue ? ` · ${overview.pendingInvoices.overdue} vencida(s)` : ""}`
              : "Estás al día"
          }
          href="/app/facturacion"
          icon={FileText}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title="Servicios contratados" link={{ href: "/app/servicios", label: "Ver todos" }} flush>
          {services.items.length === 0 ? (
            <EmptyState title="Aún no tienes servicios contratados" />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {services.items.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/app/servicios/${service.id}`}
                    className="flex flex-col items-start gap-2 px-5 py-3.5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-white">{service.name}</span>
                      <span className="block text-xs text-slate-500">
                        {service.renewsAt
                          ? `Renueva el ${formatDate(service.renewsAt)}`
                          : service.endsAt
                            ? `Finalizó el ${formatDate(service.endsAt)}`
                            : `Desde ${formatDate(service.startedAt)}`}
                      </span>
                    </span>
                    <StatusBadge status={SERVICE_STATUS[service.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Próximos vencimientos" flush>
          {upcoming.length === 0 ? (
            <EmptyState title="Nada vence pronto" />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {upcoming.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-white/[0.02]">
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-white">{item.label}</span>
                      <span className="block text-xs text-slate-500">
                        {formatDate(item.date)} · {describeDue(item.date)}
                      </span>
                    </span>
                    {item.status && <StatusBadge status={item.status} />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Tickets abiertos" link={{ href: "/app/tickets", label: "Ver todos" }} flush>
          {openTickets.length === 0 ? (
            <EmptyState title="No tienes tickets abiertos" icon={LifeBuoy} />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {openTickets.map((ticket) => (
                <li key={ticket.id}>
                  <Link
                    href={`/app/tickets/${ticket.id}`}
                    className="flex flex-col items-start gap-2 px-5 py-3.5 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-white">{ticket.subject}</span>
                      <span className="block font-mono text-xs text-slate-500">
                        {ticket.number} · prioridad {TICKET_PRIORITY[ticket.priority].label.toLowerCase()}
                      </span>
                    </span>
                    <StatusBadge status={TICKET_STATUS[ticket.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Notificaciones" link={{ href: "/app/notificaciones", label: "Ver todas" }} flush>
          {notifications.items.length === 0 ? (
            <EmptyState title="Sin notificaciones" icon={Bell} />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {notifications.items.map((n) => (
                <li key={n.id} className="flex gap-3 px-5 py-3.5">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-primary"}`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm text-white">
                      {n.title}
                      {!n.readAt && <span className="sr-only"> (sin leer)</span>}
                    </span>
                    <span className="block text-xs text-slate-500">{formatDateTime(n.createdAt)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
