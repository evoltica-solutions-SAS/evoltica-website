# ADR-010: Tema claro/oscuro, tipografía condensada y experiencia de scroll

**Fecha**: 2026-10-08
**Estado**: Accepted — la experiencia de scroll fue retirada por [ADR-011](ADR-011-Brand-Intro-Cooldown.md); tema y tipografía siguen vigentes
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Tras las iteraciones de ADR-008 y ADR-009, el negocio pidió que el sitio se pareciera "tal cual" a la referencia (antpack.co/es). Copiar el sitio no es viable (identidad, textos, imágenes y tipografía con licencia de otra empresa), así que se acordó reproducir su **estructura de experiencia** con la identidad de Evoltica. La referencia tiene: intro cinematográfica recorrida con el scroll (con "Saltar experiencia"), hero enmarcado con titular condensado en mayúsculas, un campo "cuéntanos tu problema", tarjetas de servicio, interruptor claro/oscuro y selector de idioma.

Tres de esas piezas contradecían reglas protegidas: el sitio era **dark-only** (ADR-005), la tipografía de marca era **solo Inter + JetBrains Mono** (ADR-005) y la home no tenía intro de scroll. El negocio autorizó explícitamente los tres cambios (2026-10-08).

## Problema

¿Cómo incorporar tema claro, una tipografía condensada y una intro de scroll sin duplicar estilos por componente, sin dependencias nuevas y sin romper accesibilidad ni rendimiento?

## Alternativas consideradas

### Tema claro
- **Duplicar clases con variantes `dark:`/`light:` por componente** — Contras: cientos de cambios, deriva garantizada.
- **Tokens semánticos con variables CSS (elegida)** — `white`, `background`, `surface-*` y `slate-200…500` pasan a ser `rgb(var(--c-…) / <alpha>)`; `html.light` redefine las variables. Los componentes no cambian de clases. Se agregan tokens fijos (`snow`, `ink`) para lo que debe verse igual en ambos temas.

### Tipografía condensada
- **Kurdis (la de la referencia)** — Contras: licencia propietaria de otra marca.
- **Barlow Condensed vía `next/font` (elegida)** — libre (OFL), auto-alojada, pesos 300–700, solo para titulares grandes; Inter sigue para el resto.

### Intro de scroll
- **Secuencia de imágenes (como la referencia)** — Contras: no hay material propio; pesado.
- **SVG + transform ligado al scroll nativo (elegida)** — logo real → túnel de triángulos de la marca → "NOSOTROS ORDENAMOS PROCESOS / SISTEMAS / OPERACIONES", con "Saltar experiencia".

## Decisión

1. **Tema claro/oscuro** con tokens semánticos (`app/globals.css` → `:root` y `html.light`). Oscuro sigue siendo el tema de marca por defecto. `ThemeToggle` en el header; preferencia en `localStorage` aplicada antes del primer pintado por el script de `app/layout.tsx`. En claro, el verde como texto usa `primary-800` y el capítulo "síntomas" se invierte a tinta para conservar el cambio de capítulo.
2. **Barlow Condensed** (`font-display`) en mayúsculas para `text-display-hero/xl/lg/md`, el hero y la experiencia.
3. **`ScrollExperience`** al inicio de la home (reemplaza ahí a la intro de ADR-009, que sigue para la primera entrada en páginas internas). Scroll nativo, sin hijacking; oculta con `prefers-reduced-motion`.
4. **Hero enmarcado** con `HeroPrompt`: el texto viaja a `/contacto?mensaje=…` (sin IA; dictado por voz solo si el navegador lo soporta) y las cinco líneas de servicio en tarjetas.
5. **Selector de idioma: no se implementa todavía.** Un selector sin contenido traducido sería engañoso; se trata como Fase 17 del ROADMAP con contenido en inglés aprobado por el negocio.

## Consecuencias

- ADR-005 queda **modificado en parte**: la paleta y el logo siguen vigentes; "dark-only" y "solo Inter" dejan de aplicar.
- Todo componente nuevo debe usar los tokens semánticos (`white`, `background`, `surface-*`, `slate-200…500`) y `snow`/`ink` solo para superficies fijas. Un hex suelto romperá el tema claro.
- La home es más larga (≈ 280 vh de experiencia) antes del hero; el h1 sigue siendo el del hero.
- Reabrir si el negocio aporta material fotográfico para la experiencia (podría reemplazar el túnel SVG).

## Referencias

- [ADR-005-Brand-Guidelines.md](ADR-005-Brand-Guidelines.md) · [ADR-008](ADR-008-Visual-Language-Trama.md) · [ADR-009](ADR-009-Motion-Navigation-Experience.md)
- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
