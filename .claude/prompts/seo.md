# Brief: tareas de SEO

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas que tocan metadata, contenido indexable o estructura de rutas.

**Rol completo:** [agents/SEO_SPECIALIST.md](../agents/SEO_SPECIALIST.md) · **Proceso completo:** [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) · [workflows/CODE_REVIEW.md](../workflows/CODE_REVIEW.md)

## Antes de escribir

1. Todo cambio de título/descripción pasa por el objeto `metadata` de `app/layout.tsx` (o `generateMetadata` por página) — nunca `<title>`/`<meta>` sueltos en JSX.
2. Si el contenido nuevo apunta a una palabra clave, revisa la lista objetivo en [SEO_GUIDE.md § Estrategia SEO](../SEO_GUIDE.md#estrategia-seo) — refuerza de forma natural, nunca keyword stuffing.

## Reglas mínimas a respetar

- `title`/`description`/Open Graph/Twitter siempre sincronizados.
- JSON-LD (`organizationSchema`, `webSiteSchema`) actualizado si cambian datos reales de la empresa.
- `alt` descriptivo en toda imagen; jerarquía de encabezados real (un solo `h1`).
- Rutas nuevas/eliminadas reflejadas en `app/sitemap.ts` y `public/robots.txt`; cada página con su `canonical`.

## Nunca sin autorización

`robots`, `canonical`, `metadataBase`/`NEXT_PUBLIC_SITE_URL` — afectan indexación real en producción.

## Documentación completa

[SEO_GUIDE.md](../SEO_GUIDE.md)
