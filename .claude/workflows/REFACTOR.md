# Workflow: Refactor

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Objetivo

Mejorar la mantenibilidad, simplicidad y estructura interna del código — eliminando duplicación y reduciendo complejidad — sin cambiar ningún comportamiento observable por el usuario.

## Cuándo utilizarlo

- Hay código duplicado entre dos o más componentes que resuelve lo mismo.
- Un componente/archivo creció más allá de una responsabilidad clara y conviene dividirlo (ver el mismo criterio de [AI_GUIDELINES.md § 14, regla 5](../AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación), aplicado a código en vez de documentación).
- Una abstracción quedó obsoleta o innecesariamente compleja para el problema que resuelve hoy.

## Cuándo NO utilizarlo

- Si el resultado visible o funcional para el usuario va a cambiar, aunque sea ligeramente → es [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) o [BUG_FIX.md](BUG_FIX.md), no un refactor.
- "Se podría mejorar" sin una razón concreta de mantenibilidad actual → no se hace. Ver [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md): no se introduce ni se elimina abstracción especulativamente.

## Precondiciones

Existe una forma de verificar que el comportamiento no cambió: tests automatizados (cuando existan, ver Fase 5 del [ROADMAP.md](../ROADMAP.md)) o, hoy, un plan claro de verificación manual del flujo afectado antes de tocar el código.

## Documentación que debe consultar

[ARCHITECTURE.md § Regla de ubicación de código nuevo](../ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo) · [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) · la guía de dominio específica del área tocada.

## Agentes que participan

```
    ARCHITECT              →  evalúa el alcance y el impacto del refactor
        ↓
FRONTEND_ENGINEER /
BACKEND_ENGINEER            →  ejecuta el refactor
        ↓
       REVIEWER             →  confirma que el comportamiento no cambió
        ↓
   DEVOPS_ENGINEER          →  prepara el commit (tipo `refactor`)
```

## Orden de ejecución

1. **Confirmar el objetivo**: el comportamiento observable (HTML renderizado, flujos de usuario, respuestas de API) debe permanecer idéntico. Si durante el análisis se concluye que en realidad hace falta cambiar algo de comportamiento, **detente** — esto deja de ser un refactor; reclasifica como [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) o [BUG_FIX.md](BUG_FIX.md).
2. **Medir el alcance** (`ARCHITECT`): qué archivos toca, qué tan grande es el cambio, si cruza la separación entre `components/sections/`, `components/ui/`, `lib/`, `hooks/`.
   - **🛑 CHECKPOINT.** Si el refactor implica mover código a través de un límite arquitectónico relevante (p. ej. promover un componente a `components/ui/` porque ahora se reutiliza en dos lugares) confírmalo con el criterio de [ARCHITECTURE.md](../ARCHITECTURE.md); si implica cambiar un límite deliberado del proyecto, escala al usuario.
3. **Verificar la cobertura de verificación disponible** antes de tocar nada: ¿hay tests? Si no, define exactamente qué se va a probar manualmente después (qué página, qué viewport, qué interacción).
4. **Refactorizar en pasos pequeños**, cada uno con una intención clara (extraer función, mover a hook, unificar duplicados) — no un cambio masivo de una sola vez que dificulte aislar un error si algo se rompe.
5. **Verificar después de cada paso**: `npm run lint` y `npm run build`.
6. **Confirmar comportamiento idéntico**: repite la prueba manual (o automatizada) definida en el paso 3 y compara contra el comportamiento previo al refactor.
7. **Preparar el commit** tipo `refactor`, **separado de cualquier otro tipo de cambio** — nunca mezclado con un `feat`, `fix` o `content` en el mismo commit.

## Criterios de calidad

Reduce duplicación o complejidad real (medible: menos líneas repetidas, menos ramas condicionales, responsabilidad más clara por archivo) sin introducir una abstracción nueva que no se necesitaba antes del refactor.

## Criterios de finalización

El comportamiento observable es idéntico al de antes del refactor (verificado, no asumido); lint y build pasan; el commit está aislado y correctamente tipado como `refactor`.

## Documentación que debe actualizar

Normalmente ninguna regla de dominio cambia (el refactor no cambia el "qué", solo el "cómo" interno). Si el refactor establece un patrón nuevo digno de documentarse (p. ej. un hook reutilizable que antes no existía como tal), actualiza [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) o [ARCHITECTURE.md](../ARCHITECTURE.md) según corresponda, en el mismo cambio.

## Ejemplo real

**Situación hipotética**: dos secciones declaran a mano un `motion.div` con `initial`/`whileInView` equivalente, en vez de usar el componente `Reveal` ya existente.

1. Confirmar: el comportamiento (scroll suave con el mismo offset) no cambia — solo se unifica la implementación.
2. `ARCHITECT` mide el alcance: dos archivos, ningún cruce de límite arquitectónico (el hook ya vive en `hooks/`, que es su lugar correcto).
3. Verificación disponible: no hay tests automatizados de navegación aún — el plan es probar manualmente cada ancla afectada en móvil y escritorio antes y después.
4. Refactor en un paso: reemplazar la animación duplicada por `Reveal` en ambos componentes.
5. Lint y build tras el cambio.
6. Probar cada ancla: el comportamiento de scroll es idéntico al anterior.
7. Commit: `refactor(motion): unificar entradas de sección usando Reveal`.

## Referencias cruzadas

- [agents/ARCHITECT.md](../agents/ARCHITECT.md) · [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) · [workflows/CODE_REVIEW.md](CODE_REVIEW.md)
