# Workflow: Feature Development

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Objetivo

Llevar un requerimiento nuevo — una sección, un componente, una funcionalidad, una pieza de contenido — desde su análisis hasta un commit listo para revisión, sin saltarse verificación, documentación ni los puntos donde se requiere aprobación humana.

## Cuándo utilizarlo

- Se pide una sección, componente, página o funcionalidad que no existe hoy.
- Se pide expandir contenido (nuevo servicio, caso de éxito, texto nuevo) que implica trabajo de varios agentes (copy + implementación).
- Se pide integrar algo nuevo (una librería, un endpoint, una fase del [ROADMAP.md](../ROADMAP.md)).

## Cuándo NO utilizarlo

- El sitio hace algo distinto de lo esperado → usa [BUG_FIX.md](BUG_FIX.md).
- El comportamiento no cambia, solo la estructura interna del código → usa [REFACTOR.md](REFACTOR.md).
- Solo se necesita evaluar un cambio ya hecho → usa [CODE_REVIEW.md](CODE_REVIEW.md).
- Solo se necesita crear/actualizar documentación, sin tocar código → usa [DOCUMENTATION.md](DOCUMENTATION.md).

## Precondiciones

- El requerimiento está expresado con claridad suficiente para identificar qué archivo(s)/sección(es) toca. Si no lo está, la primera acción de este workflow es pedir la aclaración necesaria (ver [AI_GUIDELINES.md § 1](../AI_GUIDELINES.md#1-cómo-analizar-el-proyecto)) — no asumir la interpretación más conveniente.
- Se ha leído `CLAUDE.md` y se conoce la tabla de enrutamiento de la Knowledge Base.

## Documentación que debe consultar

En este orden: [BUSINESS_CONTEXT.md](../BUSINESS_CONTEXT.md) (¿tiene sentido de negocio y dónde encaja en el embudo?) → [ARCHITECTURE.md](../ARCHITECTURE.md) (¿dónde vive?) → [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) y/o [UX_GUIDE.md](../UX_GUIDE.md) si es visual → [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) para convenciones de implementación → [SEO_GUIDE.md](../SEO_GUIDE.md) si toca contenido/rutas/metadata → [SECURITY_GUIDE.md](../SECURITY_GUIDE.md) si toca el endpoint de contacto.

## Agentes que participan

```
BUSINESS_CONSULTANT  →  ¿tiene sentido para el negocio?
        ↓
    ARCHITECT         →  ¿dónde y cómo encaja?
        ↓
    DESIGNER          →  (si es visual) ¿cómo debe verse?
        ↓
FRONTEND_ENGINEER /
BACKEND_ENGINEER /
COPYWRITER            →  implementación, según la naturaleza del cambio
        ↓
SEO_SPECIALIST        →  (si toca contenido/rutas) ¿refuerza el posicionamiento?
        ↓
    REVIEWER          →  ejecuta CODE_REVIEW.md completo
        ↓
DEVOPS_ENGINEER       →  prepara el commit
```

No todos los agentes participan en toda tarea — un cambio de copy puro no necesita a `BACKEND_ENGINEER`; un cambio al endpoint de contacto no necesita a `DESIGNER`. La secuencia de arriba es el orden máximo; se omiten los roles que no aplican.

## Orden de ejecución

1. **Analizar el requerimiento.** Identifica qué agente(s) participan y qué guías de dominio aplican (ver tabla de `CLAUDE.md`). Si es ambiguo, pregunta antes de continuar.
2. **Leer la documentación relevante completa**, no solo el fragmento que parezca aplicable — incluyendo el archivo de código que se va a modificar, entero.
3. **Buscar reutilización.** ¿Ya existe un componente, hook, patrón de contenido o dato en `lib/` que resuelve esto o parte de esto? Prioriza extender sobre crear desde cero.
4. **Diseñar la solución** (`ARCHITECT` + `DESIGNER` si aplica): dónde vive el archivo nuevo, qué patrón visual usa, qué reutiliza.
5. **Evaluar impacto arquitectónico** (`ARCHITECT`): ¿la solución respeta los [límites deliberados del proyecto](../ARCHITECTURE.md#límites-deliberados-del-proyecto) y no aparece en la lista de [AI_GUIDELINES.md § 12](../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización)?
   - **🛑 CHECKPOINT — Aprobación requerida.** Si la solución rompe un límite arquitectónico, toca un elemento de la lista de "nunca sin autorización", o requiere una decisión permanente (nueva tecnología, nueva convención de marca), **detente y espera confirmación explícita del usuario antes de implementar**. No hay excepción "porque es una mejora obvia".
6. **Validar sentido de negocio** (`BUSINESS_CONSULTANT`, si el cambio es de cara al usuario): ¿a qué paso del embudo sirve? ¿es coherente con `BUSINESS_CONTEXT.md`?
7. **Implementar** (`FRONTEND_ENGINEER` / `BACKEND_ENGINEER` / `COPYWRITER` según corresponda), siguiendo las convenciones de [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md).
8. **Lint**: `npm run lint`.
9. **Build**: `npm run build`.
10. **Pruebas manuales** del flujo afectado en `npm run dev` (móvil + escritorio si es visual; envío real si toca el formulario).
    - **🛑 CHECKPOINT.** Si lint, build o la prueba manual fallan, no se avanza al siguiente paso — se corrige aquí.
11. **Ejecutar [CODE_REVIEW.md](CODE_REVIEW.md)** (`REVIEWER`, con especialistas convocados según lo que el diff toque).
12. **Actualizar la documentación de dominio afectada** siguiendo [DOCUMENTATION.md](DOCUMENTATION.md).
13. **Actualizar o crear un ADR** si la tarea implicó una decisión permanente (ver [docs/decisions/README.md § Cuándo crear un ADR](../docs/decisions/README.md#cuándo-crear-un-adr)).
14. **Actualizar [CHANGELOG_ARCHITECTURE.md](../CHANGELOG_ARCHITECTURE.md)** si hubo un ADR nuevo o modificado.
15. **Preparar el commit** (`DEVOPS_ENGINEER`), siguiendo [GIT_WORKFLOW.md § Convenciones de commits](../GIT_WORKFLOW.md#convenciones-de-commits). No se hace `push` ni se abre PR salvo pedido explícito.
16. **Resumen final honesto al usuario**: qué se hizo, qué se verificó (y cómo), qué no se pudo verificar, y qué documentación quedó actualizada.

## Criterios de calidad

Los de [DEVELOPMENT_GUIDE.md § Criterios de revisión de código](../DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código), aplicados en el paso 11, sin excepción.

## Criterios de finalización

Todo el checklist de [AI_GUIDELINES.md § 13](../AI_GUIDELINES.md#13-checklist-antes-de-finalizar-cualquier-tarea) en verde, incluyendo: build limpio, verificación manual cuando aplica, documentación actualizada en el mismo cambio, y ningún elemento de la lista de "nunca sin autorización" tocado sin confirmación.

## Documentación que debe actualizar

| Si el cambio tocó... | Actualizar |
|---|---|
| Una convención de código/diseño nueva | La guía de dominio correspondiente |
| Una decisión permanente (tecnología, marca) | ADR nuevo/actualizado + `CHANGELOG_ARCHITECTURE.md` |
| Contenido de servicios/negocio | `BUSINESS_CONTEXT.md` (si cambia una regla vigente, no solo el copy en sí) |
| Metadata/rutas | Verificar `SEO_GUIDE.md` y `public/sitemap.xml` |
| Una prioridad futura, no esta tarea | `ROADMAP.md` |

## Ejemplo real

**Tarea**: "Agrega la sección de Casos de Éxito" (Fase 8 del [ROADMAP.md](../ROADMAP.md)).

1. `BUSINESS_CONSULTANT` confirma: sirve como prueba social en el embudo, coherente con la Fase 8 ya planeada; depende de autorización de clientes reales para publicar (dependencia de negocio, no técnica — se señala al usuario).
2. `ARCHITECT` decide: nuevo componente en `components/sections/CasosExito.tsx`, datos en `lib/casos-exito-data.ts` con su tipo exportado (siguiendo el patrón de `services-data.ts`); no requiere base de datos porque el volumen inicial es bajo y estático — **no** dispara el checkpoint de arquitectura.
3. `DESIGNER` decide: reutiliza `glass-card`, `section-label`, `container-custom` y el arquetipo de motion de "entrada de sección" ya usado en `Services.tsx`.
4. `COPYWRITER` redacta los casos siguiendo el tono de marca; señala que las cifras de impacto deben venir aprobadas por el cliente real, no inventadas.
5. `FRONTEND_ENGINEER` implementa el componente y lo agrega a `app/page.tsx`.
6. `SEO_SPECIALIST` confirma que los `alt` de logos de clientes y la jerarquía de encabezados son correctos.
7. Lint, build, prueba manual en móvil/escritorio.
8. `REVIEWER` ejecuta `CODE_REVIEW.md` completo.
9. Se actualiza `ROADMAP.md` marcando la Fase 8 con su estado real de avance.
10. `DEVOPS_ENGINEER` prepara: `feat(casos-exito): agregar sección de casos de éxito con datos iniciales`.

## Referencias cruzadas

- [agents/README.md](../agents/README.md) · [workflows/CODE_REVIEW.md](CODE_REVIEW.md) · [workflows/DOCUMENTATION.md](DOCUMENTATION.md) · [AI_GUIDELINES.md](../AI_GUIDELINES.md)
