import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { TicketForm } from "@/components/portal/TicketForm";
import { getPortalContext } from "@/lib/server/portal";
import { pickText, type SearchParams } from "@/lib/portal/params";

export const metadata: Metadata = { title: "Nuevo ticket" };

export default async function PortalNewTicketPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { session, repo } = await getPortalContext();
  const services = await repo.listServices(session, { pageSize: 100 });
  const selectable = services.items.filter((s) => s.status !== "FINALIZADO");
  const requested = pickText(params.servicio, 64);
  // Solo se preselecciona si el servicio es de la organización.
  const defaultServiceId = selectable.some((s) => s.id === requested) ? requested : undefined;

  return (
    <>
      <PageHeader
        title="Nuevo ticket"
        back={{ href: "/app/tickets", label: "Tickets" }}
        description="Cuéntanos qué pasa. Mientras más contexto, más rápido lo resolvemos."
      />
      <Panel className="max-w-3xl">
        <TicketForm services={selectable.map((s) => ({ id: s.id, name: s.name }))} defaultServiceId={defaultServiceId} />
      </Panel>
    </>
  );
}
