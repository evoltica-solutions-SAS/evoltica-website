# docs/architecture/

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Espacio para documentación arquitectónica de detalle (diagramas, análisis de un subsistema específico) que es demasiado granular para vivir en [ARCHITECTURE.md](../../ARCHITECTURE.md) (que se mantiene como la vista general y estable de la arquitectura).

## Qué va aquí

- Diagramas de flujo de datos de un subsistema específico (p. ej. el flujo completo del formulario de contacto, desde el submit hasta el webhook).
- Análisis de capacidad/escalabilidad antes de una fase del [ROADMAP.md](../../ROADMAP.md) (p. ej. qué implica introducir base de datos para el Portal Clientes).
- Especificaciones técnicas detalladas de una integración futura, antes de convertirse en un ADR formal.

## Qué NO va aquí

- La estructura de carpetas y principios vigentes → eso vive en [ARCHITECTURE.md](../../ARCHITECTURE.md).
- Una decisión ya tomada con alternativas evaluadas → eso es un ADR, ver [docs/decisions/](../decisions/). Este directorio es para el análisis *previo* a la decisión; una vez decidido, el resultado formal va como ADR.

## Convención de nombres

`AAAA-MM-DD-titulo-corto.md`, por ejemplo: `2027-01-10-analisis-arquitectura-portal-clientes.md`.

## Referencias

- [ARCHITECTURE.md](../../ARCHITECTURE.md) — arquitectura vigente.
- [docs/decisions/](../decisions/) — decisiones formalizadas como ADR.
