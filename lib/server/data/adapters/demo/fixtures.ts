import "server-only";
import type {
  CloudResource,
  ContractedService,
  Invoice,
  Money,
  Notification,
  Organization,
  Payment,
  Product,
  Session,
  Subscription,
  TicketWithMessages,
} from "@/lib/domain";

/**
 * DATOS FICTICIOS DEL ENTORNO DE DEMOSTRACIÓN (solo `next dev`, ADR-012).
 *
 * - Ninguna empresa, persona, factura, pago, servidor o ticket de aquí es real.
 * - Los nombres llevan "(demo)" y los números el prefijo DEMO-.
 * - Los montos son cifras de relleno evidentes (123.456…): NO son precios de
 *   Evoltica. El sitio no publica precios (BUSINESS_CONTEXT).
 * - Correos con dominio reservado `.invalid` e IPs del rango de documentación
 *   RFC 5737 (203.0.113.0/24): no apuntan a nadie.
 *
 * Las fechas son relativas a hoy para que la demostración no envejezca.
 */

const DAY = 24 * 60 * 60 * 1000;
const at = (days: number, hours = 10) => {
  const d = new Date(Date.now() + days * DAY);
  d.setUTCHours(hours + 5, 0, 0, 0); // hora de Bogotá aproximada
  return d.toISOString();
};
const cop = (amount: number): Money => ({ amount, currency: "COP" });

export const DEMO_ORG_ID = "demo-org-1";
/** Segunda organización ficticia: sirve para comprobar que un cliente nunca ve datos de otro. */
export const OTHER_ORG_ID = "demo-org-2";

export const DEMO_ORGANIZATIONS: Organization[] = [
  {
    id: DEMO_ORG_ID,
    legalName: "Empresa de Demostración S.A.S. (demo)",
    taxId: "000.000.000-0",
    email: "contacto@empresa-demo.invalid",
    phone: "+57 000 000 0000",
    city: "Ciudad de ejemplo",
    createdAt: at(-420),
  },
  {
    id: OTHER_ORG_ID,
    legalName: "Otra Empresa Ficticia S.A.S. (demo)",
    createdAt: at(-200),
    city: "Ciudad de ejemplo",
  },
];

export const DEMO_SESSION: Session = {
  user: {
    id: "demo-user-1",
    name: "Usuario de demostración",
    email: "usuario@empresa-demo.invalid",
    role: "CLIENTE",
    organizationId: DEMO_ORG_ID,
  },
  expiresAt: at(1),
};

export const DEMO_SERVICES: ContractedService[] = [
  {
    id: "srv-101",
    organizationId: DEMO_ORG_ID,
    serviceLine: "erp-y-automatizacion",
    name: "Implementación ERP (demo)",
    status: "ACTIVO",
    startedAt: at(-300),
    details: [
      { label: "Plataforma", value: "Odoo (ejemplo)" },
      { label: "Módulos", value: "Inventario, Ventas, Compras" },
      { label: "Usuarios", value: "5" },
    ],
  },
  {
    id: "srv-102",
    organizationId: DEMO_ORG_ID,
    serviceLine: "infraestructura-y-cloud",
    name: "Hosting ERP administrado (demo)",
    status: "ACTIVO",
    startedAt: at(-280),
    renewsAt: at(12),
    details: [
      { label: "Recursos", value: "1 VPS + backups diarios" },
      { label: "Monitoreo", value: "Incluido (ejemplo)" },
    ],
  },
  {
    id: "srv-103",
    organizationId: DEMO_ORG_ID,
    serviceLine: "servicios-administrados",
    name: "Mesa de ayuda (demo)",
    status: "ACTIVO",
    startedAt: at(-250),
    renewsAt: at(26),
    details: [
      { label: "Canales", value: "Portal, correo, WhatsApp" },
      { label: "Niveles", value: "1 y 2 (ejemplo)" },
    ],
  },
  {
    id: "srv-104",
    organizationId: DEMO_ORG_ID,
    serviceLine: "consultoria-empresarial",
    name: "Diagnóstico empresarial (demo)",
    status: "FINALIZADO",
    startedAt: at(-430),
    endsAt: at(-400),
    details: [{ label: "Entregable", value: "Informe de diagnóstico (ejemplo)" }],
  },
  {
    id: "srv-105",
    organizationId: DEMO_ORG_ID,
    serviceLine: "desarrollo-e-integraciones",
    name: "Integración con tienda en línea (demo)",
    status: "SUSPENDIDO",
    startedAt: at(-90),
    details: [{ label: "Motivo", value: "Pausado a solicitud del cliente (ejemplo)" }],
  },
  {
    id: "srv-201",
    organizationId: OTHER_ORG_ID,
    serviceLine: "erp-y-automatizacion",
    name: "Servicio de otra organización (demo)",
    status: "ACTIVO",
    startedAt: at(-60),
    details: [],
  },
];

export const DEMO_PRODUCTS: Product[] = [
  { id: "prd-1", organizationId: DEMO_ORG_ID, name: "Licencias de usuario ERP (demo)", kind: "LICENCIA", status: "ACTIVO", quantity: 5, expiresAt: at(140) },
  { id: "prd-2", organizationId: DEMO_ORG_ID, name: "Certificado de seguridad del dominio (demo)", kind: "OTRO", status: "ACTIVO", quantity: 1, expiresAt: at(45) },
  { id: "prd-3", organizationId: DEMO_ORG_ID, name: "Paquete de horas de desarrollo (demo)", kind: "PLAN", status: "VENCIDO", expiresAt: at(-20) },
];

export const DEMO_SUBSCRIPTIONS: Subscription[] = [
  { id: "sub-1", organizationId: DEMO_ORG_ID, contractedServiceId: "srv-102", plan: "Hosting ERP (demo)", billingCycle: "MENSUAL", status: "ACTIVA", currentPeriodEnd: at(12), amount: cop(123456) },
  { id: "sub-2", organizationId: DEMO_ORG_ID, contractedServiceId: "srv-103", plan: "Mesa de ayuda (demo)", billingCycle: "MENSUAL", status: "ACTIVA", currentPeriodEnd: at(26), amount: cop(234567) },
  { id: "sub-3", organizationId: DEMO_ORG_ID, plan: "Licencias ERP (demo)", billingCycle: "ANUAL", status: "ACTIVA", currentPeriodEnd: at(140), amount: cop(345678) },
  { id: "sub-4", organizationId: DEMO_ORG_ID, contractedServiceId: "srv-105", plan: "Soporte de integración (demo)", billingCycle: "MENSUAL", status: "PAUSADA", currentPeriodEnd: at(-15) },
];

const line = (description: string, amount: number) => ({ description, quantity: 1, total: cop(amount) });

export const DEMO_INVOICES: Invoice[] = [
  { id: "inv-1", number: "DEMO-0001", organizationId: DEMO_ORG_ID, issuedAt: at(-75), dueAt: at(-60), total: cop(358023), balance: cop(0), status: "PAGADA", lines: [line("Hosting ERP (demo)", 123456), line("Mesa de ayuda (demo)", 234567)] },
  { id: "inv-2", number: "DEMO-0002", organizationId: DEMO_ORG_ID, issuedAt: at(-45), dueAt: at(-30), total: cop(358023), balance: cop(0), status: "PAGADA", lines: [line("Hosting ERP (demo)", 123456), line("Mesa de ayuda (demo)", 234567)] },
  { id: "inv-3", number: "DEMO-0003", organizationId: DEMO_ORG_ID, issuedAt: at(-20), dueAt: at(-5), total: cop(123456), balance: cop(123456), status: "VENCIDA", lines: [line("Hosting ERP (demo)", 123456)] },
  { id: "inv-4", number: "DEMO-0004", organizationId: DEMO_ORG_ID, issuedAt: at(-6), dueAt: at(9), total: cop(234567), balance: cop(234567), status: "PENDIENTE", lines: [line("Mesa de ayuda (demo)", 234567)] },
  { id: "inv-5", number: "DEMO-0005", organizationId: DEMO_ORG_ID, issuedAt: at(-100), dueAt: at(-85), total: cop(111111), balance: cop(0), status: "ANULADA", lines: [line("Ajuste de ejemplo (demo)", 111111)] },
  { id: "inv-9", number: "DEMO-9001", organizationId: OTHER_ORG_ID, issuedAt: at(-10), dueAt: at(5), total: cop(999999), balance: cop(999999), status: "PENDIENTE", lines: [line("Otra organización (demo)", 999999)] },
];

export const DEMO_PAYMENTS: Payment[] = [
  { id: "pay-1", organizationId: DEMO_ORG_ID, invoiceId: "inv-1", amount: cop(358023), method: "Transferencia (demo)", provider: "Proveedor de ejemplo", providerReference: "DEMO-REF-0001", status: "APROBADO", createdAt: at(-62), paidAt: at(-62) },
  { id: "pay-2", organizationId: DEMO_ORG_ID, invoiceId: "inv-2", amount: cop(358023), method: "Tarjeta (demo)", provider: "Proveedor de ejemplo", providerReference: "DEMO-REF-0002", status: "RECHAZADO", createdAt: at(-33) },
  { id: "pay-3", organizationId: DEMO_ORG_ID, invoiceId: "inv-2", amount: cop(358023), method: "Transferencia (demo)", provider: "Proveedor de ejemplo", providerReference: "DEMO-REF-0003", status: "APROBADO", createdAt: at(-31), paidAt: at(-31) },
  { id: "pay-4", organizationId: DEMO_ORG_ID, invoiceId: "inv-3", amount: cop(123456), method: "PSE (demo)", provider: "Proveedor de ejemplo", providerReference: "DEMO-REF-0004", status: "PENDIENTE", createdAt: at(-1) },
];

export const DEMO_CLOUD: CloudResource[] = [
  {
    id: "vps-1",
    organizationId: DEMO_ORG_ID,
    contractedServiceId: "srv-102",
    name: "erp-demo-01",
    kind: "HOSTING_ERP",
    provider: "Proveedor de demostración",
    region: "Región de ejemplo",
    status: "EN_LINEA",
    specs: { vcpu: 4, ramGb: 8, diskGb: 160, os: "Debian 12" },
    usage: { cpu: 23, ram: 61, disk: 48, sampledAt: at(0, 9) },
    ipAddress: "203.0.113.10",
    backups: [
      { id: "bk-1", createdAt: at(0, 2), sizeBytes: 12_400_000_000, status: "COMPLETO" },
      { id: "bk-2", createdAt: at(-1, 2), sizeBytes: 12_300_000_000, status: "COMPLETO" },
      { id: "bk-3", createdAt: at(-2, 2), status: "FALLIDO" },
    ],
  },
  {
    id: "vps-2",
    organizationId: DEMO_ORG_ID,
    contractedServiceId: "srv-102",
    name: "pruebas-demo-02",
    kind: "VPS",
    provider: "Proveedor de demostración",
    region: "Región de ejemplo",
    status: "MANTENIMIENTO",
    specs: { vcpu: 2, ramGb: 4, diskGb: 80, os: "Ubuntu 24.04" },
    ipAddress: "203.0.113.11",
    backups: [{ id: "bk-4", createdAt: at(-3, 2), sizeBytes: 3_100_000_000, status: "COMPLETO" }],
  },
  {
    id: "vps-9",
    organizationId: OTHER_ORG_ID,
    name: "otra-org-demo",
    kind: "VPS",
    status: "EN_LINEA",
    specs: {},
    backups: [],
  },
];

const staff = { authorId: "demo-staff-1", authorName: "Equipo de soporte (demo)", authorRole: "ADMIN" as const };
const client = { authorId: DEMO_SESSION.user.id, authorName: DEMO_SESSION.user.name, authorRole: "CLIENTE" as const };

export const DEMO_TICKETS: TicketWithMessages[] = [
  {
    id: "tk-1",
    number: "DEMO-T-1042",
    organizationId: DEMO_ORG_ID,
    subject: "No cuadra el inventario de una bodega (demo)",
    status: "EN_PROGRESO",
    priority: "ALTA",
    contractedServiceId: "srv-101",
    createdById: DEMO_SESSION.user.id,
    createdAt: at(-2, 9),
    updatedAt: at(-1, 15),
    messages: [
      { id: "m-1", ticketId: "tk-1", ...client, body: "El informe de existencias muestra cantidades distintas a las del conteo físico de la bodega norte. (Mensaje de ejemplo.)", createdAt: at(-2, 9), attachments: [], internal: false },
      { id: "m-2", ticketId: "tk-1", ...staff, body: "Recibido. Estamos revisando los movimientos de la última semana. (Mensaje de ejemplo.)", createdAt: at(-2, 11), attachments: [], internal: false },
      { id: "m-3", ticketId: "tk-1", ...staff, body: "Nota interna de ejemplo: nunca debe mostrarse al cliente.", createdAt: at(-2, 12), attachments: [], internal: true },
      { id: "m-4", ticketId: "tk-1", ...staff, body: "Encontramos un ajuste duplicado. Lo corregimos y te confirmamos. (Mensaje de ejemplo.)", createdAt: at(-1, 15), attachments: [], internal: false },
    ],
  },
  {
    id: "tk-2",
    number: "DEMO-T-1039",
    organizationId: DEMO_ORG_ID,
    subject: "Crear usuario para nueva persona de ventas (demo)",
    status: "ESPERANDO_CLIENTE",
    priority: "MEDIA",
    contractedServiceId: "srv-103",
    createdById: DEMO_SESSION.user.id,
    createdAt: at(-5, 10),
    updatedAt: at(-4, 16),
    messages: [
      { id: "m-5", ticketId: "tk-2", ...client, body: "Necesitamos un usuario con permisos de ventas. (Mensaje de ejemplo.)", createdAt: at(-5, 10), attachments: [], internal: false },
      { id: "m-6", ticketId: "tk-2", ...staff, body: "¿Nos confirmas el nombre y el correo de la persona? (Mensaje de ejemplo.)", createdAt: at(-4, 16), attachments: [], internal: false },
    ],
  },
  {
    id: "tk-3",
    number: "DEMO-T-1031",
    organizationId: DEMO_ORG_ID,
    subject: "El servidor responde lento en las mañanas (demo)",
    status: "ABIERTO",
    priority: "CRITICA",
    contractedServiceId: "srv-102",
    createdById: DEMO_SESSION.user.id,
    createdAt: at(0, 8),
    updatedAt: at(0, 8),
    messages: [
      { id: "m-7", ticketId: "tk-3", ...client, body: "Entre las 8 y las 9 el ERP tarda mucho en cargar. (Mensaje de ejemplo.)", createdAt: at(0, 8), attachments: [], internal: false },
    ],
  },
  {
    id: "tk-4",
    number: "DEMO-T-1012",
    organizationId: DEMO_ORG_ID,
    subject: "Capacitación en el módulo de compras (demo)",
    status: "RESUELTO",
    priority: "BAJA",
    contractedServiceId: "srv-101",
    createdById: DEMO_SESSION.user.id,
    createdAt: at(-30, 10),
    updatedAt: at(-27, 10),
    messages: [
      { id: "m-8", ticketId: "tk-4", ...client, body: "¿Podemos agendar una sesión para el equipo de compras? (Mensaje de ejemplo.)", createdAt: at(-30, 10), attachments: [], internal: false },
      { id: "m-9", ticketId: "tk-4", ...staff, body: "Sesión realizada. Cerramos el ticket. (Mensaje de ejemplo.)", createdAt: at(-27, 10), attachments: [], internal: false },
    ],
  },
  {
    id: "tk-5",
    number: "DEMO-T-0998",
    organizationId: DEMO_ORG_ID,
    subject: "Cambio de correo de facturación (demo)",
    status: "CERRADO",
    priority: "BAJA",
    createdById: DEMO_SESSION.user.id,
    createdAt: at(-60, 10),
    updatedAt: at(-58, 10),
    messages: [
      { id: "m-10", ticketId: "tk-5", ...client, body: "Por favor envíen las facturas a otro correo. (Mensaje de ejemplo.)", createdAt: at(-60, 10), attachments: [], internal: false },
    ],
  },
  {
    id: "tk-9",
    number: "DEMO-T-9001",
    organizationId: OTHER_ORG_ID,
    subject: "Ticket de otra organización (demo)",
    status: "ABIERTO",
    priority: "ALTA",
    createdById: "demo-user-9",
    createdAt: at(-1),
    updatedAt: at(-1),
    messages: [],
  },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n-1", userId: DEMO_SESSION.user.id, kind: "TICKET", title: "Nueva respuesta en DEMO-T-1042", body: "El equipo de soporte respondió tu ticket. (Ejemplo.)", href: "/app/tickets/tk-1", createdAt: at(-1, 15) },
  { id: "n-2", userId: DEMO_SESSION.user.id, kind: "FACTURA", title: "Factura DEMO-0003 vencida", body: "La factura de ejemplo superó su fecha de vencimiento.", href: "/app/facturacion/inv-3", createdAt: at(-4, 8) },
  { id: "n-3", userId: DEMO_SESSION.user.id, kind: "SERVICIO", title: "Renovación próxima", body: "Hosting ERP administrado (demo) se renueva pronto.", href: "/app/servicios/srv-102", createdAt: at(-6, 9) },
  { id: "n-4", userId: DEMO_SESSION.user.id, kind: "TICKET", title: "Ticket DEMO-T-1012 resuelto", body: "Marcamos el ticket de ejemplo como resuelto.", href: "/app/tickets/tk-4", createdAt: at(-27, 10), readAt: at(-26, 9) },
  { id: "n-5", userId: DEMO_SESSION.user.id, kind: "SISTEMA", title: "Bienvenido al entorno de demostración", body: "Los datos de este portal son ficticios.", createdAt: at(-30, 9), readAt: at(-30, 10) },
];
