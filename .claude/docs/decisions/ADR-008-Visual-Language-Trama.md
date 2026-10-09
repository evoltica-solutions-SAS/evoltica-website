# ADR-008: Lenguaje visual editorial y gráfico de marca "La trama"

**Fecha**: 2026-10-08
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Tras la reconstrucción multipágina ([ADR-007](ADR-007-Multi-Page-Site.md)) el sitio funcionaba bien técnicamente, pero en la revisión del negocio se concluyó que "parecía una landing generada por IA": todas las secciones repetían la fórmula *etiqueta + titular de dos tonos + párrafo + tarjetas*, el hero era un diagrama de nodos con tarjetas flotantes y glow, todo el sitio tenía un único tono oscuro y el copy era correcto pero intercambiable con el de cualquier consultora.

No existe material visual real en el repositorio (fotografías, capturas de proyectos, equipo, clientes). El único activo gráfico propio es el isotipo: dos triángulos tejidos como cintas, a 60°, con degradado verde → azul.

## Problema

¿Cómo darle a Evoltica una personalidad visual propia, sin cambiar paleta, logo ni tipografías (ADR-005) y sin inventar material?

## Alternativas consideradas

### Opción A — Reemplazar el diagrama del hero por otra ilustración genérica (dashboards, mockups)
- Pros: rápido.
- Contras: sigue siendo estética SaaS genérica; los mockups sugerirían productos o clientes que no existen.

### Opción B — Derivar un lenguaje gráfico del isotipo + composición editorial (elegida)
- Pros: lo único que ninguna otra empresa puede usar es su propio isotipo; la composición editorial (tipografía protagonista, asimetría, ritmos distintos por sección) se logra con el sistema existente, sin dependencias.
- Contras: exige reglas claras para que el gráfico no se confunda con el logo ni con otros símbolos.

### Opción C — Fotografía de stock
- Pros: "humaniza" rápido.
- Contras: presentaría como propias imágenes que no lo son; contradice la regla de no inventar.

## Decisión

1. **La trama** (`components/ui/Trama.tsx`): gráfico de marca que toma el **ápice plegado** del isotipo — dos cintas a 60° formando una "A" — con una cinta horizontal tejida por encima y por debajo. Se usa grande, recortado por el borde de la pantalla, en hero, cabeceras internas, cierre y 404. **Nunca se dibujan los dos triángulos completos superpuestos**: a gran escala el hexagrama completo se lee como un símbolo religioso. No sustituye al logo. Su ventana triangular puede alojar una fotografía real cuando exista (`lib/media.ts`).
2. **El degradado de marca vive solo en la trama.** El verde es acento puntual (palabra clave, numeración, CTA). Se eliminan glows, orbes difuminados, retícula de fondo y animaciones decorativas en loop.
3. **Composición editorial**: titulares de gran escala con contraste de pesos (600 / 300), numeración de sección (`01 — Diagnóstico rápido`), esquinas casi rectas (3–4 px), y un patrón distinto por sección (lista de síntomas, índice con numerales, tabla "no hacemos / hacemos", tarjetas apiladas, muro tipográfico, cifra destacada).
4. **Banda clara de contraste** (`.band-light`, tokens `navy-50` / `navy-900`): una sección clara dentro del sitio dark-only. No es un modo claro ni un toggle de tema; ADR-005 sigue vigente para la paleta y el carácter dark del sitio.
5. **Copy** en el idioma del dueño de la PYME colombiana: situaciones concretas en lugar de abstracciones ("el inventario no cuadra con la bodega").

## Consecuencias

- El sitio adquiere un rasgo gráfico reconocible y exclusivo de Evoltica, sin nuevas dependencias.
- Cualquier sección nueva debe elegir un patrón de composición propio en lugar de volver a "título + 3 tarjetas".
- La banda clara amplía el uso de tokens de la paleta; si en el futuro se plantea un modo claro completo, sigue requiriendo su propio ADR.
- Pendiente de negocio: material fotográfico real (equipo, operación) para incorporar en `lib/media.ts`.

## Referencias

- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
- [ADR-005-Brand-Guidelines.md](ADR-005-Brand-Guidelines.md)
- [ADR-007-Multi-Page-Site.md](ADR-007-Multi-Page-Site.md)
