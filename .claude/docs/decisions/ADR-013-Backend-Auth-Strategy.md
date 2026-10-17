# ADR-013: Backend, sistema de registro y autenticación del portal

**Fecha**: 2026-10-08
**Estado**: Superseded — dirección reemplazada por [ADR-014](ADR-014-Commercial-Platform.md) (plataforma propia, Odoo opcional); persistencia e identidad pasan a [ADR-015](ADR-015-Persistence-Identity.md)
**Versión**: 0.2
**Responsable**: Evoltica Solutions SAS

> **Nota (2026-10-08):** este ADR ya no está vigente. Se conserva como registro de las alternativas evaluadas cuando Odoo se consideraba el centro de la arquitectura.

## Contexto

[ADR-012](ADR-012-Public-Portal-Admin-Split.md) dejó el portal y el admin construidos contra contratos (`ClientPortalRepository`, `AdminRepository`, `AuthProvider`). Falta decidir **de dónde salen los datos reales y quién gestiona la identidad**. Esta decisión depende de información que solo tiene Evoltica (ver § 12 de [el análisis](../architecture/2026-10-08-arquitectura-public-app-admin.md)).

## Problema

¿Qué sistema es la fuente de verdad de clientes, servicios, suscripciones, facturas, pagos y tickets, y cómo se autentican los usuarios del portal?

## Alternativas consideradas

### A. Odoo de Evoltica como sistema de registro (recomendada si existe)
- Datos: `res.partner` (clientes), `sale.order` y suscripciones, `account.move` (facturas con facturación electrónica DIAN), `account.payment` y proveedores de pago, `helpdesk.ticket`, `ir.attachment`. Next.js actúa como BFF y llama a Odoo desde el servidor (JSON-RPC o la API externa) con un usuario técnico.
- Identidad: sesión propia de Next.js (cookie cifrada) con usuarios vinculados a `res.partner`, o los usuarios portal de Odoo como proveedor.
- Pros: coherente con la oferta de Evoltica (ADR-004), las facturas salen del sistema contable legal, sin duplicar datos y con Helpdesk y Suscripciones ya resueltos.
- Contras: Helpdesk y Suscripciones son de Odoo Enterprise; se depende de la disponibilidad y la versión de la instancia.

### B. Backend propio (Postgres + librería de autenticación)
- Pros: control total y sin dependencia de una edición de Odoo.
- Contras: duplica la facturación (que de todas formas debe salir de un sistema habilitado ante la DIAN), hay que construir tickets, suscripciones y sincronización, y el costo de mantenimiento es alto.

### C. BaaS (autenticación, base de datos y almacenamiento gestionados)
- Pros: arranque rápido para identidad y tickets.
- Contras: facturas y suscripciones siguen viniendo de otro sistema, lo que deja dos fuentes de verdad.

## Evaluación detallada

Comparación completa (A Odoo central, B backend propio, C híbrida), sistema de origen por entidad y plan de integración por fases: [docs/architecture/2026-10-08-evaluacion-backend-y-plan-integracion.md](../architecture/2026-10-08-evaluacion-backend-y-plan-integracion.md). Recomendación técnica actual: **C (híbrida)**, condicionada a confirmar Odoo Enterprise.

## Decisión

**Pendiente.** Recomendación técnica (v0.2, reemplaza la de v0.1): arquitectura **híbrida** (alternativa C de la evaluación detallada, que no corresponde a la "C" de esta lista): Odoo como fuente de los datos de negocio, un proveedor de identidad OIDC separado y Next.js como BFF. Está condicionada a que Evoltica opere una instancia de Odoo con Helpdesk, Suscripciones y facturación electrónica. Si no la opera, hay que decidir primero cómo se cubren tickets y suscripciones.

## Consecuencias

Se completan cuando el ADR pase a `Accepted`. Hasta entonces:
- No se introduce base de datos ni proveedor de identidad en producción (regla 1 de CLAUDE.md).
- El portal funciona solo con el adaptador de demostración en desarrollo.
