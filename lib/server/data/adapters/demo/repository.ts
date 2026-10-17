import "server-only";
import type { ContractedServiceStatus, ListQuery, Page, Session, Ticket } from "@/lib/domain";
import type { ClientOverview, ClientPortalRepository } from "@/lib/server/data/contracts";
import { DemoReadOnlyError } from "@/lib/server/data/errors";
import {
  DEMO_CLOUD,
  DEMO_INVOICES,
  DEMO_NOTIFICATIONS,
  DEMO_ORGANIZATIONS,
  DEMO_PAYMENTS,
  DEMO_PRODUCTS,
  DEMO_SERVICES,
  DEMO_SUBSCRIPTIONS,
  DEMO_TICKETS,
} from "./fixtures";

/**
 * Adaptador de demostración (solo `next dev`). Imita lo que debe hacer un
 * adaptador real: limita todo a la organización de la sesión, oculta las notas
 * internas al cliente y pagina. Las escrituras lanzan DemoReadOnlyError: nada se
 * guarda ni se envía a ningún sistema.
 */

const byOrg = <T extends { organizationId: string }>(rows: T[], session: Session) =>
  rows.filter((row) => row.organizationId === session.user.organizationId);

function paginate<T>(rows: T[], query: ListQuery = {}): Page<T> {
  const pageSize = query.pageSize ?? 20;
  const page = Math.max(1, query.page ?? 1);
  return { items: rows.slice((page - 1) * pageSize, page * pageSize), total: rows.length, page, pageSize };
}

const matches = (text: string, search?: string) =>
  !search || text.toLocaleLowerCase("es").includes(search.trim().toLocaleLowerCase("es"));

const newestFirst = <T extends { createdAt: string }>(rows: T[]) =>
  [...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

const OPEN_TICKET = new Set(["ABIERTO", "EN_PROGRESO", "ESPERANDO_CLIENTE"]);

const readOnly = async (): Promise<never> => {
  throw new DemoReadOnlyError();
};

export const demoClientRepository: ClientPortalRepository = {
  async getOverview(session): Promise<ClientOverview> {
    const services = byOrg(DEMO_SERVICES, session);
    const counts = { EN_IMPLEMENTACION: 0, ACTIVO: 0, SUSPENDIDO: 0, FINALIZADO: 0 } as Record<ContractedServiceStatus, number>;
    services.forEach((service) => (counts[service.status] += 1));

    const subscriptions = byOrg(DEMO_SUBSCRIPTIONS, session).filter((sub) => sub.status === "ACTIVA");
    const upcomingRenewals = subscriptions
      .filter((sub) => new Date(sub.currentPeriodEnd).getTime() > Date.now())
      .sort((a, b) => a.currentPeriodEnd.localeCompare(b.currentPeriodEnd))
      .slice(0, 3)
      .map((sub) => ({ id: sub.id, label: sub.plan, date: sub.currentPeriodEnd, href: "/app/suscripciones" }));

    const owed = byOrg(DEMO_INVOICES, session).filter((inv) => inv.status === "PENDIENTE" || inv.status === "VENCIDA");
    return {
      services: counts,
      activeSubscriptions: subscriptions.length,
      upcomingRenewals,
      openTickets: byOrg(DEMO_TICKETS, session).filter((t) => OPEN_TICKET.has(t.status)).length,
      pendingInvoices: {
        count: owed.length,
        overdue: owed.filter((inv) => inv.status === "VENCIDA").length,
        balance: owed.length ? { amount: owed.reduce((sum, inv) => sum + inv.balance.amount, 0), currency: "COP" } : null,
      },
      unreadNotifications: DEMO_NOTIFICATIONS.filter((n) => n.userId === session.user.id && !n.readAt).length,
    };
  },

  async getOrganization(session) {
    return DEMO_ORGANIZATIONS.find((org) => org.id === session.user.organizationId) ?? null;
  },

  async listServices(session, query = {}) {
    const rows = byOrg(DEMO_SERVICES, session).filter(
      (s) => (!query.status || s.status === query.status) && matches(s.name, query.search),
    );
    return paginate(rows, query);
  },
  async getService(session, id) {
    return byOrg(DEMO_SERVICES, session).find((s) => s.id === id) ?? null;
  },
  async listProducts(session, query) {
    return paginate(byOrg(DEMO_PRODUCTS, session), query);
  },
  async listSubscriptions(session, query) {
    return paginate(byOrg(DEMO_SUBSCRIPTIONS, session), query);
  },

  async listCloudResources(session) {
    return byOrg(DEMO_CLOUD, session);
  },
  async getCloudResource(session, id) {
    return byOrg(DEMO_CLOUD, session).find((r) => r.id === id) ?? null;
  },

  async listInvoices(session, query = {}) {
    const rows = byOrg(DEMO_INVOICES, session)
      .filter((inv) => (!query.status || inv.status === query.status) && matches(inv.number, query.search))
      .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
    return paginate(rows, query);
  },
  async getInvoice(session, id) {
    return byOrg(DEMO_INVOICES, session).find((inv) => inv.id === id) ?? null;
  },
  async listPayments(session, query) {
    return paginate(newestFirst(byOrg(DEMO_PAYMENTS, session)), query);
  },

  async listTickets(session, query = {}) {
    const rows = newestFirst(byOrg(DEMO_TICKETS, session))
      .filter(
        (t) =>
          (!query.status || t.status === query.status) &&
          (!query.priority || t.priority === query.priority) &&
          (matches(t.subject, query.search) || matches(t.number, query.search)),
      )
      // El listado no expone los mensajes.
      .map((ticket): Ticket => {
        const { messages, ...summary } = ticket;
        void messages;
        return summary;
      });
    return paginate(rows, query);
  },
  async getTicket(session, id) {
    const ticket = byOrg(DEMO_TICKETS, session).find((t) => t.id === id);
    if (!ticket) return null;
    // Un CLIENTE nunca recibe notas internas.
    return { ...ticket, messages: ticket.messages.filter((m) => !m.internal) };
  },
  createTicket: readOnly,
  replyTicket: readOnly,

  async listDownloads() {
    return [];
  },
  async listNotifications(session, query) {
    return paginate(newestFirst(DEMO_NOTIFICATIONS.filter((n) => n.userId === session.user.id)), query);
  },
  markNotificationsRead: readOnly,
};
