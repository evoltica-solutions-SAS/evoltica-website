# Workflow: Code Review

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Objetivo

Evaluar un cambio ya implementado (propio o ajeno) contra las 18 dimensiones de calidad del proyecto, en un único pase estructurado, y producir un informe profesional que permita decidir con confianza si el cambio está listo.

## Cuándo utilizarlo

- Como paso final de [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md), [BUG_FIX.md](BUG_FIX.md) y [REFACTOR.md](REFACTOR.md).
- Cuando el usuario pide explícitamente revisar un diff, un PR o el estado actual del working tree.
- Cuando se invoca la skill `/code-review` del entorno (si está disponible) — este workflow define el criterio que esa skill debe aplicar en este proyecto.

## Cuándo NO utilizarlo

- Para decidir *qué* construir (eso es [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md)) — este workflow solo evalúa lo ya hecho.
- Como sustituto de la prueba manual de un flujo de usuario — la revisión de código no reemplaza haber ejecutado la app.

## Precondiciones

Existe un diff o un conjunto de cambios concreto para evaluar (no se revisa "el proyecto en general" sin un cambio específico como foco).

## Documentación que debe consultar

[DEVELOPMENT_GUIDE.md § Criterios de revisión de código](../DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código) primero; luego, según lo que el diff toque, la guía de dominio correspondiente de cada una de las 18 dimensiones (tabla abajo).

## Agentes que participan

```
        REVIEWER (lead)
             ↓
        ARCHITECT               →  arquitectura, duplicación, complejidad, escalabilidad
             ↓
    SECURITY_ENGINEER           →  seguridad
             ↓
   PERFORMANCE_ENGINEER         →  rendimiento
             ↓
      SEO_SPECIALIST            →  SEO (si el diff toca contenido/metadata/rutas)
             ↓
FRONTEND_ENGINEER / DESIGNER    →  UX, UI, accesibilidad (si el diff es visual)
             ↓
   BUSINESS_CONSULTANT          →  coherencia de negocio (si el diff toca copy/alcance)
```

`REVIEWER` siempre lidera y consolida el informe final; los demás participan solo en las dimensiones que el diff efectivamente toca — no se convoca a `SEO_SPECIALIST` para un cambio que no toca contenido ni rutas, por ejemplo.

## Orden de ejecución

1. **Delimitar el diff**: qué archivos cambiaron, qué tipo de cambio es (visual, lógica, contenido, configuración).
2. **Recorrer las 18 dimensiones**, en este orden, marcando cada una como `✅ OK` / `⚠️ Observación` / `❌ Bloqueante`:

| # | Dimensión | Se verifica contra |
|---|---|---|
| 1 | Correctitud | ¿El cambio hace lo que dice, sin romper otro flujo? |
| 2 | Arquitectura | [ARCHITECTURE.md § Regla de ubicación de código nuevo](../ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo) |
| 3 | UX | [UX_GUIDE.md](../UX_GUIDE.md) |
| 4 | UI (sistema de diseño) | [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) |
| 5 | SEO | [SEO_GUIDE.md § Checklist](../SEO_GUIDE.md#checklist-antes-de-mergear-un-cambio-que-toca-seo) |
| 6 | Seguridad | [SECURITY_GUIDE.md](../SECURITY_GUIDE.md) |
| 7 | Performance | [PERFORMANCE_GUIDE.md § Checklist](../PERFORMANCE_GUIDE.md#checklist-antes-de-mergear-un-cambio-con-impacto-potencial-en-rendimiento) |
| 8 | Accesibilidad | [UX_GUIDE.md § Accesibilidad](../UX_GUIDE.md#accesibilidad) |
| 9 | Testing | Verificación manual documentada (o tests automatizados cuando existan, ver Fase 5 del [ROADMAP.md](../ROADMAP.md)) |
| 10 | Documentación | ¿Se actualizó lo que [DOCUMENTATION.md](DOCUMENTATION.md) exige para este tipo de cambio? |
| 11 | Tipos | [DEVELOPMENT_GUIDE.md § Reglas de TypeScript](../DEVELOPMENT_GUIDE.md#reglas-de-typescript) — sin `any` nuevo, `strict` intacto |
| 12 | Build | `npm run build` sin errores |
| 13 | Lint | `npm run lint` sin errores ni warnings nuevos |
| 14 | Git | [GIT_WORKFLOW.md](../GIT_WORKFLOW.md) — commits enfocados, convención respetada |
| 15 | Convenciones | [DEVELOPMENT_GUIDE.md § Convenciones de código](../DEVELOPMENT_GUIDE.md#convenciones-de-código) |
| 16 | Código duplicado | ¿Ya existía un patrón/función que resolvía esto? |
| 17 | Complejidad | ¿La solución es tan simple como el problema permite? |
| 18 | Escalabilidad y mantenibilidad | ¿Se sostiene si el sitio crece según [ROADMAP.md](../ROADMAP.md), o es una solución frágil? |

   - **🛑 CHECKPOINT.** Cualquier dimensión marcada `❌ Bloqueante` impide aprobar el cambio, sin excepción. Un hallazgo de seguridad crítico o un elemento de [AI_GUIDELINES.md § 12](../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización) tocado sin autorización se escala al usuario de inmediato, no se documenta solo como observación.
3. **Redactar el informe** siguiendo la plantilla de abajo.
4. **Emitir un veredicto**: `Aprobado` / `Aprobado con observaciones` / `Cambios requeridos`.

## Plantilla del informe

```markdown
# Code Review — <resumen del cambio>

## Resumen ejecutivo
<1-3 frases: qué cambia y el veredicto>

## Dimensiones evaluadas
| Dimensión | Estado | Nota |
|---|---|---|
| Correctitud | ✅/⚠️/❌ | ... |
| ... (las 18) | | |

## Hallazgos
### 🔴 Bloqueantes
- `archivo:línea` — descripción del problema y por qué bloquea.

### 🟡 Observaciones
- `archivo:línea` — descripción, no bloquea pero se recomienda atender.

## Veredicto
Aprobado / Aprobado con observaciones / Cambios requeridos.
```

## Criterios de calidad

El informe cubre las 18 dimensiones sin omitir ninguna (marcar `N/A` explícitamente si una dimensión no aplica al diff, en vez de omitirla en silencio); cada hallazgo bloqueante referencia archivo y línea concretos, no una impresión general.

## Criterios de finalización

Las 18 dimensiones están evaluadas; el informe sigue la plantilla; el veredicto es explícito. Un veredicto de `Cambios requeridos` no es un fracaso del workflow — es el resultado correcto cuando corresponde.

## Documentación que debe actualizar

Este workflow no actualiza documentación por sí mismo — señala, en el hallazgo correspondiente, si la documentación del cambio revisado quedó desactualizada, remitiendo a [DOCUMENTATION.md](DOCUMENTATION.md) para que quien implementó lo corrija.

## Ejemplo real

**Diff**: se agregó un nuevo botón de CTA secundario en `Hero.tsx` con un color `bg-purple-500` y sin `aria-label` por ser solo texto (correcto ahí), pero con `onClick` en un `<div>` en vez de `<button>`.

Extracto del informe:

```markdown
## Hallazgos

### 🔴 Bloqueantes
- `components/sections/Hero.tsx:158` — El nuevo CTA usa `<div onClick>` en vez de `<button>`. Rompe accesibilidad de teclado (UX_GUIDE.md § Accesibilidad). Bloqueante.
- `components/sections/Hero.tsx:158` — Color `bg-purple-500` no pertenece a la paleta de marca (DESIGN_SYSTEM.md). El morado fue reemplazado deliberadamente por azul (ver ADR-005). Bloqueante.

### 🟡 Observaciones
- Considerar si un tercer CTA en el Hero compite con la jerarquía de "un primario + un secundario" ya establecida (UX_GUIDE.md).

## Veredicto
Cambios requeridos.
```

## Referencias cruzadas

- [agents/REVIEWER.md](../agents/REVIEWER.md) · [DEVELOPMENT_GUIDE.md § Criterios de revisión de código](../DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código) · [prompts/code-review.md](../prompts/code-review.md) (chuleta rápida)
