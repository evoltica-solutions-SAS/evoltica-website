# Workflow: Documentation

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Objetivo

Definir exactamente qué documento actualizar, cuándo, y cómo mantener toda la Knowledge Base (`.claude/`) consistente — para que "actualizar la documentación" deje de ser una instrucción vaga y se convierta en una decisión mecánica.

## Cuándo utilizarlo

- Al cerrar cualquier otro workflow ([FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md), [BUG_FIX.md](BUG_FIX.md), [REFACTOR.md](REFACTOR.md)) que requiera actualizar documentación.
- Cuando se crea, divide o reorganiza un documento de `.claude/`.
- Cuando se detecta una contradicción entre el código y lo documentado.

## Cuándo NO utilizarlo

- Para escribir la guía inicial de un dominio que no existe (eso ya ocurrió en la fundación de esta Knowledge Base) — este workflow es para **mantenimiento**, no para la creación fundacional del sistema.

## Precondiciones

Hay un cambio de código, proceso o decisión ya identificado que requiere reflejarse en la documentación — o una inconsistencia ya detectada entre código y documentación.

## Documentación que debe consultar

[AI_GUIDELINES.md § 14 — Política de mantenimiento de la documentación](../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación) y [§ 15 — Documentación viva](../AI_GUIDELINES.md#15-documentación-viva) primero, siempre.

## Agentes que participan

Cualquier agente puede ejecutar este workflow — la actualización de documentación es responsabilidad de quien hizo el cambio que la afecta, no de un rol separado. `ARCHITECT` participa cuando el cambio implica un ADR nuevo.

## Orden de ejecución

1. **Clasificar el tipo de cambio documental** usando el árbol de decisión:

```
¿Qué tipo de cambio hiciste?
│
├─ Nueva convención de código/diseño/negocio/etc.
│   → Actualiza la guía de dominio correspondiente
│     (BUSINESS_CONTEXT / ARCHITECTURE / DESIGN_SYSTEM / DEVELOPMENT_GUIDE /
│      UX_GUIDE / SECURITY_GUIDE / SEO_GUIDE / PERFORMANCE_GUIDE / GIT_WORKFLOW)
│
├─ Decisión permanente de arquitectura, tecnología o marca
│   → Crea o actualiza un ADR en docs/decisions/
│   → Agrega la entrada correspondiente en CHANGELOG_ARCHITECTURE.md
│
├─ Cambio de prioridad, alcance o fecha de una fase futura
│   → Actualiza ROADMAP.md
│
├─ Cambio en cómo debe trabajar cualquier IA (proceso, rol, checklist)
│   → Actualiza AI_GUIDELINES.md y/o el agente/workflow específico en agents/ o workflows/
│
├─ Cambio que afecta una regla general o el índice de la Knowledge Base
│   → Actualiza CLAUDE.md (raíz) — recuerda: debe seguir siendo corto, solo referencias
│
└─ Un documento superó ~500–700 líneas o mezcla responsabilidades
    → Divide en documentos especializados (ver AI_GUIDELINES.md § 14, regla 5)
      antes de seguir agregando contenido
```

2. **Leer el documento completo que vas a editar**, no solo la sección que crees relevante — para no introducir una contradicción con otra parte del mismo documento.
3. **Verificar duplicación**: ¿esta información ya vive en otro documento? Si sí, enlaza (`[texto](archivo.md#sección)`) en vez de copiar.
4. **Editar en el mismo cambio** que originó la necesidad — no como tarea separada para después.
5. **Actualizar la metadata de versión** del documento editado: incrementa `Versión` si el cambio es sustantivo (no para typos/enlaces), actualiza `Última actualización` a la fecha real, revisa si `Estado` sigue siendo el correcto.
6. **Si detectas una contradicción entre código y documentación** que no se originó en este cambio (una preexistente), no la corrijas en silencio asumiendo cuál tiene razón — señálala explícitamente al usuario antes de continuar (ver [AI_GUIDELINES.md § 14, regla 4](../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación)).
7. **Verificar referencias cruzadas**: si el documento editado es enlazado desde otros (`CLAUDE.md`, `AI_GUIDELINES.md`, agentes o workflows relacionados), confirma que esos enlaces siguen siendo válidos tras el cambio.

## Criterios de calidad

Cada documento sigue su formato establecido (Propósito/Alcance/Reglas/Referencias para guías de dominio; el formato específico definido en `agents/README.md` o `workflows/README.md` para esos sistemas); ninguna regla queda copiada en dos archivos.

## Criterios de finalización

El documento correcto (y solo el correcto) quedó actualizado; su metadata de versión refleja el cambio; no quedó ninguna contradicción sin señalar; los enlaces cruzados relevantes siguen siendo válidos.

## Documentación que debe actualizar

Este workflow **es** el proceso de actualización — su "documentación que debe actualizar" es el árbol de decisión del paso 1, aplicado al caso concreto.

## Ejemplo real

**Situación**: se implementó un cambio que agrega `next/font` para cargar Inter localmente en vez de vía Google Fonts CDN (mejora de rendimiento y privacidad).

1. Clasificar: es una nueva convención técnica (cómo se cargan las fuentes) → corresponde a `PERFORMANCE_GUIDE.md` (regla de scripts/fuentes de terceros) y posiblemente `DESIGN_SYSTEM.md` (menciona la carga de Google Fonts en `globals.css`).
2. Leer ambos documentos completos antes de editar.
3. Verificar duplicación: la mención de Google Fonts aparece en `DESIGN_SYSTEM.md § Tipografía` — se actualiza ahí como fuente principal, y `PERFORMANCE_GUIDE.md` solo agrega la regla general de "usar `next/font` para fuentes", sin repetir el detalle de qué fuentes usa el sitio.
4. Editar ambos documentos en el mismo commit que el cambio de código.
5. Actualizar metadata: `Versión` de `DESIGN_SYSTEM.md` pasa a 1.1, `Última actualización` a la fecha real.
6. No se detectó contradicción preexistente.
7. Se confirma que `CLAUDE.md` y `AI_GUIDELINES.md` no citan el detalle de carga de fuentes (solo enlazan a `DESIGN_SYSTEM.md`), así que no requieren cambio.

## Referencias cruzadas

- [AI_GUIDELINES.md § 14 y § 15](../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación) · [docs/decisions/README.md](../docs/decisions/README.md) · [CHANGELOG_ARCHITECTURE.md](../CHANGELOG_ARCHITECTURE.md)
