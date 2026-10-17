# Evaluación de backend y plan de integración del portal

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

> **Nota (2026-10-08):** la recomendación de este documento (Odoo como fuente de verdad) quedó **superada** por la nueva dirección del negocio: plataforma propia con Odoo opcional. Ver [2026-10-08-plataforma-comercial-b2b.md](2026-10-08-plataforma-comercial-b2b.md). Los hechos verificados sobre Odoo siguen siendo válidos para evaluarlo como integración opcional.

## Propósito

Insumo para decidir [ADR-013](../decisions/ADR-013-Backend-Auth-Strategy.md) (`Proposed`). Compara tres arquitecturas de backend para el portal y propone un orden de integración. **Nada de esto está implementado.** Ninguna capacidad de "nuestra instalación de Odoo" se da por cierta: cada una figura como algo a confirmar.

## Punto de partida (lo que ya existe en el repo)

- Contratos estables: `ClientPortalRepository`, `AdminRepository`, `AuthProvider`, `AttachmentStorage`, `PaymentGateway`, `CloudOperations` (`lib/server/**/contracts.ts`), y el dominio en `lib/domain/`.
- Autorización en el servidor (`requireRole`, `getPortalContext`), aislamiento por organización en el contrato y middleware optimista.
- Sin proveedor de identidad, sin persistencia y sin integraciones. En producción el portal no es accesible.

## Hechos verificados externamente (a confirmar en nuestra instancia)

| Tema | Hecho | Fuente |
|---|---|---|
| Helpdesk y Suscripciones | Son módulos de **Odoo Enterprise**; no existen en Community. | Comparativas de ediciones (terceros, coinciden entre sí) |
| Facturación electrónica CO | Hay dos rutas oficiales: `l10n_co_dian` (software propio ante la DIAN) y `l10n_co_edi` (vía Carvajal). Ambas sobre la localización `l10n_co`. | Documentación oficial de Odoo, localización Colombia |
| API externa | Desde Odoo 19, XML-RPC y JSON-RPC (`/xmlrpc`, `/jsonrpc`) están **deprecadas**. Su reemplazo es la API **JSON-2** con API keys. Retiro de los servicios `common`/`object` previsto para Odoo 22 (otoño de 2028). | Documentación oficial "External RPC API" |
| Pasarelas CO | No hay conector **oficial** de Odoo para Wompi ni PayU. Existen módulos de terceros: Wompi (comercial, Odoo 17–19, según el vendedor) y Mercado Pago (comunidad, en versiones antiguas). | Odoo Apps y sitios de vendedores |

**A confirmar en la instancia de Evoltica:** si existe una instancia propia y cuál es (Online, Odoo.sh o autoalojada); la versión y la edición; los módulos instalados (`helpdesk`, `sale_subscription`, `account`, `l10n_co`, `l10n_co_dian` o `l10n_co_edi`, `portal`, `documents`); si la habilitación DIAN está activa (resolución de numeración, certificado); si la API externa está disponible en el plan; y la política de API keys y usuarios técnicos.

## Las tres alternativas

**A. Odoo como sistema central.** Odoo guarda todos los datos de negocio y además actúa como proveedor de identidad: los usuarios del portal son usuarios *portal* de Odoo. Next.js es solo la interfaz (BFF). Variante extrema: usar directamente el portal nativo de Odoo (`/my`) y no construir uno propio.

**B. Backend propio.** Base de datos propia (p. ej. Postgres) con usuarios, tickets, suscripciones, pagos y adjuntos. Odoo, si se usa, queda solo como contabilidad y se sincroniza en ambos sentidos.

**C. Híbrida.** Odoo es el sistema de origen de los datos de negocio (clientes, contratos, facturas, tickets, pagos conciliados). La identidad la gestiona un proveedor OIDC dedicado. Next.js actúa como BFF con adaptadores especializados: Odoo, almacenamiento de archivos, pasarela, infraestructura y monitoreo. La persistencia propia es mínima y solo para lo que Odoo no debe guardar (auditoría del portal, idempotencia de webhooks).

## Comparación

| Dimensión | A. Odoo central | B. Backend propio | C. Híbrida |
|---|---|---|---|
| **Clientes y usuarios** | `res.partner` (empresa) + `res.users` portal. Una sola fuente. | Tablas propias; hay que sincronizar con el ERP/contabilidad → duplicación. | `res.partner` es la fuente; el IdP guarda el vínculo usuario → `commercial_partner_id`. |
| **Autenticación** | Credenciales de Odoo. El BFF tendría que ver contraseñas para abrir la sesión de Odoo, o reutilizar su cookie (no es su caso de uso). Sin MFA ni SSO nativos sin módulos adicionales. | Control total (librería o IdP propio), pero se mantiene en casa. | IdP OIDC (gestionado o Keycloak autoalojado): MFA, recuperación y bloqueo resueltos; el BFF nunca ve contraseñas. |
| **Autorización por cliente** | Reglas de registro de Odoo para usuarios portal (probadas). El BFF consulta con la identidad del usuario o con un usuario técnico + filtro. | Se escribe y prueba desde cero. | El BFF filtra por `commercial_partner_id` usando un usuario técnico de Odoo con permisos mínimos; doble control (BFF + dominio en la consulta). |
| **Tickets** | `helpdesk.ticket` (**Enterprise**). Sin Enterprise: `project.task` como sustituto, más limitado. | Propio: SLA, notificaciones y asignación se construyen. | `helpdesk.ticket` vía BFF, si hay Enterprise; si no, decidir entre `project.task` o un servicio de tickets dedicado. |
| **Servicios y suscripciones** | `sale.order` + `sale_subscription` (**Enterprise**). | Propio, duplicado con lo que se facture. | Igual que A; servicios contratados = líneas de suscripción/pedido con metadatos. |
| **Facturación electrónica CO** | Nativa con `l10n_co_dian` o `l10n_co_edi` (a confirmar habilitación). | **No viable por sí sola**: la factura debe salir de un software habilitado; terminaría integrando un sistema contable igualmente. | Nativa en Odoo; el portal solo lee `account.move` (PDF/XML, CUFE). |
| **Pagos** | Módulo de pasarela en Odoo (de terceros para Wompi; a evaluar). Conciliación nativa. | Webhook propio + registro manual o integración contable. | Webhook verificado en el BFF (`PaymentGateway`) → registra el pago en Odoo, o módulo de Odoo si se aprueba uno confiable. Conciliación en Odoo. |
| **Adjuntos y correo** | `ir.attachment` y `mail` de Odoo (plantillas, chatter). | Almacenamiento y correo propios. | Adjuntos de tickets en `ir.attachment` (vía BFF) o almacenamiento S3 compatible con URL firmada; correo transaccional de identidad desde el IdP y de negocio desde Odoo. |
| **Cloud y monitoreo** | Odoo no lo cubre; requiere desarrollo igualmente. | Propio. | Adaptadores en el BFF hacia Proxmox, Hetzner o Contabo (los que se confirmen) y Zabbix; el vínculo recurso → contrato se guarda en Odoo. |
| **Administración** | Backoffice de Odoo (ya existe) para el equipo. | Todo `/admin` se construye. | Backoffice de Odoo para operar; `/admin` del sitio solo para lo propio del portal (usuarios del portal, auditoría, Cloud). |
| **Mantenimiento y costos** | Menos piezas. Licencia Enterprise por usuario interno; se depende de la versión y de la migración a JSON-2. | Más código propio, más superficie de seguridad y duplicación contable. | Piezas moderadas: Odoo + IdP + BFF. Costo del IdP (o de operar Keycloak) y de los módulos de pasarela. |
| **Riesgo principal** | Identidad acoplada a Odoo; el portal propio pierde sentido frente a `/my`. | Doble fuente de verdad y factura electrónica fuera del sistema. | Coordinar tres sistemas; requiere una disciplina clara sobre la fuente de verdad. |

## Recomendación: C (híbrida), condicionada a confirmar Odoo Enterprise

Motivos:
1. **Una sola fuente de verdad de negocio.** Facturas, suscripciones y tickets ya viven (o deben vivir) en Odoo, que además es lo que Evoltica vende (ADR-004). B duplica datos y no resuelve la factura electrónica.
2. **Identidad separada del ERP.** El portal no debe manejar contraseñas de Odoo. Un IdP OIDC aporta MFA, recuperación, bloqueo y auditoría de acceso, y encaja con el contrato `AuthProvider`.
3. **Los contratos actuales se conservan.** Cada adaptador implementa una interfaz ya definida y se prueba por separado.
4. **Cloud y pagos quedan aislados** en adaptadores con sus propios permisos, sin dar a Odoo responsabilidades que no tiene.

Si la instancia **no** tiene Enterprise, la recomendación cambia: hay que decidir entre licenciar Enterprise (Helpdesk/Suscripciones) o cubrir tickets y suscripciones con otra pieza. Esa decisión es de negocio.

## Sistema de origen por entidad (propuesta C)

| Entidad | Origen | Modelo/servicio | Escritura desde el portal |
|---|---|---|---|
| Organization | Odoo | `res.partner` (empresa) | No (solicitud por ticket) |
| User (identidad) | IdP | usuario OIDC + claim de `commercial_partner_id` y rol | Perfil básico vía IdP |
| ContractedService / Subscription | Odoo | `sale.order` / suscripciones | No |
| Product | Odoo | `product.template` (definición pendiente) | No |
| Invoice | Odoo | `account.move` (+ PDF/XML DIAN) | No |
| Payment | Pasarela → Odoo | webhook verificado → `account.payment` | Solo iniciar checkout |
| Ticket / TicketMessage | Odoo | `helpdesk.ticket` + `mail.message` | Crear y responder |
| Attachment | Odoo o S3 | `ir.attachment` o bucket con URL firmada | Subir (validado) |
| Notification | Odoo + BFF | `mail.message`/actividades; lectura en el portal | Marcar leída |
| CloudResource / Backup | Proveedor + monitoreo | APIs de Proxmox, Hetzner o Contabo + Zabbix; vínculo en Odoo | No (acciones: fase posterior) |
| AuditEntry | BFF | registro propio (persistencia mínima) | Automático |

## Reglas transversales

- **Autenticación:** OIDC (Authorization Code + PKCE) en el BFF; sesión en la cookie `evoltica-session` (httpOnly, Secure, SameSite=Lax), con rotación y expiración; cierre de sesión local y en el IdP.
- **Autorización por cliente:** el `commercial_partner_id` sale del token verificado, nunca de la URL ni del formulario. Cada consulta a Odoo lleva ese dominio, y el usuario técnico tiene permisos de solo lectura salvo en tickets y adjuntos.
- **Persistencia:** ninguna copia de datos de negocio. Solo auditoría del portal, idempotencia de webhooks y, si hace falta, caché de corta duración.
- **Errores:** los adaptadores traducen los fallos a `BackendNotConfiguredError`, un error temporal (con reintento acotado) o "no encontrado"; la UI ya tiene estados de error. Nunca se muestran detalles internos.
- **Auditoría:** se registra cada acción de escritura del portal y toda acción de `/admin` (quién, qué, cuándo, sobre qué), sin datos sensibles.
- **Secretos:** API keys de Odoo (JSON-2), credenciales del IdP, de la pasarela y de infraestructura solo en variables de entorno del servidor, con rotación documentada.

## Plan por fases (cada una validable por separado)

| Fase | Alcance | Validación | Depende de |
|---|---|---|---|
| **6.0 Confirmación** | Inventario real de Odoo (versión, edición, módulos, DIAN, API), elección del IdP, de la pasarela y del almacenamiento. ADR-013 → `Accepted`. | Checklist firmado por el negocio | Decisiones de abajo |
| **6.1 Identidad** | Adaptador `AuthProvider` OIDC, sesión, logout, recuperación delegada al IdP, vínculo usuario → partner. Sigue sin datos de negocio. | E2E de login/logout, expiración, cookie falsificada, rol incorrecto, intentos fallidos | IdP, Ley 1581 (si hay registro) |
| **6.2 Lectura Odoo** | Adaptador Odoo de solo lectura: organización, servicios, suscripciones, facturas (con PDF), pagos. | Contra una base de **staging** de Odoo con datos de prueba; tests de aislamiento entre dos partners | API JSON-2 o RPC según versión |
| **6.3 Tickets** | Lectura y escritura de tickets y mensajes; notas internas filtradas; adjuntos vía `AttachmentStorage`. | Crear/responder en staging; adjunto malicioso rechazado (tipo real verificado en el servidor); ningún mensaje interno visible | Helpdesk (Enterprise) o alternativa |
| **6.4 Notificaciones y auditoría** | Lectura de avisos desde Odoo; registro de auditoría propio. | Eventos auditados en cada escritura | Persistencia mínima |
| **6.5 Pagos** | `PaymentGateway` con la pasarela elegida en **sandbox**; webhook firmado e idempotente → pago en Odoo. | Pago aprobado, rechazado y duplicado (idempotencia); firma inválida rechazada | Cuenta de la pasarela |
| **6.6 Cloud (lectura)** | Estado, recursos y backups desde la API del proveedor y del monitoreo. | Recurso de otra organización inaccesible; errores del proveedor no rompen la página | Proveedores confirmados |
| **5 Admin** | `/admin` para lo propio del portal (usuarios, auditoría, Cloud); la operación de negocio sigue en el backoffice de Odoo. | Guardia ADMIN, auditoría de cada acción | 6.1–6.4 |
| **6.7 Cloud (acciones)** | `CloudOperations` con permisos por recurso, confirmación y auditoría. | Pruebas de permisos y de reintentos | Decisión explícita del negocio |

**Pruebas de integración transversales:** contra el contrato (los mismos tests corren con el adaptador demo y con el real); aislamiento con dos organizaciones; invocación directa de server actions sin sesión; webhooks con firma inválida; caída de Odoo o de la pasarela.

## Decisiones que requieren aprobación

1. ¿Existe una instancia propia de Odoo? ¿Versión, edición y hosting? ¿Se licencia Enterprise (Helpdesk y Suscripciones)?
2. Ruta de facturación electrónica: `l10n_co_dian` o `l10n_co_edi` (Carvajal), y estado de la habilitación ante la DIAN.
3. Proveedor de identidad: gestionado o Keycloak autoalojado. Modalidad de registro: abierto, por invitación o con aprobación.
4. Pasarela de pagos y si se integra vía módulo de Odoo o vía webhook en el BFF.
5. Almacenamiento de adjuntos: Odoo o S3 compatible.
6. Proveedores Cloud reales y si el cliente podrá ejecutar acciones.
7. Persistencia mínima propia (auditoría e idempotencia): motor y hosting.
8. Política de tratamiento de datos (Ley 1581) y términos del portal.
9. Dictado por voz del hero: retirarlo o habilitar el micrófono (ver informe de auditoría).

## Fuentes

- Odoo, localización Colombia (19.0): https://www.odoo.com/documentation/19.0/applications/finance/fiscal_localizations/colombia.html
- Odoo, External RPC API (deprecación y JSON-2): https://www.odoo.com/documentation/20.0/developer/reference/external_rpc_api.html
- Conector Wompi de terceros (ECOSIRE): https://docs.ecosire.com/odoo-modules/odoo-wompi-payment-gateway
- Mercado Pago en Odoo Apps (15.0): https://apps.odoo.com/apps/modules/15.0/mercadopago_payment_acquirer
- Comparativa Community vs Enterprise (Cybrosys): https://www.cybrosys.com/odoo/compare-odoo-community-vs-enterprise/
