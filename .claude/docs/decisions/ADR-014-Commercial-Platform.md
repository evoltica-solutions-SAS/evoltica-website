# ADR-014: Plataforma comercial propia, independiente de Odoo

**Fecha**: 2026-10-08
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

El negocio definió (2026-10-08) que Evoltica tendrá una plataforma B2B propia: sitio corporativo, catálogo de soluciones, diagnóstico y consultoría, cotizaciones y pedidos, portal de clientes, soporte, comunicaciones y administración. La propuesta completa está en [docs/architecture/2026-10-08-plataforma-comercial-b2b.md](../architecture/2026-10-08-plataforma-comercial-b2b.md).

## Problema

¿Sobre qué base se construye el recorrido comercial (descubrir → solicitar → cotizar → contratar → operar) sin depender de un ERP para navegar, solicitar o comprar?

## Alternativas consideradas

- **Odoo como centro** (recomendación previa de ADR-013): una sola fuente de datos de negocio, pero la plataforma web queda atada a la edición, la versión y la API del ERP.
- **Plataforma propia con Odoo opcional**: contratos y modelo de dominio propios; Odoo u otros sistemas se conectan como integraciones si aportan valor.

## Decisión

1. Plataforma comercial **propia**, con dominio, contratos y servicios de aplicación propios. Odoo es una **integración opcional**: nunca es requisito para navegar, descubrir, solicitar ni comprar.
2. El embudo puede empezar desde el **catálogo**, una **solicitud de cotización** o un **diagnóstico/consultoría**. La reunión de descubrimiento sigue siendo el primer paso por defecto.
3. Catálogo en **`/soluciones`** con fichas en **`/soluciones/[slug]`**. Las páginas `/servicios/[linea]` siguen siendo la narrativa de cada línea; se enlazan con sus fichas sin duplicar contenido.
4. Modalidades comerciales: compra directa, suscripción, cotización, consultoría y personalizado. **Desarrollo e Integraciones** se puede descubrir y solicitar, pero siempre en modalidad personalizada (cotización a medida).
5. **Política de precios:** solo se publican precios aprobados por Evoltica. Una solución con modalidad de compra directa o suscripción sin precio aprobado invalida el catálogo (el build falla). Sin pasarela verificada no hay compra en línea.
6. Registro futuro **por invitación o aprobación**, con verificación de correo. La navegación pública y la solicitud comercial inicial siguen abiertas.

## Consecuencias

### Positivas
- El producto web evoluciona sin depender del ERP.
- El catálogo es una fuente tipada única (`lib/catalog.ts` + `lib/domain/catalog.ts`) que se puede mover a base de datos sin cambiar las páginas.

### Negativas
- La plataforma necesita persistencia e identidad propias ([ADR-015](ADR-015-Persistence-Identity.md)).
- Si se integra Odoo, habrá que definir la sincronización (en un solo sentido) en un ADR de integración.

## Relación con otras decisiones

- **Reemplaza la dirección** de [ADR-013](ADR-013-Backend-Auth-Strategy.md) (Odoo como centro).
- Mantiene [ADR-004](ADR-004-Why-Odoo.md): Odoo sigue siendo un producto que Evoltica **vende**.
- Extiende [ADR-012](ADR-012-Public-Portal-Admin-Split.md) (superficies público / auth / portal / admin).
