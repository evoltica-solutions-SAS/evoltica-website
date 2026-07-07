# Sistema de diseño

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define el lenguaje visual único del sitio — color, tipografía, iconografía, movimiento y las clases utilitarias que lo implementan — para que cualquier componente nuevo se vea como si lo hubiera construido el mismo equipo que construyó el resto.

## Alcance

Cubre: tokens de marca (`tailwind.config.ts`), clases de componente (`app/globals.css`), tipografía, iconografía, motion, y reglas de uso de Tailwind.

No cubre: estructura de componentes React (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)) ni patrones de interacción/UX (ver [UX_GUIDE.md](UX_GUIDE.md)) — aunque ambos dependen de este sistema.

## Fuente de verdad

El sistema de diseño vive en dos lugares, y solo en esos dos lugares: **`tailwind.config.ts`** (tokens) y **`app/globals.css`** (clases de componente reutilizables, dentro de `@layer components`). No se define estilo de marca directamente dentro de un componente de sección.

## Paleta de marca

Definida en `tailwind.config.ts` → `theme.extend.colors`. Cada color tiene su escala completa 50–950; usa el tono de la escala que corresponda al contraste necesario, no un valor arbitrario fuera de la paleta.

| Token | Valor base | Uso |
|---|---|---|
| `primary` | `#12D56F` (verde) | Color dominante, extraído del logo oficial. CTAs principales, acentos de éxito/foco. |
| `secondary` | `#14A4BC` (turquesa) | Color secundario de marca. |
| `accent` | `#0997D5` (azul) | Tercer color de marca. Reemplaza un acento morado anterior — ver [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md). Usado en gradientes y detalles. |
| `navy` | `#001E3D` | Profundidad, fondos y gradientes oscuros. |
| `background` | `#0B0F19` | Fondo base del sitio (dark-only). |
| `slate` | escala 400–950 | Neutros de texto secundario y fondos intermedios. |

**Ejemplo correcto:**
```tsx
<span className="text-primary-300">Texto destacado</span>
<div className="bg-navy-900/50">…</div>
```

**Ejemplo incorrecto** (no usar colores arbitrarios ni la paleta genérica de Tailwind):
```tsx
<span className="text-[#12D56F]">Texto destacado</span>  {/* ❌ arbitrario */}
<div className="bg-blue-900/50">…</div>                    {/* ❌ paleta genérica, no es la marca */}
```

Si hace falta un tono nuevo, agrégalo a la paleta de marca en `tailwind.config.ts`; no lo hardcodees en un componente.

## Tipografía

- **Sans**: `Inter` — texto general y UI. Pesos 300–900 ya cargados vía Google Fonts en `globals.css`.
- **Mono**: `JetBrains Mono` / `Fira Code` — usado en `tech-badge` para nombres de tecnologías.

No agregues otra familia tipográfica sin actualizar este documento y `tailwind.config.ts` (`theme.extend.fontFamily`).

**Escalado responsivo**: sigue la progresión ya usada en encabezados — `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl` para H1 (ver `Hero.tsx`), escalas equivalentes más pequeñas para H2/H3. No introduzcas una escala tipográfica paralela.

## Lenguaje visual

Estética "glassmorphism" oscura:

- Fondos `glass` / `glass-card` (blur + borde translúcido).
- `gradient-hero` y orbes difuminados de fondo (`blur-3xl`, `animate-pulse-slow`).
- Texto con gradiente de marca: `gradient-text`, `gradient-text-blue`, `gradient-text-teal`.
- Bordes con gradiente: `border-gradient`.
- Micro-glow en hover de elementos de marca: `shadow-glow`, `shadow-glow-teal`, `shadow-glow-blue`, clases utilitarias `glow-green`/`glow-teal`/`glow-blue`.

Estos patrones ya están encapsulados como clases de componente en `globals.css`; **reutilízalos en vez de recrearlos** con utilidades sueltas.

## Clases de componente reutilizables (`globals.css` → `@layer components`)

| Clase | Uso |
|---|---|
| `btn-primary` | CTA principal (fondo degradado verde, texto oscuro) |
| `btn-secondary` | CTA secundario (borde translúcido, fondo transparente) |
| `glass` / `glass-card` | Superficies con efecto vidrio esmerilado |
| `gradient-text` / `gradient-text-blue` / `gradient-text-teal` | Texto con gradiente de marca |
| `section-label` | Etiqueta pequeña de sección (uppercase, borde verde) |
| `container-custom` | Ancho máximo y padding responsivo del contenido |
| `section-padding` | Padding vertical estándar de sección |
| `input-field` | Campos de formulario |
| `tech-badge` | Badges de tecnología (fuente mono) |
| `grid-bg` / `noise-bg` | Texturas de fondo decorativas |

No reescribas el equivalente de estas clases con utilidades de Tailwind sueltas: si una clase no cubre exactamente lo que necesitas, extiéndela en `globals.css`, no la dupliques ad-hoc en el componente.

## Iconografía

Exclusivamente **`lucide-react`**. Tamaños típicos `w-4 h-4` a `w-6 h-6` según densidad. No mezcles otra librería de íconos ni SVGs sueltos, salvo casos ya establecidos por necesidad de marca (ej. el ícono oficial de WhatsApp en `components/ui/WhatsAppButton.tsx`, que debe usar el SVG de marca de WhatsApp, no un ícono genérico de chat).

## Motion (Framer Motion)

Tres arquetipos de animación ya establecidos. Cualquier animación nueva debe encajar en uno de estos tres, no inventar una curva/duración nueva sin razón:

1. **Entradas de sección**: `opacity`/`y` de 20–30px, `ease: [0.22, 1, 0.36, 1]`, duración 0.5–0.8s, activadas por scroll vía `useScrollAnimation` (`hooks/useScrollAnimation.ts`). Reutiliza las variantes ya exportadas (`fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `staggerContainer`) en vez de declarar variantes equivalentes nuevas.
2. **Micro-interacciones** (menús, tooltips, bubbles): `type: "spring", damping: 20-30, stiffness: 300`.
3. **Loops decorativos** (orbes, partículas, pulsos): `repeat: Infinity`, `ease: "easeInOut"`, duración 2.5–6s.

```tsx
// Patrón 1: entrada de sección
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

Ver también [UX_GUIDE.md § Reducción de movimiento](UX_GUIDE.md#accesibilidad) para el manejo de `prefers-reduced-motion`.

## Logo y marca

El logo vive en `public/brand/` y se renderiza vía `components/layout/Logo.tsx`. Es la única fuente autorizada del isotipo/logotipo — no lo recrees con texto + CSS en otro componente. Cambios al logo o a la paleta de marca requieren autorización explícita (ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización) y [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md)).

## Reglas de uso de Tailwind

- Usa exclusivamente los tokens de marca (`primary`, `secondary`, `accent`, `navy`, `background`, `slate`) en vez de colores arbitrarios (`bg-[#123456]`) o la paleta genérica de Tailwind (`bg-blue-500`).
- Reutiliza las clases de componente de la tabla anterior en vez de reescribir sus estilos con utilidades sueltas.
- Usa el helper `cn()` de `lib/utils.ts` (clsx + tailwind-merge) para componer clases condicionales; no concatenes strings de clases manualmente.
- **Mobile-first siempre**: escribe el estilo base para móvil y añade breakpoints (`sm:`, `lg:`, `xl:`) para escalar hacia arriba.
- El sitio es **dark-only** (`className="dark"` fijo en `<html>` de `app/layout.tsx`). No agregues variantes de light mode ni un toggle de tema sin que se pida explícitamente — este es un cambio de producto, no solo de estilo (coordinar con [ROADMAP.md](ROADMAP.md) si se plantea a futuro).
- No uses estilos inline (`style={{...}}`) salvo para valores verdaderamente dinámicos que Tailwind no puede expresar (como los `left`/`top` calculados por índice en las partículas de `Hero.tsx`).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — reglas de componentes que consumen este sistema.
- [UX_GUIDE.md](UX_GUIDE.md) — cómo se aplican estos patrones a la experiencia de usuario y accesibilidad.
- [docs/decisions/ADR-003-Why-Tailwind.md](docs/decisions/ADR-003-Why-Tailwind.md) — por qué Tailwind es la base de estilos.
- [docs/decisions/ADR-005-Brand-Guidelines.md](docs/decisions/ADR-005-Brand-Guidelines.md) — decisión e historia de la paleta e identidad visual.
