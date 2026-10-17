# Fase 4 (solicitudes comerciales): diseño funcional y técnico + requisitos de la Fase 5

> **Versión**: 1.1 · **Estado**: Active (Fase 4 implementada como prototipo solo en desarrollo) · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Diseñar los flujos de **diagnóstico**, **consultoría**, **cotización personalizada** y **contacto desde una ficha** de la plataforma comercial propia ([ADR-014](../decisions/ADR-014-Commercial-Platform.md); Odoo solo como conector opcional futuro), y fijar los requisitos que la persistencia real de la Fase 5 debe cumplir ([ADR-015](../decisions/ADR-015-Persistence-Identity.md)).

**Estado (2026-10-10):** la Fase 4 está programada como **prototipo que solo funciona en `next dev`**. Ver [§ 10. Implementación](#10-implementación-2026-10-10). La Fase 5 sigue sin implementar.

## 1. Principios de la Fase 4

1. **Prototipo honesto.** Sin persistencia (Fase 5), ninguna pantalla dice que la solicitud se guardó, se envió, la recibió el equipo o que hay una cita. El resultado de un envío de prototipo lo dice de forma explícita.
2. **Salida real siempre visible.** Cada flujo ofrece los canales reales de hoy: el formulario de `/contacto` precargado con un resumen, o WhatsApp. **Condición:** antes de usar `/contacto` como salida real hay que corregir el hallazgo A1 de la [auditoría de la Fase 3](../development/2026-10-08-auditoria-fase-3.md); hoy esa ruta confirma la recepción aunque no entregue nada.
3. **Solo información útil.** Cada campo justifica su uso en la calificación comercial; los datos opcionales están marcados como opcionales.
4. **Independiente del backend.** La UI llama a un servicio de aplicación (`CommercialRequestService`). En la Fase 4 su adaptador es "prototipo" (valida, no guarda); en la Fase 5 será el persistente. Las pantallas no cambian.
5. **Sin textos inventados.** No hay política de privacidad (pendiente de Evoltica): el consentimiento se muestra como "pendiente de publicación" y, por eso, se recomienda que el prototipo **solo exista en desarrollo** (decisión D4-1).

## 2. Rutas y puntos de entrada

| Ruta | Propósito | Entrada desde |
|---|---|---|
| `/diagnostico` | Asistente de 4 pasos para quien no sabe qué solución necesita | Home, catálogo (estado vacío y banda final), fichas con modalidad *consultoría* |
| `/consultoria` | Solicitud de consultoría con disponibilidad **preferida** (no es una cita) | Fichas de la línea 01, `/servicios/consultoria-empresarial` |
| `/cotizar` (`?solucion=<slug>`) | Solicitud de cotización; con `solucion` queda prellenada y bloqueada a esa ficha | Fichas con modalidad *cotización* o *a la medida* |
| `/contacto` | Canal general (ya existe) | Preguntas generales, soporte urgente y salida real de los prototipos |

**Matriz de derivación desde una ficha** (sustituye `solutionCta()` cuando la Fase 4 se apruebe):

| Modalidad | CTA principal | Destino | Secundario |
|---|---|---|---|
| CONSULTORIA | Solicitar diagnóstico | `/diagnostico?solucion=<slug>` | WhatsApp |
| COTIZACION | Solicitar cotización | `/cotizar?solucion=<slug>` | WhatsApp |
| PERSONALIZADO | Hablar con un especialista | `/cotizar?solucion=<slug>&tipo=a-la-medida` | WhatsApp |
| COMPRA_DIRECTA / SUSCRIPCION | (deshabilitado: `CHECKOUT_ENABLED=false`) | `/cotizar?solucion=<slug>` | — |

Mientras el prototipo no esté aprobado para producción, las fichas **siguen** apuntando a `/contacto` (comportamiento actual).

## 3. Flujos

### 3.1 Diagnóstico (`/diagnostico`)

| Paso | Campos | Obligatorio | Validación |
|---|---|---|---|
| 1. Qué quieres resolver | `problema` (texto, 10–500) · `procesos` (multiselección: inventario, ventas/POS, compras, CRM, nómina/RRHH, contabilidad/finanzas, infraestructura, soporte TI, documentos, otro) | Sí (≥ 1 proceso) | Longitud; valores de una lista cerrada |
| 2. Contexto | `tamano` (1–10, 11–50, 51–200, > 200 personas) · `sector` (los tipos ya declarados en BUSINESS_CONTEXT + "otro") · `herramientasActuales` (texto ≤ 200) | Tamaño sí | Lista cerrada; longitud |
| 3. Interés | `solucion` (opcional, del catálogo publicado) | No | Debe existir en `PUBLISHED_SOLUTIONS` |
| 4. Contacto | `nombre` (2–100) · `empresa` (2–100) · `correo` (formato, ≤ 200) · `telefono` (7–20, dígitos y `+ ( ) -`) · `disponibilidad` (franjas: mañana/tarde, días hábiles; opcional) · `consentimiento` | Sí, salvo disponibilidad | Mismas reglas que `/api/contact` (se reutilizan) |

Antes de enviar hay una pantalla de **revisión** con un resumen editable.

**Estados de la interfaz:** `borrador` → `revisando` → `enviando` → `resultado-prototipo` | `error-validacion` | `error-servidor`.
**Estados de dominio (Fase 5):** `NUEVA → EN_REVISION → CONTACTADA → CALIFICADA → COTIZACION_CREADA` | `DESCARTADA`.

### 3.2 Consultoría (`/consultoria`)

Una sola pantalla: `tema` (texto 10–500), `solucion` (opcional), `modalidadPreferida` (virtual/presencial, **solo como preferencia**), `disponibilidad` (franjas preferidas, ≥ 1), más los datos de contacto y el consentimiento. Texto obligatorio junto a la disponibilidad: "Indica cuándo te queda mejor; el equipo propone el horario". Estados de dominio: los mismos que el diagnóstico. **Nunca** "agendada" sin una integración de agenda.

### 3.3 Cotización personalizada (`/cotizar`)

`solucion` (prellenada desde la ficha o elegida), `necesidad` (texto 20–1000), `alcanceEstimado` (opcional: usuarios, sedes o volumen, en texto libre ≤ 300), `plazoDeseado` (opcional: < 1 mes, 1–3 meses, > 3 meses, sin definir), más contacto y consentimiento. Para Desarrollo e Integraciones aparece la nota de activación real ya publicada ("se activa cuando tu empresa ya tiene el ERP y los Servicios Administrados en marcha…"). **No se muestra ningún precio ni rango.** Estado de dominio: `COTIZACION` dentro de `CommercialRequest` y, al calificar, una `Quote` en estado `BORRADOR` (Fase 6).

### 3.4 Contacto desde una ficha

Hoy: `/contacto?servicio=<linea>&mensaje=<texto>` (real, condicionado a A1). En la Fase 4 lo sustituye la matriz de § 2; `/contacto` queda para consultas generales.

## 4. Mensajes de confirmación

| Situación | Mensaje (borrador para revisión del negocio) |
|---|---|
| Prototipo (Fase 4) | **"Esta es una versión de prueba: revisamos que tus respuestas estén completas, pero esta solicitud no se guardó ni se envió a Evoltica."** + "Para hablar con el equipo ahora: [Enviar por el formulario de contacto] [WhatsApp]" |
| Validación | Resumen de errores al inicio del paso ("Revisa 2 campos") con enlaces a cada campo; error junto a cada campo |
| Error de servidor | "No pudimos procesar tu solicitud. No se guardó nada. Intenta de nuevo o escríbenos por WhatsApp." |
| Fase 5, con persistencia **y** notificación confirmadas | "Registramos tu solicitud **DIAG-XXXX**." Sin plazo de respuesta: el "4 horas hábiles" **no está aprobado** (D4-4, 2026-10-10) |
| Fase 5, persistida sin notificación confirmada | "Registramos tu solicitud **DIAG-XXXX**." (sin prometer contacto ni correo) |

## 5. Experiencia y accesibilidad

- El asistente muestra el paso (`Paso 2 de 4`) y permite volver sin perder respuestas (en memoria, no en `localStorage`, por tratarse de datos personales). Al cambiar de paso, el foco va al encabezado del paso.
- `fieldset`/`legend` en grupos de opciones; `label` en todos los campos; `aria-invalid` y `aria-describedby` en los errores; resumen de errores con foco; resultado anunciado con `role="status"`.
- Sin límites de tiempo; navegación completa con teclado; respeta `prefers-reduced-motion`; objetivos táctiles ≥ 44 px; móvil desde 320 px.
- Se reutilizan los patrones del sitio (chips con `aria-pressed`, `btn-primary`/`btn-secondary`, `SectionLabel`): no hay rediseño.

## 6. Protección contra abuso

| Medida | Fase 4 (prototipo) | Fase 5 (real) |
|---|---|---|
| Validación en servidor (server action / route handler) | Sí, con las mismas reglas que el cliente | Sí |
| Honeypot (campo oculto) + tiempo mínimo de llenado | Sí | Sí |
| Tamaños máximos del cuerpo y de cada campo | Sí | Sí |
| Límite de envíos por IP y por correo | No es necesario (nada se guarda ni se envía) | **Obligatorio**; necesita un almacén (decisión ADR-015) |
| CAPTCHA | No | Solo si aparece abuso (decisión de fricción) |
| Escape de la entrada al mostrarla | Sí (React escapa por defecto; nada de `dangerouslySetInnerHTML`) | Sí, también en correos y en el admin |

## 7. Diseño técnico (Fase 4)

```
app/(public)/diagnostico|consultoria|cotizar/page.tsx    UI (componentes cliente para los pasos)
  └─ server action  submitCommercialRequest(input)
        └─ lib/server/services/commercial-requests.ts   CommercialRequestService.submit(input)
              ├─ valida (lib/commercial/validation.ts, compartido con el cliente)
              └─ adaptador: "prototype" (devuelve { mode: "PROTOTYPE" }; no guarda, no envía)
                            "persistent" (Fase 5: repositorio + outbox de notificaciones)
lib/domain/commercial.ts    CommercialRequest, RequestKind (DIAGNOSTICO|CONSULTORIA|COTIZACION|CONTACTO),
                            RequestStatus, DiagnosticAnswers, ConsultationRequest, QuoteRequest, ContactData
```

- El adaptador de prototipo solo puede activarse en `next dev` (mismo criterio que el portal), salvo que se decida otra cosa (D4-1).
- Los slugs de solución se validan contra `PUBLISHED_SOLUTIONS`; los valores de listas cerradas, contra constantes tipadas.
- Las salidas reales reutilizan `/contacto?servicio=&mensaje=` (≤ 2000 caracteres) con un resumen generado de las respuestas.
- **Odoo:** fuera del alcance. En el futuro, un `CrmConnector` opcional podría sincronizar solicitudes calificadas en un solo sentido; ninguna pantalla dependería de él.

**Criterios de aceptación de la Fase 4:**
- Ningún texto afirma guardado, envío, recepción ni agenda.
- La validación es la misma en cliente y servidor.
- axe sin violaciones, recorrido completo con teclado y sin desbordes de 320 a 1440 px.
- lint, tsc y build en verde.
- El prototipo es inalcanzable en producción si así se decide (D4-1).

## 8. Requisitos para la Fase 5 (persistencia real)

### 8.1 Entidades

`Lead` (prospecto sin cuenta) · `Organization` · `Contact` · `CommercialRequest` (tipo, estado, referencia pública no secuencial, respuestas tipadas, origen [catálogo, ficha, home], solución, timestamps) · `RequestEvent` (historial de estados y notas del equipo) · `ConsentRecord` (versión de la política aceptada, fecha, IP o identificador técnico, finalidad) · `Notification`/`EmailMessage` (outbox con estado real) · `AuditEntry`. Las relaciones con `Quote`/`Order` siguen el documento de la [plataforma](2026-10-08-plataforma-comercial-b2b.md) § 4.

### 8.2 Identidad y autorización

- Las solicitudes públicas **no requieren cuenta**. El acceso a "mis solicitudes" en el portal llega por **invitación** tras calificar (ADR-014), con verificación de correo.
- El personal (COMERCIAL, ADMIN) ve y gestiona solicitudes solo en `/admin`, con autorización en el servidor por operación y MFA.
- Un cliente solo ve las solicitudes de su organización. Las referencias públicas no permiten consultar datos sin sesión (la página `/solicitud/[ref]` no muestra datos personales).

### 8.3 Auditoría

Se registra: creación de la solicitud (sin el contenido completo en el log), cada cambio de estado, cada lectura del personal sobre datos personales (si el negocio lo exige), las exportaciones y las supresiones. Inmutable y con retención definida.

### 8.4 Datos personales (Ley 1581 de 2012 — requisitos a validar con asesoría legal; **no** es un texto legal)

- Autorización previa, expresa e informada antes de guardar, con la **finalidad** declarada y la versión de la política registrada (`ConsentRecord`).
- Política de tratamiento publicada (la redacta Evoltica) y canal para consultas y reclamos (consulta, actualización, rectificación, supresión, revocatoria).
- Minimización: solo los campos de § 3; sin datos sensibles.
- Retención definida para prospectos que no avanzan, y procedimiento de supresión.
- Si la base de datos, el correo o la identidad están fuera de Colombia, se requiere la base legal de la transferencia internacional y un aviso.
- Seguridad: cifrado en tránsito y en reposo (según el hosting elegido), acceso de mínimo privilegio, copias de respaldo cifradas.

### 8.5 Notificaciones

- **Outbox transaccional:** la solicitud y su notificación se registran en la misma transacción; un proceso aparte la envía con reintentos e idempotencia.
- Estados: `PENDIENTE → ACEPTADO_POR_PROVEEDOR → ENTREGADO | REBOTADO | FALLIDO`. La interfaz solo dice "enviado" con `ACEPTADO_POR_PROVEEDOR` o un estado posterior.
- Aviso interno al equipo comercial y confirmación al prospecto (solo si el correo está configurado y verificado: SPF/DKIM/DMARC).

### 8.6 Requisitos no funcionales

Entornos separados (desarrollo, preview, producción) con datos de prueba aislados; migraciones versionadas y revisables; copias de respaldo con **restauración probada** (RPO/RTO definidos por el negocio); secretos solo en el servidor; observabilidad (errores y fallos de entrega con alerta); tests de contrato que pasan con el adaptador de prototipo y con el persistente; tests de aislamiento entre organizaciones.

## 9. Decisiones pendientes

**Antes de implementar la Fase 4 — resueltas el 2026-10-10**
1. **D4-1** ✅ Prototipo **solo en desarrollo**. En producción no se aceptan solicitudes: aviso informativo y canales directos.
2. **D4-2** ✅ `/api/contact` corregido: éxito solo con entrega confirmada por el canal (detalle en [SECURITY_GUIDE.md](../../SECURITY_GUIDE.md)).
3. **D4-3** ✅ Este documento es la base, con la revisión de datos mínimos de § 10.
4. **D4-4** ❌ **No aprobado.** El "4 horas hábiles" se retiró de todo el sitio y no se usa en estos flujos.
5. **D4-5** ✅ Logo en dos líneas solo donde falta espacio (< 375 px y 1024–1279 px) y micrófono retirado.

**Antes de implementar la Fase 5**
6. Hosting de PostgreSQL, acceso a datos (Drizzle o Prisma) y proveedor de identidad (ADR-015).
7. Proveedor de correo transaccional y dominio verificado.
8. Almacén para el límite de envíos y política de CAPTCHA.
9. Política de tratamiento de datos, finalidades, retención y canal de derechos (Evoltica y asesoría legal).
10. RPO/RTO y responsable de la operación (copias de respaldo, alertas).
11. Si alguna vez se integrará un CRM u Odoo (conector opcional) y en qué sentido.

## 10. Implementación (2026-10-10)

### Qué existe

| Pieza | Ubicación |
|---|---|
| Rutas (noindex, fuera del sitemap) | `app/(public)/diagnostico`, `consultoria`, `cotizar` — `?solucion=<slug>` preselecciona si el slug está publicado |
| Server action | `app/(public)/actions.ts` → `submitCommercialRequestAction(kind, formData)` |
| Servicio de aplicación | `lib/server/services/commercial-requests.ts`: producción → `UNAVAILABLE` sin procesar datos; `next dev` → valida y responde `PROTOTYPE` (no guarda ni envía) |
| Bandera | `COMMERCIAL_PROTOTYPE_ENABLED` en `lib/server/env.ts` (= `next dev`; ninguna variable de entorno la activa) |
| Dominio | `lib/domain/commercial.ts` (listas cerradas, entradas tipadas y el contrato `CommercialRequest` de la Fase 5) |
| Validación compartida | `lib/commercial/validation.ts` (cliente y servidor), etiquetas en `options.ts`, resumen en `summary.ts` |
| UI | `components/commercial/*` y `hooks/useCommercialForm.ts` |

### Revisión de datos mínimos (cambios frente a § 3)

- **Teléfono opcional:** el correo basta para responder; el teléfono solo si la persona prefiere WhatsApp.
- **Sector opcional** en el diagnóstico; el tamaño sigue siendo obligatorio (dimensiona el alcance).
- **Sin casilla de consentimiento:** no hay política de tratamiento publicada y el prototipo no guarda nada. Se muestra una nota y la autorización (Ley 1581, `ConsentRecord`) queda como **requisito de la Fase 5**.
- **Cotización:** la solución llega **preseleccionada pero editable** (no bloqueada) desde `?solucion=`.
- **Honeypot** activo; el tiempo mínimo de llenado y el límite por IP quedan para la Fase 5 (nada se guarda ni se envía hoy).

### Mensajes vigentes

| Situación | Texto |
|---|---|
| Prototipo (dev) | "Versión de prueba: revisamos que tus respuestas estén completas, pero esta solicitud no se guardó ni se envió a Evoltica." + WhatsApp y correo con el resumen precargado (la persona lo envía desde su aplicación) |
| Producción | "Este formulario todavía no está habilitado. Aún no podemos recibir ni guardar solicitudes por aquí de forma segura…" + WhatsApp y correo |
| Error de servidor | "No pudimos procesar tu solicitud y no se guardó nada. Intenta de nuevo o escríbenos por WhatsApp." |

### Sin cambios a propósito

- Las fichas del catálogo **siguen apuntando a `/contacto`** (§ 2): los nuevos formularios no reciben solicitudes reales, así que no se enlazan desde el sitio público. La matriz de § 2 se aplicará con la Fase 5.
- Sin "cita", "agendada", "recibida" ni plazos de respuesta en ningún texto.

### Cierre de correcciones (2026-10-10)

- Retiradas del sitio las afirmaciones comerciales sin aprobación (precios del FAQ, "5 días hábiles", "$0"/"sin costo", "24/7"); detalle en [BUSINESS_CONTEXT § Contenido sensible](../../BUSINESS_CONTEXT.md#contenido-comercial-y-legal-sensible).
- Retirada la frase de protección legal del formulario de contacto; los requisitos legales previos a almacenar datos están en [SECURITY_GUIDE](../../SECURITY_GUIDE.md).
- El mensaje de éxito de `/api/contact` dice solo que la solicitud se envió al canal de atención.
- El resumen de errores de los formularios sigue el orden visual de los campos (`order` de `ErrorSummary`).
- La configuración de `EMAIL_WEBHOOK_URL` en Vercel **no está verificada** (sin acceso desde el repositorio).

