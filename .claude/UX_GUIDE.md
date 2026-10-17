# Experiencia de usuario y accesibilidad

> **Versión**: 1.7 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define los patrones de interacción, navegación y accesibilidad que hacen que el sitio se sienta coherente y sea usable por cualquier visitante, incluidos quienes usan teclado, lector de pantalla o tienen sensibilidad al movimiento.

## Alcance

Cubre: jerarquía de CTAs, navegación, comportamiento del menú móvil y del botón de WhatsApp, UX del formulario de contacto, y accesibilidad (semántica, foco, contraste, movimiento reducido).

No cubre: estilo visual de estos patrones (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni la validación de seguridad del formulario (ver [SECURITY_GUIDE.md](SECURITY_GUIDE.md)).

## Experiencia de usuario

- **Un solo objetivo de conversión por página**: cada sección debe empujar, directa o indirectamente, hacia el formulario de contacto (`/contacto`) o hacia WhatsApp. Desde [ADR-009](docs/decisions/ADR-009-Motion-Navigation-Experience.md) la home no incluye el formulario: su cierre (`Finale`) lleva a `/contacto`. No agregues CTAs que compitan entre sí o que lleven a callejones sin salida. Ver el embudo comercial completo en [BUSINESS_CONTEXT.md § Embudo de conversión](BUSINESS_CONTEXT.md#embudo-de-conversión).
- **Jerarquía de CTAs**: un CTA primario (`btn-primary`, ej. "Solicitar Consultoría") y como máximo un CTA secundario (`btn-secondary`, ej. "Ver Servicios") por bloque. No dupliques el CTA primario visualmente varias veces en la misma vista salvo en Navbar (fijo) + sección activa, que es el patrón ya usado.
- **Navegación**: rutas reales con `next/link` (ver [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md)). La navegación principal vive en `MAIN_NAV` y el CTA global en `PRIMARY_CTA` (`lib/site-config.ts`). La home es una introducción (ADR-012): el detalle vive en su página (proceso y herramientas en `/servicios`, compromisos en `/nosotros`, preguntas frecuentes en `/contacto#faq`). Las anclas que existan se resuelven con CSS (`scroll-behavior: smooth` + `scroll-padding-top: var(--header-offset)` en `globals.css`) — no escribas `scrollIntoView`/`scrollTo` ad-hoc.
- **Estado activo de navegación**: el Navbar resalta la ruta actual (incluidas sus subrutas, p. ej. `/servicios/*`) con `aria-current="page"`. El ítem "Servicios" abre un menú desplegable (hover o clic; Escape y clic fuera lo cierran). La barra se oculta al bajar y reaparece al subir.
- **Campo del hero** (`HeroPrompt`): el texto viaja a `/contacto?mensaje=…` y precarga el mensaje del formulario. No hay IA: el copy dice que lo lee una persona.
- **Tema**: interruptor claro/oscuro (`role="switch"`) en el header; la preferencia persiste.
- **Entrada y transiciones**: la intro de marca (ADR-011) aparece en la primera visita y luego no vuelve hasta pasadas 6 h (`INTRO_COOLDOWN_MS` en `lib/intro.ts`): ni al refrescar, ni al navegar, ni en pestañas nuevas o tras reiniciar el navegador. En desarrollo, `?intro=1` la fuerza y `resetIntro()` en la consola la reinicia; entre páginas se usa una cortina breve (`PageTransition`). Ninguna de las dos aparece con `prefers-reduced-motion`. Un enlace interno que no deba animarse se marca con `download` o `rel="external"`.
- **Servicios (home)**: en escritorio la fila activa se marca con hover o foco de teclado; en táctil, al pasar por el centro de la pantalla.
- **Preselección de servicio**: los CTAs de servicio enlazan a `/contacto?servicio=<slug>`; `ContactForm` preselecciona ese servicio.
- **Menú móvil**: overlay a pantalla completa (`role="dialog"`, `aria-modal`) con bloqueo de scroll del body mientras está abierto (`document.body.style.overflow`); Escape lo cierra y devuelve el foco al botón. Cualquier modal/drawer nuevo debe replicar este manejo de scroll-lock, no dejar que el fondo scrollee detrás del overlay.
- **WhatsApp flotante**: aparece con delay (1.5s) y muestra un globo de mensaje una sola vez por sesión (`sessionStorage`), de forma temporizada (`components/ui/WhatsAppButton.tsx`). Es un patrón deliberado de "asistencia proactiva pero no invasiva" — no lo conviertas en un popup inmediato ni recurrente en cada visita/scroll.
- **Portal de clientes** (`/app`, ADR-012): navegación lateral por grupos (General, Mis servicios, Facturación, Soporte, Cuenta) con `aria-current`; en móvil, panel modal (Escape cierra y devuelve el foco). Filtros por formulario GET (funcionan sin JS y se comparten por URL). Toda lista tiene estado vacío y toda pantalla, estado de error; los estados de carga se agregan con `<Suspense>` en paneles de listados (no con `loading.tsx` sobre páginas de detalle: rompería el 404). Lo que aún no funciona se muestra deshabilitado con un aviso de integración pendiente, nunca simulado.
- **Catálogo** (`/soluciones`, ADR-014): el HTML trae todas las soluciones (sin JS y para SEO); búsqueda y filtros (línea, modalidad) se aplican en el navegador y se reflejan en la URL (`?linea=&modalidad=&q=`). Chips con `aria-pressed`, contador `aria-live`, estado vacío con salida a `/contacto`. Cada ficha tiene un CTA según su modalidad que hoy abre `/contacto` con servicio y mensaje precargados.
- **Header de escritorio**: con 5 ítems de menú, entre 1024 y 1279 px se muestra solo el isotipo (el texto de marca queda para lectores de pantalla) y los índices 01–05 desde 1280 px; el teléfono ya no está en el header de escritorio (sigue en el menú móvil, el footer y `/contacto`).
- **Formulario de contacto**: la validación en el cliente (React Hook Form) debe reflejar exactamente las reglas del servidor (`app/api/contact/route.ts`, ver [SECURITY_GUIDE.md](SECURITY_GUIDE.md)) para que el usuario nunca reciba un error que no pudo anticipar. Los mensajes de error deben ser específicos y en español, nunca genéricos ("Error").
- **Estados de carga y feedback**: cualquier acción asíncrona (envío de formulario) debe mostrar estado de carga y confirmación/error claros; no dejar botones sin feedback tras un click.
- **Mobile-first real**: la mayoría del tráfico de una landing de servicios B2B en Colombia es mixto desktop/mobile; prueba siempre el layout en viewport móvil antes de dar por buena una sección nueva.

## Accesibilidad

El sitio ya implementa una base de accesibilidad (skip link en `layout.tsx`, `aria-label` en botones icon-only, foco visible en el skip link) que debe mantenerse y extenderse, no retroceder.

- **Skip link**: `app/layout.tsx` incluye un enlace "Saltar al contenido principal" (`href="#main-content"`) visible solo en foco. No lo elimines ni lo ocultes permanentemente; si cambias la estructura de `<main>`, conserva el `id="main-content"`.
- **HTML semántico primero**: usa `<button>` para acciones, `<a>`/`<Link>` para navegación real, `<nav>`, `<header>`, `<footer>`, `<section>` con su rol implícito correcto. No uses `<div>` con `onClick` para nada interactivo.
- **Íconos sin texto** (botón de menú móvil, WhatsApp flotante, cerrar overlay) requieren `aria-label` descriptivo, como ya se hace en `Navbar.tsx` (`aria-label="Abrir menú"`/`"Cerrar menú"`) y `WhatsAppButton.tsx`. Todo ícono puramente decorativo debe llevar `aria-hidden="true"` (ver el SVG de WhatsApp).
- **Contraste**: el texto sobre fondo oscuro debe cumplir mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande). Los tonos `slate-500`/`slate-600` sobre `background` son límite — no los uses para texto de lectura extensa, solo para metadatos/labels secundarios pequeños, como ya se hace.
- **Foco de teclado**: todo elemento interactivo debe tener un estado `:focus`/`focus-visible` perceptible; no remuevas el outline por defecto sin reemplazarlo por un estilo de foco igual o más visible (el skip link ya define el patrón: `focus:ring-2 focus:ring-white`).
- **Formularios**: cada input debe tener un `<label>` asociado (no solo `placeholder`), mensajes de error anunciables (texto visible junto al campo, no solo color), y validación que no dependa únicamente del color para indicar error.
- **Movimiento**: `prefers-reduced-motion` se respeta globalmente (`MotionConfig reducedMotion="user"` + regla CSS en `globals.css`). Las animaciones manejadas por `useTransform` (no cubiertas por `MotionConfig`) deben condicionarse con `useReducedMotion()` si afectan la legibilidad. Nada de loops decorativos (ver [ADR-008](docs/decisions/ADR-008-Visual-Language-Trama.md)).
- **Navegación por teclado**: el menú móvil, cualquier overlay/drawer y el formulario deben ser completamente operables sin mouse (Tab, Shift+Tab, Enter, Escape para cerrar overlays).
- **Jerarquía de encabezados**: un único `h1` por página, `h2`/`h3` en orden lógico de lectura, nunca elegidos por tamaño visual (ver también [SEO_GUIDE.md](SEO_GUIDE.md)).

## Checklist rápida antes de dar por terminada una sección/flujo nuevo

- [ ] ¿Tiene un único CTA primario claro?
- [ ] ¿Funciona con teclado únicamente (Tab, Enter, Escape)?
- [ ] ¿Los íconos sin texto tienen `aria-label`?
- [ ] ¿Se probó en un viewport móvil real (`npm run dev`)?
- [ ] ¿Respeta `prefers-reduced-motion` si tiene animación de loop?
- [ ] ¿El copy es coherente con el tono de marca? (ver [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md))

## Referencias cruzadas

- [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) — el embudo de conversión que esta UX debe soportar.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — implementación visual de estos patrones.
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) — validación server-side del formulario de contacto.
- [prompts/uiux.md](prompts/uiux.md) y [prompts/accessibility.md](prompts/accessibility.md) — briefs condensados por tarea.
