# Sistema de diseño

> **Versión**: 2.0 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define el lenguaje visual único del sitio — color, tipografía, iconografía, movimiento y las clases utilitarias que lo implementan — para que cualquier componente nuevo se vea como si lo hubiera construido el mismo equipo que construyó el resto.

## Alcance

Cubre: tokens de marca (`tailwind.config.ts`), clases de componente (`app/globals.css`), tipografía, iconografía, motion, y reglas de uso de Tailwind.

No cubre: estructura de componentes React (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)) ni patrones de interacción/UX (ver [UX_GUIDE.md](UX_GUIDE.md)) — aunque ambos dependen de este sistema.

## Fuente de verdad

El sistema de diseño vive en dos lugares, y solo en esos dos lugares: **`tailwind.config.ts`** (tokens) y **`app/globals.css`** (clases de componente reutilizables, dentro de `@layer components`). No se define estilo de marca directamente dentro de un componente de sección.

## Dirección visual (v2, 2026-10)

Oscuro, sobrio y editorial: casi monocromo (blanco sobre fondo profundo), **un solo acento dominante** (el verde de marca) y el degradado verde → turquesa → azul del logo reservado como "firma" (líneas de progreso, bordes destacados, palabras clave del hero). Tipografía display grande y ajustada, etiquetas en mono mayúscula, mucho espacio negativo y superficies con borde fino en vez de brillos. El glassmorphism se mantiene solo donde aporta (navbar, tarjetas flotantes). Ver contexto en [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md).

## Paleta de marca

Definida en `tailwind.config.ts` → `theme.extend.colors`. La paleta de marca no cambia respecto de [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md).

| Token | Valor base | Uso |
|---|---|---|
| `primary` | `#12D56F` (verde) | Acento dominante: CTAs principales, foco, indicadores activos, íconos. |
| `secondary` | `#14A4BC` (turquesa) | Segundo tono del degradado de marca; detalles puntuales. |
| `accent` | `#0997D5` (azul) | Tercer tono del degradado de marca. |
| `navy` | `#001E3D` | Profundidad, fondos y gradientes oscuros. |
| `background` | `#0B0F19` | Fondo base del sitio (dark-only). |
| `ink` | `950 #070A11` · `900 #080B12` · `800 #0D1220` · `700 #121829` · `600 #1A2133` | Neutros de superficie derivados del fondo: footer, bandas, tarjetas elevadas. Reemplazan los hex sueltos (`#0D1220`, `#080B12`) que antes vivían en los componentes. |
| `slate` | escala 200–950 | Texto secundario y bordes. |

**Contraste de texto**: `text-slate-400` es el gris mínimo para texto de lectura o etiquetas pequeñas. `text-slate-500` solo se usa en titulares display (texto grande, ratio ≥ 3:1) como segunda frase atenuada (`<span className="text-slate-500">`).

**Ejemplo correcto / incorrecto:**
```tsx
<span className="text-primary-300">Texto destacado</span>     {/* ✅ */}
<div className="bg-ink-800">…</div>                            {/* ✅ */}
<span className="text-[#12D56F]">Texto destacado</span>       {/* ❌ arbitrario */}
<div className="bg-blue-900/50">…</div>                         {/* ❌ paleta genérica */}
```

Excepción documentada: el botón flotante de WhatsApp usa el verde oficial de WhatsApp (`#25D366`) porque representa la marca de un tercero.

## Tipografía

- **Sans**: `Inter` — texto general, UI y titulares.
- **Mono**: `JetBrains Mono` — etiquetas (`eyebrow`), numeración, badges de tecnología.

Ambas se cargan con **`next/font/google`** en `app/layout.tsx` (auto-alojadas, `display: swap`) y se exponen como variables CSS `--font-inter` / `--font-mono`, que consume `fontFamily` en `tailwind.config.ts`. No agregues otra familia sin autorización (ver [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md)).

**Escala tipográfica** (`tailwind.config.ts` → `fontSize`, fluida con `clamp`, tracking negativo incluido):

| Clase | Uso |
|---|---|
| `text-display-xl` | `h1` de hero y de páginas internas |
| `text-display-lg` | `h2` de sección principal |
| `text-display-md` | `h2` de sección secundaria, manifiesto |
| `text-display-sm` | Títulos de ítems grandes (índice de servicios, footer) |
| `text-lead` | Párrafo introductorio bajo un titular |

`cn()` (`lib/utils.ts`) registra esta escala en `tailwind-merge`; si agregas un tamaño nuevo a `fontSize`, agrégalo también ahí o `cn` lo descartará al combinarlo con un color (`text-lead text-slate-400`).

## Clases de componente reutilizables (`globals.css` → `@layer components`)

| Clase | Uso |
|---|---|
| `container-custom` | Ancho máximo (1360px) y gutters responsivos (20/32/48px) |
| `section-padding` | Padding vertical estándar de sección (88px → 136px en `lg`) |
| `eyebrow` (alias `section-label`) | Etiqueta mono mayúscula con cuadro verde; encabeza cada sección |
| `btn-primary` / `btn-secondary` | CTA principal (verde sólido) / secundario (borde fino). Píldora, alto mínimo 48px |
| `link-arrow` | Enlace de texto con flecha animada |
| `card` / `card-interactive` | Superficie con borde fino; `card-interactive` añade hover (borde verde + elevación) |
| `glass` / `glass-card` | Superficies translúcidas con blur (navbar, flotantes) |
| `border-gradient` | Borde con el degradado de marca (destacar un elemento, p. ej. Odoo) |
| `icon-tile` | Contenedor de ícono lucide (verde translúcido) |
| `tech-badge` | Badge mono para nombres de tecnologías |
| `gradient-text-blue` / `gradient-text` / `gradient-text-teal` | Texto con degradado (uso puntual: palabras clave del hero) |
| `grid-bg` + `mask-fade-b` / `mask-fade-x` | Retícula de fondo y máscaras de desvanecido |
| `input-field` / `select-field` | Campos de formulario (estado de error vía `aria-invalid`) |

Si una clase no cubre lo que necesitas, extiéndela en `globals.css`; no la dupliques con utilidades sueltas en el componente.

## Iconografía

Exclusivamente **`lucide-react`**, con `aria-hidden="true"` cuando es decorativa. Tamaños típicos `h-4 w-4` a `h-6 w-6`. Los ítems de servicio en `lib/services-data.ts` usan íconos lucide (ya no emojis). Única excepción: el SVG oficial de WhatsApp en `components/ui/WhatsAppButton.tsx`.

## Motion

Framer Motion con `MotionConfig reducedMotion="user"` global (`components/layout/MotionProvider.tsx`) y regla CSS de `prefers-reduced-motion` en `globals.css`. Arquetipos permitidos:

1. **Entrada de sección** (scroll): `opacity` + `y` 20–30px, `ease: [0.22, 1, 0.36, 1]`, 0.5–0.8s. Usa `Reveal`, `RevealGroup`/`RevealItem` (`components/ui/Reveal.tsx`), que reutilizan las variantes de `hooks/useScrollAnimation.ts`.
2. **Entrada above-the-fold** (CSS, sin JavaScript): clases `animate-rise` (palabras del titular), `animate-lift` (h1 y lead, solo transform — nunca opacidad, para no retrasar el LCP) y `animate-enter` (elementos secundarios). Se usan en el hero y en `PageHero`.
3. **Micro-interacciones** (menús, burbujas): `type: "spring", damping: 20–30, stiffness: 300`.
4. **Ligadas al scroll**: progreso de línea de tiempo (`useScroll` + `useSpring`), parallax suave del visual del hero, palabras que se "encienden" en el manifiesto. Máximo un efecto de este tipo por sección.
5. **Loops decorativos**: `animate-marquee`, `animate-spin-slow`, `animate-dash-flow`, `animate-pulse-soft` (CSS) o Framer con `repeat: Infinity, ease: "easeInOut"`, 2.5–6s.

Regla de oro: **Framer Motion sobreescribe `transform`**. Nunca pongas clases `translate-*`/`scale-*` de Tailwind en el mismo elemento que anima Framer; posiciona con un contenedor externo y anima el interno.

## Logo y marca

El logo vive en `public/brand/logo.png` y se renderiza vía `components/layout/Logo.tsx`. El PNG original tiene margen transparente superior; `Logo` lo encuadra con CSS (`scale`/`translate`) sin alterar el archivo. Cambios al logo o a la paleta requieren autorización explícita (ver [AI_GUIDELINES.md § 12](AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización) y [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md)).

## Reglas de uso de Tailwind

- Usa exclusivamente los tokens de marca (`primary`, `secondary`, `accent`, `navy`, `ink`, `background`, `slate`).
- Reutiliza las clases de componente de la tabla anterior.
- Usa `cn()` de `lib/utils.ts` para clases condicionales.
- **Mobile-first siempre**.
- El sitio es **dark-only** (`className="dark"` fijo en `<html>`). No agregues light mode sin que se pida explícitamente.
- Estilos inline (`style={{...}}`) solo para valores dinámicos (posiciones calculadas del visual del hero, `animationDelay` escalonado).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — reglas de componentes que consumen este sistema.
- [UX_GUIDE.md](UX_GUIDE.md) — aplicación a la experiencia de usuario y accesibilidad.
- [docs/decisions/ADR-003-Why-Tailwind.md](docs/decisions/ADR-003-Why-Tailwind.md) · [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md) · [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md)
