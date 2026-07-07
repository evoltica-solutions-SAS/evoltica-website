# Brief: tareas de despliegue

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas relacionadas con build, despliegue o configuración de Vercel.

**Rol completo:** [agents/DEVOPS_ENGINEER.md](../agents/DEVOPS_ENGINEER.md) · **Proceso completo:** fase final de [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md)

## Antes de actuar

1. `main` debe permanecer siempre en estado desplegable — no empujes un cambio que no pase `npm run build` localmente.
2. Cada PR genera su propio Preview Deployment en Vercel; úsalo para validar antes de mergear.

## Reglas mínimas a respetar

- No hay entorno de staging separado: el preview de cada PR cumple ese rol.
- Rollback ante un problema en producción: primero revertir el deployment en Vercel (rápido, reversible), luego corregir el código.
- La configuración del dashboard de Vercel (dominios, redirects, env vars del proyecto) está fuera de este repositorio — cualquier cambio ahí se coordina directamente con quien administra la cuenta.

## Nunca sin autorización

Cambios en `metadataBase`/`robots`/`canonical`, variables de entorno de producción, o configuración de dominio.

## Documentación completa

[GIT_WORKFLOW.md](../GIT_WORKFLOW.md) · [docs/decisions/ADR-002-Why-Vercel.md](../docs/decisions/ADR-002-Why-Vercel.md)
