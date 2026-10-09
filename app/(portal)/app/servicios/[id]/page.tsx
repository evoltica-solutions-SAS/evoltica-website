import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { KeyValueList } from "@/components/portal/KeyValueList";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { formatDate } from "@/lib/portal/format";
import { SERVICE_STATUS, SUBSCRIPTION_STATUS } from "@/lib/portal/labels";
import { getServiceBySlug } from "@/lib/services-data";

export const metadata: Metadata = { title: "Detalle del servicio" };

export default async function PortalServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, repo } = await getPortalContext();
  const service = await repo.getService(session, id);
  if (!service) notFound();

  const [subscriptions, cloud] = await Promise.all([
    repo.listSubscriptions(session, { pageSize: 50 }),
    repo.listCloudResources(session),
  ]);
  const linkedSubscriptions = subscriptions.items.filter((sub) => sub.contractedServiceId === service.id);
  const linkedResources = cloud.filter((resource) => resource.contractedServiceId === service.id);
  const line = getServiceBySlug(service.serviceLine);

  return (
    <>
      <PageHeader
        title={service.name}
        back={{ href: "/app/servicios", label: "Servicios contratados" }}
        description={<StatusBadge status={SERVICE_STATUS[service.status]} />}
        actions={
          <Link href={`/app/tickets/nuevo?servicio=${service.id}`} className="btn-secondary">
            Pedir soporte sobre este servicio
          </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title="Información del servicio">
          <KeyValueList
            items={[
              {
                label: "Línea de servicio",
                value: line ? (
                  <Link href={`/servicios/${line.slug}`} className="underline-offset-4 hover:underline">
                    {line.title}
                  </Link>
                ) : (
                  service.serviceLine
                ),
              },
              { label: "Fecha de contratación", value: formatDate(service.startedAt) },
              ...(service.renewsAt ? [{ label: "Próxima renovación", value: formatDate(service.renewsAt) }] : []),
              ...(service.endsAt ? [{ label: "Fecha de finalización", value: formatDate(service.endsAt) }] : []),
              ...service.details,
            ]}
          />
        </Panel>
        <div className="space-y-6">
          <Panel title="Suscripciones asociadas">
            {linkedSubscriptions.length === 0 ? (
              <p className="text-sm text-slate-400">Este servicio no tiene suscripciones asociadas.</p>
            ) : (
              <ul className="space-y-3">
                {linkedSubscriptions.map((sub) => (
                  <li key={sub.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-white">{sub.plan}</span>
                    <StatusBadge status={SUBSCRIPTION_STATUS[sub.status]} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          {linkedResources.length > 0 && (
            <Panel title="Recursos Cloud">
              <ul className="space-y-2">
                {linkedResources.map((resource) => (
                  <li key={resource.id}>
                    <Link href={`/app/cloud/${resource.id}`} className="font-mono text-sm text-white hover:text-primary-400">
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}
