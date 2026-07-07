# ADR-003: Por qué Tailwind CSS como sistema de estilos

**Fecha**: 2026-07-07 (documentado retroactivamente; la decisión ya estaba implementada — ver nota en [docs/decisions/README.md](README.md))
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

El sitio necesita un sistema de estilos que soporte una identidad visual de marca fuerte y consistente (paleta propia, efectos "glassmorphism", gradientes — ver [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)) mientras se construyen decenas de secciones y componentes, manteniendo consistencia visual sin un equipo de diseño dedicado a supervisar cada PR.

## Problema

¿Qué enfoque de estilos usar: utilidades atómicas, CSS-in-JS, CSS Modules, o una librería de componentes preconstruida?

## Alternativas consideradas

### Tailwind CSS
- Pros: utilidades atómicas que permiten construir UI compleja sin salir del archivo del componente; tokens de diseño centralizables en `tailwind.config.ts` (paleta de marca, tipografía, animaciones — ver [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)); purga automática de CSS no usado (bundle final pequeño); integración de primera clase con Next.js; permite encapsular patrones repetidos como clases de componente (`@layer components` en `globals.css`) sin perder la velocidad de las utilidades.
- Contras: JSX con muchas clases puede volverse denso de leer; requiere disciplina para no romper la consistencia (mitigado por las reglas de [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)).

### CSS-in-JS (styled-components, Emotion)
- Pros: co-localización de estilos y lógica, theming dinámico en runtime.
- Contras: costo de rendimiento en runtime (relevante para el objetivo de LCP bajo, ver [PERFORMANCE_GUIDE.md](../../PERFORMANCE_GUIDE.md)); menos alineado con el modelo de Server Components de Next.js 15, donde gran parte del árbol no debería requerir JS de cliente para estilos.

### Librería de componentes preconstruida (MUI, Chakra, Ant Design)
- Pros: velocidad inicial de desarrollo, componentes accesibles por defecto.
- Contras: identidad visual genérica difícil de alejar del "look" por defecto de la librería, en un proyecto donde la identidad de marca (paleta verde/turquesa/azul, glassmorphism oscuro) es un diferenciador deliberado; peso de bundle mayor del necesario para las necesidades reales del sitio.

## Decisión

Se adopta **Tailwind CSS 3** como sistema de estilos, con los tokens de marca centralizados en `tailwind.config.ts` y los patrones visuales repetidos encapsulados como clases de componente en `app/globals.css`.

## Consecuencias

- Se gana velocidad de desarrollo con consistencia de marca garantizada por el sistema de tokens, sin el peso ni la genericidad de una librería de componentes preconstruida.
- Se acepta la necesidad de disciplina explícita (documentada en [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)) para que los desarrolladores/agentes reutilicen tokens y clases en vez de introducir estilos ad-hoc.
- Debe revisarse si, al crecer el número de componentes reutilizables (portales, dashboard del [ROADMAP.md](../../ROADMAP.md)), conviene introducir una capa de componentes accesibles sin estilo (headless, tipo Radix) por encima de Tailwind — hoy explícitamente fuera de alcance (ver [DEVELOPMENT_GUIDE.md § Reglas para componentes](../../DEVELOPMENT_GUIDE.md#reglas-para-componentes)).

## Referencias

- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
- [ADR-005-Brand-Guidelines.md](ADR-005-Brand-Guidelines.md)
