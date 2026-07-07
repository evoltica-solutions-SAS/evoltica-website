# ADR-002: Por qué Vercel como plataforma de despliegue

**Fecha**: 2026-07-07 (documentado retroactivamente; la decisión ya estaba implementada — ver nota en [docs/decisions/README.md](README.md))
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Habiendo elegido Next.js como framework (ver [ADR-001](ADR-001-Why-NextJS.md)), el sitio necesitaba una plataforma de despliegue continuo, sin que Evoltica tuviera que operar infraestructura propia para un sitio de marketing.

## Problema

¿Dónde y cómo se despliega el sitio, de forma que cada cambio a `main` (o cada PR) sea fácil de verificar antes de llegar a producción?

## Alternativas consideradas

### Vercel
- Pros: creado por el mismo equipo que mantiene Next.js — soporte de primera clase para App Router, Server Components e Image Optimization sin configuración adicional; **Preview Deployments automáticos por PR** (pieza central del flujo descrito en [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md)); CDN global y HTTPS incluidos; plan gratuito suficiente para el tráfico actual de un sitio de marketing.
- Contras: vendor lock-in relativo al ecosistema Next.js/Vercel; costos pueden escalar si el tráfico o el uso de funciones serverless crece significativamente (relevante a evaluar en las fases de portal del [ROADMAP.md](../../ROADMAP.md)).

### VPS propio administrado por Evoltica (coherente con su propia oferta de Infraestructura y Cloud)
- Pros: control total, coherente con el servicio que Evoltica vende a sus clientes (ver [BUSINESS_CONTEXT.md](../../BUSINESS_CONTEXT.md)); sin dependencia de un tercero para el hosting del propio sitio.
- Contras: requiere mantenimiento operativo propio (parches, monitoreo, backups) para un sitio de marketing donde ese esfuerzo no aporta valor de negocio directo; sin Preview Deployments nativos, habría que construir ese flujo manualmente.

### Netlify / plataformas equivalentes
- Pros: modelo similar a Vercel (previews por PR, CDN, despliegue simple).
- Contras: soporte de las características más recientes de Next.js (App Router, Server Components) históricamente va un paso por detrás de Vercel, al no ser el mismo equipo que mantiene el framework.

## Decisión

Se despliega el sitio en **Vercel**, aprovechando el soporte nativo de Next.js y el flujo de Preview Deployments como parte integral del proceso de revisión de PRs.

## Consecuencias

- Se gana velocidad de despliegue, cero mantenimiento de infraestructura para el sitio de marketing, y un flujo de revisión visual (previews) que mejora la calidad de los PRs (ver [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md)).
- Se acepta dependencia de un proveedor externo para la disponibilidad del sitio; la configuración de dominio/env vars del proyecto vive en el dashboard de Vercel, fuera del control de este repositorio (ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](../../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización)).
- Debe revisarse si, al escalar hacia los portales autenticados del [ROADMAP.md](../../ROADMAP.md) (Fase 10+), el modelo de costos de funciones serverless de Vercel sigue siendo adecuado, o si conviene una arquitectura híbrida.

## Referencias

- [ADR-001-Why-NextJS.md](ADR-001-Why-NextJS.md)
- [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md)
