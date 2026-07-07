# Brief: tareas de rendimiento

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas centradas en velocidad de carga o peso de bundle.

**Rol completo:** [agents/PERFORMANCE_ENGINEER.md](../agents/PERFORMANCE_ENGINEER.md) · **Proceso completo:** [workflows/CODE_REVIEW.md](../workflows/CODE_REVIEW.md)

## Qué revisar, en orden

1. **Imágenes**: ¿usan `next/image`? ¿Están comprimidas y en formato moderno?
2. **Client Components**: ¿el `"use client"` está en el componente más pequeño posible, o se filtró a un ancestro innecesariamente grande?
3. **Dependencias**: ¿el cambio agrega una librería nueva? ¿Realmente no lo cubre Tailwind + Framer Motion + lo ya instalado?
4. **Efectos decorativos**: ¿blurs/partículas/backdrop-filter nuevos se probaron en un dispositivo o emulación de gama baja?
5. **Scripts de terceros**: ¿usan `next/font` o `next/script` con carga diferida (`lazyOnload`/`afterInteractive`)?

## Métricas objetivo

LCP < 2.5s · CLS < 0.1 · INP < 200ms — ver [PERFORMANCE_GUIDE.md § Métricas objetivo](../PERFORMANCE_GUIDE.md#métricas-objetivo-core-web-vitals).

## Documentación completa

[PERFORMANCE_GUIDE.md](../PERFORMANCE_GUIDE.md)
