# Estándares de seguridad

> **Versión**: 1.2 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define la superficie de riesgo del sitio y las reglas para manejar input de usuarios, secretos y datos personales sin introducir vulnerabilidades.

## Alcance

Cubre: validación y sanitización de input, manejo de secretos y variables de entorno, datos personales (PII), métodos HTTP y dependencias.

No cubre: SEO/indexación (ver [SEO_GUIDE.md](SEO_GUIDE.md)) ni rendimiento (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)).

## Superficie de riesgo

Desde ADR-012 la superficie incluye las áreas privadas (ver § Áreas privadas); hoy no exponen datos reales.

**Única superficie de entrada de datos externos que entrega datos a Evoltica**: `app/api/contact/route.ts`. Trátalo como el punto de mayor riesgo del proyecto.

**Superficie adicional (Fase 4, 2026-10-10)**: la server action `submitCommercialRequestAction` (`app/(public)/actions.ts`) de `/diagnostico`, `/consultoria` y `/cotizar`. En producción responde "no disponible" **sin procesar los datos**; en `next dev` valida (mismas reglas en cliente y servidor, `lib/commercial/validation.ts`), aplica `sanitize`, un honeypot y listas cerradas, y no guarda ni envía nada. Antes de que guarde datos reales necesita persistencia, consentimiento registrado y límite de envíos (ver [diseño de la Fase 4 § 8](docs/architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md)).

### Entrega del formulario de contacto (corrección A1, 2026-10-10)

El endpoint responde éxito **solo** si el canal configurado (`EMAIL_WEBHOOK_URL`) acepta la solicitud con HTTP 2xx. Ese éxito significa "el canal la aceptó", no que una persona la leyó.

| Escenario | Respuesta | Log del servidor (sin datos personales) |
|---|---|---|
| Canal acepta (2xx) | 200 · "Tu solicitud se envió a nuestro canal de atención." (no afirma que un correo llegó ni que alguien la leyó) | — |
| Sin `EMAIL_WEBHOOK_URL` | 503 · `CHANNEL_UNAVAILABLE` | "EMAIL_WEBHOOK_URL no está configurada" (en `next dev` también el payload, como antes) |
| Canal responde ≠ 2xx | 502 · `DELIVERY_FAILED` | Solo el código HTTP |
| Red caída o sin respuesta en 10 s | 502 · `DELIVERY_FAILED` | Solo el tipo de error (p. ej. `TimeoutError`) |
| Datos inválidos | 400 · lista de errores | — |

En 502/503 el mensaje dice que la solicitud **no se envió ni quedó registrada** y ofrece WhatsApp y correo; el formulario muestra además un enlace a WhatsApp. Ninguna respuesta incluye un plazo de contacto.

**Verificación en Vercel: pendiente.** Desde este repositorio no hay acceso al proyecto de Vercel (sin CLI, sin `.vercel/`, sin credenciales), así que no está verificado si `EMAIL_WEBHOOK_URL` existe en producción. Si no existe, el formulario de producción responderá 503 tras el próximo despliegue (antes respondía un éxito falso). Lo comprueba alguien con acceso al dashboard, sin copiar el valor.

### Tratamiento de datos personales: requisitos legales pendientes (2026-10-10)

No hay una política de tratamiento aprobada ni publicada. Por eso el sitio **no afirma ninguna protección legal** (se retiró "Tu información está protegida bajo la Ley 1581"); el formulario de contacto solo dice "Usamos estos datos para responder tu consulta", que **no sustituye** la autorización ni las demás obligaciones legales.

Antes de **almacenar** solicitudes reales (Fase 5), Evoltica debe revisar y aprobar, con asesoría legal: la política de tratamiento y su publicación; la base jurídica de cada tratamiento; la autorización del titular cuando corresponda y cómo se registra; los plazos de conservación y supresión; y el canal para ejercer los derechos de los titulares (consulta, actualización, rectificación, supresión, revocatoria). Este repositorio no redacta ese contenido. Requisitos técnicos asociados: [diseño de la Fase 4 § 8.4](docs/architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md).

## Reglas

- **Validación en el servidor es obligatoria e independiente de la del cliente**: aunque React Hook Form valide en el navegador, el servidor debe re-validar todo (nombre, empresa, email, teléfono, servicio, mensaje) exactamente como ya hace `route.ts` — nunca confíes en la validación del cliente como única barrera.
- **Sanitización**: todo input de texto libre pasa por `sanitize()` (strip de `<`/`>`) antes de usarse o reenviarse. Si agregas un campo nuevo al formulario, debe pasar por el mismo tratamiento; no interpoles input crudo del usuario en HTML, en el asunto de un email, ni en logs sin sanitizar.
- **Sin inyección de HTML/JS de terceros sin revisar**: el único uso de `dangerouslySetInnerHTML` permitido es para JSON-LD estático controlado por el propio código (`app/layout.tsx`). No lo uses para renderizar contenido proveniente de un usuario o de una fuente externa no confiable.
- **Secretos y variables de entorno**: `EMAIL_WEBHOOK_URL`, `EMAIL_WEBHOOK_SECRET`, `NOTIFICATION_EMAIL` viven únicamente en variables de entorno (`.env.local` en desarrollo, configuración del proyecto en Vercel en producción). Nunca se hardcodean, nunca se loguean en texto plano, nunca se commitean.
- **Datos personales (PII)**: el payload de contacto incluye datos personales (nombre, email, teléfono, IP). No agregues logging adicional de este payload fuera de lo ya existente (log solo en `NODE_ENV === "development"`), y no lo persistas en ningún almacenamiento nuevo sin evaluar dónde y por cuánto tiempo se retiene.
- **Métodos HTTP**: el endpoint de contacto expone explícitamente solo `POST` (`GET` responde 405). Cualquier endpoint nuevo debe declarar explícitamente qué métodos acepta y rechazar el resto, no depender del comportamiento por defecto del framework.
- **Rate limiting / abuso**: el endpoint de contacto no tiene actualmente límite de tasa. Si el volumen de spam se vuelve un problema, la solución se discute antes de implementarse (p. ej. rate limiting en el borde con Vercel, CAPTCHA, o validación adicional), no se improvisa sobre la marcha.
- **Dependencias**: antes de agregar una dependencia nueva, revisa que sea mantenida activamente y evalúa su necesidad real (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)); no agregues paquetes para resolver algo trivial que se puede escribir en unas líneas.
- **Cabeceras y transporte**: el sitio se sirve sobre HTTPS vía Vercel; no se debe introducir contenido mixto (`http://`) en assets, links o llamadas `fetch`.

## Áreas privadas (`/app`, `/admin`) — ADR-012

- **Autorización siempre en el servidor**: cada layout, página y server action del área privada llama a `getPortalContext()` / `requireRole()`. `middleware.ts` solo redirige de forma optimista; nunca es la única barrera.
- **Aislamiento por organización**: los repositorios reciben la sesión y filtran por `organizationId`; un registro ajeno se trata como inexistente (`notFound()`), sin revelar que existe.
- **Sin acceso real hasta ADR-013**: no hay proveedor de identidad; no se aceptan credenciales. El entorno de demostración solo existe con `next dev` (`PORTAL_DEMO_ENABLED`) y no se puede activar por variable de entorno.
- **Código de servidor aislado**: `lib/server/**` importa `server-only`; los datos ficticios y los contratos nunca llegan al bundle del navegador.
- **Datos financieros**: el portal no genera facturas ni marca pagos; el estado de un pago solo lo cambia un webhook verificado.
- **Adjuntos**: no viajan por server actions (límite 1 MB); se validan tipo, tamaño y cantidad en cliente y servidor (`ATTACHMENT_LIMITS`).
- Detalle de lo pendiente: [docs/architecture/2026-10-08-portal-integraciones-pendientes.md](docs/architecture/2026-10-08-portal-integraciones-pendientes.md).

## Checklist de seguridad para cambios en `app/api/contact/route.ts`

- [ ] ¿Todo campo nuevo tiene validación server-side equivalente a la del cliente?
- [ ] ¿Todo input de texto libre pasa por `sanitize()`?
- [ ] ¿Los mensajes de error no filtran detalles internos (stack traces, rutas de servidor)?
- [ ] ¿Los secretos siguen viniendo de `process.env`, nunca hardcodeados?
- [ ] ¿El método HTTP sigue restringido explícitamente?
- [ ] ¿Se corrió `npm run build` y se probó el envío real del formulario?

## Cuándo escalar antes de actuar

Cualquier cambio que toque: validación del endpoint de contacto, manejo de secretos, o que introduzca una nueva superficie de entrada de datos (nuevo endpoint, nuevo formulario) debe confirmarse con el negocio antes de mergear — ver la lista consolidada en [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — reglas generales de TypeScript aplicables al endpoint.
- [UX_GUIDE.md](UX_GUIDE.md) — cómo se presentan al usuario los errores de validación.
- [prompts/backend.md](prompts/backend.md) — brief condensado para tareas sobre el endpoint de contacto.
