# Auditoría de cierre de la Fase 3 (catálogo de soluciones)

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Verificar el catálogo `/soluciones` (ADR-014) y su impacto en el resto del sitio antes de diseñar la Fase 4. Incluye el diagnóstico del botón de micrófono y la propuesta para el header. **No se modificó código** en esta auditoría.

## Método y alcance

| Tipo | Qué se hizo |
|---|---|
| **Pruebas ejecutadas** | `npx tsc --noEmit`, `npm run lint` y `npm run build` en el repositorio real (`.next` borrado antes). Servidor de producción del repo (`next start`) con scripts Puppeteer y Chrome 64-bit, axe-core (WCAG 2.1 A/AA) y Lighthouse 12. |
| **Inspección manual** | Lectura del código de `lib/catalog.ts`, `lib/domain/catalog.ts`, `SolutionsCatalog`, `SolutionDetail`, `Navbar`, `Logo`, `HeroPrompt`, `app/api/contact/route.ts` y `next.config.ts`; revisión visual de capturas. |
| **No verificable** | Configuración real de Vercel (variables de entorno, dominio de producción); Safari y Firefox reales; lectores de pantalla reales (NVDA/VoiceOver); dispositivos físicos; indexación en Google. |

## Resultados de las pruebas ejecutadas

| Prueba | Resultado |
|---|---|
| `npx tsc --noEmit` (antes y después del build) | OK |
| `npm run lint` | Sin errores ni advertencias |
| `npm run build` | Compila; `/soluciones` estático, 31 fichas SSG |
| Catálogo y fichas | `/soluciones` 200; 31 fichas 200; slug inexistente 404; `/soluciones/` → 308 a `/soluciones` |
| Metadatos (32 páginas) | Título y descripción únicos por página, un `h1` por página, canonical propio, JSON-LD `Service` en cada ficha e `ItemList` en el catálogo, **ningún `Offer`/`price`** |
| Coherencia con `services-data.ts` | La descripción de cada ficha existe literal en el archivo fuente (31/31). Un primer falso positivo en `erp-integraciones` se debió a que mi script colapsó dos ítems llamados "Integraciones"; el texto coincide con la línea 252 |
| Contenido sensible visible | Ningún monto, testimonio, garantía ni cifra nueva en las 31 fichas |
| Enlaces internos | 46 únicos verificados, 0 rotos |
| Sitemap | 41 URLs, 32 del catálogo, 0 fichas ausentes, 0 rutas privadas (un falso positivo: `/admin` coincidía con `/administracion-*`) |
| Parámetros de URL | `?linea=xxx&modalidad=YYY&q=<script>…` → 200, sin reflejo del script; valores inválidos se ignoran |
| Filtros | Búsqueda, línea, modalidad y lectura inicial desde la URL funcionan; al volver de una ficha se conservan el filtro y el chip activo |
| Portal | `/app` y `/app/tickets/tk-1` → 307 a `/login?next=…`; `/admin` → 307 a `/login` |
| `CHECKOUT_ENABLED` | `false` (`lib/catalog.ts:198`), sin otros usos que lo activen |
| axe WCAG 2.1 AA | 0 violaciones en 4 páginas × 2 tamaños (1440 px y 390 px) |
| Teclado | Orden: búsqueda → 6 chips de línea → 3 de modalidad; `aria-pressed` correcto; foco visible; 0 controles sin nombre accesible |
| Responsive | Sin scroll horizontal en 360/390/768/1024/1280/1440 px; **desborde del header a 320–360 px** (ver A2) |
| Lighthouse `/soluciones` | Móvil: rendimiento 79, accesibilidad 100, buenas prácticas 100, SEO 100 (LCP 4,5 s, CLS 0,003). Escritorio: 93 / 100 / 100 / 100 (LCP 0,9 s, **CLS 0,138**) |
| Lighthouse ficha `erp-inventarios` | Móvil 91 / 100 / 100 / 100 (LCP 3,3 s). Escritorio 98 / 100 / 100 / 100 |

## Estado de los hallazgos (2026-10-10)

| Hallazgo | Estado |
|---|---|
| A1 `/api/contact` confirmaba sin entregar | **Corregido**: éxito solo con respuesta 2xx del canal; sin canal → 503, fallo o tiempo agotado (10 s) → 502, con salida a WhatsApp/correo |
| A2 header desbordado a 320–360 px | **Corregido**: nombre en dos líneas por debajo de 375 px; 0 px de desborde de 320 a 1600 px |
| M3 micrófono inoperante | **Corregido**: dictado por voz retirado de `HeroPrompt` |
| M4 solo isotipo entre 1024 y 1279 px | **Corregido**: nombre visible en dos líneas en ese rango; espaciado del menú ajustado solo ahí |
| B3 mención de SLA en fichas | Sin cambios (texto sin cifras ya publicado); pendiente de confirmación del negocio |
| Resto (M1, M2, B1, B2, B4–B6) | Sin cambios |

## Hallazgos

### Alta

**A1. `/api/contact` confirma la recepción aunque nada se entregue** *(preexistente; la Fase 3 aumenta la exposición)*
- `app/api/contact/route.ts` responde "Tu solicitud fue recibida. Te contactaremos en menos de 4 horas hábiles" en dos casos en que el mensaje no llega a nadie:
  1. sin `EMAIL_WEBHOOK_URL` configurada, la solicitud se descarta: en producción ni siquiera se registra en el log;
  2. si el webhook falla, el error solo se registra en el log ("Non-blocking: we still return success").
- Las 31 fichas del catálogo dirigen sus CTA a ese formulario. Contradice la regla de no afirmar recepción sin confirmación real.
- No verificable desde el repo: si la variable está configurada en Vercel.
- **Corrección recomendada** (requiere autorización: archivo protegido, AI_GUIDELINES § 12): responder éxito solo si el canal confirmó la entrega; si no hay canal o falla, responder error (503) con salida a WhatsApp/correo, y registrar el fallo para monitoreo.

**A2. Header móvil desbordado a 320–360 px** *(regresión de la Fase 3)*
- `whitespace-nowrap` en el wordmark (añadido en la Fase 3 para que no se partiera en escritorio) ensancha el logo a 177 px. A 360 px el botón del menú queda 11 px fuera de la pantalla; a 320 px, 51 px.
- Es el único acceso a la navegación en móvil. Corrección: ver § Propuesta de header.

### Media

**M1. CLS en la primera visita por intercambio de fuentes** *(preexistente; afecta al catálogo)*
- Medido en escritorio: `/contacto` 0,152, `/soluciones` 0,123, `/servicios` 0,073; fichas y `/nosotros` ≈ 0. En la segunda visita, con las fuentes en caché, baja a 0. Causa confirmada: el desplazamiento del hero y la sección siguiente coincide con la carga de Barlow Condensed/Inter (~240–350 ms).
- Corrección a evaluar: ajustar las métricas de la fuente de reserva de Barlow Condensed (`adjustFontFallback`/`size-adjust`) o `display: "optional"` para la condensada, y medir de nuevo. No se aplicó.

**M2. LCP móvil simulado de 4,5 s en `/soluciones`** (ficha: 3,3 s)
- Rendimiento móvil 79. La home ya tenía 4,5 s en una medición anterior. El `h1` del hero anima solo con `transform`, y Lighthouse no reportó el elemento LCP. **Causa no aislada**: requiere un trazado de rendimiento. El JS de la página es ~19 kB mayor que el de una ficha (169 kB frente a 150 kB de First Load).

**M3. Botón de micrófono visible pero inoperante en Chrome** *(preexistente)*. Ver § Diagnóstico del micrófono.

**M4. Entre 1024 y 1279 px el header muestra solo el isotipo.** El nombre de la empresa desaparece en un rango de uso frecuente (portátiles pequeños y tabletas en horizontal). Para una marca joven, reduce el reconocimiento. Ver § Propuesta de header.

### Baja

- **B1. Textos nuevos sin fuente de datos.** Las descripciones de modalidad (`MODE_META`), los leads del catálogo y de las fichas y algunos títulos de sección ("El alcance se define contigo.") son textos de la Fase 3. No contienen precios, SLA, testimonios ni garantías; son coherentes con el embudo (`ENGAGEMENT_STEPS`), pero el negocio debería revisarlos.
- **B2. "Ideal para"** muestra los tipos de cliente **de la línea** como si fueran de cada solución (solo en Consultoría y ERP). Sugerencia: titularlo "Clientes de esta línea".
- **B3. Mención de SLA.** "Tiempos de respuesta definidos por SLA" aparece en la ficha de Mesa de ayuda y en el bloque de relacionadas de su línea. Es texto ya publicado en `/servicios/servicios-administrados` y no tiene cifras, pero conviene confirmar que el negocio quiere repetirlo en las fichas.
- **B4. Dominio inconsistente** *(preexistente)*. `SITE_URL` por defecto es `evoltica.com.co` (sitemap, canonical, robots), pero el correo es `@evoltica.com`. No verificable cuál es el dominio de producción.
- **B5. Aviso de precarga.** Chrome avisa que el logo se precargó y no se usó a tiempo (`_next/image?url=/brand/logo.png&w=64`). Sin impacto funcional; la causa no se aisló.
- **B6. Filtros: escritura transitoria de la URL al montar.** El efecto que sincroniza la URL corre una vez con el estado inicial antes de leer los parámetros. Sin impacto observado (la URL final y el resultado son correctos).

## Diagnóstico del botón de micrófono

| Aspecto | Hallazgo |
|---|---|
| Ubicación | `components/ui/HeroPrompt.tsx` (botón "Dictar por voz"), usado en el hero de la home (`components/sections/Hero.tsx`) |
| Origen | Iteración de alineación con la referencia (ADR-010 § 4: "dictado por voz solo si el navegador lo soporta"). No es un requisito de negocio: no aparece en BUSINESS_CONTEXT ni en ningún flujo comercial |
| Funcionamiento esperado | Web Speech API (`SpeechRecognition`/`webkitSpeechRecognition`, `es-CO`): transcribe y añade el texto al campo |
| Funcionamiento real | `next.config.ts` envía `Permissions-Policy: microphone=()` a todo el sitio. En Chrome el botón **se muestra**, la política bloquea el micrófono (`document.featurePolicy.allowsFeature("microphone") === false`, `getUserMedia` → `NotAllowedError`) y el clic **no hace nada ni muestra aviso**: `onerror` solo restablece el estado (prueba: `aria-pressed` sigue en `false` a los 50 ms, 400 ms y 1,5 s, sin errores en consola). Firefox: sin API, el botón no aparece (por código). Safari: tiene `webkitSpeechRecognition`; **no verificado** si respeta la política |
| Privacidad | En Chrome, el reconocimiento de voz se procesa en servidores del proveedor del navegador. Habilitarlo implicaría tratar audio de visitantes, algo que debería cubrir la política de datos (pendiente) |
| Clasificación | Control heredado de una iteración visual: implementado en código, **inoperante en producción** |
| **Recomendación** | Retirar el botón y el código de dictado de `HeroPrompt` y conservar el campo de texto. Alternativa, si el negocio quiere voz: `microphone=(self)`, mensaje visible ante el error y cobertura en la política de datos. No se modificó nada |

## Propuesta de header (sin aplicar)

**Evaluación del isotipo solo (1024–1279 px):** cumple técnicamente (no desborda, el nombre queda para lectores de pantalla), pero el nombre de la marca desaparece de la vista en un rango común. Además, la misma restricción de espacio existe en móvil estrecho (A2).

**Alternativas medidas** (estilos inyectados en el navegador, sin tocar el código):

| Ancho | Actual | **A. Lockup apilado** (EVOLTICA / SOLUTIONS) | B. Una línea compacta + CTA más estrecho |
|---|---|---|---|
| 320 px | desborda 51 px | **0 px**, marca 84 px | desborda 26 px |
| 360 px | desborda 11 px | **0 px**, marca 84 px | 0 px |
| 1024 px | 0 px, marca oculta | **0 px**, marca 84 px | desborda 52 px |
| 1150 px | 0 px, marca oculta | **0 px** | 0 px |
| 1279 px | 0 px, marca oculta | **0 px** | 0 px |

**Recomendación: A, lockup apilado controlado** solo donde falta espacio (< 375 px y 1024–1279 px), y la línea única en el resto.
- Mantiene el nombre visible, corrige A2 y no rediseña nada: es la misma composición que el sitio mostraba sin querer antes de la Fase 3, ahora intencional (interlineado fijo, sin cortes arbitrarios).
- Cambio estimado: una variante responsive en `Logo` (clases del wordmark) y quitar `wordmarkClassName="lg:max-xl:sr-only"` en `Navbar`.
- Requiere aprobación como variante de uso del logo (ADR-005).
- **Alternativa de contenido:** sacar "Casos de éxito" del menú principal mientras no haya casos publicados (la página es `noindex`). Libera espacio sin tocar la marca, pero es una decisión de arquitectura de información.

## Referencias

- Diseño de la Fase 4 y requisitos de la Fase 5: [docs/architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md](../architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md)
- [ADR-014](../decisions/ADR-014-Commercial-Platform.md), [ADR-015](../decisions/ADR-015-Persistence-Identity.md), [ADR-010](../decisions/ADR-010-Reference-Alignment-Theme-Type.md), [ADR-005](../decisions/ADR-005-Brand-Guidelines.md)
