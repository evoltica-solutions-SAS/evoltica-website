import type { Metadata } from "next";
import { Package } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { DataTable } from "@/components/portal/DataTable";
import { EmptyState } from "@/components/portal/EmptyState";
import { IntegrationNote } from "@/components/portal/IntegrationNote";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { getPortalContext } from "@/lib/server/portal";
import { formatDate } from "@/lib/portal/format";
import { PRODUCT_KIND, PRODUCT_STATUS } from "@/lib/portal/labels";

export const metadata: Metadata = { title: "Productos" };

export default async function PortalProductsPage() {
  const { session, repo } = await getPortalContext();
  const products = await repo.listProducts(session);

  return (
    <>
      <PageHeader title="Productos" description="Licencias, planes y otros productos asociados a tu organización." />
      <IntegrationNote className="mb-6">
        Evoltica aún está definiendo qué se considera un producto y cuál es su catálogo. Esta vista mostrará lo que
        defina el sistema de origen cuando se conecte.
      </IntegrationNote>
      <Panel flush>
        {products.items.length === 0 ? (
          <EmptyState icon={Package} title="No tienes productos registrados" />
        ) : (
          <DataTable
            caption="Productos"
            rows={products.items}
            total={products.total}
            rowKey={(p) => p.id}
            columns={[
              { header: "Producto", cell: (p) => p.name },
              { header: "Tipo", cell: (p) => PRODUCT_KIND[p.kind] },
              { header: "Cantidad", cell: (p) => p.quantity ?? "—", align: "end" },
              { header: "Estado", cell: (p) => <StatusBadge status={PRODUCT_STATUS[p.status]} /> },
              { header: "Vence", cell: (p) => (p.expiresAt ? formatDate(p.expiresAt) : "—"), align: "end" },
            ]}
          />
        )}
      </Panel>
    </>
  );
}
