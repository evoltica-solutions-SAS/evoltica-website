# Análisis: sitio público + portal de clientes + administración

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Análisis previo a convertir el sitio de marketing en **sitio público + portal de clientes (`/app`) + administración (`/admin`)**. Es la base de [ADR-012](../decisions/ADR-012-Public-Portal-Admin-Split.md) (estructura y contratos, `Accepted`) y de [ADR-013](../decisions/ADR-013-Backend-Auth-Strategy.md) (backend y autenticación, `Proposed` hasta que el negocio decida).

## Contradicción con la documentación vigente (señalada antes de continuar)

- [ARCHITECTURE.md § Límites deliberados](../../ARCHITECTURE.md#límites-deliberados-del-proyecto) dice "sin base de datos, sin autenticación". [CLAUDE.md](../../../CLAUDE.md) (regla 1) exige confirmación antes de introducirlos.
- [ROADMAP.md](../../ROADMAP.md) ubica Portal Clientes (Fase 10) y Dashboard Administrativo (Fase 14) en el año 2, **con ADR previo obligatorio**.
- El negocio pidió el 2026-10-08 adelantar ambas fases. Resolución: el frontend y los contratos se construyen ya (ADR-012). La base de datos, el proveedor de identidad y las integraciones reales **no se introducen** hasta que ADR-013 pase a `Accepted` con la decisión del negocio. Mientras tanto el portal funciona con un adaptador de **demostración** que nunca se activa en producción.

---

## 1. Arquitectura actual

- Next.js 15.5.27 (App Router) + React 19 + TypeScript strict + Tailwind 3 + Framer Motion. Todo SSG excepto `app/api/contact/route.ts`.
- Un único `app/layout.tsx` monta la estructura completa del sitio: fuentes, script de tema e intro en `<head>`, `BrandIntro`, `PageTransition`, `Navbar`, `Footer`, `WhatsAppButton` y JSON-LD de organización. Cualquier ruta nueva hereda el chrome de marketing, lo que hoy impide una zona privada con otro layout.
- Contenido en `lib/*.ts` tipado (servicios, empresa, FAQ, casos, tecnologías). Sin base de datos, sin sesión, sin `middleware.ts`.
- Home con 10 bloques: Hero, Symptoms, ServicesIndex, Differentiators, EngagementTimeline, TechWall, Commitments, CasesPreview, FaqSection, Finale.
- `/servicios/[slug]` ya tiene: hero, intro, alcance (`items`/`tiers`), herramientas (`platforms`, `automationTools`, `techStack`), servicios relacionados y CTA. Le faltan **proceso** y **beneficios** como bloques propios.

## 2. Arquitectura propuesta

Tres superficies con layouts independientes bajo **un único root layout** (html, body, fuentes, tema). Así se conservan el tema y las fuentes sin duplicar `<html>`, y el chrome de marketing no se filtra al portal:

```
app/
  layout.tsx                    # Raíz mínima: <html>, fuentes, script de tema/intro, MotionProvider
  (public)/layout.tsx           # Chrome de marketing: BrandIntro, PageTransition, Navbar, Footer, WhatsApp, JSON-LD org
  (auth)/layout.tsx             # Pantallas de acceso: marca + formulario, sin navegación de marketing
  (portal)/app/layout.tsx       # Shell del cliente: sidebar, topbar, guardia de rol CLIENTE
  (admin)/admin/layout.tsx      # Shell administrativo: guardia de rol ADMIN, navegación propia
  api/contact/route.ts          # Sin cambios
```

Los grupos `(public)`, `(auth)`, `(portal)` y `(admin)` no cambian ninguna URL pública existente.

**Capas de código:**

```
lib/domain/          # Tipos y enums del dominio (puros, sin I/O). Compartidos cliente/servidor.
lib/server/          # Solo servidor ("server-only"): nunca llega al bundle del navegador.
  auth/              #   Contrato AuthProvider + getSession/requireRole (DAL de autorización)
  data/              #   Contratos de repositorio por dominio + selector de adaptador
    adapters/demo/   #   Datos de demostración etiquetados (solo desarrollo / preview)
    adapters/<real>/ #   Fase 6: Odoo u otro backend, según ADR-013
components/portal/   # UI del portal y del admin (shell, tablas, badges de estado, estados vacíos)
middleware.ts        # Redirección optimista a /login sin cookie de sesión (no es la autorización real)
```

**Principios:**
1. **La autorización real vive en el servidor**, en cada layout y en cada server action (`requireRole`), no solo en `middleware.ts`. El middleware es una comodidad de UX.
2. **La UI solo conoce contratos** (`lib/server/data/contracts.ts`). Cambiar de demostración a backend real es cambiar el adaptador, no las páginas.
3. **Nada simulado se presenta como real.** El adaptador de demostración marca cada pantalla con un aviso visible "Datos de demostración". En producción, sin adaptador real configurado, el portal muestra "Portal en preparación" y el login no acepta credenciales.
4. **El portal y el admin son dinámicos** (leen la sesión) y `noindex`. **El sitio público sigue estático.**
5. **Las facturas y los pagos los decide un sistema contable** (en Colombia, la factura electrónica debe salir de un sistema habilitado ante la DIAN). El portal **muestra** facturas; nunca las genera ni marca un pago como recibido desde el navegador. El estado de un pago solo cambia con el webhook verificado del proveedor.

## 3. Sitemap completo

```
PÚBLICO (indexable)
/                               Introducción
/servicios                      Índice 01–05
/servicios/consultoria-empresarial
/servicios/erp-y-automatizacion
/servicios/infraestructura-y-cloud
/servicios/servicios-administrados
/servicios/desarrollo-e-integraciones
/nosotros
/casos-de-exito                 noindex hasta que haya casos autorizados
/contacto
/privacidad                     PENDIENTE: requiere el texto legal real (Ley 1581) antes de abrir /registro

ACCESO (noindex)
/login · /registro · /recuperar-password · /restablecer-password

PORTAL CLIENTE (privado, noindex)
/app                            Dashboard
/app/servicios · /app/servicios/[id]
/app/productos
/app/suscripciones
/app/cloud · /app/cloud/[id]
/app/facturacion · /app/facturacion/[id]
/app/pagos
/app/tickets · /app/tickets/nuevo · /app/tickets/[id]
/app/descargas
/app/notificaciones
/app/perfil

ADMIN (privado, noindex)
/admin                          Dashboard
/admin/clientes · /admin/clientes/[id]
/admin/usuarios
/admin/servicios
/admin/productos
/admin/pedidos
/admin/suscripciones
/admin/facturacion
/admin/pagos
/admin/tickets · /admin/tickets/[id]
/admin/notificaciones
```

Nota: la página pública de Cloud es `/servicios/infraestructura-y-cloud` (URL ya publicada e indexada), no `/servicios/infraestructura-cloud`. Se conserva para no perder posicionamiento.

## 4. Rutas públicas

| Ruta | Contenido | Cambio |
|---|---|---|
| `/` | Hero → resumen de servicios (01–05) → manifiesto ("Tu operación no necesita más software", `Symptoms`) → diferencial → preview de casos → CTA final | Sale de la home: proceso (`EngagementTimeline`), herramientas (`TechWall`), compromisos (`Commitments`) y FAQ. Cada bloque pasa a la página que le corresponde. |
| `/servicios` | Índice con el patrón 01–05 + metodología + proceso + herramientas | Recibe `TechWall` |
| `/servicios/[slug]` | Hero, descripción, qué incluye, **proceso**, **beneficios**, tecnologías, servicios relacionados, CTA | Se añaden proceso y beneficios. El proceso usa el embudo real (`ENGAGEMENT_STEPS`) y los beneficios usan `valueBullets`. Si un servicio no tiene beneficios definidos, el bloque no se muestra y no se inventa contenido. |
| `/nosotros` | Historia, misión/visión, diferenciadores | Recibe `Commitments` |
| `/casos-de-exito` | Casos autorizados | Sin cambios |
| `/contacto` | Formulario + canales + proceso | Recibe la FAQ (con su JSON-LD `FAQPage`) |

## 5. Rutas del portal

| Ruta | Propósito | Datos |
|---|---|---|
| `/app` | Resumen: servicios y su estado, suscripciones, próximos vencimientos, tickets abiertos, saldo de facturación, notificaciones | Agregado de los repositorios |
| `/app/servicios[/id]` | Servicios contratados: activos, suspendidos y finalizados, con fecha de contratación, vencimiento y detalle | `ContractedService` |
| `/app/productos` | Productos o licencias adquiridos | `Product` (**definición pendiente**) |
| `/app/suscripciones` | Planes recurrentes, ciclo, próxima renovación | `Subscription` |
| `/app/cloud[/id]` | VPS y servidores: estado, recursos, backups e información del servicio. Solo lectura en la primera versión. | `CloudResource` |
| `/app/facturacion[/id]` | Facturas: estado, vencimiento, historial, PDF/XML | `Invoice` |
| `/app/pagos` | Historial de pagos y comprobantes; "pagar" solo cuando exista proveedor | `Payment` |
| `/app/tickets`, `/nuevo`, `/[id]` | Listar, crear, ver, responder, adjuntar archivos, estado, prioridad, servicio relacionado | `Ticket`, `TicketMessage`, `Attachment` |
| `/app/descargas` | Documentos entregados (manuales, actas, instaladores) | `Download` |
| `/app/notificaciones` | Avisos del sistema y de soporte | `Notification` |
| `/app/perfil` | Datos del usuario y de la organización, contraseña, sesión | `User`, `Organization` |

## 6. Rutas administrativas

Dashboard, Clientes, Usuarios, Servicios, Productos, Pedidos, Suscripciones, Facturación, Pagos, Tickets y Notificaciones. Comparten los mismos contratos del dominio pero con alcance global en lugar de "mi organización". El admin **no edita facturas ni pagos** que vengan del sistema contable: los consulta y enlaza al sistema de origen. Sí gestiona tickets (responder, asignar, cambiar estado) y usuarios y clientes del portal.

## 7. Estructura de layouts

| Layout | Chrome | Render | Indexación | Guardia |
|---|---|---|---|---|
| raíz | ninguno | — | — | — |
| `(public)` | intro, cortina, navbar, footer, WhatsApp | estático | index | — |
| `(auth)` | marca + tarjeta | estático | noindex | redirige a `/app` o `/admin` si ya hay sesión |
| `(portal)/app` | sidebar + topbar + aviso de demostración | dinámico | noindex | `requireRole("CLIENTE")` |
| `(admin)/admin` | sidebar admin con otro acento + topbar | dinámico | noindex | `requireRole("ADMIN")` |

El portal usa la misma identidad (tokens, tipografía y tema claro/oscuro) con otra **densidad**: Inter en tamaños de interfaz, la condensada solo en títulos de página, tablas, badges de estado y sin animaciones de capítulo. La intro de marca no se muestra en el portal ni en el admin.

## 8. Componentes reutilizables (nuevos, `components/portal/`)

`PortalShell`, `SideNav`, `TopBar`, `UserMenu`, `DemoBanner`, `PageHeader`, `StatCard`, `StatusBadge` (mapa estado → color de marca), `DataTable` (responsive: tabla en escritorio y tarjetas en móvil), `EmptyState`, `KeyValueList`, `Timeline` (hilo de un ticket), `FileDropzone` (adjuntos con validación de tipo y tamaño), `Money` y `DateText` (formato es-CO, COP), `ConfirmDialog` y `AuthCard`. Se reutilizan de lo público: `Logo`, `ThemeToggle`, `ButtonLink` y `cn()`.

## 9. Modelo de datos

| Entidad | Campos clave | Notas |
|---|---|---|
| `Organization` | id, legalName, taxId (NIT), contacto, ciudad | El cliente es la empresa. Se mapea a `res.partner` (empresa) si el backend es Odoo. |
| `User` | id, organizationId?, name, email, role (`CLIENTE`/`ADMIN`), status, lastLoginAt | Un ADMIN no tiene organización cliente. |
| `ServiceLine` | slug, title | Las 5 líneas de `lib/services-data.ts`, sin inventar nuevas. |
| `ContractedService` | id, organizationId, serviceLine, name, status (`ACTIVO`/`SUSPENDIDO`/`FINALIZADO`/`EN_IMPLEMENTACION`), startedAt, endsAt?, renewsAt?, details | "Servicios contratados" |
| `Product` | id, name, kind (licencia/plan/otro), status | Definición pendiente del negocio |
| `Subscription` | id, organizationId, contractedServiceId?, plan, billingCycle, status, currentPeriodEnd, amount? | Sin precios inventados: el monto viene del backend |
| `Order` | id, organizationId, items, status, createdAt | Admin |
| `Invoice` | id, number, organizationId, issuedAt, dueAt, total, balance, currency (COP), status (`PENDIENTE`/`PAGADA`/`VENCIDA`/`ANULADA`), pdfUrl?, cufe? | Proviene del sistema contable o de facturación electrónica |
| `Payment` | id, invoiceId?, amount, method, provider, providerRef, status (`PENDIENTE`/`APROBADO`/`RECHAZADO`/`REEMBOLSADO`), paidAt, receiptUrl? | El estado solo lo cambia el webhook del proveedor |
| `Ticket` | id, number, organizationId, subject, status (`ABIERTO`/`EN_PROGRESO`/`ESPERANDO_CLIENTE`/`RESUELTO`/`CERRADO`), priority (`BAJA`/`MEDIA`/`ALTA`/`CRITICA`), contractedServiceId?, createdAt, updatedAt, assigneeId? | Los SLA no se muestran hasta que el negocio los apruebe |
| `TicketMessage` | id, ticketId, authorId, authorRole, body, createdAt, attachments[], internal? | Las notas internas solo son visibles en el admin |
| `Attachment` | id, name, size, mimeType, url | Requiere almacenamiento (pendiente) |
| `CloudResource` | id, organizationId, contractedServiceId, kind (`VPS`/`SERVIDOR`/`HOSTING_ERP`), provider, region, status, specs (vCPU, RAM, disco), usage?, ip?, backups[] | Lectura vía la API del proveedor (Proxmox, Hetzner o Contabo) o del monitoreo (Zabbix) |
| `Backup` | id, resourceId, createdAt, size, status | Proxmox Backup Server |
| `Download` | id, organizationId, title, category, fileUrl, publishedAt | |
| `Notification` | id, userId, kind, title, body, href?, readAt? | |
| `AuditLog` | id, actorId, action, target, at | Obligatorio para las acciones del admin |

## 10. Qué queda listo para conectar con un backend

- Tipos del dominio, contratos de repositorio y de autenticación, y selector de adaptador por variable de entorno.
- Todas las páginas del portal y del admin consumen solo los contratos, en server components.
- Server actions con validación de entrada en el servidor (crear ticket, responder ticket, actualizar perfil, cerrar sesión), escritas contra los contratos.
- Guardias de rol (`requireRole`), `middleware.ts`, `noindex`, `robots.txt` y exclusión del sitemap.
- Estados vacíos, de carga y de error en cada vista, para que el backend real pueda devolver listas vacías sin romper la UI.

## 11. Qué requiere un backend real (no se finge)

- Identidad y sesiones reales: registro, verificación de correo, recuperación de contraseña con token enviado por correo y hash de contraseñas.
- Persistencia de usuarios, tickets, mensajes y notificaciones.
- Almacenamiento de adjuntos y descargas.
- Facturas, suscripciones y servicios contratados desde el sistema de origen.
- Pasarela de pagos (checkout y webhook firmado).
- Estado y recursos de Cloud desde la API del proveedor o del monitoreo.
- Envío de correos transaccionales.

## 12. Información que falta de Evoltica

1. **Sistema de registro (decisión clave, ADR-013):** ¿Evoltica opera su propia instancia de Odoo? ¿Qué versión y qué edición (Community o Enterprise)? ¿Tiene instalados Helpdesk, Suscripciones, Facturación electrónica DIAN y Portal?
2. **Registro de clientes:** ¿es autoservicio abierto, solo por invitación (Evoltica crea la cuenta) o autoservicio con aprobación?
3. **Productos y pedidos:** qué es un "producto" frente a un "servicio" para Evoltica (¿licencias Odoo, planes de hosting, horas de soporte?) y si existe un catálogo con precios aprobados.
4. **SLA y prioridades de tickets:** tiempos por prioridad y por nivel (1–3), y si se pueden mostrar al cliente.
5. **Pasarela de pagos:** proveedor (Wompi, PayU, ePayco, Mercado Pago u otro), cuenta comercial y medios de pago.
6. **Cloud:** proveedores en uso real (Proxmox propio, Hetzner, Contabo), si existe Zabbix o Grafana accesible por API y qué puede ver o hacer el cliente (¿solo lectura? ¿reinicios?).
7. **Legal:** política de tratamiento de datos (Ley 1581 de 2012), términos del portal y aviso de privacidad. Son obligatorios antes de abrir `/registro`.
8. **Correo transaccional:** dominio y proveedor (para recuperación de contraseña y notificaciones).
9. **Almacenamiento de archivos:** dónde viven los adjuntos (backend, S3 compatible u otro) y los límites de tamaño.
10. **Usuarios del admin:** quién administra y si se necesitan sub-roles (soporte, facturación). Por ahora solo hay `ADMIN`.

## Plan por fases

| Fase | Alcance | Criterio de terminado |
|---|---|---|
| 1 | Grupos de rutas y layouts; home reducida a introducción; bloques redistribuidos; proceso y beneficios por servicio; dominio y contratos en `lib/`; robots y noindex | Mismas URLs públicas, build estático, lint/tsc/build en verde, QA visual |
| 2 | `(auth)` + `(portal)/app`: shell, dashboard, servicios, productos, suscripciones, cloud, descargas, notificaciones, perfil; adaptador de demostración; guardias | Navegable en desarrollo con aviso de demostración; en producción sin backend → "Portal en preparación" |
| 3 | Tickets: lista con filtros, nuevo, detalle con hilo, respuesta y adjuntos (validados) | Flujo completo contra el contrato; validación en el servidor |
| 4 | Facturación y pagos: lista, detalle, comprobantes; interfaz `PaymentProvider` + ruta de webhook preparada (sin activar) | Ninguna pantalla afirma que el pago funciona; el botón "Pagar" permanece desactivado sin proveedor |
| 5 | `(admin)/admin` con todas sus secciones | Separado de `/app`; guardia ADMIN; registro de auditoría en el contrato |
| 6 | Adaptador real según ADR-013, autenticación real y webhooks | ADR-013 `Accepted`; un cliente piloto con datos reales |
