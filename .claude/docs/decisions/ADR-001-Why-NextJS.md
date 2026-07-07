# ADR-001: Por qué Next.js como framework del sitio

**Fecha**: 2026-07-07 (documentado retroactivamente; la decisión ya estaba implementada — ver nota en [docs/decisions/README.md](README.md))
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Evoltica Solutions SAS necesitaba un sitio corporativo de marketing (landing + página de servicios) con dos requisitos no negociables: **buen SEO desde el día uno** (el sitio es un canal de captación de leads B2B en un nicho competitivo — ver [BUSINESS_CONTEXT.md](../../BUSINESS_CONTEXT.md)) y **capacidad de crecer** hacia funcionalidad más allá de páginas estáticas (formulario con backend propio, y a futuro portales autenticados — ver [ROADMAP.md](../../ROADMAP.md)).

## Problema

¿Qué framework de frontend usar como base del sitio, sabiendo que hoy es mayormente estático pero que el roadmap contempla rutas dinámicas, un endpoint API propio y, eventualmente, áreas autenticadas?

## Alternativas consideradas

### Next.js (App Router)
- Pros: renderizado en servidor (SSR/SSG) nativo, óptimo para SEO; App Router permite Server Components (menos JS al cliente); API routes integradas sin necesidad de un backend separado (usado hoy por `app/api/contact/route.ts`); despliegue de primera clase en Vercel; ecosistema y comunidad muy grandes, facilita contratar/incorporar desarrolladores.
- Contras: curva de aprendizaje del App Router frente al Pages Router más simple; cierto acoplamiento conceptual al modelo de Vercel (aunque es desplegable en otros entornos).

### Sitio estático puro (HTML/CSS/JS o generador estático simple tipo Astro/11ty)
- Pros: máxima simplicidad, cero JavaScript innecesario, muy rápido de construir para una landing pura.
- Contras: no ofrece un camino natural hacia funcionalidad dinámica (formulario con backend propio, futuros portales autenticados) sin añadir una pieza de infraestructura separada; quedaría descartado en cuanto el roadmap avance a Fase 9 (Blog) o Fase 10 (Portal Clientes).

### React SPA (Create React App / Vite sin SSR)
- Pros: familiar para el equipo, muy flexible en el cliente.
- Contras: SEO deficiente sin trabajo adicional significativo (crítico para el objetivo de negocio de posicionamiento en Google); sin backend integrado, requeriría un servidor aparte para el formulario de contacto.

## Decisión

Se adopta **Next.js 15 con App Router** como framework del sitio, priorizando SEO nativo, la posibilidad de tener API routes propias sin infraestructura adicional, y un camino de crecimiento claro hacia funcionalidad dinámica futura.

## Consecuencias

- Se gana SEO competitivo desde el día uno y un único repositorio que puede alojar tanto el frontend como el backend ligero (endpoint de contacto), sin servicios adicionales.
- Se acepta la complejidad conceptual del App Router (Server vs. Client Components, ver [DEVELOPMENT_GUIDE.md](../../DEVELOPMENT_GUIDE.md)) como costo de tener ese camino de crecimiento disponible.
- Las versiones de Next.js/React están acopladas (ver [ARCHITECTURE.md § Versionado de dependencias](../../ARCHITECTURE.md#versionado-de-dependencias)); actualizaciones mayores requieren planificación.
- Debe revisarse si el roadmap eventualmente requiere separar el backend de portales (Fase 10+) en un servicio propio — en ese punto, esta decisión debe reevaluarse con un ADR nuevo.

## Referencias

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [ADR-002-Why-Vercel.md](ADR-002-Why-Vercel.md) — decisión de despliegue relacionada.
