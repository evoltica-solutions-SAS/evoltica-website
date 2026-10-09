# Sistema de diseño

> **Versión**: 3.4 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define el lenguaje visual único del sitio — color, tipografía, iconografía, movimiento y las clases utilitarias que lo implementan — para que cualquier componente nuevo se vea como si lo hubiera construido el mismo equipo que construyó el resto.

## Alcance

Cubre: tokens de marca (`tailwind.config.ts`), clases de componente (`app/globals.css`), tipografía, iconografía, motion, y reglas de uso de Tailwind.

No cubre: estructura de componentes React (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)) ni patrones de interacción/UX (ver [UX_GUIDE.md](UX_GUIDE.md)) — aunque ambos dependen de este sistema.

## Fuente de verdad

El sistema de diseño vive en dos lugares, y solo en esos dos lugares: **`tailwind.config.ts`** (tokens) y **`app/globals.css`** (clases de componente reutilizables, dentro de `@layer components`). No se define estilo de marca directamente dentro de un componente de sección.

## Dirección visual (v3, 2026-10)

Editorial, preciso y propio — ver [ADR-008](docs/decisions/ADR-008-Visual-Language-Trama.md). La pregunta de control para cualquier pieza nueva es: *¿esto parece específicamente Evoltica, o podría pertenecer a otras 500 empresas de software?*

- **Casi monocromo**: blanco sobre fondo profundo; el verde de marca es **acento puntual** (una palabra clave, numeración, CTA). Tiene más impacto porque aparece poco.
- **La trama** es el único lugar donde vive el degradado verde → turquesa → azul (ver sección propia más abajo).
- **Tipografía protagonista**: titulares enormes con contraste de pesos (600 frente a 300), saltos de línea intencionales y sangrías asimétricas.
- **Ritmo**: cada sección usa un patrón de composición distinto. No repetir "título + subtítulo + 3 tarjetas".
- **Esquinas casi rectas** (3–4 px), bordes finos, sin glow, sin orbes difuminados, sin retícula de fondo, sin elementos flotando alrededor del contenido.
- **Capítulos**: oscuro → claro (`.band-light`) → oscuro → imagen (casos) → oscuro → **verde de marca** (cierre, `Finale`). El verde sólido a pantalla completa aparece una sola vez, al final; el sitio sigue siendo dark-only. Sobre verde, el foco usa `.on-accent`.

## La trama (gráfico de marca)

`components/ui/Trama.tsx`. Toma el **ápice plegado** del isotipo — dos cintas a 60° que forman una "A" — y una cinta horizontal tejida por encima y por debajo.

- Se usa **grande y recortada** por el borde de la pantalla (hero, `PageHero`, `CtaBand`, cierre de la home, 404), nunca centrada ni completa.
- **Prohibido** dibujar los dos triángulos completos superpuestos: a gran escala el hexagrama se lee como un símbolo religioso y deja de ser Evoltica.
- No sustituye al logo (`Logo.tsx` sigue siendo la única firma de marca).
- Su ventana triangular muestra un rayado a 60° (`.hatch-60`) o una fotografía real registrada en `lib/media.ts`.
- Animación: trazado único al cargar (`animate-draw`) y rotación leve ligada al scroll en el hero. Nada en loop.

## Paleta de marca

Definida en `tailwind.config.ts` → `theme.extend.colors`. La paleta de marca no cambia respecto de [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md).

| Token | Valor base | Uso |
|---|---|---|
| `white` (semántico) | `--c-fg`: blanco en oscuro, tinta en claro | Primer plano: `text-white`, `border-white/[0.1]`, `bg-white/[0.04]` se invierten con el tema |
| `surface-deep` / `surface-alt` / `surface-raised` | variables por tema | Fondos de capítulo, header, footer, tarjetas elevadas |
| `snow` | `#FFFFFF` fijo | Texto sobre superficies oscuras en ambos temas |
| `primary` | `#12D56F` (verde) | Acento dominante: CTAs principales, foco, indicadores activos, íconos. |
| `secondary` | `#14A4BC` (turquesa) | Segundo tono del degradado de marca; detalles puntuales. |
| `accent` | `#0997D5` (azul) | Tercer tono del degradado de marca. |
| `navy` | `#001E3D` | Profundidad, fondos y gradientes oscuros. |
| `background` | variable (`#0B0F19` en oscuro / `#F7F8FA` en claro) | Fondo base del tema activo. |
| `navy-50` / `navy-900` | `#F0F2F3` / `#000B16` | Fondo y texto de la banda clara de contraste (`.band-light`). En ella, el verde para texto es `primary-800`. |
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

- **Display**: `Barlow Condensed` (`font-display`) — titulares grandes en mayúsculas (`text-display-hero/xl/lg/md`, hero, experiencia). Ver [ADR-010](docs/decisions/ADR-010-Reference-Alignment-Theme-Type.md).
- **Sans**: `Inter` — texto general, UI y titulares pequeños.
- **Mono**: `JetBrains Mono` — etiquetas (`eyebrow`), numeración, badges de tecnología.

Ambas se cargan con **`next/font/google`** en `app/layout.tsx` (auto-alojadas, `display: swap`) y se exponen como variables CSS `--font-inter` / `--font-mono`, que consume `fontFamily` en `tailwind.config.ts`. No agregues otra familia sin autorización (ver [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md)).

**Escala tipográfica** (`tailwind.config.ts` → `fontSize`, fluida con `clamp`, tracking negativo incluido):

| Clase | Uso |
|---|---|
| `text-display-hero` | Titulares de máxima escala (hero, cierre de la home) |
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
| `eyebrow` (alias `section-label`) | Etiqueta mono mayúscula con línea verde; admite número de sección (`<SectionLabel index="02">`, clase `eyebrow-index`) |
| `btn-primary` / `btn-secondary` | CTA principal (verde sólido, blanco al hover) / secundario (borde fino). Esquinas de 3 px, alto mínimo 52px |
| `numeral-outline` | Numerales gigantes en contorno (índice de servicios) |
| `band-light` | Sección clara de contraste (tokens `navy-50`/`navy-900`) |
| `hatch-60` | Rayado a 60° (ventana de la trama) |
| `link-arrow` | Enlace de texto con flecha animada |
| `card` / `card-interactive` | Superficie con borde fino y radio de 4 px; `card-interactive` añade borde verde al hover |
| `glass` / `glass-card` | Superficies translúcidas con blur (navbar, flotantes) |
| `border-gradient` | Borde con el degradado de marca (uso excepcional: destacar Odoo en su página) |
| `icon-tile` | Contenedor de ícono lucide (verde translúcido) |
| `tech-badge` | Badge mono para nombres de tecnologías |
| `gradient-text-blue` / `gradient-text` / `gradient-text-teal` | Texto con degradado (uso puntual: palabras clave del hero) |
| `grid-bg` + `mask-fade-b` / `mask-fade-x` | Retícula de fondo y máscaras. **En desuso** desde ADR-008; no usar en secciones nuevas |
| `input-field` / `select-field` | Campos de formulario (estado de error vía `aria-invalid`) |

Si una clase no cubre lo que necesitas, extiéndela en `globals.css`; no la dupliques con utilidades sueltas en el componente.

## Portal de clientes (`components/portal/`)

Misma identidad (tokens, tema, logo), otra densidad: Inter en tamaños de interfaz; la condensada solo en el título de cada pantalla y en las cifras del dashboard; sin capítulos, trama ni animaciones de scroll. Superficies `bg-surface-alt` con borde `white/[0.08]`, radio `rounded-md`.

**Estados** (`StatusBadge`, `lib/portal/labels.ts`), solo con la paleta de marca: éxito `primary`, progreso `secondary`, información `accent`, neutro/apagado `slate`, y **atención** = alto contraste (`white`) + ícono ⚠. No hay rojo ni ámbar: añadirlos es un cambio de paleta que requiere autorización. El estado siempre va escrito: el color nunca es la única señal.

## Iconografía

Exclusivamente **`lucide-react`**, con `aria-hidden="true"` cuando es decorativa. Tamaños típicos `h-4 w-4` a `h-6 w-6`. Los ítems de servicio en `lib/services-data.ts` usan íconos lucide (ya no emojis). Única excepción: el SVG oficial de WhatsApp en `components/ui/WhatsAppButton.tsx`.

## Motion

Ver [ADR-009](docs/decisions/ADR-009-Motion-Navigation-Experience.md). Framer Motion con `MotionConfig reducedMotion="user"` global y regla CSS de `prefers-reduced-motion` (anula duración **y retraso** de toda animación CSS). Una sola curva editorial: `--ease-editorial` / `[0.22, 1, 0.36, 1]`; cortinas con `--ease-curtain` / `[0.76, 0, 0.24, 1]`.

**Coreografía de entrada**
- **Intro de marca** (`BrandIntro`, CSS puro, 1,6 s, [ADR-011](docs/decisions/ADR-011-Brand-Intro-Cooldown.md)): el isotipo real se arma por piezas y abre la página por el hexágono de la "E". Una vez cada 6 h por navegador; nunca con reduced-motion ni sin JavaScript.
- **`--intro-delay`**: token CSS (1 s con intro, 0 s sin ella). Toda entrada above-the-fold se escribe como `animation-delay: calc(var(--intro-delay) + Xs)` para encadenarse al final de la intro. Orden del hero: eyebrow → titular → subtítulo → campo → texto de ayuda → tarjetas de servicio → trama.
- Clases CSS: `animate-rise` (línea tras máscara), `animate-lift` (solo transform; para el h1/lead, candidatos a LCP — nunca opacidad), `animate-enter` (secundarios), `animate-draw` (trama; retraso con `--trama-delay`).

**Arquetipos de scroll** (scroll nativo, sin hijacking)
1. **Entrada de sección**: `Reveal` / `RevealGroup` / `RevealItem`.
2. **Tipografía**: `SplitReveal` — titulares por palabra (`mode="words"`) o por línea (`mode="lines"`) tras máscara. Úsalo en titulares de capítulo, no en párrafos.
3. **Cambio de capítulo**: `ChapterBackdrop` — el fondo pasa de 90 % a sangre completa ligado al scroll (solo `transform`).
4. **Ligadas al scroll**: rotación de la trama del hero, trazado de la trama del cierre (`pathLength`), progreso de lectura bajo el header.
5. **Detalles**: `StrikeText` (tachado que se dibuja), apilado sticky del proceso, `scaleIn` de la cifra destacada.

**Microinteracciones**: subrayado `.link-underline`, barrido de fondo y numeral que crece en filas de servicio, vista previa que sigue al cursor (solo puntero fino), `Magnetic` (≤ 7 px, solo puntero fino). Sin cursor personalizado global, sin partículas, sin loops decorativos.

**Transiciones entre páginas**: `PageTransition` (cortina de tinta con el ápice). Ver reglas de exclusión en el ADR-009.

**Reglas de rendimiento**: animar solo `transform`, `opacity` y, de forma puntual (cortinas, máscaras de portada), `clip-path`. Nunca alto/ancho/top/left por frame. Framer Motion sobreescribe `transform`: nunca pongas `translate-*`/`scale-*` de Tailwind en el mismo elemento que anima Framer; usa un contenedor externo.

## Logo y marca

El logo vive en `public/brand/logo.png` y se renderiza vía `components/layout/Logo.tsx`. El PNG original tiene margen transparente superior; `Logo` lo encuadra con CSS (`scale`/`translate`) sin alterar el archivo. En el header de escritorio entre 1024 y 1279 px se muestra solo el isotipo (prop `wordmarkClassName` de `Logo`) para que quepa la navegación; el wordmark nunca se parte en dos líneas (`whitespace-nowrap`). Cambios al logo o a la paleta requieren autorización explícita (ver [AI_GUIDELINES.md § 12](AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización) y [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md)).

## Reglas de uso de Tailwind

- Usa exclusivamente los tokens de marca (`primary`, `secondary`, `accent`, `navy`, `ink`, `background`, `slate`).
- Reutiliza las clases de componente de la tabla anterior.
- Usa `cn()` de `lib/utils.ts` para clases condicionales.
- **Mobile-first siempre**.
- **Tema claro/oscuro** (ADR-010): oscuro es el de marca por defecto; `html.light` activa el claro. Usa siempre los tokens semánticos — `white` (primer plano), `background`, `surface-deep/alt/raised`, `slate-200…500` — que se invierten solos. `snow` (blanco fijo) e `ink` (tinta fija) solo para superficies que son oscuras en ambos temas (cortinas, botones de tinta, etiquetas sobre imagen). Nunca un hex suelto en un componente: rompe el tema claro.
- Estilos inline (`style={{...}}`) solo para valores dinámicos (posiciones calculadas del visual del hero, `animationDelay` escalonado).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — reglas de componentes que consumen este sistema.
- [UX_GUIDE.md](UX_GUIDE.md) — aplicación a la experiencia de usuario y accesibilidad.
- [docs/decisions/ADR-003-Why-Tailwind.md](docs/decisions/ADR-003-Why-Tailwind.md) · [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md) · [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md) · [ADR-008](docs/decisions/ADR-008-Visual-Language-Trama.md)
