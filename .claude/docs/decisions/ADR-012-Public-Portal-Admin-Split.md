# ADR-012: Separación público / portal de clientes / administración y contratos de backend

**Fecha**: 2026-10-08
**Estado**: Accepted
**Versión**: 1.0
**Responsable**: Evoltica Solutions SAS

## Contexto

El negocio pidió (2026-10-08) convertir el sitio de marketing en **sitio público + portal de clientes (`/app`) + administración (`/admin`)**, adelantando las Fases 10 y 14 del [ROADMAP](../../ROADMAP.md). [ARCHITECTURE.md](../../ARCHITECTURE.md) declaraba "sin autenticación ni base de datos" como límite deliberado. El análisis completo está en [docs/architecture/2026-10-08-arquitectura-public-app-admin.md](../architecture/2026-10-08-arquitectura-public-app-admin.md).

## Problema

¿Cómo preparar el frontend para un producto real (portal + admin) sin fingir integraciones que no existen, sin decidir todavía el backend y sin degradar el sitio público estático?

## Alternativas consideradas

- **Un único layout con condicionales por ruta**: mezcla el chrome de marketing con el portal y vuelve frágil cada cambio. Descartado.
- **Varios root layouts (`<html>` por superficie)**: aíslan del todo, pero duplican fuentes y el script de tema, y fuerzan una recarga completa entre superficies. Descartado.
- **Un root layout mínimo + grupos de rutas con layout propio** (`(public)`, `(auth)`, `(portal)`, `(admin)`): sin cambios de URL, el sitio público sigue estático y cada superficie tiene su propio chrome. **Elegido.**
- **Construir las pantallas con datos fijos en los componentes**: rápido, pero obliga a reescribirlas al conectar el backend. Descartado a favor de **contratos tipados + adaptadores**.

## Decisión

1. `app/layout.tsx` queda mínimo: `<html>`, fuentes, script de tema e intro, `MotionProvider` y enlace "saltar al contenido". El chrome de marketing pasa a `app/(public)/layout.tsx`. Las URLs públicas no cambian.
2. La intro de marca solo corre en el sitio público (`INTRO_EXCLUDED_PATH` en `lib/intro.ts`).
3. Dominio en `lib/domain/` (tipos puros) y contratos en `lib/server/data/contracts.ts` (`ClientPortalRepository`, `AdminRepository`) y `lib/server/auth/contracts.ts` (`AuthProvider`). Las páginas del portal y del admin solo consumen contratos.
4. Roles iniciales: `CLIENTE` y `ADMIN`. La autorización real se verifica en el servidor (layouts y server actions); `middleware.ts` solo redirige de forma optimista.
5. Adaptador `demo` para desarrollo, con aviso visible "Datos de demostración". **Nunca se activa en producción.** Sin un backend real configurado, el portal muestra "en preparación" y el acceso no acepta credenciales.
6. El portal y el admin son dinámicos y `noindex`; `robots.txt` excluye `/app/` y `/admin/`; no aparecen en el sitemap.
7. Las facturas y los pagos son de solo lectura desde el sistema contable. El estado de un pago solo cambia con el webhook verificado del proveedor.
8. La home pasa a ser una introducción: hero, manifiesto, índice de servicios, diferencial, casos y cierre. Proceso y herramientas viven en `/servicios`, compromisos en `/nosotros` y preguntas frecuentes en `/contacto`. Cada `/servicios/[slug]` suma el bloque de proceso.

## Consecuencias

### Positivas
- Conectar el backend real es implementar un adaptador; no hay que reescribir páginas.
- El sitio público mantiene su rendimiento (SSG) y su SEO.
- Ninguna pantalla afirma una integración que no existe.

### Negativas
- Más superficie de código (dominio, contratos, dos shells) antes de tener datos reales.
- El adaptador de demostración debe mantenerse alineado con los contratos.

## Relación con otras decisiones

- Modifica el límite "sin autenticación / sin base de datos" de [ARCHITECTURE.md](../../ARCHITECTURE.md): la estructura existe, pero la base de datos y el proveedor de identidad siguen sin introducirse hasta [ADR-013](ADR-013-Backend-Auth-Strategy.md).
- Respeta [ADR-007](ADR-007-Multi-Page-Site.md) (sitio multipágina) y [ADR-011](ADR-011-Brand-Intro-Cooldown.md) (intro).
