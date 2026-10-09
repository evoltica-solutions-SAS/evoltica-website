import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreditCard, Download } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { KeyValueList } from "@/components/portal/KeyValueList";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { describeDue, formatDate, formatDateTime, formatMoney } from "@/lib/portal/format";
import { INVOICE_STATUS, PAYMENT_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Detalle de factura" };

export default async function PortalInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, repo } = await getPortalContext();
  const invoice = await repo.getInvoice(session, id);
  if (!invoice) notFound();

  const payments = (await repo.listPayments(session, { pageSize: 100 })).items.filter((p) => p.invoiceId === invoice.id);
  const owed = invoice.status === "PENDIENTE" || invoice.status === "VENCIDA";

  return (
    <>
      <PageHeader
        title={`Factura ${invoice.number}`}
        back={{ href: "/app/facturacion", label: "Facturas" }}
        description={<StatusBadge status={INVOICE_STATUS[invoice.status]} />}
        actions={
          <>
            <button type="button" className="btn-secondary" disabled aria-describedby="invoice-integration">
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar PDF
            </button>
            {owed && (
              <button type="button" className="btn-primary" disabled aria-describedby="invoice-integration">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Pagar
              </button>
            )}
          </>
        }
      />
      <div id="invoice-integration">
        <IntegrationNote className="mb-6">
          La descarga del PDF y el pago en línea se habilitan cuando se conecten el sistema de facturación y una pasarela
          de pagos. Un pago solo se marcará como recibido cuando la pasarela lo confirme.
        </IntegrationNote>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title="Detalle" flush>
          <table className="w-full text-sm">
            <caption className="sr-only">Conceptos de la factura</caption>
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-xs uppercase tracking-wider text-slate-500">
                <th scope="col" className="px-5 py-3 font-medium">Concepto</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Cant.</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {invoice.lines.map((line, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 text-white">{line.description}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-300">{line.quantity}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-300">{formatMoney(line.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/[0.12]">
                <th scope="row" colSpan={2} className="px-5 py-3 text-left font-medium text-white">Total</th>
                <td className="px-5 py-3 text-right font-semibold tabular-nums text-white">{formatMoney(invoice.total)}</td>
              </tr>
            </tfoot>
          </table>
        </Panel>

        <div className="space-y-6">
          <Panel title="Resumen">
            <KeyValueList
              items={[
                { label: "Emitida", value: formatDate(invoice.issuedAt) },
                {
                  label: "Vencimiento",
                  value: owed ? `${formatDate(invoice.dueAt)} (${describeDue(invoice.dueAt)})` : formatDate(invoice.dueAt),
                },
                { label: "Saldo pendiente", value: formatMoney(invoice.balance) },
                { label: "CUFE", value: invoice.cufe ?? "Disponible al conectar la facturación electrónica" },
              ]}
            />
          </Panel>
          <Panel title="Pagos registrados">
            {payments.length === 0 ? (
              <p className="text-sm text-slate-400">No hay pagos registrados para esta factura.</p>
            ) : (
              <ul className="space-y-3">
                {payments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-3 text-sm">
                    <span>
                      <span className="block text-white">{formatMoney(payment.amount)}</span>
                      <span className="block text-xs text-slate-500">{formatDateTime(payment.createdAt)}</span>
                    </span>
                    <StatusBadge status={PAYMENT_STATUS[payment.status]} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
