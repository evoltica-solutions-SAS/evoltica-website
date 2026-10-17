# ADR-007: Sitio corporativo multipágina con contenido centralizado en `lib/`

**Fecha**: 2026-10-08
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

Hasta esta decisión el sitio era una landing de una sola página (`/`) con ~10 secciones ancladas por hash, más una página `/servicios` que apilaba las 5 líneas de servicio. Toda la navegación (Navbar, Footer, CTAs) dependía de anclas (`#contacto`, `#servicios`...) resueltas con el hook `useSectionNav` y el componente `HashScrollOnMount`. Varios contenidos estaban hardcodeados dentro de los componentes (valores, FAQ, proceso, tecnologías) y el sitemap era un XML estático escrito a mano, que incluía URLs con hash.

Se pidió reconstruir el sitio como un **sitio corporativo completo**, con calidad visual y de experiencia comparable a referentes del sector (se usó antpack.co/es como referencia de patrones, sin copiar contenido ni identidad), con páginas de servicios individuales, Nosotros, Casos de éxito y Contacto.

## Problema

¿Cómo estructurar las rutas, el contenido y la navegación para pasar de landing a sitio corporativo sin introducir CMS, base de datos ni dependencias nuevas, y sin romper el embudo comercial ni el endpoint de contacto?

## Alternativas consideradas

### Opción A — Mantener la landing de una página y agregar más secciones
- Pros: cero cambios de navegación; un solo archivo de rutas.
- Contras: una sola URL compite por todas las búsquedas (sin long-tail por servicio); la home crece sin límite; sin páginas enlazables para campañas o WhatsApp.

### Opción B — Multipágina con rutas estáticas generadas desde `lib/` (elegida)
- Pros: una URL indexable por servicio (`/servicios/[slug]`, SSG con `generateStaticParams`); el sitemap se genera desde los mismos datos (nunca se desincroniza); contenido editable en un solo lugar; sigue sin backend adicional.
- Contras: más superficie de páginas a mantener; los enlaces antiguos con hash (`/#servicios`) siguen funcionando pero ya no son el modelo principal.

### Opción C — Multipágina con CMS headless
- Pros: edición de contenido sin tocar código.
- Contras: introduce un proveedor y un límite arquitectónico nuevo (ver [ARCHITECTURE.md § Límites deliberados](../../ARCHITECTURE.md#límites-deliberados-del-proyecto)); prematuro con el volumen de contenido actual.

## Decisión

El sitio pasa a ser **multipágina**: `/`, `/servicios`, `/servicios/[slug]` (las 5 líneas de `SERVICES`, prerenderizadas), `/nosotros`, `/casos-de-exito`, `/contacto` y una página 404 propia. Todo el contenido reutilizable vive en `lib/` como constantes tipadas (`site-config.ts`, `services-data.ts`, `company-data.ts`, `process-data.ts`, `faq-data.ts`, `technologies-data.ts`, `cases-data.ts`). El sitemap se genera en `app/sitemap.ts`. La navegación usa rutas reales (`next/link`); las anclas que se conservan se resuelven con CSS (`scroll-padding-top`) en vez de JavaScript, por lo que se eliminan `useSectionNav` y `HashScrollOnMount`.

Decisiones asociadas tomadas en el mismo cambio:

- **Casos de éxito**: la estructura existe (`CaseStudy` en `lib/cases-data.ts`), pero no se publican casos inventados. Con el arreglo vacío, `/casos-de-exito` muestra un estado honesto, se marca `noindex` y se excluye del sitemap; la home oculta la sección.
- **Sistema visual**: se conserva íntegra la paleta de marca, el logo y las familias tipográficas ([ADR-005](ADR-005-Brand-Guidelines.md) sigue vigente). Se agregan neutros de superficie (`ink`), una escala tipográfica fluida (`text-display-*`, `text-lead`) y nuevas clases de componente — ver [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md). Las fuentes pasan de `@import` de Google Fonts a `next/font` (mismas familias, auto-alojadas).
- **Endpoint de contacto**: `app/api/contact/route.ts` no se modifica. El formulario reutiliza los slugs de `SERVICES`, que coinciden con las claves que valida el endpoint.

## Consecuencias

- Se gana posicionamiento long-tail por servicio, URLs compartibles, contenido en una sola fuente de verdad y un sitemap siempre sincronizado con las rutas reales.
- Se acepta mantener más páginas; cualquier ruta pública nueva debe agregarse en `app/sitemap.ts` y, si aplica, en `MAIN_NAV` (`lib/site-config.ts`).
- Las páginas legales (privacidad / tratamiento de datos, Ley 1581) siguen pendientes de contenido aprobado; los enlaces rotos anteriores se retiraron del footer.
- Reabrir esta decisión si el volumen editorial (blog, casos) justifica un CMS — ver Fase 9 del [ROADMAP.md](../../ROADMAP.md).

## Referencias

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
- [SEO_GUIDE.md](../../SEO_GUIDE.md)
- [ADR-005-Brand-Guidelines.md](ADR-005-Brand-Guidelines.md)
