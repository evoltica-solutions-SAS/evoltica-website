# ADR-004: Por qué Odoo como plataforma ERP principal ofrecida a clientes

**Fecha**: 2026-07-07 (documentado retroactivamente; la decisión ya estaba implementada — ver nota en [docs/decisions/README.md](README.md))
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

A diferencia de los ADR-001 a 003 (decisiones sobre el stack técnico *del sitio web*), esta es una **decisión de negocio y producto**: qué plataforma ERP recomienda e implementa Evoltica como su servicio principal ("ERP y Automatización", ver [BUSINESS_CONTEXT.md](../../BUSINESS_CONTEXT.md)) para sus clientes PYME en Colombia. Se documenta aquí porque condiciona directamente el contenido del sitio (`lib/services-data.ts`), las palabras clave de SEO objetivo ("ERP Odoo Colombia", ver [SEO_GUIDE.md](../../SEO_GUIDE.md)) y las futuras integraciones (Fase 12 del [ROADMAP.md](../../ROADMAP.md)).

## Problema

¿Qué plataforma(s) ERP debe Evoltica estandarizar como oferta principal, considerando que su cliente típico es una PYME colombiana (restaurantes, distribuidoras, talleres, constructoras) con presupuesto y complejidad operativa limitados?

## Alternativas consideradas

### Odoo (elegido como plataforma principal)
- Pros: modular (el cliente paga/usa solo los módulos que necesita: inventario, ventas/POS, compras, CRM, nómina); existe edición Community open source, lo que baja la barrera de entrada de costo para PYMEs; ecosistema y comunidad muy grandes, facilita encontrar funcionalidad ya construida; escalable de microempresa a empresa mediana sin cambiar de plataforma.
- Contras: la edición Enterprise tiene costo de licenciamiento; requiere expertise de implementación (que es, en sí, el servicio que Evoltica vende).

### ERPNext (alternativa declarada)
- Pros: también open source, buen ajuste para escenarios específicos de manufactura.
- Contras: ecosistema y comunidad más pequeños que Odoo en el contexto latinoamericano; se mantiene como alternativa para casos puntuales, no como oferta principal.

### Dolibarr (alternativa para microempresas)
- Pros: muy ligero, bajo costo de implementación, adecuado para negocios muy pequeños.
- Contras: menor profundidad funcional para operaciones que crecen; no escala tan bien como Odoo si el cliente crece.

### SAP Business One / Microsoft Dynamics (soluciones enterprise)
- Pros: robustez y soporte de nivel enterprise.
- Contras: costo y complejidad de implementación fuera de rango para el cliente típico de Evoltica (PYME); no coherente con el posicionamiento de "consultoría accesible que se queda contigo" (ver [BUSINESS_CONTEXT.md](../../BUSINESS_CONTEXT.md)).

## Decisión

Odoo es la **plataforma ERP principal** que Evoltica implementa y ofrece (tier "Principal" en `lib/services-data.ts`), con ERPNext como alternativa para escenarios de manufactura específicos y Dolibarr como opción ligera para microempresas.

## Consecuencias

- Se gana una oferta de producto clara, con una plataforma dominante que permite a Evoltica especializar su equipo, su marketing y su SEO ("ERP Odoo Colombia") en vez de dispersar expertise entre múltiples ERPs.
- El servicio de "Infraestructura y Cloud" (hosting ERP administrado) está diseñado alrededor de las necesidades de despliegue de Odoo.
- Se acepta que un cliente con necesidades muy específicas de manufactura o de escala enterprise pueda requerir una solución fuera de este catálogo — en ese caso, la decisión se toma caso a caso, no cambia la oferta estándar.
- Debe revisarse si, al integrar el Portal Clientes (Fase 10 del [ROADMAP.md](../../ROADMAP.md)), la sincronización de datos asume específicamente la API de Odoo — de ser así, documentarlo en un ADR de integración dedicado.

## Referencias

- [BUSINESS_CONTEXT.md § Líneas de servicio](../../BUSINESS_CONTEXT.md#líneas-de-servicio)
- [SEO_GUIDE.md § Estrategia SEO](../../SEO_GUIDE.md#estrategia-seo)
