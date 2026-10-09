# Portal de clientes: estado de la Fase 2 e integraciones pendientes

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Inventario de lo que el portal (`/app`) hace de verdad hoy, lo que solo existe como demostración y lo que falta conectar. Complementa [ADR-012](../decisions/ADR-012-Public-Portal-Admin-Split.md) (estructura) y [ADR-013](../decisions/ADR-013-Backend-Auth-Strategy.md) (backend, `Proposed`). **El portal no está listo para producción.**

## Cómo funciona hoy

| Entorno | Acceso a `/app` | Datos |
|---|---|---|
| Producción y previews (`next build`) | Imposible. Sin proveedor de identidad no hay sesión: middleware y servidor redirigen a `/login`, que muestra "Acceso en preparación" con formularios deshabilitados. | Ninguno. El repositorio "no configurado" lanza `BackendNotConfiguredError`. |
| Desarrollo (`next dev`) | Botón "Entrar al entorno de demostración" en `/login`. No pide credenciales. | Ficticios (`lib/server/data/adapters/demo/fixtures.ts`), con la franja "Entorno de demostración" en todas las pantallas. |

`PORTAL_DEMO_ENABLED` (`lib/server/env.ts`) es `NODE_ENV === "development"`. Se fija en compilación y ninguna variable de entorno lo activa en producción.

## Real frente a demostración

| Funcionalidad | Estado |
|---|---|
| Separación de layouts público / acceso / portal | **Real** |
| Middleware de redirección + `requireRole("CLIENTE")` en layout, páginas y acciones | **Real** (verificado con cookies falsificadas en build de producción) |
| Aislamiento por organización (un id de otra organización → "no encontramos este registro") | **Real en el contrato**; lo cumple el adaptador demo y debe cumplirlo el real |
| Ocultar notas internas de tickets al cliente | **Real en el contrato** |
| Validación de tickets y respuestas (cliente + servidor, `lib/portal/ticket-validation.ts`) | **Real** |
| Filtros por URL (servicios, facturas, tickets) | **Real** |
| `noindex`, `X-Robots-Tag`, `Cache-Control: private, no-store`, `robots.txt`, fuera del sitemap | **Real** |
| Tema claro/oscuro y cierre de la sesión de demostración | **Real** |
| Inicio de sesión, registro, recuperación y cambio de contraseña | **Interfaz deshabilitada.** Pendiente de ADR-013. |
| Crear/responder tickets, marcar notificaciones | **Demostración**: valida y responde "no se guardó ni se envió" |
| Adjuntos | **Validación de metadatos real**; el archivo no se sube |
| Servicios, productos, suscripciones, facturas, pagos, Cloud, notificaciones | **Demostración** (datos ficticios) |
| Descargar PDF de factura, pagar | **Botones deshabilitados** con aviso |
| Acciones sobre servidores | **No existen** en la UI; solo hay contrato (`CloudOperations`) |
| Descargas (`/app/descargas`) | Contrato listo; pantalla no construida |
| Administración (`/admin`) | No construida (Fase 5). Hoy `/admin` redirige a `/login` o devuelve 404 |

## Integraciones pendientes

### Autenticación y sesión
- Implementar `AuthProvider` (`lib/server/auth/contracts.ts`) con el proveedor que se apruebe y registrarlo en `getAuthProvider()` (`lib/server/auth/providers.ts`).
- Cookie `evoltica-session` (`lib/auth-cookies.ts`): httpOnly, Secure, SameSite=Lax, con expiración y rotación. El middleware ya la reconoce.
- Contraseñas: hash lento (argon2id/bcrypt) o delegadas al proveedor. Nunca en texto plano ni en logs.
- Límite de intentos por IP y por cuenta; mensajes idénticos para "usuario no existe" y "contraseña incorrecta".
- Recuperación: token de un solo uso con vencimiento corto, enviado por correo y validado en el servidor antes de mostrar `/restablecer-password`. Requiere proveedor de correo transaccional.
- Registro: según la modalidad que decida el negocio (abierto, por invitación o con aprobación). Requiere publicar la política de tratamiento de datos (Ley 1581) y guardar la fecha de aceptación (`acceptedPrivacyPolicyAt`).

### Autorización en el servidor
- Todo acceso pasa por `getPortalContext()` → `requireRole("CLIENTE")`. Las acciones de servidor lo vuelven a llamar.
- El adaptador real debe filtrar SIEMPRE por `session.user.organizationId` y devolver `null` (nunca "prohibido") para registros ajenos, de modo que no revele qué ids existen.
- Un ADMIN que entra a `/app` se redirige a `/admin` (`HOME_BY_ROLE`).

### Datos
- Implementar `ClientPortalRepository` (`lib/server/data/contracts.ts`) en `lib/server/data/adapters/<backend>/` y seleccionarlo en `getClientRepository()`.
- Facturas: solo lectura desde el sistema contable/facturación electrónica (CUFE, PDF/XML).
- Pagos: `PaymentGateway.createCheckout` inicia el pago; solo `handleWebhook` con firma verificada cambia su estado. La redirección del navegador no prueba nada.
- Adjuntos: `AttachmentStorage.createUpload` con URL firmada; el ticket recibe ids. Tipos y límites en `ATTACHMENT_LIMITS` (`lib/domain/support.ts`).
- Cloud: lectura vía la API del proveedor o del monitoreo. Las acciones (`CloudOperations`) requieren permisos por cliente y recurso, auditoría y confirmación.

## Decisiones que requieren autorización (no tomadas)

Backend central · proveedor de autenticación · modalidad de registro · definición comercial de productos y servicios · pasarela de pagos · proveedores Cloud y acciones permitidas · política de privacidad y texto legal · almacenamiento de archivos · proveedor de correo · SLA visibles por prioridad.

## Limitaciones conocidas

- **Resuelto (2026-10-08):** un registro inexistente o ajeno respondía HTTP 200. Causa: `app/(portal)/app/loading.tsx` envolvía todas las páginas en un límite de Suspense; Next empezaba a transmitir la respuesta (estado 200 ya enviado) antes de que la página llamara a `notFound()`. Se eliminó ese `loading.tsx`: ahora responde 404. Si un backend real es lento, el estado de carga se añade con `<Suspense>` alrededor de paneles concretos de las páginas de **listado**, nunca por encima de una página de detalle que pueda llamar a `notFound()`.
- La paleta de marca no tiene rojo ni ámbar: los estados que exigen atención usan alto contraste + ícono ⚠ y texto. Si el negocio quiere colores de alerta, es un cambio del sistema de diseño que requiere autorización.
