import type { Metadata } from "next";
import Link from "next/link";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Panel } from "@/components/portal/Panel";
import { EmptyState } from "@/components/portal/EmptyState";
import { MarkAllReadButton } from "@/components/portal/MarkAllReadButton";
import { getPortalContext } from "@/lib/server/portal";
import { formatDateTime } from "@/lib/portal/format";
import { NOTIFICATION_KIND } from "@/lib/portal/labels";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Notificaciones" };

export default async function PortalNotificationsPage() {
  const { session, repo } = await getPortalContext();
  const notifications = await repo.listNotifications(session, { pageSize: 50 });
  const unreadIds = notifications.items.filter((n) => !n.readAt).map((n) => n.id);

  return (
    <>
      <PageHeader
        title="Notificaciones"
        description="Avisos sobre tus tickets, facturas y servicios."
        actions={<MarkAllReadButton ids={unreadIds} />}
      />
      <Panel flush>
        {notifications.items.length === 0 ? (
          <EmptyState icon={Bell} title="No tienes notificaciones" />
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {notifications.items.map((n) => {
              const content = (
                <>
                  <span
                    className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.readAt ? "bg-white/[0.12]" : "bg-primary")}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className={cn("text-sm", n.readAt ? "text-slate-300" : "font-medium text-white")}>
                        {n.title}
                        {!n.readAt && <span className="sr-only"> (sin leer)</span>}
                      </span>
                      <time dateTime={n.createdAt} className="text-xs text-slate-500">
                        {formatDateTime(n.createdAt)}
                      </time>
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">{n.body}</span>
                    <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">
                      {NOTIFICATION_KIND[n.kind]}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={n.id}>
                  {n.href ? (
                    <Link href={n.href} className="flex gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]">
                      {content}
                    </Link>
                  ) : (
                    <div className="flex gap-3 px-5 py-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </>
  );
}
