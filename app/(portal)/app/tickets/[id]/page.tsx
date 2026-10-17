import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Paperclip } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { KeyValueList } from "@/components/portal/KeyValueList";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { TicketReplyForm } from "@/components/portal/TicketReplyForm";
import { getPortalContext } from "@/lib/server/portal";
import { formatBytes, formatDate, formatDateTime } from "@/lib/portal/format";
import { TICKET_PRIORITY, TICKET_STATUS } from "@/lib/portal/labels";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Detalle del ticket" };

export default async function PortalTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, repo } = await getPortalContext();
  const ticket = await repo.getTicket(session, id);
  if (!ticket) notFound();
  const service = ticket.contractedServiceId ? await repo.getService(session, ticket.contractedServiceId) : null;

  return (
    <>
      <PageHeader
        title={ticket.subject}
        back={{ href: "/app/tickets", label: "Tickets" }}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slate-500">{ticket.number}</span>
            <StatusBadge status={TICKET_STATUS[ticket.status]} />
          </span>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Panel title="Conversación">
            <ol className="space-y-5" aria-label="Mensajes del ticket">
              {ticket.messages.map((message) => {
                const mine = message.authorRole === "CLIENTE";
                return (
                  <li key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                    <article
                      className={cn(
                        "max-w-[min(36rem,100%)] rounded-md border px-4 py-3",
                        mine ? "border-white/[0.1] bg-white/[0.04]" : "border-secondary/30 bg-secondary/[0.06]",
                      )}
                    >
                      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="text-sm font-medium text-white">{mine ? "Tú" : message.authorName}</span>
                        <time dateTime={message.createdAt} className="text-xs text-slate-500">
                          {formatDateTime(message.createdAt)}
                        </time>
                      </header>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-200">{message.body}</p>
                      {message.attachments.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {message.attachments.map((file) => (
                            <li key={file.id} className="flex items-center gap-2 text-xs text-slate-400">
                              <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
                              {file.name} · {formatBytes(file.size)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </Panel>

          <Panel title="Responder">
            {ticket.status === "CERRADO" ? (
              <p className="text-sm text-slate-400">
                Este ticket está cerrado.{" "}
                <Link href="/app/tickets/nuevo" className="text-white underline underline-offset-4">
                  Crea uno nuevo
                </Link>{" "}
                si necesitas ayuda.
              </p>
            ) : (
              <TicketReplyForm ticketId={ticket.id} />
            )}
          </Panel>
        </div>

        <Panel title="Detalles" className="h-fit">
          <KeyValueList
            items={[
              { label: "Estado", value: <StatusBadge status={TICKET_STATUS[ticket.status]} /> },
              { label: "Prioridad", value: <StatusBadge status={TICKET_PRIORITY[ticket.priority]} /> },
              {
                label: "Servicio",
                value: service ? (
                  <Link href={`/app/servicios/${service.id}`} className="underline-offset-4 hover:underline">
                    {service.name}
                  </Link>
                ) : (
                  "—"
                ),
              },
              { label: "Creado", value: formatDate(ticket.createdAt) },
              { label: "Última actualización", value: formatDateTime(ticket.updatedAt) },
            ]}
            className="sm:[&>div]:grid-cols-1"
          />
        </Panel>
      </div>
    </>
  );
}
