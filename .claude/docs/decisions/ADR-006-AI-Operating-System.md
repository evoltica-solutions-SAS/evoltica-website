# ADR-006: Adopción de un sistema operativo de agentes de IA (workflows + agents)

**Fecha**: 2026-07-07
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Para julio de 2026, el proyecto ya contaba con una Knowledge Base madura en `.claude/` (guías de dominio, ADRs, changelog, prompts de tarea) que define **qué** es el proyecto y **qué** reglas rigen cada dominio (negocio, arquitectura, diseño, seguridad, SEO, rendimiento, Git). Sin embargo, no existía una capa que definiera **cómo debe comportarse** una IA trabajando en el repositorio de forma repetible, ni **quién** (con qué autoridad y qué límites) debe tomar cada tipo de decisión. La expectativa del negocio es que cualquier IA — Claude Code hoy, potencialmente agentes de OpenAI, Gemini, Cursor o Codex en el futuro — pueda incorporarse al proyecto y trabajar con el mismo estándar que un desarrollador senior de Evoltica, sin depender de instrucciones largas repetidas en cada sesión.

## Problema

¿Cómo estandarizar el proceso de trabajo de cualquier IA sobre este repositorio (qué pasos sigue, en qué orden, cuándo se detiene a pedir aprobación) y su reparto de responsabilidades (quién decide qué, quién escala qué), de forma que sea independiente del modelo o herramienta específica que lo ejecute, y que escale con la empresa durante los próximos años?

## Alternativas consideradas

### Opción A — Ampliar `AI_GUIDELINES.md` indefinidamente
- Pros: un solo archivo, cero fragmentación.
- Contras: ya mostraba tensión entre ser una "constitución" corta (principios) y un manual de procedimientos detallado (pasos, checkpoints, ejemplos reales por tipo de tarea) — mezclar ambos habría violado la propia política de "documentos pequeños y especializados" del proyecto ([AI_GUIDELINES.md § 14](../../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación)) en cuanto se agregaran los 5 procesos y 12 roles con el detalle requerido.

### Opción B — Prompts largos por sesión, sin documentación persistente
- Pros: ninguno relevante a largo plazo.
- Contras: exactamente lo que el negocio quiere evitar ("evitar depender de prompts largos", "estandarizar completamente el flujo de trabajo"); no es reutilizable entre sesiones ni entre distintos motores de IA; se pierde con cada conversación nueva.

### Opción C — Sistema de dos capas: `agents/` (roles) + `workflows/` (procesos), separado de las guías de dominio existentes (elegida)
- Pros: separa limpiamente tres preguntas distintas — **QUÉ** (guías de dominio, ya existentes), **QUIÉN** (`agents/`, nuevo) y **CUÁNDO/CÓMO** (`workflows/`, nuevo). Cada capa se mantiene pequeña y especializada (consistente con la política ya vigente del proyecto). Es agnóstico de herramienta: cualquier IA puede leer estos archivos markdown sin depender de una función específica de Claude Code.
- Contras: agrega 19 documentos nuevos a mantener; requiere disciplina para no duplicar contenido entre `agents/`, `workflows/` y las guías de dominio (mitigado exigiendo que ambos apunten a las guías en vez de repetirlas — ver [agents/README.md](../../agents/README.md) y [workflows/README.md](../../workflows/README.md)).

## Decisión

Se adopta un **sistema operativo de agentes de IA de dos capas**: `.claude/agents/` (12 perfiles de rol: identidad, autoridad, qué escalar) y `.claude/workflows/` (5 procesos repetibles: secuencia de pasos, checkpoints, criterios de cierre), ambos construidos sobre las guías de dominio ya existentes sin duplicarlas. `prompts/` se conserva como capa adicional de "chuleta rápida" que remite a `agents/` y `workflows/` como fuente de verdad, evitando así triplicar contenido entre las tres capas.

## Consecuencias

- Se gana un proceso estandarizado y reutilizable entre sesiones y, en principio, entre distintos motores de IA — reduce la dependencia de prompts largos por conversación.
- Se gana una frontera explícita de autoridad (qué puede decidir un agente por sí mismo vs. qué debe escalar), algo que antes solo existía de forma dispersa en `AI_GUIDELINES.md § 12`.
- Se acepta un mayor número de archivos a mantener (19 nuevos); esto se mitiga con la política ya vigente de documentos pequeños y con la regla explícita de que ni `agents/` ni `workflows/` deben repetir contenido de las guías de dominio.
- `AI_GUIDELINES.md` se recorta en las secciones que ahora tienen su versión detallada en `workflows/` (cómo modificar código, cómo refactorizar, cómo generar documentación, cómo hacer code review), quedando como la capa de principios constitucionales que enlaza hacia el detalle operativo.
- Debe revisarse cuándo el proyecto alcance fases del [ROADMAP.md](../../ROADMAP.md) que requieran roles o procesos no cubiertos hoy (p. ej. testing automatizado en Fase 5, IA en Fase 15) — en ese momento se agregan agentes/workflows nuevos siguiendo el mismo formato, no se fuerzan dentro de los existentes.

## Referencias

- [agents/README.md](../../agents/README.md) · [workflows/README.md](../../workflows/README.md) · [AI_GUIDELINES.md](../../AI_GUIDELINES.md)
