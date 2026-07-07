# Guía de SEO

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define cómo se implementa y mantiene el SEO técnico del sitio, y la estrategia de posicionamiento detrás de esas decisiones técnicas.

## Alcance

Cubre: metadata, Open Graph, JSON-LD, sitemap/robots, jerarquía semántica, palabras clave objetivo y SEO local.

No cubre: Core Web Vitals como implementación técnica (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md), aunque se referencia aquí como factor de ranking).

## Reglas de SEO (implementación técnica)

- Todo cambio de título, descripción o metadata pasa por el objeto `metadata` de `app/layout.tsx` (o un `generateMetadata`/`metadata` por página si se agrega una ruta nueva), nunca con `<title>`/`<meta>` sueltos en el JSX.
- Mantén sincronizados `title`, `description`, Open Graph y Twitter card cuando cambie el mensaje principal del sitio; no los dejes divergir.
- Los datos estructurados JSON-LD (`organizationSchema`, `webSiteSchema` en `app/layout.tsx`) deben actualizarse si cambian los datos reales de la empresa (teléfono, redes sociales, dirección); no son solo boilerplate.
- Toda imagen debe tener `alt` descriptivo; los headings deben seguir jerarquía semántica real (`h1` único por página, `h2`/`h3` en orden) y no elegirse por tamaño visual sino por estructura de contenido (ver también [UX_GUIDE.md § Accesibilidad](UX_GUIDE.md#accesibilidad)).
- Actualiza `public/sitemap.xml` y `public/robots.txt` si se agregan o eliminan rutas públicas.
- No bloquees el indexado (`robots: { index: false }`) ni cambies `canonical`/`NEXT_PUBLIC_SITE_URL` sin confirmarlo explícitamente: afecta directamente el posicionamiento del sitio en producción — ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Estrategia SEO

Más allá de la implementación técnica, el sitio compite por **SEO local/nacional en Colombia** en un nicho B2B específico (ERP, Odoo, automatización, consultoría empresarial). Contexto de negocio completo en [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md).

- **Palabras clave objetivo** (reflejadas en `metadata.keywords` de `app/layout.tsx`): "consultoría empresarial", "ERP Odoo Colombia", "automatización de procesos", "infraestructura y cloud", "servicios administrados TI", "desarrollo de software a medida", "transformación digital Colombia". Todo contenido nuevo (secciones, página de servicios, futuras páginas) debería reforzar estos términos de forma natural, no forzada — nunca keyword stuffing.
- **Contenido como activo de posicionamiento**: cada línea de servicio en `lib/services-data.ts` (`summary`, `intro`, `items[].description`) es también contenido indexable; al editarlo, prioriza claridad para el usuario primero, y en segundo lugar la inclusión natural de términos relevantes del sector.
- **Estructura de la página `/servicios`**: al ser contenido más profundo y específico que la home, es el candidato natural para capturar búsquedas de cola larga (long-tail) sobre cada servicio individual. Si se expande el sitio con más páginas (ver [ROADMAP.md](ROADMAP.md) — blog, casos de éxito), seguir este mismo patrón (una URL por tema específico) en vez de amontonar todo en la home.
- **Local SEO**: el `organizationSchema` en `app/layout.tsx` declara `areaServed: "CO"` y datos de contacto colombianos; cualquier expansión a otro país/mercado (ver [ROADMAP.md § Internacionalización](ROADMAP.md)) requiere revisar este bloque, no solo el copy visible.
- **Core Web Vitals como factor de ranking**: Google usa señales de rendimiento (LCP, CLS, INP) como factor de posicionamiento — por eso [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) es, en la práctica, también una pieza de estrategia SEO, no solo de UX.
- **Enlazado interno**: los anclas de navegación (`#servicios`, `#sobre-nosotros`, etc.) y el link a `/servicios` desde la home refuerzan la arquitectura de información para buscadores; mantén esta coherencia si se reordenan secciones.
- **Sitemap y robots como reflejo de la arquitectura real**: no son archivos que se editan una vez y se olvidan — deben reflejar exactamente las rutas públicas vigentes en todo momento.

## Checklist antes de mergear un cambio que toca SEO

- [ ] `title`/`description`/OG/Twitter siguen sincronizados.
- [ ] JSON-LD actualizado si cambiaron datos reales de la empresa.
- [ ] `alt` en imágenes nuevas.
- [ ] Jerarquía de encabezados correcta (un solo `h1`).
- [ ] `sitemap.xml`/`robots.txt` actualizados si hay rutas nuevas/eliminadas.
- [ ] No se tocó `robots`/`canonical`/`NEXT_PUBLIC_SITE_URL` sin autorización explícita.

## Referencias cruzadas

- [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) — audiencia y mercado que define las palabras clave.
- [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) — Core Web Vitals como factor técnico de ranking.
- [ROADMAP.md](ROADMAP.md) — fase de "Optimización SEO" y expansión de contenido (blog, casos de éxito).
- [prompts/seo.md](prompts/seo.md) — brief condensado para tareas de SEO.
