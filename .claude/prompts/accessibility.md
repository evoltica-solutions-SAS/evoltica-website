# Brief: tareas de accesibilidad

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para auditar o mejorar accesibilidad de un componente/flujo existente.

**Rol completo:** [agents/FRONTEND_ENGINEER.md](../agents/FRONTEND_ENGINEER.md) · **Proceso completo:** [workflows/CODE_REVIEW.md](../workflows/CODE_REVIEW.md)

## Qué revisar, en orden

1. **Semántica**: ¿se usan `<button>`, `<a>`, `<nav>`, `<label>` correctamente? ¿Hay algún `<div onClick>` que debería ser `<button>`?
2. **Foco de teclado**: ¿todo elemento interactivo es alcanzable y operable solo con teclado (Tab, Enter, Escape)? ¿El estado `:focus-visible` es perceptible?
3. **Íconos sin texto**: ¿tienen `aria-label`? ¿Los decorativos tienen `aria-hidden="true"`?
4. **Contraste**: ¿el texto cumple WCAG AA (4.5:1 normal, 3:1 grande) sobre el fondo oscuro?
5. **Movimiento**: ¿las animaciones de loop/entrada respetan `prefers-reduced-motion`?
6. **Formularios**: ¿cada input tiene `<label>` asociado y errores anunciables (no solo color)?

## Referencia de lo ya implementado correctamente

El skip link de `app/layout.tsx` (`href="#main-content"`, `focus:ring-2 focus:ring-white`) es el patrón de referencia para foco visible.

## Documentación completa

[UX_GUIDE.md § Accesibilidad](../UX_GUIDE.md#accesibilidad)
