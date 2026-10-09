import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { FilterBar } from "@/components/portal/FilterBar";
import { EmptyState } from "@/components/portal/EmptyState";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { describeDue, formatDate, formatMoney } from "@/lib/portal/format";
import { INVOICE_STATUS } from "@/lib/portal/labels";
import { pickEnum, pickText, type SearchParams } from "@/lib/portal/params";
import type { InvoiceStatus } from "@/lib/domain";

export const metadata: Metadata = { title: "Facturas" };

const STATUSES = Object.keys(INVOICE_STATUS) as InvoiceStatus[];

export default async function PortalInvoicesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = pickEnum(params.estado, STATUSES);
  const search = pickText(params.q, 40);
  const { session, repo } = await getPortalContext();
  const invoices = await repo.listInvoices(session, { status, search });

  return (
    <>
      <PageHeader title="Facturas" description="Facturas emitidas a tu organización, su estado y su vencimiento." />
      <IntegrationNote className="mb-6">
        Las facturas provienen del sistema contable de Evoltica (facturación electrónica). El portal solo las consulta:
        no las genera ni las modifica. La conexión con ese sistema está pendiente.
      </IntegrationNote>
      <Panel flush>
        <FilterBar
          action="/app/facturacion"
          active={Boolean(status || search)}
          search={{ name: "q", label: "Número", value: search, placeholder: "Ej. 0003" }}
          selects={[
            {
              name: "estado",
              label: "Estado",
              value: status,
              options: STATUSES.map((s) => ({ value: s, label: INVOICE_STATUS[s].label })),
            },
          ]}
        />
        {invoices.items.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={status || search ? "Ninguna factura coincide con el filtro" : "Aún no tienes facturas"}
          />
        ) : (
          <DataTable
            caption="Facturas"
            rows={invoices.items}
            total={invoices.total}
            rowKey={(inv) => inv.id}
            rowHref={(inv) => `/app/facturacion/${inv.id}`}
            columns={[
              { header: "Número", cell: (inv) => <span className="font-mono">{inv.number}</span> },
              { header: "Emitida", cell: (inv) => formatDate(inv.issuedAt), align: "end" },
              {
                header: "Vence",
                cell: (inv) => (
                  <span>
                    {formatDate(inv.dueAt)}
                    {(inv.status === "PENDIENTE" || inv.status === "VENCIDA") && (
                      <span className="block text-xs text-slate-500">{describeDue(inv.dueAt)}</span>
                    )}
                  </span>
                ),
                align: "end",
              },
              { header: "Total", cell: (inv) => formatMoney(inv.total), align: "end" },
              { header: "Saldo", cell: (inv) => formatMoney(inv.balance), align: "end" },
              { header: "Estado", cell: (inv) => <StatusBadge status={INVOICE_STATUS[inv.status]} /> },
            ]}
          />
        )}
      </Panel>
    </>
  );
}
