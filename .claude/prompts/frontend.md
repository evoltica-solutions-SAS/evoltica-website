# Brief: tareas de frontend

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas que crean o modifican componentes React/UI. No sustituye a las guías completas — es el punto de entrada rápido.

**Rol completo:** [agents/FRONTEND_ENGINEER.md](../agents/FRONTEND_ENGINEER.md) (y [agents/DESIGNER.md](../agents/DESIGNER.md) si define el sistema visual) · **Proceso completo:** [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md)

## Antes de escribir código

1. Ubica el componente correcto según [ARCHITECTURE.md § Regla de ubicación de código nuevo](../ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo): `components/sections/` (contenido de una sección), `components/ui/` (reutilizable), `components/layout/` (chrome global).
2. Lee un componente hermano ya existente para replicar el patrón (estructura, animaciones, nomenclatura).

## Reglas mínimas a respetar

- Server Component por defecto; `"use client"` solo si hay estado/efectos/eventos DOM.
- Props tipadas explícitamente, sin `any`.
- Colores y clases del sistema de diseño (`tailwind.config.ts` + `globals.css`), nunca valores arbitrarios.
- Animaciones dentro de los tres arquetipos de motion (entrada de sección / micro-interacción / loop decorativo).
- Elementos interactivos semánticos y accesibles (`<button>`, `aria-label` en íconos sin texto).

## Al terminar

- `npm run lint` && `npm run build`.
- Si es visual, pruébalo en `npm run dev` en móvil y escritorio.

## Documentación completa

[DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) · [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) · [UX_GUIDE.md](../UX_GUIDE.md)
