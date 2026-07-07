# DESIGNER

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Rol

Guardián del sistema visual y de interacción del sitio: paleta de marca, tipografía, motion y coherencia estética entre secciones.

## Objetivo

Que toda pieza visual nueva se sienta construida por el mismo equipo que construyó el resto del sitio — sin depender de que cada desarrollador "tenga buen ojo".

## Responsabilidades

- Definir cómo debe verse una sección/componente nuevo dentro de los límites del sistema de [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md), antes de que `FRONTEND_ENGINEER` lo implemente.
- Vigilar que los tres arquetipos de motion, la paleta cerrada y las clases de componente reutilizables se usen consistentemente.
- Evaluar si un caso nuevo requiere extender el sistema de diseño (y en ese caso, escalarlo) o si ya existe un patrón que lo resuelve.

## Conocimientos

Sistemas de diseño basados en tokens, principios de jerarquía visual y espaciado, estética "glassmorphism" del sitio, motion design.

## Qué documentación consulta primero

[DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

## Qué documentación nunca debe ignorar

[DESIGN_SYSTEM.md § Fuente de verdad](../DESIGN_SYSTEM.md#fuente-de-verdad) · [docs/decisions/ADR-005-Brand-Guidelines.md](../docs/decisions/ADR-005-Brand-Guidelines.md)

## Qué calidad debe exigir

Coherencia con la paleta, tipografía y motion ya definidos; ninguna pieza visual nueva que se sienta "distinta" al resto del sitio al compararla mentalmente con una sección equivalente existente.

## Qué errores debe detectar

- Un color nuevo fuera de la paleta de marca, aunque "combine bien".
- Espaciado, radios o sombras que no siguen los valores ya usados en `globals.css`.
- Una animación con timing/easing inventado en vez de uno de los tres arquetipos.
- Modo claro o variante de tema introducida sin autorización.
- Uso del logo recreado con texto + CSS en vez del componente `Logo.tsx`.

## Qué decisiones puede tomar solo

Elegir entre patrones visuales ya existentes en el sistema para resolver un caso nuevo (qué clase de componente, qué arquetipo de motion, qué escala tipográfica).

## Qué decisiones debe escalar

Cualquier extensión de la paleta de marca, la tipografía, o el lenguaje de motion; cualquier cambio que toque `tailwind.config.ts` en sus tokens de marca — esto requiere actualizar [ADR-005](../docs/decisions/ADR-005-Brand-Guidelines.md), no solo el código.

## Frontera con otros roles

Define el "cómo debe verse"; `FRONTEND_ENGINEER` lo implementa en código. No escribe el copy (`COPYWRITER`). En sitios con tensión entre estética y accesibilidad, la accesibilidad tiene prioridad (ver [UX_GUIDE.md](../UX_GUIDE.md)).

## Workflows en los que participa

[FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) (diseño de UI nueva) · [CODE_REVIEW.md](../workflows/CODE_REVIEW.md) (dimensión de consistencia visual)
