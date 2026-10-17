import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { EmptyState } from "@/components/portal/EmptyState";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { formatDateTime, formatMoney } from "@/lib/portal/format";
import { PAYMENT_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Pagos" };

export default async function PortalPaymentsPage() {
  const { session, repo } = await getPortalContext();
  const [payments, invoices] = await Promise.all([
    repo.listPayments(session),
    repo.listInvoices(session, { pageSize: 100 }),
  ]);
  const invoiceNumber = new Map(invoices.items.map((inv) => [inv.id, inv.number]));

  return (
    <>
      <PageHeader title="Pagos" description="Historial de pagos y su estado de verificación." />
      <IntegrationNote className="mb-6">
        No hay pasarela de pagos conectada. Cuando exista, el estado de cada pago lo confirmará la pasarela de forma
        verificada; los comprobantes estarán disponibles aquí.
      </IntegrationNote>
      <Panel flush>
        {payments.items.length === 0 ? (
          <EmptyState icon={CreditCard} title="Aún no hay pagos registrados" />
        ) : (
          <DataTable
            caption="Historial de pagos"
            rows={payments.items}
            total={payments.total}
            rowKey={(p) => p.id}
            columns={[
              { header: "Referencia", cell: (p) => <span className="font-mono">{p.providerReference ?? p.id}</span> },
              {
                header: "Factura",
                cell: (p) =>
                  p.invoiceId ? (
                    <Link href={`/app/facturacion/${p.invoiceId}`} className="font-mono text-slate-300 underline-offset-4 hover:underline">
                      {invoiceNumber.get(p.invoiceId) ?? "Ver factura"}
                    </Link>
                  ) : (
                    "—"
                  ),
              },
              { header: "Fecha", cell: (p) => formatDateTime(p.paidAt ?? p.createdAt), align: "end" },
              { header: "Medio", cell: (p) => p.method ?? "—" },
              { header: "Monto", cell: (p) => formatMoney(p.amount), align: "end" },
              { header: "Estado", cell: (p) => <StatusBadge status={PAYMENT_STATUS[p.status]} /> },
              { header: "Comprobante", cell: (p) => (p.receipt ? "Disponible" : "Pendiente de integración") },
            ]}
          />
        )}
      </Panel>
    </>
  );
}
