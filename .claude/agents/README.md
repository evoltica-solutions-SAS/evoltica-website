# Sistema de agentes

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define los **perfiles profesionales** que cualquier IA debe encarnar al trabajar en este repositorio. Un agente no es un prompt ni un estilo de redacción: es una definición de rol — objetivo, responsabilidades, qué debe saber, qué debe vigilar, qué puede decidir por sí mismo y qué debe escalar. Es la capa "QUIÉN" del sistema operativo de IA del proyecto (ver [docs/decisions/ADR-006-AI-Operating-System.md](../docs/decisions/ADR-006-AI-Operating-System.md)).

## Alcance

Cubre: los 12 roles definidos para este proyecto, su formato común, cómo se seleccionan y cómo se relacionan con los [workflows/](../workflows/) (el "CUÁNDO/CÓMO") y las guías de dominio (el "QUÉ").

No cubre: el detalle de cada regla técnica o de negocio — eso vive en la guía de dominio que cada agente enlaza. Un archivo de `agents/` que empieza a repetir reglas completas de una guía de dominio está mal escrito; su trabajo es apuntar, no duplicar.

## Filosofía: un modelo, múltiples sombreros

No existe un "agente" físicamente separado por archivo — Claude Code, un futuro agente de OpenAI, Gemini, Cursor o Codex son, en todos los casos, **un único modelo trabajando en una sesión**. Lo que cambia es el **rol que encarna en cada momento** de una tarea. Un mismo agente de IA:

- Se pone el sombrero de **ARCHITECT** al diseñar dónde vive un componente nuevo.
- Se pone el sombrero de **FRONTEND_ENGINEER** al implementarlo.
- Se pone el sombrero de **REVIEWER** al revisarlo antes de darlo por terminado.

Esto es exactamente lo que ya describen los [workflows/](../workflows/): cada paso indica qué agente(s) están "al mando" en ese momento, y este directorio define qué significa cada uno de esos sombreros — su objetivo, su autoridad, y sus límites — para que el comportamiento sea el mismo sin importar qué motor de IA esté detrás.

## Cómo se relaciona con workflows/ y las guías de dominio

```
agents/*.md        → QUIÉN: identidad, autoridad, qué escalar, qué errores detectar
workflows/*.md      → CUÁNDO/CÓMO: secuencia de pasos, qué agente actúa en cada uno
guías de dominio     → QUÉ: las reglas y estándares reales (DESIGN_SYSTEM.md, SECURITY_GUIDE.md, etc.)
```

Un agente nunca es la fuente de verdad de una regla técnica — siempre enlaza a la guía de dominio correspondiente. Lo que un agente sí posee, y que no vive en ningún otro lugar de la Knowledge Base, es: **la frontera de autoridad** (qué puede decidir solo vs. qué debe escalar) y **el patrón de errores a vigilar** desde la perspectiva de ese rol específico.

## Formato de cada agente

Todo archivo en `agents/` sigue esta estructura:

1. **Rol** — una frase que resume la identidad profesional.
2. **Objetivo** — qué logra este rol dentro del proyecto.
3. **Responsabilidades** — qué hace, en bullets concretos.
4. **Conocimientos** — dominios que debe manejar (no el detalle — el detalle vive en la guía enlazada).
5. **Qué documentación consulta primero** — enlaces directos.
6. **Qué documentación nunca debe ignorar** — enlaces a reglas no negociables para ese rol.
7. **Qué calidad debe exigir** — el estándar mínimo aceptable desde su perspectiva.
8. **Qué errores debe detectar** — patrones de falla específicos de su dominio.
9. **Qué decisiones puede tomar solo** — autonomía real.
10. **Qué decisiones debe escalar** — cuándo debe detenerse y preguntar.
11. **Frontera con otros roles** — dónde termina este agente y empieza otro, para evitar solapamiento.
12. **Workflows en los que participa** — enlaces a `workflows/`.

## Índice de agentes

### Diseño y arquitectura
- [ARCHITECT.md](ARCHITECT.md) — decide dónde y cómo encaja cada pieza; nunca implementa.
- [DESIGNER.md](DESIGNER.md) — guardián del sistema visual y de interacción.

### Implementación
- [FRONTEND_ENGINEER.md](FRONTEND_ENGINEER.md) — React, Next.js, Tailwind, Framer Motion, componentes.
- [BACKEND_ENGINEER.md](BACKEND_ENGINEER.md) — el endpoint de contacto y cualquier lógica de servidor futura.
- [DEVOPS_ENGINEER.md](DEVOPS_ENGINEER.md) — ramas, commits, build, despliegue.

### Calidad
- [REVIEWER.md](REVIEWER.md) — Senior Reviewer; no implementa, solo revisa.
- [SECURITY_ENGINEER.md](SECURITY_ENGINEER.md) — validación, secretos, superficie de riesgo.
- [PERFORMANCE_ENGINEER.md](PERFORMANCE_ENGINEER.md) — Core Web Vitals y peso de bundle.

### Contenido y negocio
- [COPYWRITER.md](COPYWRITER.md) — tono de marca y redacción del embudo comercial.
- [SEO_SPECIALIST.md](SEO_SPECIALIST.md) — metadata, indexación, estrategia de posicionamiento.
- [BUSINESS_CONSULTANT.md](BUSINESS_CONSULTANT.md) — que todo cambio tenga sentido de negocio, no solo técnico.

### Dominio específico
- [ODOO_SPECIALIST.md](ODOO_SPECIALIST.md) — ecosistema Odoo/ERP e integraciones futuras.

## Cómo se selecciona un agente

No es manual: cada [workflow](../workflows/) ya indica qué agente(s) participan y en qué orden. Si una tarea no encaja claramente en ningún workflow existente, identifica el agente cuyo "Objetivo" (sección 2 de su archivo) más se acerque a la tarea, y si sigue sin quedar claro, pregunta al usuario en vez de adivinar — ver [AI_GUIDELINES.md § 1](../AI_GUIDELINES.md#1-cómo-analizar-el-proyecto).

## Cómo crece este sistema

Cuando el proyecto alcance una fase del [ROADMAP.md](../ROADMAP.md) que requiera una disciplina no cubierta hoy (p. ej. un `QA_ENGINEER` cuando llegue la Fase 5 — Testing, o un `AI_ENGINEER` cuando llegue la Fase 15 — Inteligencia Artificial), se agrega un agente nuevo siguiendo el formato de esta guía — nunca se estira un agente existente para cubrir una disciplina que no le corresponde. Actualiza este índice en el mismo cambio.

## Referencias cruzadas

- [workflows/README.md](../workflows/README.md) — el sistema de procesos que orquesta a estos agentes.
- [AI_GUIDELINES.md](../AI_GUIDELINES.md) — las reglas constitucionales que aplican a cualquier agente, sin importar el rol.
- [docs/decisions/ADR-006-AI-Operating-System.md](../docs/decisions/ADR-006-AI-Operating-System.md) — por qué se adoptó este sistema.
