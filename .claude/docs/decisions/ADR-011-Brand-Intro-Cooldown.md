# ADR-011: Intro de marca con el isotipo real y control por intervalo de tiempo

**Fecha**: 2026-10-08
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

ADR-009 introdujo una intro (`IntroLoader`) que se mostraba en la primera entrada de cada **sesión** (`sessionStorage`), y ADR-010 añadió en la home una experiencia recorrida con el scroll (`ScrollExperience`). En uso real, la intro reaparecía al cerrar y reabrir la pestaña o el navegador, y se percibía como una pantalla de carga, no como un momento de marca. El negocio pidió (2026-10-08) una intro que:

- construya el isotipo real a partir de sus piezas y luego **abra la página** a través del propio logo;
- dure ~1,2–1,8 s y deje la página totalmente estable después;
- se muestre la primera vez y luego **no vuelva** hasta pasado un intervalo configurable (6 h), sin reaparecer en refrescos, navegación interna, pestañas nuevas ni reinicios del navegador;
- tenga herramientas de reinicio solo en desarrollo.

## Problema

¿Cómo decidir antes del primer pintado si la intro corre, persistiendo entre pestañas y reinicios, sin bloquear el LCP ni añadir dependencias, y cómo convertir el logo en la transición hacia el hero?

## Alternativas consideradas

### Conceptos de animación
- **A — Construcción**: el isotipo se arma por piezas y se desvanece. Fiel a la marca, pero el final es un fundido: "loading" otra vez.
- **B — Máscara**: el logo completo crece y se vuelve máscara que revela la página. Transición fuerte, pero el logo aparece ya hecho.
- **C — Invasión del viewport**: el logo crece hasta cubrir la pantalla y se retira. Más pesado, tapa el hero más tiempo y deja un "logo gigante" en la memoria visual.
- **Elegido — A + B**: construcción en piezas (A) y apertura por el hexágono central de la "E" (B). El logo cuenta su origen y luego literalmente abre la página.

### Persistencia
- `sessionStorage` (ADR-009): muere con la pestaña → la intro reaparece al reabrir. Descartado.
- Cookie + render en servidor: obliga a renderizar dinámicamente la home (pierde el estático) por un detalle visual. Descartado.
- **`localStorage` con timestamp + script inline en `<head>`**: persiste entre pestañas y reinicios, se lee antes del primer pintado, la página sigue siendo estática. Elegido.

## Decisión

- **Control** (`lib/intro.ts`): `INTRO_COOLDOWN_MS` (6 h) y `INTRO_STORAGE_KEY` (`evoltica-intro-at`). `buildHeadScript()` genera el script inline de `<head>` que aplica el tema guardado y marca `html[data-intro="play"|"seen"]`: `play` si no hay marca o pasó el cooldown (y entonces guarda `Date.now()`); nunca con `prefers-reduced-motion`; si `localStorage` falla, `seen`.
- **Solo en desarrollo** (`NODE_ENV === "development"`): `?intro=1` fuerza la intro y `window.resetIntro()` borra la marca. En producción el script no los contiene.
- **Animación** (`components/layout/BrandIntro.tsx`, componente de servidor; coreografía en `globals.css`, `.brand-intro*`): línea a 60° → seis sectores del PNG real del isotipo (recortados con `clip-path`, solapados para no dejar costuras) encajan desde su dirección → la "E" central → pausa → un velo con agujero hexagonal (`clip-path: polygon(evenodd…)`) se abre desde el hexágono de la "E" hasta cubrir la pantalla, acompañado por un contorno verde que escala con él, mientras el isotipo se disuelve. Total 1,6 s (`INTRO_DURATION_S`). Solo `transform`, `opacity` y `clip-path`; JavaScript solo decide el estado.
- **Encadenado**: `--intro-delay` vale 1 s con intro (el hero entra cuando el hexágono empieza a abrirse). El hero escalona eyebrow → titular → subtítulo → campo → texto de ayuda → tarjetas. `PageTransition` pasa `data-intro` a `seen` al terminar, para que las rutas siguientes entren sin retraso.
- Se eliminan `IntroLoader` (ADR-009) y `ScrollExperience` (ADR-010).

## Consecuencias

### Positivas
- La intro aparece una vez cada 6 h por navegador; refrescos, navegación, pestañas y reinicios no la repiten.
- La página está pintada debajo desde el inicio: CLS 0 y LCP sin penalización medible.
- El cooldown se ajusta en una sola constante.

### Negativas
- Con almacenamiento bloqueado o modo privado estricto la intro no se muestra (se prefiere no mostrarla a mostrarla siempre).
- El recorte de piezas depende de la geometría de `public/brand/logo.png` (centro en 50 % / 62,55 %): si el archivo cambia, hay que recalcular `CX`, `CY` e `INNER` en `BrandIntro.tsx`.

## Relación con otras decisiones

- **Reemplaza en parte** a [ADR-009](ADR-009-Motion-Navigation-Experience.md) (la intro por sesión; la transición de cortina y la coreografía por capítulos siguen vigentes) y a [ADR-010](ADR-010-Reference-Alignment-Theme-Type.md) (la experiencia de scroll; tema y tipografía siguen vigentes).
