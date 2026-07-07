# Sistema de workflows

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define los **procesos repetibles** que cualquier IA debe seguir según el tipo de tarea. Un workflow no es una lista de tareas genérica: es un procedimiento operativo estándar (SOP) — con precondiciones, secuencia, checkpoints de decisión y criterios de finalización — que produce el mismo resultado de calidad sin importar qué modelo de IA lo ejecute. Es la capa "CUÁNDO/CÓMO" del sistema operativo de IA del proyecto (ver [docs/decisions/ADR-006-AI-Operating-System.md](../docs/decisions/ADR-006-AI-Operating-System.md)).

## Alcance

Cubre: los 5 workflows definidos para este proyecto, su formato común, cómo elegir el correcto, y cómo se relacionan con [agents/](../agents/) (el "QUIÉN") y las guías de dominio (el "QUÉ").

No cubre: el detalle de cada regla técnica — un workflow indica *cuándo* consultar una guía de dominio y *en qué punto de la secuencia*, no repite su contenido.

## Cómo elegir un workflow

| Situación | Workflow |
|---|---|
| Construir algo nuevo (sección, componente, contenido, funcionalidad) | [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) |
| El sitio hace algo distinto de lo que debería (comportamiento roto) | [BUG_FIX.md](BUG_FIX.md) |
| El código funciona pero necesita mejor estructura, sin cambiar comportamiento | [REFACTOR.md](REFACTOR.md) |
| Evaluar la calidad de un cambio ya implementado (propio o ajeno) | [CODE_REVIEW.md](CODE_REVIEW.md) |
| Crear, actualizar o mantener consistente cualquier documento de `.claude/` | [DOCUMENTATION.md](DOCUMENTATION.md) |

Si una tarea no encaja claramente en ninguno, es una señal de que la tarea está mal delimitada — vuelve a analizarla con el usuario antes de actuar (ver [AI_GUIDELINES.md § 1](../AI_GUIDELINES.md#1-cómo-analizar-el-proyecto)) en vez de forzarla dentro de un workflow que no aplica.

## Formato de cada workflow

Todo archivo en `workflows/` sigue esta estructura:

1. **Objetivo** — qué logra este proceso.
2. **Cuándo utilizarlo** / **Cuándo NO utilizarlo** — límites claros frente a los otros workflows.
3. **Precondiciones** — qué debe ser cierto antes de empezar.
4. **Documentación que debe consultar** — enlaces, en el orden en que se necesitan.
5. **Agentes que participan** — qué rol de [agents/](../agents/) actúa en cada etapa, y en qué secuencia.
6. **Orden de ejecución** — los pasos concretos, con checkpoints de decisión marcados explícitamente.
7. **Criterios de calidad** — el estándar que cada paso debe cumplir.
8. **Criterios de finalización** — la definición de "terminado", no negociable.
9. **Documentación que debe actualizar** — qué documento(s) de `.claude/` se tocan al cerrar la tarea, según [DOCUMENTATION.md](DOCUMENTATION.md).
10. **Ejemplo real** — un caso concreto anclado a este proyecto, no un ejemplo genérico.

## Principio de independencia

Cada workflow debe poder ejecutarse de forma independiente y completa, sin depender de que otro workflow se haya ejecutado antes en la misma sesión. Un agente que entra al proyecto por primera vez y solo necesita corregir un bug debe poder abrir únicamente [BUG_FIX.md](BUG_FIX.md) y tener todo lo que necesita — no debe verse obligado a leer los otros cuatro primero.

## Relación con agents/ y las guías de dominio

```
workflows/*.md   → CUÁNDO/CÓMO: secuencia de pasos, checkpoints, criterios de cierre
agents/*.md      → QUIÉN: qué rol actúa en cada paso, con qué autoridad
guías de dominio  → QUÉ: las reglas y estándares reales que cada paso debe cumplir
```

Un workflow nunca repite una regla técnica completa (p. ej. la lista de reglas de Tailwind) — apunta a `DESIGN_SYSTEM.md` en el paso donde corresponde. Lo que un workflow sí posee, y que no vive en ningún otro lugar, es **la secuencia y los puntos de decisión**: en qué orden ocurren las cosas, y en qué momento exacto el proceso debe detenerse a esperar aprobación.

## Índice de workflows

- [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) — ciclo de vida completo de una funcionalidad nueva, desde el requerimiento hasta el commit.
- [BUG_FIX.md](BUG_FIX.md) — corrección de comportamiento roto, con Root Cause Analysis obligatorio.
- [REFACTOR.md](REFACTOR.md) — mejora de estructura interna preservando comportamiento observable.
- [CODE_REVIEW.md](CODE_REVIEW.md) — revisión multidimensional de un cambio, con informe estructurado.
- [DOCUMENTATION.md](DOCUMENTATION.md) — cómo y cuándo mantener actualizada la Knowledge Base.

## Cómo crece este sistema

Cuando aparezca un tipo de tarea recurrente no cubierto por los 5 workflows actuales (p. ej. un workflow de `RELEASE` cuando el proyecto adopte versionado formal de producto, o `INCIDENT_RESPONSE` cuando haya un portal en producción), se agrega siguiendo este mismo formato — nunca se fuerza una tarea nueva dentro de un workflow que no la cubre bien. Actualiza este índice en el mismo cambio.

## Referencias cruzadas

- [agents/README.md](../agents/README.md) — el sistema de roles que ejecuta estos procesos.
- [AI_GUIDELINES.md](../AI_GUIDELINES.md) — reglas constitucionales que aplican sin importar el workflow.
- [docs/decisions/ADR-006-AI-Operating-System.md](../docs/decisions/ADR-006-AI-Operating-System.md) — por qué se adoptó este sistema.
