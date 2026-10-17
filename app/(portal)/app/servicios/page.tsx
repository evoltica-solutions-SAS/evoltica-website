import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { FilterBar } from "@/components/portal/FilterBar";
import { EmptyState } from "@/components/portal/EmptyState";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { formatDate } from "@/lib/portal/format";
import { SERVICE_STATUS } from "@/lib/portal/labels";
import { pickEnum, pickText, type SearchParams } from "@/lib/portal/params";
import { getServiceBySlug } from "@/lib/services-data";
import type { ContractedServiceStatus } from "@/lib/domain";

export const metadata: Metadata = { title: "Servicios contratados" };

const STATUSES = Object.keys(SERVICE_STATUS) as ContractedServiceStatus[];

export default async function PortalServicesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = pickEnum(params.estado, STATUSES);
  const search = pickText(params.q);
  const { session, repo } = await getPortalContext();
  const services = await repo.listServices(session, { status, search });

  return (
    <>
      <PageHeader
        title="Servicios contratados"
        description="Los servicios de Evoltica que tu organización tiene activos, suspendidos o ya finalizados."
      />
      <Panel flush>
        <FilterBar
          action="/app/servicios"
          active={Boolean(status || search)}
          search={{ name: "q", label: "Buscar", value: search, placeholder: "Nombre del servicio" }}
          selects={[
            {
              name: "estado",
              label: "Estado",
              value: status,
              options: STATUSES.map((s) => ({ value: s, label: SERVICE_STATUS[s].label })),
            },
          ]}
        />
        {services.items.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={status || search ? "Ningún servicio coincide con el filtro" : "Aún no tienes servicios contratados"}
            description={status || search ? "Prueba con otro estado o limpia los filtros." : undefined}
          />
        ) : (
          <DataTable
            caption="Servicios contratados"
            rows={services.items}
            total={services.total}
            rowKey={(s) => s.id}
            rowHref={(s) => `/app/servicios/${s.id}`}
            columns={[
              { header: "Servicio", cell: (s) => s.name },
              { header: "Línea", cell: (s) => getServiceBySlug(s.serviceLine)?.title ?? s.serviceLine },
              { header: "Estado", cell: (s) => <StatusBadge status={SERVICE_STATUS[s.status]} /> },
              { header: "Contratado", cell: (s) => formatDate(s.startedAt), align: "end" },
              {
                header: "Vencimiento",
                cell: (s) => (s.renewsAt ? formatDate(s.renewsAt) : s.endsAt ? formatDate(s.endsAt) : "—"),
                align: "end",
              },
            ]}
          />
        )}
      </Panel>
    </>
  );
}
