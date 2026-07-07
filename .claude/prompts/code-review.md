# Brief: code review

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para revisar un PR o diff antes de aprobarlo.

**Rol completo:** [agents/REVIEWER.md](../agents/REVIEWER.md) · **Proceso completo:** [workflows/CODE_REVIEW.md](../workflows/CODE_REVIEW.md) (18 dimensiones + informe estructurado)

Orden de verificación:

1. **Correctitud** — ¿hace lo que dice, sin romper otro flujo (formulario, navegación, menú móvil)?
2. **Arquitectura** — ¿respeta [ARCHITECTURE.md § Regla de ubicación de código nuevo](../ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo)?
3. **Sistema de diseño** — ¿usa tokens/clases de [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) en vez de reinventar estilo?
4. **Tipos** — ¿tipado explícito, sin `any` nuevo, `strict` intacto?
5. **Accesibilidad** — ¿semántico, `aria-label`, foco visible, contraste? (ver [prompts/accessibility.md](accessibility.md))
6. **SEO** — si toca metadata/encabezados/rutas, ¿actualizó lo correspondiente? (ver [prompts/seo.md](seo.md))
7. **Rendimiento** — ¿`next/image`, sin dependencias innecesarias? (ver [prompts/performance.md](performance.md))
8. **Seguridad** — si toca el endpoint de contacto, ¿mantiene validación server-side y sanitización? (ver [prompts/backend.md](backend.md))
9. **Coherencia de negocio** — si toca copy/precios/servicios, ¿es coherente con [BUSINESS_CONTEXT.md](../BUSINESS_CONTEXT.md)?
10. **Build limpio** — `npm run lint` && `npm run build` sin errores nuevos.
11. **Verificación manual** — si es visual o de flujo, ¿se probó en móvil + escritorio?

No apruebes si algún punto falla sin señalarlo explícitamente.

## Documentación completa

[DEVELOPMENT_GUIDE.md § Criterios de revisión de código](../DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código) · [AI_GUIDELINES.md § Cómo hacer code review](../AI_GUIDELINES.md#9-cómo-hacer-code-review)
