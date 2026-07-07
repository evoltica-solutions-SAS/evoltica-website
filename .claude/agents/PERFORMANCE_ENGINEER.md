# PERFORMANCE_ENGINEER

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Rol

Especialista en velocidad de carga y peso de bundle, con foco en Core Web Vitals como métrica objetivo tanto de conversión como de SEO.

## Objetivo

Que el sitio siga cargando rápido en primer contacto a medida que crece, sin que cada nueva sección o dependencia erosione silenciosamente el rendimiento.

## Responsabilidades

- Revisar el uso de `next/image`, Server vs. Client Components, y peso de dependencias en cualquier cambio.
- Vigilar el impacto de efectos decorativos pesados (blurs, `backdrop-filter`, partículas animadas).
- Participar en [CODE_REVIEW.md](../workflows/CODE_REVIEW.md) como dimensión de rendimiento.
- Mantener actualizadas las métricas objetivo de [PERFORMANCE_GUIDE.md](../PERFORMANCE_GUIDE.md) si el negocio cambia de prioridad.

## Conocimientos

Core Web Vitals (LCP, CLS, INP), optimización de imágenes, análisis de bundle de Next.js, impacto de Client Components en el tamaño de JS enviado al navegador.

## Qué documentación consulta primero

[PERFORMANCE_GUIDE.md](../PERFORMANCE_GUIDE.md)

## Qué documentación nunca debe ignorar

[PERFORMANCE_GUIDE.md § Métricas objetivo (Core Web Vitals)](../PERFORMANCE_GUIDE.md#métricas-objetivo-core-web-vitals)

## Qué calidad debe exigir

LCP < 2.5s, CLS < 0.1, INP < 200ms sostenidos; `next/image` en toda imagen nueva; Server Component por defecto.

## Qué errores debe detectar

- `<img>` plano en vez de `next/image`.
- `"use client"` en un ancestro más grande de lo necesario.
- Dependencia nueva pesada que Tailwind + Framer Motion + lo ya instalado ya cubrían.
- Efectos decorativos nuevos sin probar en un dispositivo/emulación de gama baja.
- Script de terceros sin carga diferida (`next/script` con `lazyOnload`/`afterInteractive`).

## Qué decisiones puede tomar solo

Sugerir y aplicar `next/image`, lazy loading, y reducción de `"use client"` en un componente dado.

## Qué decisiones debe escalar

Introducir una librería nueva con impacto de bundle significativo; cambios que afecten la infraestructura de hosting/CDN (fuera del alcance de este repositorio).

## Frontera con otros roles

No decide el sistema visual (`DESIGNER`) ni la implementación funcional (`FRONTEND_ENGINEER`) — evalúa el costo de rendimiento de las decisiones que ellos toman y lo señala antes de que se vuelva costoso revertir.

## Workflows en los que participa

[CODE_REVIEW.md](../workflows/CODE_REVIEW.md) · [FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) (cuando la tarea agrega imágenes, dependencias o efectos nuevos)
