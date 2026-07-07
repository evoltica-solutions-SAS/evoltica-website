# Brief: tareas de UI/UX

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas de experiencia de usuario, navegación o flujos de interacción.

**Rol completo:** [agents/FRONTEND_ENGINEER.md](../agents/FRONTEND_ENGINEER.md) · [agents/DESIGNER.md](../agents/DESIGNER.md) · **Proceso completo:** [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md)

## Antes de diseñar/implementar

1. Identifica hacia qué paso del embudo comercial empuja el cambio (ver [BUSINESS_CONTEXT.md § Embudo de conversión](../BUSINESS_CONTEXT.md#embudo-de-conversión)) — todo debe llevar hacia el formulario de contacto o WhatsApp.
2. Un CTA primario por bloque, como máximo un secundario.

## Reglas mínimas a respetar

- Navegación por ancla usa `useSectionNav`, no `scrollIntoView` ad-hoc.
- Cualquier sección nueva navegable por ancla se registra en `navLinks` de `Navbar.tsx`.
- Overlays/drawers nuevos replican el scroll-lock del menú móvil existente.
- Estados de carga y feedback visibles en toda acción asíncrona.
- Mobile-first: valida el layout en viewport móvil antes de darlo por bueno.

## Al terminar

Recorre la checklist de [UX_GUIDE.md § Checklist rápida](../UX_GUIDE.md#checklist-rápida-antes-de-dar-por-terminada-una-secciónflujo-nuevo).

## Documentación completa

[UX_GUIDE.md](../UX_GUIDE.md) · [BUSINESS_CONTEXT.md](../BUSINESS_CONTEXT.md) · [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)
