# Architecture Decision Records (ADR)

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Qué es un ADR

Un **Architecture Decision Record** es un documento corto que captura una decisión de arquitectura o de producto significativa: qué problema había, qué alternativas se consideraron, qué se decidió y qué consecuencias trae. No es documentación de "cómo funciona el sistema" (eso vive en [ARCHITECTURE.md](../../ARCHITECTURE.md) y el resto de `.claude/`) — es documentación de **por qué es así y no de otra forma**.

El valor de un ADR no es para hoy, es para dentro de un año, cuando alguien (humano o IA) se pregunte "¿por qué usamos X y no Y?" y necesite la respuesta sin tener que reconstruirla de memoria o adivinarla del código.

## Cuándo crear un ADR

Crea un ADR cuando la decisión:

- Es difícil o costosa de revertir (elegir un framework, una plataforma de hosting, introducir autenticación, elegir un CMS).
- Afecta a todo el proyecto o a una parte significativa de él, no a un componente aislado.
- Tiene alternativas razonables que alguien podría proponer de nuevo en el futuro sin este contexto.
- Establece una convención de marca/identidad que debe sostenerse en el tiempo (ver [ADR-005](ADR-005-Brand-Guidelines.md)).

**No** crea un ADR para: la elección de nombre de una variable, un ajuste de estilo puntual, un bugfix, o cualquier decisión ya cubierta por una regla existente en [DEVELOPMENT_GUIDE.md](../../DEVELOPMENT_GUIDE.md) o [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md).

Si tienes dudas sobre si una decisión merece un ADR, pregúntate: *"¿alguien podría razonablemente proponer lo contrario dentro de un año, sin saber por qué se decidió así?"* Si la respuesta es sí, documéntalo.

## Cómo nombrarlo

```
ADR-<número de 3 dígitos>-<Titulo-En-Kebab-Case>.md
```

- El número es secuencial y **nunca se reutiliza**, incluso si un ADR queda obsoleto (`Superseded`) — el historial se conserva.
- El título es corto y descriptivo del **qué**, no del **por qué** (`ADR-004-Why-Odoo.md`, no `ADR-004-Elegimos-Odoo-Porque-Es-Open-Source.md`).
- Consulta el archivo con el número más alto existente en esta carpeta antes de crear uno nuevo, para no duplicar numeración.

## Estructura recomendada

Usa [adr-template.md](adr-template.md) como punto de partida. Cada ADR debe tener:

1. **Encabezado**: título, fecha, estado.
2. **Contexto**: la situación que hizo necesaria esta decisión. Neutral, sin argumentar todavía a favor de nada.
3. **Problema**: qué pregunta concreta había que responder.
4. **Alternativas consideradas**: al menos dos, con sus pros/contras reales — incluso si una parece obviamente inferior en retrospectiva, documenta por qué se descartó *en ese momento*.
5. **Decisión**: qué se eligió, en una o dos frases claras.
6. **Consecuencias**: qué se gana y qué se sacrifica. Un ADR sin trade-offs documentados suele ser una decisión mal analizada.
7. **Estado**: uno de `Proposed`, `Accepted`, `Deprecated`, `Superseded` (ver abajo).

## Estados

| Estado | Significado |
|---|---|
| `Proposed` | Decisión planteada, aún no confirmada ni implementada. |
| `Accepted` | Decisión tomada y vigente. La mayoría de los ADRs de este repo están aquí. |
| `Deprecated` | Ya no se recomienda, pero puede seguir en uso parcialmente; no tiene un reemplazo directo documentado. |
| `Superseded` | Reemplazada explícitamente por otro ADR. Enlaza al ADR que la reemplaza (`Superseded by ADR-0XX`) y, en el nuevo, enlaza hacia atrás (`Supersedes ADR-0YY`). |

Un ADR **nunca se edita retroactivamente para cambiar la decisión** — si la decisión cambia, se crea un ADR nuevo que marca al anterior como `Superseded`. El historial de decisiones es tan valioso como la decisión vigente.

## ADR y CHANGELOG_ARCHITECTURE.md

Todo ADR nuevo (o cambio de estado de uno existente, p. ej. a `Superseded`) debe añadir también una entrada correspondiente en [CHANGELOG_ARCHITECTURE.md](../../CHANGELOG_ARCHITECTURE.md). El ADR es el documento con el contexto y el razonamiento completos; el changelog es la vista cronológica rápida que permite escanear "qué se decidió y cuándo" sin abrir cada ADR — ver la política de mantenimiento en [AI_GUIDELINES.md § 14](../../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación).

## Ejemplos en este repositorio

- [ADR-001-Why-NextJS.md](ADR-001-Why-NextJS.md) — elección de framework.
- [ADR-002-Why-Vercel.md](ADR-002-Why-Vercel.md) — elección de plataforma de despliegue.
- [ADR-003-Why-Tailwind.md](ADR-003-Why-Tailwind.md) — elección de sistema de estilos.
- [ADR-004-Why-Odoo.md](ADR-004-Why-Odoo.md) — decisión de negocio/producto (plataforma ERP principal que Evoltica ofrece a sus clientes).
- [ADR-005-Brand-Guidelines.md](ADR-005-Brand-Guidelines.md) — decisión de identidad visual y su historia.

Nota: los ADR-001 a ADR-005 documentan decisiones que ya estaban implementadas al momento de crear este sistema de documentación (julio de 2026). Se reconstruyeron a partir de la evidencia disponible en el código y el proyecto — están marcados `Accepted` porque reflejan el estado real vigente, no una propuesta nueva. Todo ADR a partir de aquí debe crearse **antes o durante** la decisión, no después.

## Referencias cruzadas

- [ARCHITECTURE.md](../../ARCHITECTURE.md) — qué límites arquitectónicos actuales podrían requerir un ADR nuevo al cambiar.
- [ROADMAP.md](../../ROADMAP.md) — fases futuras que ya se anticipa requerirán un ADR (portal de clientes, blog/CMS, internacionalización).
- [AI_GUIDELINES.md § Cómo revisar arquitectura](../../AI_GUIDELINES.md#4-cómo-revisar-arquitectura) — cuándo un agente de IA debe detenerse y proponer un ADR en vez de implementar directamente.
