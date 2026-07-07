# docs/deployment/

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Espacio para documentación operativa de despliegue que es más detallada de lo que corresponde tener en [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md) (que cubre el flujo de Git/PR de forma estable, no el detalle operativo de infraestructura).

## Qué va aquí

- Runbooks de incidentes en producción (qué hacer si el sitio cae, si el formulario deja de enviar leads, etc.).
- Documentación de configuración de Vercel que no sea sensible (estructura de variables de entorno esperadas, sin sus valores).
- Notas de migraciones de dominio, DNS o certificados.
- Checklists de despliegue para cambios de alto riesgo (p. ej. actualización mayor de Next.js).

## Qué NO va aquí

- Secretos, tokens o valores reales de variables de entorno — **nunca**, en ningún documento de este repositorio (ver [SECURITY_GUIDE.md](../../SECURITY_GUIDE.md)).
- El flujo estándar de ramas/PR/merge → eso vive en [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md).

## Convención de nombres

`AAAA-MM-DD-titulo-corto.md` para notas puntuales, o `runbook-<situacion>.md` para runbooks reutilizables (sin fecha, ya que se actualizan in-place).

## Referencias

- [GIT_WORKFLOW.md](../../GIT_WORKFLOW.md) — flujo de ramas, PR y entornos.
- [SECURITY_GUIDE.md](../../SECURITY_GUIDE.md) — manejo de secretos.
- [docs/decisions/ADR-002-Why-Vercel.md](../decisions/ADR-002-Why-Vercel.md) — por qué Vercel es la plataforma de despliegue.
