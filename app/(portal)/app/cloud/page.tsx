import type { Metadata } from "next";
import Link from "next/link";
import { Server } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { EmptyState } from "@/components/portal/EmptyState";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { Panel } from "@/components/portal/Panel";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { UsageBar } from "@/components/portal/UsageBar";
import { getPortalContext } from "@/lib/server/portal";
import { formatDateTime } from "@/lib/portal/format";
import { CLOUD_KIND, CLOUD_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Cloud" };

export default async function PortalCloudPage() {
  const { session, repo } = await getPortalContext();
  const resources = await repo.listCloudResources(session);

  return (
    <>
      <PageHeader title="Cloud" description="Servidores y VPS administrados por Evoltica para tu organización." />
      <IntegrationNote className="mb-6">
        Consulta de solo lectura. El estado, los recursos y los backups llegarán del proveedor de infraestructura y del
        monitoreo cuando se conecten. Las acciones (reiniciar, restaurar backups) no están disponibles desde el portal.
      </IntegrationNote>
      {resources.length === 0 ? (
        <Panel>
          <EmptyState icon={Server} title="No tienes servicios Cloud contratados" />
        </Panel>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {resources.map((resource) => (
            <li key={resource.id}>
              <Link
                href={`/app/cloud/${resource.id}`}
                className="block rounded-md border border-white/[0.08] bg-surface-alt p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-base font-medium text-white">{resource.name}</span>
                    <span className="block text-xs text-slate-500">
                      {CLOUD_KIND[resource.kind]}
                      {resource.specs.os ? ` · ${resource.specs.os}` : ""}
                      {resource.region ? ` · ${resource.region}` : ""}
                    </span>
                  </span>
                  <StatusBadge status={CLOUD_STATUS[resource.status]} />
                </span>
                <span className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300">
                  {resource.specs.vcpu && <span>{resource.specs.vcpu} vCPU</span>}
                  {resource.specs.ramGb && <span>{resource.specs.ramGb} GB RAM</span>}
                  {resource.specs.diskGb && <span>{resource.specs.diskGb} GB disco</span>}
                </span>
                {resource.usage ? (
                  <span className="mt-5 grid gap-3 sm:grid-cols-3">
                    {resource.usage.cpu !== undefined && <UsageBar label="CPU" value={resource.usage.cpu} />}
                    {resource.usage.ram !== undefined && <UsageBar label="RAM" value={resource.usage.ram} />}
                    {resource.usage.disk !== undefined && <UsageBar label="Disco" value={resource.usage.disk} />}
                    <span className="text-xs text-slate-500 sm:col-span-3">
                      Medición: {formatDateTime(resource.usage.sampledAt)}
                    </span>
                  </span>
                ) : (
                  <span className="mt-5 block text-sm text-slate-500">Sin métricas de uso disponibles.</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
