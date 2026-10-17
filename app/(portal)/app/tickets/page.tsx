import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Plus } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { FilterBar } from "@/components/portal/FilterBar";
import { EmptyState } from "@/components/portal/EmptyState";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { formatDateTime } from "@/lib/portal/format";
import { TICKET_PRIORITY, TICKET_STATUS } from "@/lib/portal/labels";
import { pickEnum, pickText, type SearchParams } from "@/lib/portal/params";
import { TICKET_PRIORITIES, TICKET_STATUSES } from "@/lib/domain";

export const metadata: Metadata = { title: "Tickets" };

export default async function PortalTicketsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = pickEnum(params.estado, TICKET_STATUSES);
  const priority = pickEnum(params.prioridad, TICKET_PRIORITIES);
  const search = pickText(params.q);
  const { session, repo } = await getPortalContext();
  const [tickets, services] = await Promise.all([
    repo.listTickets(session, { status, priority, search }),
    repo.listServices(session, { pageSize: 100 }),
  ]);
  const serviceName = new Map(services.items.map((s) => [s.id, s.name]));
  const filtered = Boolean(status || priority || search);

  return (
    <>
      <PageHeader
        title="Tickets"
        description="Solicitudes de soporte de tu organización y su estado."
        actions={
          <Link href="/app/tickets/nuevo" className="btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nuevo ticket
          </Link>
        }
      />
      <Panel flush>
        <FilterBar
          action="/app/tickets"
          active={filtered}
          search={{ name: "q", label: "Buscar", value: search, placeholder: "Asunto o número" }}
          selects={[
            {
              name: "estado",
              label: "Estado",
              value: status,
              options: TICKET_STATUSES.map((s) => ({ value: s, label: TICKET_STATUS[s].label })),
            },
            {
              name: "prioridad",
              label: "Prioridad",
              value: priority,
              options: TICKET_PRIORITIES.map((p) => ({ value: p, label: TICKET_PRIORITY[p].label })),
            },
          ]}
        />
        {tickets.items.length === 0 ? (
          <EmptyState
            icon={LifeBuoy}
            title={filtered ? "Ningún ticket coincide con el filtro" : "Aún no has creado tickets"}
            action={
              !filtered && (
                <Link href="/app/tickets/nuevo" className="btn-secondary">
                  Crear el primero
                </Link>
              )
            }
          />
        ) : (
          <DataTable
            caption="Tickets de soporte"
            rows={tickets.items}
            total={tickets.total}
            rowKey={(t) => t.id}
            rowHref={(t) => `/app/tickets/${t.id}`}
            columns={[
              { header: "Asunto", cell: (t) => t.subject, className: "max-w-sm" },
              { header: "Número", cell: (t) => <span className="font-mono text-xs">{t.number}</span> },
              { header: "Estado", cell: (t) => <StatusBadge status={TICKET_STATUS[t.status]} /> },
              { header: "Prioridad", cell: (t) => <StatusBadge status={TICKET_PRIORITY[t.priority]} /> },
              { header: "Servicio", cell: (t) => (t.contractedServiceId ? serviceName.get(t.contractedServiceId) ?? "—" : "—") },
              { header: "Actualizado", cell: (t) => formatDateTime(t.updatedAt), align: "end" },
            ]}
          />
        )}
      </Panel>
    </>
  );
}
