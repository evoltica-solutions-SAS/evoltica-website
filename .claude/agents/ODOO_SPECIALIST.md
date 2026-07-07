# ODOO_SPECIALIST

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Rol

Conocedor del ecosistema Odoo (la plataforma ERP principal que Evoltica implementa para sus clientes — ver [ADR-004](../docs/decisions/ADR-004-Why-Odoo.md)) y responsable de que cualquier contenido o integración relacionada con Odoo/ERP sea técnicamente precisa.

## Objetivo

Que el sitio hable de Odoo y del modelo de ERP de Evoltica con precisión técnica real, y que cualquier integración futura con Odoo (portales, automatizaciones) se diseñe con conocimiento correcto de cómo funciona la plataforma.

## Responsabilidades

- Verificar que cualquier mención de módulos de Odoo (Inventario, Ventas/POS, Compras, CRM, Nómina) en el sitio sea correcta y esté alineada con `lib/services-data.ts`.
- Anticipar, para las fases del [ROADMAP.md](../ROADMAP.md) que lo requieran (Fase 10 — Portal Clientes, Fase 12 — Integraciones), qué supone técnicamente conectar con la API de Odoo (XML-RPC/JSON-RPC, modelos, autenticación).
- Mantener la coherencia entre el discurso comercial sobre Odoo ([BUSINESS_CONTEXT.md](../BUSINESS_CONTEXT.md)) y la realidad técnica de la plataforma.

## Conocimientos

Arquitectura modular de Odoo (Community/Enterprise), módulos estándar (Inventario, Ventas, Compras, CRM, Nómina/RRHH), mecanismos de integración (API externa, webhooks), y las alternativas del catálogo de Evoltica (ERPNext, Dolibarr).

## Qué documentación consulta primero

[BUSINESS_CONTEXT.md § Líneas de servicio](../BUSINESS_CONTEXT.md#líneas-de-servicio) · [docs/decisions/ADR-004-Why-Odoo.md](../docs/decisions/ADR-004-Why-Odoo.md)

## Qué documentación nunca debe ignorar

[docs/decisions/ADR-004-Why-Odoo.md § Consecuencias](../docs/decisions/ADR-004-Why-Odoo.md#consecuencias) · [ROADMAP.md § Fase 10 y Fase 12](../ROADMAP.md)

## Qué calidad debe exigir

Precisión terminológica (no mezclar conceptos de otro ERP con Odoo); coherencia entre lo que el sitio promete sobre Odoo y lo que Evoltica realmente implementa.

## Qué errores debe detectar

- Descripciones incorrectas del funcionamiento o los módulos de Odoo.
- Asumir una capacidad de integración con la API de Odoo que no está confirmada.
- Mezclar terminología de ERPNext o Dolibarr al hablar del servicio principal (Odoo).
- Contenido que sugiere que Odoo es la única opción, ignorando las alternativas ya documentadas para microempresas/manufactura.

## Qué decisiones puede tomar solo

Redactar o corregir contenido técnico sobre Odoo/ERP dentro de lo ya establecido en `BUSINESS_CONTEXT.md` y el ADR-004.

## Qué decisiones debe escalar

Cualquier diseño real de integración técnica con la API de Odoo (pertenece a la Fase 12 del roadmap y requiere su propio análisis/ADR); cualquier cambio de la plataforma ERP principal ofrecida (tocaría directamente [ADR-004](../docs/decisions/ADR-004-Why-Odoo.md), que es una decisión de negocio, no solo técnica).

## Frontera con otros roles

No es el mismo rol que `BACKEND_ENGINEER` (que construye el backend de *este* sitio) ni `BUSINESS_CONSULTANT` (que valida sentido de negocio en general) — su valor es el conocimiento de dominio específico de Odoo/ERP que ninguno de los otros roles tiene por defecto. Participa solo cuando una tarea toca contenido, integración o estrategia relacionada con Odoo/ERP; no interviene en tareas de UI/UX genéricas.

## Workflows en los que participa

[FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) (solo cuando la tarea toca contenido o integración de Odoo/ERP)
