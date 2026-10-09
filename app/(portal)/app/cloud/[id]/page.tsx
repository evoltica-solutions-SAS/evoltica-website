import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { KeyValueList } from "@/components/portal/KeyValueList";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { UsageBar } from "@/components/portal/UsageBar";
import { getPortalContext } from "@/lib/server/portal";
import { formatBytes, formatDateTime } from "@/lib/portal/format";
import { BACKUP_STATUS, CLOUD_KIND, CLOUD_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Detalle Cloud" };

export default async function PortalCloudDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, repo } = await getPortalContext();
  const resource = await repo.getCloudResource(session, id);
  if (!resource) notFound();

  return (
    <>
      <PageHeader
        title={resource.name}
        back={{ href: "/app/cloud", label: "Cloud" }}
        description={<StatusBadge status={CLOUD_STATUS[resource.status]} />}
        actions={
          <Link href={`/app/tickets/nuevo${resource.contractedServiceId ? `?servicio=${resource.contractedServiceId}` : ""}`} className="btn-secondary">
            Solicitar una acción por ticket
          </Link>
        }
      />
      <IntegrationNote className="mb-6">
        Las acciones sobre el servidor (encender, apagar, reiniciar, restaurar backups) no se ejecutan desde el portal.
        Cuando se habiliten, requerirán permisos por cliente y quedarán registradas. Mientras tanto, solicítalas al equipo
        por ticket.
      </IntegrationNote>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Información">
          <KeyValueList
            items={[
              { label: "Tipo", value: CLOUD_KIND[resource.kind] },
              { label: "Proveedor", value: resource.provider ?? "—" },
              { label: "Región", value: resource.region ?? "—" },
              { label: "Sistema operativo", value: resource.specs.os ?? "—" },
              { label: "Dirección IP", value: resource.ipAddress ? <span className="font-mono">{resource.ipAddress}</span> : "—" },
              {
                label: "Recursos",
                value:
                  [
                    resource.specs.vcpu && `${resource.specs.vcpu} vCPU`,
                    resource.specs.ramGb && `${resource.specs.ramGb} GB RAM`,
                    resource.specs.diskGb && `${resource.specs.diskGb} GB disco`,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—",
              },
              ...(resource.contractedServiceId
                ? [
                    {
                      label: "Servicio",
                      value: (
                        <Link href={`/app/servicios/${resource.contractedServiceId}`} className="underline-offset-4 hover:underline">
                          Ver servicio contratado
                        </Link>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </Panel>

        <Panel title="Uso actual">
          {resource.usage ? (
            <div className="space-y-5">
              {resource.usage.cpu !== undefined && <UsageBar label="CPU" value={resource.usage.cpu} />}
              {resource.usage.ram !== undefined && <UsageBar label="RAM" value={resource.usage.ram} />}
              {resource.usage.disk !== undefined && <UsageBar label="Disco" value={resource.usage.disk} />}
              <p className="text-xs text-slate-500">Medición: {formatDateTime(resource.usage.sampledAt)}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">El monitoreo no reporta métricas para este recurso.</p>
          )}
        </Panel>

        <Panel title="Backups" className="xl:col-span-2" flush>
          {resource.backups.length === 0 ? (
            <p className="p-5 text-sm text-slate-400">No hay backups registrados.</p>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {resource.backups.map((backup) => (
                <li key={backup.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                  <span>
                    <span className="block text-white">{formatDateTime(backup.createdAt)}</span>
                    <span className="block text-xs text-slate-500">
                      {backup.sizeBytes ? formatBytes(backup.sizeBytes) : "Tamaño no disponible"}
                    </span>
                  </span>
                  <StatusBadge status={BACKUP_STATUS[backup.status]} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
