# ADR-005: Identidad visual y guías de marca

**Fecha**: 2026-07-07 (documentado retroactivamente; la decisión ya estaba implementada — ver nota en [docs/decisions/README.md](README.md))
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

El sitio necesitaba una identidad visual que comunicara "tecnología confiable y moderna" sin caer en el estilo genérico de plantilla corporativa, y que fuera coherente con el posicionamiento de marca de Evoltica como socio tecnológico de largo plazo (ver [BUSINESS_CONTEXT.md](../../BUSINESS_CONTEXT.md)). El código de `tailwind.config.ts` deja evidencia de que la paleta pasó por al menos una iteración: el comentario original de la definición de `accent` indica que **reemplaza un acento morado anterior**, lo cual documenta este ADR como parte de su historial.

## Problema

¿Qué paleta de color, tipografía y lenguaje visual representan mejor la marca Evoltica, y cómo se protege esa identidad de la deriva visual a medida que más personas (o agentes de IA) contribuyen código?

## Alternativas consideradas

### Paleta verde/turquesa/azul sobre fondo oscuro (elegida)
- Pros: el verde primario (`#12D56F`) se extrae directamente del logo oficial, garantizando coherencia entre el isotipo y el sitio; la combinación verde-turquesa-azul comunica tecnología + crecimiento sin caer en el azul corporativo genérico que domina el sector de consultoría TI; el fondo oscuro (`#0B0F19`) con acentos "glow" comunica modernidad técnica (alineado con el público de Infraestructura y Cloud) y hace que los CTAs verdes destaquen con alto contraste.
- Contras: dark-only limita la opción de un modo claro sin trabajo adicional; una paleta de marca cerrada requiere disciplina para no diluirse con colores ad-hoc (mitigado por las reglas de [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)).

### Paleta con acento morado (iteración anterior, descartada)
- Pros: el morado es un acento diferenciador común en sitios de tecnología/SaaS.
- Contras: evidencia en el código (`tailwind.config.ts`) indica que fue reemplazado por el azul actual — presumiblemente por menor coherencia con el logo oficial y con el posicionamiento de "confianza e infraestructura" (el azul comunica estabilidad de forma más directa que el morado en el contexto B2B colombiano). Se documenta como alternativa históricamente considerada y descartada, no como opción vigente.

### Paleta corporativa azul/gris tradicional (genérica de consultoría TI)
- Pros: es el estándar no escrito del sector; bajo riesgo de "no gustar".
- Contras: indiferenciable de cualquier otra consultora de TI; no aprovecha el logo existente de Evoltica como ancla de identidad.

## Decisión

La identidad visual de Evoltica se basa en una paleta de marca cerrada — **verde primario (`#12D56F`), turquesa secundario (`#14A4BC`) y azul de acento (`#0997D5`)**, sobre fondo oscuro (`#001E3D` / `#0B0F19`) — con estética "glassmorphism" (superficies translúcidas con blur), tipografía `Inter` (UI) + `JetBrains Mono` (elementos técnicos), y un lenguaje de movimiento consistente (ver [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) para la especificación completa).

## Consecuencias

- Se gana una identidad reconocible y coherente con el logo oficial, que diferencia a Evoltica del estándar visual genérico del sector de consultoría TI.
- Se acepta que el sitio es dark-only por decisión de marca, no por limitación técnica — introducir modo claro es un cambio de identidad, no solo de implementación (ver [DESIGN_SYSTEM.md § Reglas de uso de Tailwind](../../DESIGN_SYSTEM.md#reglas-de-uso-de-tailwind)).
- La paleta, el logo y la tipografía quedan protegidos como elementos que **no se modifican sin autorización explícita** (ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](../../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización)) — cualquier cambio de paleta es, por definición, una decisión que amerita un ADR nuevo marcando este como `Superseded`, no una edición directa de `tailwind.config.ts`.

## Referencias

- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
- [ADR-003-Why-Tailwind.md](ADR-003-Why-Tailwind.md)
