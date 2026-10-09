# Propuesta: plataforma comercial B2B (marketplace, cotizaciones, portal y administración)

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Arquitectura actualizada tras la nueva dirección del negocio (2026-10-08): **Evoltica tiene una plataforma propia, independiente de Odoo**, que combina sitio corporativo, catálogo de soluciones, diagnóstico y consultoría, cotizaciones y pedidos, portal de clientes, soporte, comunicaciones y administración. Este documento **reemplaza la recomendación** de [la evaluación anterior](2026-10-08-evaluacion-backend-y-plan-integracion.md) (Odoo como fuente de verdad). Odoo pasa a ser una **integración opcional**.

**Aprobación (2026-10-08):** dirección, embudo, `/soluciones`, política de precios, Desarrollo e Integraciones a la medida y registro por invitación/aprobación → [ADR-014](../decisions/ADR-014-Commercial-Platform.md). Persistencia e identidad: solo principios → [ADR-015](../decisions/ADR-015-Persistence-Identity.md); proveedores pendientes. **Implementado:** Fase 3 (catálogo). Fases 4+ pendientes.

---

## 0. Contradicciones con la documentación vigente (se señalan antes de continuar)

| Documento | Regla vigente | Conflicto con la nueva dirección | Propuesta |
|---|---|---|---|
| [BUSINESS_CONTEXT.md § Embudo](../../BUSINESS_CONTEXT.md#embudo-de-conversión) | "Ninguna sección debe proponer un camino de conversión alterno" a la reunión de descubrimiento | La compra directa y la cotización online son caminos alternos | Actualizar el embudo: descubrimiento sigue siendo la entrada por defecto; compra directa solo para soluciones con precio aprobado |
| BUSINESS_CONTEXT § Contenido sensible | "El sitio no publica precios" | El marketplace admite precios | Ningún precio se publica sin aprobación explícita por ítem; sin precio aprobado, la modalidad es cotización o consultoría |
| BUSINESS_CONTEXT § Líneas de servicio | Desarrollo e Integraciones "no se ofrece proactivamente" | Un catálogo lo mostraría al mismo nivel | Publicarlo con modalidad "cotización", tras las otras líneas, o no publicarlo (decisión) |
| [ADR-004](../decisions/ADR-004-Why-Odoo.md) | Odoo es la plataforma ERP que Evoltica **vende** | No cambia: sigue siendo producto del catálogo | Sin cambio. Lo que cambia es que Odoo **no** es la base técnica de la plataforma |
| [ADR-013](../decisions/ADR-013-Backend-Auth-Strategy.md) | Recomienda arquitectura híbrida centrada en Odoo | Contradice la dirección nueva | Reescribir ADR-013 (o reemplazarlo por ADR-015) con la decisión de § 9 |
| [ARCHITECTURE.md](../../ARCHITECTURE.md) y CLAUDE.md (regla 1) | Sin base de datos ni autenticación sin ADR | La plataforma los necesita | ADR-014 (plataforma comercial) + ADR-015 (persistencia e identidad) antes de implementarlos |

---

## 1. Qué se reutiliza de las Fases 1 y 2

- **Público:** home, `/servicios` (índice 01–05), `/servicios/[slug]`, `/nosotros`, `/casos-de-exito`, `/contacto` y la intro. No se rediseña la home.
- **Auth:** pantallas `/login`, `/registro`, `/recuperar-password`, `/restablecer-password`, `AuthProvider`, cookie de sesión, `middleware.ts`, `requireRole`.
- **Portal:** shell, navegación, `DataTable`, `FilterBar`, `StatusBadge`, `Panel`, `EmptyState`, formularios de tickets y adjuntos, y las pantallas de servicios, suscripciones, facturas, pagos, tickets, Cloud, notificaciones y perfil.
- **Dominio:** `lib/domain/*` se amplía; no se reemplaza.
- **Cambio necesario:** los contratos actuales (`ClientPortalRepository`) están organizados **por pantalla**. Para una plataforma con escrituras, permisos y auditoría se reorganizan en **repositorios por agregado + servicios de aplicación** (§ 8). Las páginas cambian poco: dejan de llamar a `repo.*` y llaman a `services.*`.

---

## 2. Sitemap

```
PÚBLICO (estático salvo formularios)
/                                   Home (sin cambios)
/servicios                          Líneas de servicio 01–05 (sin cambios de diseño)
/servicios/[linea]                  Página de la línea + "Soluciones de esta línea" (nuevo bloque)
/soluciones                         Catálogo: filtros por problema, línea y modalidad comercial
/soluciones/[slug]                  Ficha de solución (alcance, requisitos, entregables, modalidad, CTA)
/diagnostico                        Diagnóstico guiado (pasos) → solicitud comercial
/consultoria                        Qué es la consultoría + solicitud con disponibilidad preferida
/cotizar                            Solicitud de cotización (?solucion=slug opcional)
/solicitud/[referencia]             Confirmación con referencia (sin datos personales)
/nosotros · /casos-de-exito · /contacto · /privacidad (texto legal pendiente)

AUTH
/login · /registro · /recuperar-password · /restablecer-password · /invitacion/[token]

PORTAL (cliente, por organización)
/app                                Dashboard
/app/empresa                        Perfil empresarial y miembros (reemplaza parte de /app/perfil)
/app/perfil                         Datos personales, seguridad, preferencias
/app/solicitudes                    Diagnósticos y consultorías solicitados y su estado
/app/cotizaciones · /app/cotizaciones/[id]       Versiones, aceptar / rechazar
/app/pedidos · /app/pedidos/[id]
/app/servicios[/id] · /app/suscripciones · /app/productos (se fusiona en servicios si no aplica)
/app/tickets · /nuevo · /[id]
/app/facturacion[/id] · /app/pagos
/app/cloud[/id]
/app/notificaciones

ADMIN (personal de Evoltica)
/admin                              Dashboard comercial
/admin/prospectos[/id]              Leads y solicitudes comerciales
/admin/clientes[/id]                Organizaciones y contactos
/admin/catalogo · /categorias       Soluciones y su publicación
/admin/cotizaciones[/id]            Editor de versiones, envío
/admin/pedidos[/id]
/admin/servicios                    Servicios contratados y suscripciones
/admin/tickets[/id]                 Bandeja, asignación, notas internas
/admin/comunicaciones               Bitácora de correos/notificaciones y su estado de entrega
/admin/facturacion · /admin/pagos
/admin/usuarios · /admin/auditoria
```

Decisión de URL (§ 13): las **soluciones** viven en `/soluciones/[slug]` (catálogo transversal y filtrable), y las páginas `/servicios/[linea]` siguen siendo la narrativa de cada línea, ya indexada. Se enlazan entre sí y una solución pertenece a una sola línea. Así se evita duplicar contenido: la ficha es la única fuente del detalle de una solución.

---

## 3. Modelo comercial

| Modalidad | Cuándo | CTA | Requiere | Resultado |
|---|---|---|---|---|
| **A. Compra directa** | Precio fijo aprobado, alcance cerrado | "Comprar" | Cuenta, pasarela verificada | Pedido `PENDIENTE_PAGO` → pago confirmado por webhook → `CONFIRMADO` |
| **B. Suscripción** | Precio recurrente aprobado | "Contratar" | Cuenta, pasarela con recurrencia o cobro manual | Pedido + suscripción |
| **C. Cotización** | Alcance variable | "Solicitar cotización" | Datos de contacto (sin cuenta) | Solicitud → cotización versionada |
| **D. Consultoría/diagnóstico** | El cliente no sabe qué necesita | "Solicitar diagnóstico" | Datos de contacto | Solicitud con disponibilidad preferida (no una cita confirmada) |
| **E. Personalizado** | Desarrollo a medida | "Hablar con un especialista" | Datos de contacto | Solicitud → consultoría → cotización |

**Regla de publicación:** una solución solo puede tener modalidad A o B si tiene un precio **aprobado por Evoltica** (con fecha y responsable de la aprobación). Hoy no hay ninguno, así que el catálogo inicial publica únicamente C, D y E. El catálogo se construye **solo** con lo que ya existe en `lib/services-data.ts`: unas 30 ofertas reales dentro de las 5 líneas (p. ej. Inventarios, Hosting ERP, VPS administrados, Mesa de ayuda). No se inventan soluciones nuevas.

---

## 4. Entidades y relaciones

```
Organization 1─* Membership *─1 User            (rol por organización: OWNER | MIEMBRO)
Organization 1─* Contact                         (personas; pueden o no tener User)
StaffUser = User con StaffRole (ADMIN | COMERCIAL | SOPORTE | FINANZAS)

Lead (prospecto sin cuenta) ─ 0..1 → Organization (al convertirse en cliente)
CommercialRequest (DIAGNOSTICO | CONSULTORIA | COTIZACION | CONTACTO)
   * pertenece a Lead u Organization · referencia pública · respuestas tipadas · estado
Category (= línea de servicio) 1─* Solution
Solution: slug, línea, modalidad, problema(s), alcance, requisitos, entregables,
          precio? (PriceOption aprobada), estado de publicación, CTA
Quote 1─* QuoteVersion (inmutable una vez enviada) 1─* QuoteLine
   QuoteVersion: alcance, entregables, totales, impuestos?, vigencia, condiciones
   QuoteDecision: aceptada | rechazada, por quién, cuándo, versión
Order (desde QuoteVersion aceptada o compra directa) 1─* OrderLine
Order 1─* ContractedService ─ 0..1 Subscription
Invoice (referencia fiscal EXTERNA) ─* Payment (confirmado por proveedor)
Ticket ─ Organization, ContractedService?, Category, assignee (StaffUser), prioridad, estado
   1─* TicketMessage (público | interno) 1─* Attachment
   1─* TicketEvent (historial: cambios de estado, prioridad, asignación)
Notification (in-app) · EmailMessage (outbox: PENDIENTE → ENVIADO_AL_PROVEEDOR → ENTREGADO | REBOTADO | FALLIDO)
AuditEntry (actor, acción, recurso, antes/después resumido, IP, fecha)
CloudResource ─ ContractedService (solo lectura hasta aprobar acciones)
```

### Máquinas de estado (transiciones válidas = único lugar donde cambian)

- **CommercialRequest:** `NUEVA → EN_REVISION → CONTACTADA → (CALIFICADA → COTIZACION_CREADA) | DESCARTADA`.
- **QuoteVersion:** `BORRADOR → ENVIADA → ACEPTADA | RECHAZADA | VENCIDA | REEMPLAZADA`. Una nueva versión reemplaza a la anterior enviada; solo la última vigente se puede aceptar.
- **Order:** `PENDIENTE_CONDICIONES` (anticipo, firma, datos fiscales) `→ CONFIRMADO → EN_EJECUCION → COMPLETADO`, o `CANCELADO`. En compra directa: `PENDIENTE_PAGO → CONFIRMADO` solo por webhook verificado.
- **Ticket:** la de la Fase 2 + asignación; cada transición genera un `TicketEvent`.
- **EmailMessage:** el portal muestra "enviado" solo cuando el proveedor aceptó el mensaje, y "entregado" solo con su confirmación.

---

## 5. Recorridos

**Prospecto → cliente.** El visitante explora `/soluciones` o hace el `/diagnostico` y obtiene una solicitud `DIAG-XXXX`, con correo de confirmación si el correo está configurado. Comercial la revisa en `/admin/prospectos`, contacta y califica. Luego crea una cotización y la envía, lo que genera una invitación al portal. El cliente se registra con la invitación (se crea la organización y su membresía OWNER), acepta la versión y se crea el pedido (`PENDIENTE_CONDICIONES`). Cuando se cumplen las condiciones, el pedido pasa a `CONFIRMADO` y se crean los servicios contratados y las suscripciones.

**Compra directa** (solo si hay un precio aprobado y una pasarela verificada). Ficha → "Comprar" → login o registro → resumen → checkout en la pasarela → el webhook firmado confirma → pedido `CONFIRMADO` → servicio activo. La redirección de vuelta solo muestra "estamos confirmando tu pago".

**Cotización.** `/cotizar` (o el CTA de una ficha) crea una solicitud `COT-XXXX`. En el admin se redacta la v1 (alcance, entregables, precio, vigencia) y se envía. El cliente la ve en `/app/cotizaciones/[id]` y la acepta o rechaza, con un motivo opcional. Si pide cambios, se crea la v2 y la v1 queda `REEMPLAZADA`. Al aceptar se crea el pedido. **Una cotización no es una factura ni un pago.**

**Soporte.** El cliente crea un ticket (categoría, prioridad, servicio y adjuntos) y se registra un `TicketEvent`. Soporte lo asigna en el admin, responde públicamente o con una nota interna, y cambia el estado. Cada cambio queda en el historial, genera una notificación in-app y un correo en la outbox. El cliente ve el hilo público y el estado del correo nunca se inventa.

---

## 6. Diagnóstico guiado (solo información útil)

| Paso | Campos | Obligatorio |
|---|---|---|
| 1. Qué quieres resolver | Problema (texto corto) + proceso afectado (inventario, ventas, compras, contabilidad, nómina, infraestructura, soporte, otro) | Sí |
| 2. Contexto | Tamaño (rangos de personas), sector (de los ya declarados en BUSINESS_CONTEXT + "otro"), herramientas actuales (opcional) | Tamaño sí |
| 3. Interés | Solución del catálogo si la conoce (opcional) | No |
| 4. Contacto | Nombre, empresa, correo corporativo, teléfono/WhatsApp, disponibilidad preferida (franjas), aceptación de la política de datos | Sí |

Al enviar se crea una `CommercialRequest` con referencia, y la confirmación dice: "Recibimos tu solicitud **DIAG-XXXX**. Te contactaremos en menos de 4 horas hábiles". Ese compromiso ya existe (`SITE.responseTime`). Nunca se dice "cita confirmada" sin una integración de agenda. Protección: validación en el servidor, honeypot, límite por IP y correo, y CAPTCHA solo si hay abuso (decisión de fricción).

---

## 7. Permisos (RBAC + alcance por organización)

| Permiso | OWNER | MIEMBRO | COMERCIAL | SOPORTE | FINANZAS | ADMIN |
|---|---|---|---|---|---|---|
| Ver datos de su organización | ✓ | ✓ | — | — | — | — |
| Aceptar/rechazar cotización | ✓ | — | — | — | — | — |
| Invitar miembros | ✓ | — | — | — | — | ✓ |
| Crear/responder tickets propios | ✓ | ✓ | — | — | — | — |
| Prospectos, solicitudes, cotizaciones | — | — | ✓ | — | lectura | ✓ |
| Tickets (bandeja, asignar, notas internas) | — | — | lectura | ✓ | — | ✓ |
| Pedidos, facturas, pagos (registro) | — | — | lectura | — | ✓ | ✓ |
| Catálogo y publicación | — | — | ✓ (borrador) | — | — | ✓ (publicar) |
| Usuarios, roles, auditoría | — | — | — | — | — | ✓ |

Se implementa como `authorize(session, permiso, recurso)` en los **servicios de aplicación**, no en las páginas. El personal accede solo a `/admin`; los clientes solo a `/app`; la misma persona no mezcla ambos contextos en una sesión. MFA obligatorio para el personal.

---

## 8. Arquitectura técnica (independiente de Odoo)

```
app/(public|auth|portal|admin)      Interfaz: páginas, server actions, route handlers (webhooks)
        │  solo llaman a ↓
lib/server/services/                Casos de uso: submitDiagnosis, requestQuote, sendQuoteVersion,
                                    acceptQuote, createOrderFromQuote, openTicket, assignTicket…
                                    → autoriza, valida invariantes, usa transacciones, emite eventos
lib/domain/                         Tipos, máquinas de estado, reglas puras (sin I/O)
lib/server/repositories/            Interfaces por agregado (OrganizationRepo, QuoteRepo, OrderRepo,
                                    TicketRepo, CatalogRepo, AuditRepo, OutboxRepo…)
   adapters/postgres/               Implementación real
   adapters/demo/                   En memoria, solo `next dev` (lo actual)
lib/server/integrations/            Contratos + adaptadores: EmailSender, FileStorage, PaymentGateway,
                                    FiscalInvoicing, Scheduler, CloudProvider, OdooConnector (opcional)
Outbox + worker                     Eventos → notificaciones, correos, auditoría; reintentos idempotentes
```

- **Persistencia seleccionable:** `PERSISTENCE=demo|postgres`. `demo` es imposible en build de producción (como hoy).
- **Catálogo:** al inicio, módulo tipado en código (como `services-data.ts`), estático y con buen SEO, detrás de `CatalogRepo`. Cuando el admin lo edite, pasa a la base de datos sin cambiar las páginas.
- **Odoo opcional:** `OdooConnector` puede sincronizar en un solo sentido (pedidos → Odoo o facturas ← Odoo) si algún día aporta valor. Ninguna pantalla depende de él.

---

## 9. Persistencia e identidad: comparación y recomendación

### Base de datos

| Opción | A favor | En contra |
|---|---|---|
| **PostgreSQL** | Relacional y transaccional (cotización → pedido → servicio en una transacción), restricciones e integridad, JSONB para respuestas del diagnóstico, maduro, portable | Requiere hosting y migraciones |
| MySQL/MariaDB | Maduro y conocido | JSON y restricciones menos expresivos; sin ventaja aquí |
| MongoDB | Esquema flexible | Las relaciones (org → cotización → pedido → servicio) y la integridad son el núcleo del dominio |
| SQLite/Turso | Simple y barato | Escrituras concurrentes y operación multi-instancia limitadas para un sistema comercial |

**Recomendación: PostgreSQL.** El hosting es una decisión aparte:

| Hosting Postgres | A favor | En contra |
|---|---|---|
| Gestionado serverless (p. ej. Neon) | Encaja con Vercel, backups y ramas por entorno | Datos fuera de Colombia (transferencia internacional, Ley 1581: requiere base legal/aviso); costo por uso |
| Gestionado tradicional (p. ej. Supabase, RDS) | Backups, réplicas | Mismo tema de transferencia; posible acoplamiento a servicios extra |
| **Autoalojado en la infraestructura de Evoltica** (Hetzner/Proxmox, que ya vende) | Control, coherencia con su oferta, costo predecible | Evoltica asume backups, parches, alta disponibilidad y monitoreo |

Se recomienda **un gestionado para arrancar** (menos riesgo operativo), con la base de datos detrás de repositorios para poder migrar. Las alternativas de acceso a datos son **Drizzle** (SQL explícito, tipos TS sin motor binario, migraciones en SQL revisables) o **Prisma** (más DX y ecosistema; motor adicional). Se recomienda Drizzle por transparencia y bajo peso en serverless; Prisma es igualmente válido si el equipo ya lo conoce.

### Identidad

| Opción | A favor | En contra |
|---|---|---|
| **Librería en la propia app con sesiones en Postgres** (p. ej. Better Auth) | Datos de identidad en nuestra base, organizaciones y roles, 2FA, sin costo por usuario, sin lock-in | Evoltica es responsable de actualizarla y configurarla bien |
| Auth.js (NextAuth) | Muy usado con Next | Orientado a OAuth; el soporte de credenciales y organizaciones requiere trabajo propio |
| Gestionado B2B (p. ej. Clerk, WorkOS, Auth0) | Organizaciones, MFA y seguridad operados por terceros | Costo por usuario activo, datos personales en un tercero (transferencia internacional), dependencia de proveedor |
| Keycloak autoalojado | Muy completo, estándar OIDC | Operación pesada para el tamaño actual |

**Recomendación: librería en la app con sesiones en la base de datos**, porque el modelo B2B (organizaciones, membresías, roles) vive igualmente en nuestro dominio y una sola fuente evita sincronizar con un tercero. Condiciones: verificar antes de adoptarla la versión, el mantenimiento activo, el algoritmo de hash (scrypt/argon2), la rotación de sesiones, el rate limiting y el soporte de 2FA, y fijar la versión. Si el negocio prefiere no operar la identidad, la alternativa es un **gestionado B2B**. Esa es la decisión principal que se pide aprobar.

### Integraciones

| Integración | Opciones a evaluar | Regla |
|---|---|---|
| Correo transaccional | Postmark, Amazon SES, Resend, SMTP corporativo | Dominio con SPF/DKIM/DMARC; outbox con estado real |
| Archivos | S3 compatible (R2, S3, Hetzner Object Storage), Vercel Blob | URL firmada, verificación del tipo real del archivo, límites, sin listado público |
| Pagos | Wompi, PayU, Mercado Pago, ePayco | Sandbox primero; solo el webhook firmado confirma |
| Facturación electrónica | Proveedor tecnológico habilitado por la DIAN vía API, o Odoo (opcional) | La plataforma nunca emite facturas fiscales por sí misma |
| Agenda | Cal.com, Google Calendar | Sin integración: "solicitud", nunca "cita confirmada" |
| Cloud | APIs de Proxmox/Hetzner/Contabo + Zabbix (según se confirme) | Lectura primero; acciones con permisos y auditoría |

---

## 10. Seguridad (requisitos de aceptación de todas las fases)

Autorización en los servicios (cada operación); aislamiento por `organizationId` en cada consulta (tests con dos organizaciones); contraseñas solo con hash lento; sesiones httpOnly/Secure con rotación; MFA del personal; rate limit en formularios públicos y en el login; webhooks firmados e idempotentes; auditoría de toda escritura del admin y de las decisiones del cliente (aceptar cotización); demo inalcanzable en producción (como hoy); secretos solo en el servidor; política de datos (Ley 1581) aceptada y registrada antes de crear cuentas o solicitudes.

---

## 11. Fases (orden ajustado y criterios de aceptación)

Ajuste respecto al orden sugerido: **la base de datos y la identidad van antes de cotizaciones y pedidos**, porque aceptar una cotización requiere un cliente autenticado con permiso OWNER y una escritura transaccional auditada. Sin esa base, el flujo de cotización solo podría simularse.

| # | Incremento | Necesita backend | Criterios de aceptación |
|---|---|---|---|
| **3** | **Catálogo y fichas** (`/soluciones`, `/soluciones/[slug]`, bloque en `/servicios/[linea]`), modelo `Solution` tipado y solo contenido real (modalidades C/D/E) | No | SSG, SEO (metadata, JSON-LD `Service`/`Offer` sin precio), filtros accesibles, ningún precio, lint/tsc/build |
| **4** | **Diagnóstico, consultoría y cotización pública** → `CommercialRequest` con referencia | Mínimo: **adaptador provisional por webhook** (reutiliza el mecanismo de `/api/contact`) o Postgres si ya está aprobado | Validación en el servidor y rate limit; confirmación con referencia; ningún texto de cita confirmada; prueba de envío real al webhook o a la BD |
| **5** | **Fundaciones:** Postgres + migraciones, identidad real, sesiones, RBAC, auditoría, outbox de correo, invitaciones | Sí | Login/logout/recuperación reales; tests de aislamiento; MFA del personal; contraseñas hasheadas; auditoría; demo intacta en dev |
| **6** | **Cotizaciones y pedidos** (admin crea y envía versiones; cliente acepta en el portal; pedido creado) | Sí | Versiones inmutables; solo la última vigente se acepta; aceptación auditada; sin facturas ni pagos |
| **7** | **Portal conectado** (servicios, suscripciones, solicitudes y cotizaciones desde Postgres) | Sí | El adaptador demo y el real pasan los mismos tests de contrato |
| **8** | **Tickets y comunicaciones** (categorías, asignación, historial, correo real) | Sí + correo | Ningún "enviado" sin aceptación del proveedor; notas internas invisibles para el cliente |
| **9** | **Administración completa** (prospectos, clientes, catálogo, comunicaciones, usuarios y auditoría) | Sí | Permisos por rol probados por operación |
| **10** | **Pagos y facturación** (pasarela en sandbox → producción; proveedor fiscal) | Sí + terceros | Webhook firmado e idempotente; ningún pago "exitoso" sin confirmación |
| **11** | **Cloud** (lectura → acciones autorizadas) | Sí + proveedores | Permisos por recurso, confirmación y auditoría |

Cada hito ejecuta `npm run lint`, `npx tsc --noEmit` y `npm run build` en el repositorio.

---

## 12. Implementado, simulado y pendiente (hoy)

- **Implementado:** sitio público, separación de superficies, guardas de servidor, middleware, contratos y validación de tickets y adjuntos.
- **Simulado (solo `next dev`):** todos los datos del portal y las escrituras ("no se guardó ni se envió").
- **Pendiente:** base de datos, identidad, correo, archivos, pagos, facturación fiscal, agenda, Cloud, administración, catálogo y diagnóstico.

## 13. Decisiones que requieren aprobación

1. **Dirección:** aprobar ADR-014 (plataforma comercial propia, Odoo opcional) y la actualización del embudo y de la política de precios en BUSINESS_CONTEXT.
2. **URLs del catálogo:** `/soluciones` + `/soluciones/[slug]`, enlazadas con `/servicios/[linea]`.
3. **Publicación de Desarrollo e Integraciones** en el catálogo (sí con modalidad cotización, o no publicar).
4. **Base de datos:** PostgreSQL. **Hosting:** gestionado (cuál) o autoalojado.
5. **Identidad:** librería en la app con sesiones en Postgres, o proveedor gestionado B2B.
6. **Registro:** solo por invitación tras cotización o solicitud calificada (recomendado), o autoservicio con verificación.
7. **Persistencia provisional de la Fase 4:** webhook existente mientras no haya Postgres, o esperar a la Fase 5.
8. **Rate limiting:** almacén (Postgres, KV gestionado) y si se acepta un CAPTCHA.
9. Proveedores de correo, archivos, pagos, facturación fiscal y agenda (pueden decidirse en su fase).
10. **Texto legal** (Ley 1581) y aviso de transferencia internacional si la base de datos o la identidad están fuera de Colombia.
11. **Precios:** lista de soluciones con precio aprobado, si alguna, para habilitar las modalidades A y B.
