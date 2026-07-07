# Workflow: Bug Fix

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Objetivo

Corregir un comportamiento del sitio que contradice lo esperado, atacando siempre la **causa raíz** — nunca un parche que oculta el síntoma sin resolver el problema real.

## Filosofía: Root Cause Analysis

Un parche temporal ("agrego un `if` para que este caso específico no falle") no es una corrección aceptable en este proyecto. Antes de escribir cualquier código de corrección, la causa raíz debe estar identificada y ser explicable en una frase: *"esto falla porque X, y por eso Y ocurre"*. Si no puedes completar esa frase con confianza, no has terminado de investigar — vuelve al paso 2.

## Cuándo utilizarlo

- El sitio hace algo distinto de lo que la documentación o el sentido común indican que debería hacer (visual, funcional, de datos).
- Un flujo de conversión (formulario, navegación, WhatsApp) falla parcial o totalmente.
- Un usuario o el propio agente detecta una inconsistencia entre el comportamiento observado y lo documentado.

## Cuándo NO utilizarlo

- Lo que falta es una funcionalidad que nunca existió → usa [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md).
- El comportamiento es correcto pero el código es difícil de mantener → usa [REFACTOR.md](REFACTOR.md).
- Es una mejora de calidad, no un comportamiento roto → usa [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) o trátalo como sugerencia, no como bug.

## Precondiciones

El bug debe ser **reproducible** o tener evidencia concreta (mensaje de error, captura, descripción exacta de pasos). Si no hay evidencia suficiente para reproducirlo, el primer paso es conseguirla — no adivinar la causa.

## Documentación que debe consultar

La guía de dominio correspondiente al área afectada (ver tabla de enrutamiento en [CLAUDE.md](../CLAUDE.md)), y siempre [AI_GUIDELINES.md § 3 — Cómo modificar código](../AI_GUIDELINES.md#3-cómo-modificar-código).

## Agentes que participan

```
FRONTEND_ENGINEER / BACKEND_ENGINEER   →  reproducir, investigar causa raíz, corregir
        ↓
   SECURITY_ENGINEER                   →  (solo si el bug tiene implicación de seguridad)
        ↓
       REVIEWER                        →  verificación final
        ↓
   DEVOPS_ENGINEER                     →  prepara el commit (tipo `fix`)
```

## Orden de ejecución

1. **Reproducir el bug.** Ejecuta los pasos exactos que lo provocan en `npm run dev`. Si no se puede reproducir, documenta exactamente qué se intentó antes de continuar — no se corrige lo que no se puede observar.
2. **Delimitar el impacto.** ¿Quién se ve afectado? ¿Se pierden leads reales (formulario)? ¿Es solo visual? ¿Tiene implicación de seguridad o de datos personales? Esto determina la urgencia y si `SECURITY_ENGINEER` debe involucrarse.
3. **Identificar la causa raíz**, no el síntoma. Lee el archivo completo involucrado, no solo la línea donde el síntoma aparece — la causa suele estar en un archivo distinto de donde el síntoma se manifiesta (un hook, un tipo, un dato de `lib/`).
   - **🛑 CHECKPOINT.** Si la causa raíz resulta ser una decisión arquitectónica (p. ej. el bug existe porque el sitio no tiene un tipo de dato que debería tener), esto ya no es un bug fix — reclasifica la tarea como [FEATURE_DEVELOPMENT.md](FEATURE_DEVELOPMENT.md) y sigue ese workflow desde el paso de diseño.
4. **Validar el impacto de la corrección propuesta.** ¿Toca algún elemento de [AI_GUIDELINES.md § 12](../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización) (p. ej. el endpoint de contacto)? Si sí, confirma con el usuario antes de corregir.
5. **Corregir en el origen**, no en el síntoma. La corrección debe eliminar la causa raíz identificada en el paso 3.
6. **Probar** que el bug ya no ocurre, repitiendo exactamente los pasos del paso 1, y que la corrección no introdujo una regresión en un flujo adyacente (lint, build, prueba manual del flujo afectado y de los flujos relacionados).
7. **Documentar**, si el bug reveló un patrón recurrente o un gap de documentación, considera una nota en [docs/development/](../docs/development/) (postmortem breve) — no obligatorio para bugs triviales, sí recomendable para bugs que tomaron investigación real.
8. **Preparar el commit** tipo `fix`, separado de cualquier otro cambio, describiendo la causa raíz corregida (no solo el síntoma) en el cuerpo del mensaje si no es obvio del resumen.

## Criterios de calidad

La corrección ataca la causa raíz confirmada, no un síntoma; no introduce un `if`/caso especial que oculte el problema sin resolverlo; no rompe ningún otro flujo verificado en el paso 6.

## Criterios de finalización

El bug ya no es reproducible siguiendo los pasos originales; lint y build pasan; los flujos adyacentes se probaron; el commit está preparado como tipo `fix` con la causa raíz explicada.

## Documentación que debe actualizar

Normalmente ninguna guía de dominio cambia (el comportamiento correcto ya estaba documentado; el código no lo cumplía). Si el bug reveló que la documentación describía algo que el código nunca hizo, se actualiza la documentación en el mismo cambio (ver [AI_GUIDELINES.md § 7](../AI_GUIDELINES.md#7-cómo-generar-documentación), regla de conflicto código/documentación) y se señala explícitamente al usuario.

## Ejemplo real

**Bug reportado**: "El formulario de contacto no muestra ningún error cuando el teléfono es inválido, simplemente no envía."

1. Reproducir: llenar el formulario con un teléfono como "abc", enviar, observar que no pasa nada visible.
2. Impacto: un lead real podría abandonar el formulario sin saber por qué falla — impacto directo en conversión, no solo cosmético.
3. Causa raíz: el cliente (React Hook Form) no tiene una regla de validación para `phone` equivalente a `validatePhone()` en `app/api/contact/route.ts` — el servidor rechaza el envío (400) pero el componente de formulario no está mostrando ese error de respuesta al usuario.
4. No toca ningún elemento de la lista de autorización previa (es un fix de UX, no un cambio de la lógica de validación del servidor).
5. Corrección: agregar la regla de validación equivalente en el cliente (para feedback inmediato) **y** asegurar que el componente de formulario muestre el `message` de error que ya devuelve el servidor cuando la respuesta es 400.
6. Probar: teléfono inválido ahora muestra el mensaje específico en el cliente sin llegar a enviarlo, y si se fuerza un 400 real, el mensaje del servidor se muestra correctamente. Se prueba también el envío válido para confirmar que no se rompió.
7. No se requiere postmortem — es un gap de sincronía cliente/servidor ya cubierto por [SECURITY_GUIDE.md](../SECURITY_GUIDE.md), no un patrón nuevo.
8. Commit: `fix(contact): mostrar error de teléfono inválido en el formulario`.

## Referencias cruzadas

- [agents/FRONTEND_ENGINEER.md](../agents/FRONTEND_ENGINEER.md) · [agents/BACKEND_ENGINEER.md](../agents/BACKEND_ENGINEER.md) · [SECURITY_GUIDE.md](../SECURITY_GUIDE.md) · [workflows/CODE_REVIEW.md](CODE_REVIEW.md)
