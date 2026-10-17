import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { EmptyState } from "@/components/portal/EmptyState";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { describeDue, formatDate, formatMoney } from "@/lib/portal/format";
import { BILLING_CYCLE, SUBSCRIPTION_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Suscripciones" };

export default async function PortalSubscriptionsPage() {
  const { session, repo } = await getPortalContext();
  const subscriptions = await repo.listSubscriptions(session);

  return (
    <>
      <PageHeader
        title="Suscripciones"
        description="Servicios recurrentes, su ciclo de facturación y la fecha del próximo periodo."
      />
      <Panel flush>
        {subscriptions.items.length === 0 ? (
          <EmptyState icon={RefreshCw} title="No tienes suscripciones" />
        ) : (
          <DataTable
            caption="Suscripciones"
            rows={subscriptions.items}
            total={subscriptions.total}
            rowKey={(s) => s.id}
            columns={[
              { header: "Plan", cell: (s) => s.plan },
              { header: "Ciclo", cell: (s) => BILLING_CYCLE[s.billingCycle] },
              { header: "Estado", cell: (s) => <StatusBadge status={SUBSCRIPTION_STATUS[s.status]} /> },
              {
                header: "Fin del periodo",
                cell: (s) => (
                  <span>
                    {formatDate(s.currentPeriodEnd)}
                    {s.status === "ACTIVA" && <span className="block text-xs text-slate-500">{describeDue(s.currentPeriodEnd)}</span>}
                  </span>
                ),
                align: "end",
              },
              { header: "Valor del periodo", cell: (s) => (s.amount ? formatMoney(s.amount) : "—"), align: "end" },
              {
                header: "Servicio",
                cell: (s) =>
                  s.contractedServiceId ? (
                    <Link href={`/app/servicios/${s.contractedServiceId}`} className="text-slate-300 underline-offset-4 hover:underline">
                      Ver servicio
                    </Link>
                  ) : (
                    "—"
                  ),
              },
            ]}
          />
        )}
      </Panel>
      <p className="mt-4 text-sm text-slate-500">
        Para cambiar o cancelar una suscripción, crea un ticket o escríbenos: los cambios los gestiona el equipo de Evoltica.
      </p>
    </>
  );
}
