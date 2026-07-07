# Guía para agentes de IA

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Este documento define cómo debe trabajar **cualquier agente de IA** (Claude Code hoy, cualquier otro agente en el futuro) sobre este repositorio: cómo analizar el proyecto, qué documentación leer y cuándo, cómo modificar código sin romper la arquitectura o la marca, y qué está fuera de los límites de autonomía. Es el documento operativo que convierte el resto de la Knowledge Base (`.claude/`) en comportamiento consistente.

## Alcance

Aplica a toda modificación de este repositorio hecha por un agente de IA: código, contenido, configuración y la propia documentación. No sustituye el criterio humano en decisiones de negocio, legales o de despliegue — donde este documento dice "pregunta primero", es literal.

Este documento es la capa de **principios constitucionales**: reglas que aplican siempre, sin importar el tipo de tarea. El **proceso** paso a paso para cada tipo de tarea vive en [workflows/](workflows/), y **quién** (con qué autoridad) ejecuta cada paso vive en [agents/](agents/) — ver [docs/decisions/ADR-006-AI-Operating-System.md](docs/decisions/ADR-006-AI-Operating-System.md).

## 1. Cómo analizar el proyecto

Antes de proponer o hacer un cambio:

1. Identifica de qué **tipo** es la tarea (visual, contenido, lógica, seguridad, SEO, infraestructura de docs) y selecciona el [workflow](workflows/) y el/los [agente(s)](agents/) correspondientes — ver [workflows/README.md § Cómo elegir un workflow](workflows/README.md#cómo-elegir-un-workflow). Determina también qué guía(s) de `.claude/` son relevantes (ver tabla en el [CLAUDE.md](../CLAUDE.md) raíz o en la sección 2 de este documento).
2. Lee el/los archivo(s) de código directamente involucrados **completos**, no solo el fragmento que crees relevante. Un componente de sección suele depender de un hook, una constante de `lib/` o una clase de `globals.css` que no es obvia sin leer el archivo entero.
3. Busca un patrón hermano ya existente (otra sección similar, otro hook, otro componente de UI) antes de diseñar una solución desde cero. La consistencia entre partes del sitio es un requisito, no un detalle estético.
4. Si la tarea toca contenido o copy, relee [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) — el mensaje de marca y el orden del embudo comercial no son negociables por conveniencia de redacción.

## 2. Cómo leer la documentación (y consultar solo lo necesario)

La Knowledge Base está diseñada para que **no necesites leer todo `.claude/` en cada tarea**. Usa esta tabla de enrutamiento (idéntica a la del `CLAUDE.md` raíz) para saber qué abrir:

| Si la tarea toca... | Lee primero |
|---|---|
| Copy, precios, servicios, tono de marca | [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) |
| Estructura de carpetas, stack, dónde va un archivo nuevo | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Color, tipografía, animación, clases de `globals.css` | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| Componentes React, TypeScript, convenciones de código | [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) |
| Navegación, formulario, accesibilidad | [UX_GUIDE.md](UX_GUIDE.md) |
| El endpoint de contacto, secretos, validación | [SECURITY_GUIDE.md](SECURITY_GUIDE.md) |
| Metadata, JSON-LD, sitemap, palabras clave | [SEO_GUIDE.md](SEO_GUIDE.md) |
| Imágenes, bundle, Core Web Vitals | [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) |
| Ramas, commits, PRs, despliegue | [GIT_WORKFLOW.md](GIT_WORKFLOW.md) |
| Qué viene después, prioridades a futuro | [ROADMAP.md](ROADMAP.md) |
| Por qué se eligió una tecnología o se tomó una decisión de marca (detalle completo) | [docs/decisions/](docs/decisions/) (ADRs) |
| Cuándo se tomó cada decisión arquitectónica (vista cronológica) | [CHANGELOG_ARCHITECTURE.md](CHANGELOG_ARCHITECTURE.md) |
| Qué proceso paso a paso seguir (feature, bug, refactor, review, docs) | [workflows/](workflows/) |
| Qué rol/perfil encarnar y con qué autoridad (arquitecto, frontend, revisor...) | [agents/](agents/) |

Para tareas muy acotadas y repetitivas, los archivos en [prompts/](prompts/) son chuletas de una página — úsalos como punto de entrada rápido, pero el rol completo vive en `agents/` y el proceso completo en `workflows/`; el prompt nunca es la fuente de verdad, es un atajo hacia ellos.

No releas documentación que ya está fresca en tu contexto de conversación solo por seguir un checklist mecánicamente — el objetivo es no perder tiempo ni contexto en información irrelevante para la tarea actual, no maximizar lecturas.

## 3. Cómo modificar código

Para la secuencia completa paso a paso (incluyendo checkpoints de aprobación), sigue [workflows/FEATURE_DEVELOPMENT.md](workflows/FEATURE_DEVELOPMENT.md) o [workflows/BUG_FIX.md](workflows/BUG_FIX.md) según el tipo de tarea. Principios que aplican siempre, en cualquier workflow:

- Cambia exactamente lo que la tarea pide. No aproveches una tarea de contenido para refactorizar arquitectura, ni una tarea de estilo para cambiar lógica de negocio, salvo que se pida explícitamente o sea estrictamente necesario para completar la tarea.
- Sigue las convenciones de [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) sin excepción silenciosa: tipado explícito, Server Components por defecto, alias `@/*`, nomenclatura de archivos.
- No asumas que un archivo, componente, clase o variable de entorno mencionado en esta documentación sigue existiendo con ese nombre exacto — verifícalo en el código antes de basar un cambio en esa suposición. La documentación describe el estado del proyecto al momento de escribirse, el código es la fuente de verdad viva.

## 4. Cómo revisar arquitectura

Antes de crear un archivo nuevo o mover uno existente, confirma su ubicación contra la tabla de [ARCHITECTURE.md § Regla de ubicación de código nuevo](ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo). Si una tarea parece requerir romper esa separación (p. ej. poner datos de negocio dentro de un componente, lógica de servidor en un componente cliente, o un nuevo tipo de persistencia), **detente y pregunta** en vez de forzarlo — es una señal de que la tarea implica una decisión arquitectónica, no solo una implementación. Este análisis corresponde al rol [agents/ARCHITECT.md](agents/ARCHITECT.md).

Toda decisión arquitectónica **permanente** (no un ajuste reversible) que surja de este análisis debe generar o actualizar un ADR en [docs/decisions/](docs/decisions/), con su entrada correspondiente en [CHANGELOG_ARCHITECTURE.md](CHANGELOG_ARCHITECTURE.md) — ver la política completa en la [sección 14](#14-política-de-mantenimiento-de-la-documentación).

## 5. Cómo escribir componentes

Sigue [DEVELOPMENT_GUIDE.md § Reglas para componentes](DEVELOPMENT_GUIDE.md#reglas-para-componentes) y el sistema visual de [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — los roles [agents/FRONTEND_ENGINEER.md](agents/FRONTEND_ENGINEER.md) y [agents/DESIGNER.md](agents/DESIGNER.md) detallan la autoridad y los errores a vigilar. En resumen:

- Un componente de sección = un archivo = una responsabilidad visual.
- Props tipadas explícitamente, nunca `any`.
- Reutiliza tokens y clases del sistema de diseño antes de escribir CSS/Tailwind nuevo.
- Las animaciones encajan en uno de los tres arquetipos de motion ya definidos.
- Todo elemento interactivo es semántico y accesible (ver [UX_GUIDE.md § Accesibilidad](UX_GUIDE.md#accesibilidad)).

## 6. Cómo realizar refactors

Sigue [workflows/REFACTOR.md](workflows/REFACTOR.md) para el proceso completo (medir alcance, verificar comportamiento antes/después, pasos pequeños). Principio que nunca cambia: no refactorices código que no está relacionado con la tarea actual solo porque "se podría mejorar" — señálalo como sugerencia al usuario en vez de actuar sobre ello sin que se pida.

## 7. Cómo generar documentación

Sigue [workflows/DOCUMENTATION.md](workflows/DOCUMENTATION.md) para el árbol de decisión completo de qué documento actualizar, cuándo, y cómo. Los principios rectores (una sola fuente de verdad, actualizar en el mismo cambio, señalar conflictos código/documentación) están consolidados en la [sección 14](#14-política-de-mantenimiento-de-la-documentación) — no se repiten aquí para no duplicarlos.

## 8. Cómo escribir commits

Sigue [GIT_WORKFLOW.md § Convenciones de commits](GIT_WORKFLOW.md#convenciones-de-commits) (Conventional Commits, en español, en imperativo) y el rol [agents/DEVOPS_ENGINEER.md](agents/DEVOPS_ENGINEER.md). No hagas commit ni push salvo que el usuario lo pida explícitamente para esa acción concreta — ver sección 10.

## 9. Cómo hacer code review

Sigue [workflows/CODE_REVIEW.md](workflows/CODE_REVIEW.md): 18 dimensiones evaluadas en orden, con informe estructurado, ejecutado desde el rol [agents/REVIEWER.md](agents/REVIEWER.md). No apruebes (ni marques como terminado) un cambio que falle cualquiera de esas dimensiones sin señalarlo explícitamente.

## 10. Cómo mantener calidad

- Un cambio no está terminado hasta que compila, lintea y — si afecta un flujo visible — se probó manualmente.
- Prefiere señalar una ambigüedad y preguntar sobre asumir la interpretación más conveniente para completar rápido la tarea.
- No introduzcas abstracciones, dependencias o patrones nuevos "por si acaso" — resuelve lo que la tarea pide con el menor cambio de superficie posible que sea correcto y mantenible.

## 11. Cómo mantener consistencia visual

Rol responsable: [agents/DESIGNER.md](agents/DESIGNER.md).

- Todo estilo nuevo pasa primero por [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): tokens de color, clases de componente, tipografía y los tres arquetipos de motion. Si el sistema no cubre lo que necesitas, la extensión se hace en `tailwind.config.ts`/`globals.css`, nunca inline en un componente aislado.
- El sitio es dark-only y usa una paleta de marca cerrada — no introduzcas modo claro, colores fuera de la paleta, ni una familia tipográfica nueva sin autorización explícita.
- Antes de dar por terminada una sección visual nueva, compárala mentalmente con una sección existente equivalente (mismo tipo de encabezado, mismo espaciado, mismas transiciones) — si se siente "distinta" al resto del sitio, probablemente rompe el sistema.

## 12. Qué nunca modificar sin autorización

Estos elementos requieren confirmación explícita del usuario antes de tocarse, incluso si el cambio parece técnicamente correcto o una mejora. Cada uno tiene su razón detallada en el documento de dominio correspondiente — aquí solo el inventario:

| Elemento | Por qué | Detalle en |
|---|---|---|
| Paleta de marca y logo | Identidad visual oficial de la empresa | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md) |
| Datos de contacto reales (WhatsApp, email, teléfono en JSON-LD) | Un error desvía leads reales del negocio | [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) |
| Variables de entorno y secretos | Comprometer credenciales o integraciones | [SECURITY_GUIDE.md](SECURITY_GUIDE.md) |
| `app/api/contact/route.ts` (validación y flujo de envío) | Único punto de entrada de leads; un fallo silencioso pierde clientes sin que nadie lo note | [SECURITY_GUIDE.md](SECURITY_GUIDE.md) |
| `metadataBase`, `canonical`, `robots` en `app/layout.tsx` | Afecta indexación real en producción | [SEO_GUIDE.md](SEO_GUIDE.md) |
| Configuración de despliegue en Vercel (dominios, redirects, env vars del dashboard) | Fuera del control de este repositorio | [GIT_WORKFLOW.md](GIT_WORKFLOW.md) |
| Versiones mayores de Next.js/React/TypeScript en `package.json` | Acopladas entre sí; una actualización mal coordinada rompe el build | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Contenido legal/comercial (precios, garantías, tiempos de respuesta, razón social) | Afirmaciones de la empresa hacia clientes, no texto decorativo | [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) |
| Acciones visibles externamente (`git push`, abrir/mergear PRs, cambios en el dashboard de Vercel) | Afectan estado compartido fuera del control local | [GIT_WORKFLOW.md](GIT_WORKFLOW.md) |

Cuando algo sea ambiguo entre dos enfoques razonables — especialmente decisiones que cambian el embudo de conversión, el alcance de una tarea, o cualquier acción irreversible — pregunta primero. El costo de pausar a confirmar es bajo; el costo de una acción no deseada puede ser alto.

## 13. Checklist antes de finalizar cualquier tarea

- [ ] El cambio resuelve exactamente lo que se pidió, sin ampliar el alcance sin permiso.
- [ ] Se leyó completo cada archivo modificado, no solo el fragmento editado.
- [ ] Se siguieron las convenciones de la guía de dominio correspondiente (ver tabla de la sección 2).
- [ ] No se introdujo `any`, se debilitó `strict`, ni se rompió tipado existente.
- [ ] `npm run lint` y `npm run build` pasan sin errores nuevos.
- [ ] Si el cambio es visual o afecta un flujo de usuario, se probó manualmente en `npm run dev` (móvil + escritorio).
- [ ] Ningún elemento de la tabla de la sección 12 se modificó sin autorización explícita.
- [ ] Si el cambio introduce una convención, decisión arquitectónica o de negocio nueva, la documentación correspondiente en `.claude/` se actualizó en el mismo cambio.
- [ ] Se siguió el [workflow](workflows/) correspondiente al tipo de tarea de principio a fin, incluyendo sus checkpoints.
- [ ] El commit (si se pidió) sigue [GIT_WORKFLOW.md § Convenciones de commits](GIT_WORKFLOW.md#convenciones-de-commits).
- [ ] Si el cambio es una decisión arquitectónica permanente, se creó/actualizó el ADR correspondiente en `docs/decisions/` y su entrada en `CHANGELOG_ARCHITECTURE.md`.
- [ ] Si se detectó un conflicto entre el código y la documentación, se señaló explícitamente antes de continuar, en vez de asumir cuál de los dos tenía razón.
- [ ] Si el documento editado quedó por encima de ~500–700 líneas o mezclando responsabilidades, se propuso dividirlo en vez de seguir ampliándolo.
- [ ] La metadata de versión del documento editado (`Versión` / `Estado` / `Última actualización` / `Responsable`) quedó actualizada.
- [ ] El resumen final al usuario es honesto sobre qué se verificó y qué no (p. ej. "no pude probarlo visualmente" en vez de asumir que funciona).

## 14. Política de mantenimiento de la documentación

Estas cuatro reglas son de cumplimiento obligatorio para cualquier agente, y son las mismas que se resumen en el `CLAUDE.md` raíz — aquí con su justificación completa:

1. **Toda decisión arquitectónica permanente genera o actualiza un ADR.** Si una tarea implica adoptar una tecnología, cambiar un límite arquitectónico (ver [ARCHITECTURE.md § Límites deliberados del proyecto](ARCHITECTURE.md#límites-deliberados-del-proyecto)), o fijar una convención de marca duradera, no termina con el código funcionando — termina con un ADR nuevo (o uno existente marcado `Superseded`) en [docs/decisions/](docs/decisions/) y su entrada correspondiente en [CHANGELOG_ARCHITECTURE.md](CHANGELOG_ARCHITECTURE.md). Ver [docs/decisions/README.md § Cuándo crear un ADR](docs/decisions/README.md#cuándo-crear-un-adr) para el criterio de qué califica.
2. **Toda modificación importante de arquitectura, estándares o procesos actualiza la documentación en el mismo cambio.** No como una tarea de seguimiento, no "en el próximo PR". Si el cambio de código y el cambio de documentación no pueden ir juntos por alguna razón excepcional, dilo explícitamente al usuario y trata la documentación pendiente como un bloqueante conocido, no como algo resuelto.
3. **No se acepta un cambio estructural que deje la documentación desactualizada respecto al código.** Esto aplica en ambas direcciones: no mergees código que invalida una regla documentada sin actualizarla, y no dejes una guía describiendo un comportamiento, componente o convención que ya no existe.
4. **Ante un conflicto entre código y documentación, se señala antes de continuar.** Un agente de IA no tiene autoridad para decidir en silencio "la documentación está desactualizada, sigo el código" ni lo contrario — ambos son síntomas de un problema (documentación obsoleta o comportamiento no intencional) que el usuario debe resolver conscientemente.
5. **Documentos pequeños y especializados.** Ningún documento de `.claude/` crece indefinidamente. Cuando un documento supere aproximadamente **500–700 líneas**, o comience a cubrir más de una responsabilidad claramente separable (p. ej. una guía que mezcla reglas de seguridad con reglas de SEO), debe dividirse en documentos especializados. Se prioriza una arquitectura documental modular — muchos documentos pequeños y enfocados, cada uno con su propio Propósito y Alcance — sobre documentos monolíticos que intentan cubrirlo todo. Antes de dividir un documento existente, propón la división al usuario (ver [sección 7](#7-cómo-generar-documentación)); no lo hagas unilateralmente.
6. **Todo documento de la Knowledge Base incluye metadata de versión.** Justo debajo del título (`# Título`), cada documento lleva una línea con cuatro campos:
   - **Versión**: número que se incrementa en revisiones sustantivas de contenido (no en corrección de typos o enlaces).
   - **Estado**: `Draft` (en construcción, no vinculante todavía) · `Active` (vigente) · `Deprecated` (ya no aplica, se conserva por contexto histórico).
   - **Última actualización**: fecha (`AAAA-MM-DD`) del cambio de contenido sustantivo más reciente — actualízala en cualquier edición que cambie una regla, no en typos.
   - **Responsable**: `Evoltica Solutions SAS` por defecto; si en el futuro un documento tiene un dueño más específico (una persona o equipo), se actualiza aquí.

   Los [ADR](docs/decisions/) son la única excepción de formato: ya tienen un campo `Estado` propio con semántica distinta (`Proposed`/`Accepted`/`Deprecated`/`Superseded`, sobre la decisión documentada, no sobre el documento en sí). En un ADR, `Versión` y `Responsable` se agregan al mismo bloque de encabezado junto a `Fecha` y `Estado`, sin duplicar este último campo.

## 15. Documentación viva

Esta Knowledge Base (`.claude/`) no es un artefacto que se escribe una vez y se congela: debe evolucionar al mismo ritmo que el proyecto, durante los próximos años de vida del sitio (ver [ROADMAP.md](ROADMAP.md)). Ningún documento de `.claude/` debe convertirse en documentación obsoleta — un documento desactualizado es más peligroso que la ausencia de documentación, porque genera confianza falsa: alguien (humano o IA) actúa sobre una regla que ya no es cierta, sin saber que dejó de serlo.

Mantener la documentación viva es responsabilidad de quien hace el cambio que la afecta, no una tarea separada para "después" ni de otra persona. Cada cambio estructural relevante es también una oportunidad para revisar si la documentación existente alrededor de ese cambio sigue siendo precisa — no solo para agregar lo nuevo, sino para corregir lo que quedó obsoleto.

## Referencias cruzadas

Este documento es un índice operativo — cada regla enlaza a su fuente detallada. No dupliques aquí el contenido de las guías de dominio; si una regla necesita más detalle del que cabe en una línea, el detalle vive en su guía correspondiente y este documento solo enlaza a ella.

- [workflows/README.md](workflows/README.md) — el proceso paso a paso para cada tipo de tarea.
- [agents/README.md](agents/README.md) — los roles que ejecutan esos procesos, con su autoridad y límites.
- [docs/decisions/ADR-006-AI-Operating-System.md](docs/decisions/ADR-006-AI-Operating-System.md) — por qué se adoptó este sistema de tres capas (principios / proceso / rol).
