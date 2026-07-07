# Experiencia de usuario y accesibilidad

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define los patrones de interacción, navegación y accesibilidad que hacen que el sitio se sienta coherente y sea usable por cualquier visitante, incluidos quienes usan teclado, lector de pantalla o tienen sensibilidad al movimiento.

## Alcance

Cubre: jerarquía de CTAs, navegación, comportamiento del menú móvil y del botón de WhatsApp, UX del formulario de contacto, y accesibilidad (semántica, foco, contraste, movimiento reducido).

No cubre: estilo visual de estos patrones (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni la validación de seguridad del formulario (ver [SECURITY_GUIDE.md](SECURITY_GUIDE.md)).

## Experiencia de usuario

- **Un solo objetivo de conversión por página**: cada sección debe empujar, directa o indirectamente, hacia el formulario de contacto (`#contacto`) o hacia WhatsApp. No agregues CTAs que compitan entre sí o que lleven a callejones sin salida. Ver el embudo comercial completo en [BUSINESS_CONTEXT.md § Embudo de conversión](BUSINESS_CONTEXT.md#embudo-de-conversión).
- **Jerarquía de CTAs**: un CTA primario (`btn-primary`, ej. "Solicitar Consultoría") y como máximo un CTA secundario (`btn-secondary`, ej. "Ver Servicios") por bloque. No dupliques el CTA primario visualmente varias veces en la misma vista salvo en Navbar (fijo) + sección activa, que es el patrón ya usado.
- **Navegación**: combina anclas de scroll suave (dentro de `/`) y rutas reales (`/servicios`). `useSectionNav` (`hooks/useSectionNav.ts`) centraliza el comportamiento de ir a una sección — reutilízalo en vez de escribir `scrollIntoView`/`scrollTo` ad-hoc en un componente nuevo. El offset fijo del header (80px, ver `Hero.tsx` y `Navbar.tsx`) debe respetarse en cualquier nuevo punto de navegación por ancla.
- **Estado activo de navegación**: el Navbar resalta la sección visible según scroll (`activeSection` en `Navbar.tsx`). Si agregas una sección nueva navegable por ancla, debe registrarse en `navLinks` para mantener esta coherencia.
- **Menú móvil**: overlay a pantalla completa con bloqueo de scroll del body mientras está abierto (`document.body.style.overflow`). Cualquier modal/drawer nuevo debe replicar este manejo de scroll-lock, no dejar que el fondo scrollee detrás del overlay.
- **WhatsApp flotante**: aparece con delay (1.5s) y muestra un globo de mensaje una sola vez de forma temporizada (`components/ui/WhatsAppButton.tsx`). Es un patrón deliberado de "asistencia proactiva pero no invasiva" — no lo conviertas en un popup inmediato ni recurrente en cada visita/scroll.
- **Formulario de contacto**: la validación en el cliente (React Hook Form) debe reflejar exactamente las reglas del servidor (`app/api/contact/route.ts`, ver [SECURITY_GUIDE.md](SECURITY_GUIDE.md)) para que el usuario nunca reciba un error que no pudo anticipar. Los mensajes de error deben ser específicos y en español, nunca genéricos ("Error").
- **Estados de carga y feedback**: cualquier acción asíncrona (envío de formulario) debe mostrar estado de carga y confirmación/error claros; no dejar botones sin feedback tras un click.
- **Mobile-first real**: la mayoría del tráfico de una landing de servicios B2B en Colombia es mixto desktop/mobile; prueba siempre el layout en viewport móvil antes de dar por buena una sección nueva.

## Accesibilidad

El sitio ya implementa una base de accesibilidad (skip link en `layout.tsx`, `aria-label` en botones icon-only, foco visible en el skip link) que debe mantenerse y extenderse, no retroceder.

- **Skip link**: `app/layout.tsx` incluye un enlace "Saltar al contenido principal" (`href="#main-content"`) visible solo en foco. No lo elimines ni lo ocultes permanentemente; si cambias la estructura de `<main>`, conserva el `id="main-content"`.
- **HTML semántico primero**: usa `<button>` para acciones, `<a>`/`<Link>` para navegación real, `<nav>`, `<header>`, `<footer>`, `<section>` con su rol implícito correcto. No uses `<div>` con `onClick` para nada interactivo.
- **Íconos sin texto** (botón de menú móvil, WhatsApp flotante, cerrar overlay) requieren `aria-label` descriptivo, como ya se hace en `Navbar.tsx` (`aria-label="Toggle menu"`) y `WhatsAppButton.tsx` (`aria-label="Contactar por WhatsApp"`). Todo ícono puramente decorativo debe llevar `aria-hidden="true"` (ver el SVG de WhatsApp).
- **Contraste**: el texto sobre fondo oscuro debe cumplir mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande). Los tonos `slate-500`/`slate-600` sobre `background` son límite — no los uses para texto de lectura extensa, solo para metadatos/labels secundarios pequeños, como ya se hace.
- **Foco de teclado**: todo elemento interactivo debe tener un estado `:focus`/`focus-visible` perceptible; no remuevas el outline por defecto sin reemplazarlo por un estilo de foco igual o más visible (el skip link ya define el patrón: `focus:ring-2 focus:ring-white`).
- **Formularios**: cada input debe tener un `<label>` asociado (no solo `placeholder`), mensajes de error anunciables (texto visible junto al campo, no solo color), y validación que no dependa únicamente del color para indicar error.
- **Movimiento**: respeta `prefers-reduced-motion` para animaciones de entrada y loops decorativos continuos (orbes, partículas, pulsos). Si Framer Motion no lo maneja automáticamente en un componente nuevo, condiciona la animación explícitamente a `!prefersReducedMotion`.
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
