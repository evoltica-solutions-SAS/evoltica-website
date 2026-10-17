# ADR-009: Experiencia de entrada, transiciones entre páginas y coreografía por capítulos

**Fecha**: 2026-10-08
**Estado**: Accepted — la intro por sesión fue reemplazada por [ADR-011](ADR-011-Brand-Intro-Cooldown.md); cortina y capítulos siguen vigentes
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Tras [ADR-008](ADR-008-Visual-Language-Trama.md) el sitio tenía identidad propia, pero la experiencia de *entrar* y *navegar* era plana: el contenido simplemente aparecía, todas las secciones usaban la misma entrada (fade + 30 px) y el cambio de página era un corte seco. El negocio pidió una experiencia con nivel de dirección artística comparable a referentes del sector (antpack.co/es como referencia de ritmo y movimiento, no de diseño), sin sacrificar rendimiento ni accesibilidad.

## Problema

¿Cómo convertir la entrada y la navegación en parte de la experiencia de marca sin bloquear el contenido, sin secuestrar el scroll, sin degradar Core Web Vitals y sin agregar dependencias?

## Alternativas consideradas

### Opción A — Librería de smooth-scroll / transiciones (Lenis, Barba, GSAP ScrollTrigger)
- Pros: efectos ricos listos para usar.
- Contras: dependencias nuevas, scroll no nativo (problemas de accesibilidad y en móvil), duplica capacidades de Framer Motion ya instalado.

### Opción B — View Transitions API de Next/React
- Pros: estándar del navegador.
- Contras: en Next 15.5 requiere React experimental (`unstable_ViewTransition`); no se cambia la versión de React por esto.

### Opción C — CSS + Framer Motion existentes, con reglas estrictas (elegida)
- Pros: cero dependencias; entradas above-the-fold en CSS (visibles sin esperar a React); animaciones solo de `transform`/`opacity`/`clip-path` puntual; scroll nativo.
- Contras: la transición entre páginas intercepta clics manualmente (hay que mantener sus reglas de exclusión).

## Decisión

1. **Intro de marca** (`components/layout/IntroLoader.tsx`, ~1,3 s, CSS puro): trazos del ápice → isotipo real → "EVOLTICA SOLUTIONS" → cortina. Un script inline en `app/layout.tsx` decide antes del primer pintado: corre solo en la **primera entrada de la sesión** (`sessionStorage`), nunca con `prefers-reduced-motion` ni sin JavaScript. El contenido ya está pintado debajo (no retrasa el LCP).
2. **Token `--intro-delay`**: el hero, el header y `PageHero` encadenan sus entradas a este token (1,05 s si la intro corre, 0 s si no).
3. **Transición entre páginas** (`components/layout/PageTransition.tsx`): cortina de tinta con el ápice (~0,3 s cubrir + ~0,45 s descubrir). Solo intercepta clics primarios a otra ruta interna; excluye pestañas nuevas, teclas modificadoras, descargas, externos, cambios solo de query/hash y reduced-motion. Tiene un failsafe que nunca deja la página tapada.
4. **Capítulos de la home**: oscuro → claro (síntomas, fondo que se abre con el scroll) → oscuro → imagen (casos, cuando existan) → oscuro → **verde de marca** (cierre). El formulario de contacto sale de la home y vive en `/contacto`; el cierre conduce ahí.
5. **Primitivas de motion**: `SplitReveal` (titulares por palabra/línea con máscara), `ChapterBackdrop` (fondo de capítulo ligado al scroll), `StrikeText`, `Magnetic` (solo puntero fino), vista previa contextual en servicios.
6. **Sin scroll hijacking**, sin loops decorativos, sin cursor personalizado global.

## Consecuencias

- La entrada y la navegación cuentan la historia de la marca con un costo de cero dependencias.
- Se acepta un clic más hasta el formulario desde la home (el CTA lleva a `/contacto` con transición). Revisar con datos de Analytics (Fase 6 del ROADMAP) si afecta la conversión.
- Cualquier enlace nuevo que no deba animarse (p. ej. descargas) debe marcarse con `download` o `rel="external"`.
- Reabrir si React/Next estabilizan View Transitions: podría reemplazar la intercepción manual.

## Referencias

- [DESIGN_SYSTEM.md § Motion](../../DESIGN_SYSTEM.md)
- [UX_GUIDE.md](../../UX_GUIDE.md)
- [ADR-008-Visual-Language-Trama.md](ADR-008-Visual-Language-Trama.md)
