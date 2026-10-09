import type {
  AuditEntry,
  CloudResource,
  ContractedService,
  ContractedServiceStatus,
  Download,
  Id,
  Invoice,
  InvoiceStatus,
  ListQuery,
  Money,
  Notification,
  Order,
  Organization,
  Page,
  Payment,
  Product,
  Session,
  Subscription,
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketWithMessages,
  User,
} from "@/lib/domain";

/**
 * Contratos entre la UI (portal y admin) y el backend (ADR-012).
 *
 * Las páginas solo conocen estas interfaces. Cada adaptador (demostración en
 * desarrollo; Odoo u otro en la Fase 6, ver ADR-013) las implementa. Toda
 * operación recibe la sesión: el adaptador limita los datos a la organización
 * del usuario CLIENTE y exige ADMIN en las operaciones globales. La UI nunca
 * filtra por organización por su cuenta.
 */

/**
 * Adjuntos: el archivo NO viaja por la server action (límite de 1 MB y superficie
 * de abuso). Flujo previsto: el servidor valida los metadatos y entrega una URL
 * de subida firmada al almacenamiento (pendiente de ADR-013); el ticket solo
 * recibe los ids resultantes.
 */
export interface AttachmentMeta {
  name: string;
  mimeType: string;
  size: number;
}

export interface AttachmentStorage {
  createUpload(session: Session, file: AttachmentMeta): Promise<{ attachmentId: Id; uploadUrl: string; expiresAt: string }>;
}

export interface CreateTicketInput {
  subject: string;
  body: string;
  priority: TicketPriority;
  contractedServiceId?: Id;
  attachmentIds: Id[];
}

export interface ReplyTicketInput {
  ticketId: Id;
  body: string;
  attachmentIds: Id[];
  /** Solo ADMIN: nota interna invisible para el cliente. */
  internal?: boolean;
}

export interface TicketQuery extends ListQuery {
  status?: TicketStatus;
  priority?: TicketPriority;
}

/** Resumen del dashboard del cliente, calculado por el backend. */
export interface ClientOverview {
  services: Record<ContractedServiceStatus, number>;
  activeSubscriptions: number;
  upcomingRenewals: { id: Id; label: string; date: string; href: string }[];
  openTickets: number;
  /** Facturas con saldo (pendientes y vencidas) y su saldo total. */
  pendingInvoices: { count: number; overdue: number; balance: Money | null };
  unreadNotifications: number;
}

export interface ClientPortalRepository {
  getOverview(session: Session): Promise<ClientOverview>;
  getOrganization(session: Session): Promise<Organization | null>;

  listServices(session: Session, query?: ListQuery & { status?: ContractedServiceStatus }): Promise<Page<ContractedService>>;
  getService(session: Session, id: Id): Promise<ContractedService | null>;
  listProducts(session: Session, query?: ListQuery): Promise<Page<Product>>;
  listSubscriptions(session: Session, query?: ListQuery): Promise<Page<Subscription>>;

  listCloudResources(session: Session): Promise<CloudResource[]>;
  getCloudResource(session: Session, id: Id): Promise<CloudResource | null>;

  listInvoices(session: Session, query?: ListQuery & { status?: InvoiceStatus }): Promise<Page<Invoice>>;
  getInvoice(session: Session, id: Id): Promise<Invoice | null>;
  listPayments(session: Session, query?: ListQuery): Promise<Page<Payment>>;

  listTickets(session: Session, query?: TicketQuery): Promise<Page<Ticket>>;
  getTicket(session: Session, id: Id): Promise<TicketWithMessages | null>;
  createTicket(session: Session, input: CreateTicketInput): Promise<Ticket>;
  replyTicket(session: Session, input: ReplyTicketInput): Promise<void>;

  listDownloads(session: Session): Promise<Download[]>;
  listNotifications(session: Session, query?: ListQuery): Promise<Page<Notification>>;
  markNotificationsRead(session: Session, ids: Id[]): Promise<void>;
}

export interface AdminOverview {
  clients: number;
  activeServices: number;
  openTickets: Record<TicketPriority, number>;
  overdueInvoices: number;
}

/** Operaciones globales. El adaptador rechaza cualquier sesión que no sea ADMIN. */
export interface AdminRepository {
  getOverview(session: Session): Promise<AdminOverview>;
  listOrganizations(session: Session, query?: ListQuery): Promise<Page<Organization>>;
  getOrganization(session: Session, id: Id): Promise<Organization | null>;
  listUsers(session: Session, query?: ListQuery): Promise<Page<User>>;
  listServices(session: Session, query?: ListQuery): Promise<Page<ContractedService>>;
  listProducts(session: Session, query?: ListQuery): Promise<Page<Product>>;
  listOrders(session: Session, query?: ListQuery): Promise<Page<Order>>;
  listSubscriptions(session: Session, query?: ListQuery): Promise<Page<Subscription>>;
  listInvoices(session: Session, query?: ListQuery): Promise<Page<Invoice>>;
  listPayments(session: Session, query?: ListQuery): Promise<Page<Payment>>;
  listTickets(session: Session, query?: TicketQuery): Promise<Page<Ticket>>;
  getTicket(session: Session, id: Id): Promise<TicketWithMessages | null>;
  replyTicket(session: Session, input: ReplyTicketInput): Promise<void>;
  updateTicket(session: Session, id: Id, patch: { status?: TicketStatus; priority?: TicketPriority; assigneeId?: Id }): Promise<void>;
  listNotifications(session: Session, query?: ListQuery): Promise<Page<Notification>>;
  listAudit(session: Session, query?: ListQuery): Promise<Page<AuditEntry>>;
}

/**
 * Operaciones sobre infraestructura (FUTURO, sin implementación ni UI).
 * Ningún adaptador las implementa hasta que el negocio defina proveedores y
 * acciones permitidas (ADR-013). Reglas para quien las implemente:
 * - El adaptador verifica que el recurso pertenece a la organización de la sesión.
 * - Cada acción exige el permiso explícito de ese cliente sobre ese recurso.
 * - Toda solicitud queda en el registro de auditoría con su motivo.
 * - Las acciones destructivas requieren confirmación y nunca se reintentan solas.
 */
export type CloudAction = "ENCENDER" | "APAGAR" | "REINICIAR" | "RESTAURAR_BACKUP";

export interface CloudPermission {
  resourceId: Id;
  allowedActions: CloudAction[];
}

export interface CloudOperations {
  getPermissions(session: Session, resourceId: Id): Promise<CloudPermission>;
  requestAction(session: Session, input: { resourceId: Id; action: CloudAction; reason: string; backupId?: Id }): Promise<{ requestId: Id }>;
}

/**
 * Pasarela de pagos (FUTURO, Fase 4/6). El proveedor se decide en ADR-013.
 * - `createCheckout` solo inicia el pago; NUNCA marca la factura como pagada.
 * - El estado lo fija exclusivamente `handleWebhook` tras verificar la firma
 *   del proveedor; la redirección de vuelta del navegador no prueba nada.
 */
export interface PaymentGateway {
  createCheckout(session: Session, invoiceId: Id): Promise<{ redirectUrl: string; reference: string }>;
  handleWebhook(rawBody: string, headers: Headers): Promise<{ reference: string; status: Payment["status"] } | null>;
}

/** Qué adaptador atiende las peticiones. "none" = backend no configurado. */
export type BackendAdapter = "none" | "demo";
