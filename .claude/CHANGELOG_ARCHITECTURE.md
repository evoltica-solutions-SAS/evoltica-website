# Changelog de arquitectura

> **Versión**: 1.3 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Historial cronológico y de lectura rápida de las decisiones arquitectónicas importantes del proyecto — framework, plataforma, sistema de estilos, decisiones de producto con impacto estructural, e identidad de marca. No reemplaza a los [ADR](docs/decisions/): este documento es el índice cronológico "qué se decidió y cuándo"; el ADR correspondiente es la fuente de verdad del "por qué" con contexto, alternativas y consecuencias.

## Alcance

Cubre: una entrada por cada ADR creado o cuyo estado cambia (`Accepted`, `Deprecated`, `Superseded`), y otros hitos estructurales relevantes que afecten cómo se construye o se documenta el proyecto, aunque no impliquen un ADR propio (ver la nota en la entrada de 2026-07-07 sobre la creación de esta Knowledge Base).

No cubre: el detalle de cada decisión (contexto, alternativas, consecuencias) — eso vive en el ADR enlazado desde cada entrada.

## Cómo se mantiene

- Cada entrada nueva se **añade** al principio del historial (orden cronológico inverso, más reciente primero); las entradas existentes no se editan ni se eliminan, incluso si la decisión queda `Superseded` — en ese caso se agrega una entrada nueva que lo indica, y se actualiza el estado en la tabla de referencia rápida al final de este documento.
- Toda entrada nueva debe corresponder a un ADR en [docs/decisions/](docs/decisions/), salvo un hito estructural excepcional que no implique alternativas técnicas evaluadas (ver política completa en [AI_GUIDELINES.md § 14](AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación)).
- Formato de cada entrada: fecha, título corto, tipo, enlace al ADR (si aplica), resumen de una a tres líneas.

---

## Historial

### 2026-10-10 — Fase 4 como prototipo y primera capa de servicios de aplicación
**Tipo**: Hito estructural (implementa ADR-014 dentro de los principios de ADR-015; sin ADR nuevo)
**ADR**: [ADR-014](docs/decisions/ADR-014-Commercial-Platform.md) — `Accepted`; [ADR-015](docs/decisions/ADR-015-Persistence-Identity.md) — `Proposed` (sin cambios)
**Resumen**: `/diagnostico`, `/consultoria` y `/cotizar` funcionan solo en `next dev` (en producción, aviso y canales directos) a través de `lib/server/services/commercial-requests.ts`, sin persistencia. `/api/contact` responde éxito solo con entrega confirmada. Retirado el plazo "4 horas hábiles" no aprobado. Detalle: [diseño de la Fase 4 § 10](docs/architecture/2026-10-08-diseno-fase-4-y-requisitos-fase-5.md).

### 2026-10-08 — Plataforma comercial propia y catálogo de soluciones
**Tipo**: Decisión de producto + arquitectura
**ADR**: [ADR-014-Commercial-Platform](docs/decisions/ADR-014-Commercial-Platform.md) — `Accepted`; [ADR-015-Persistence-Identity](docs/decisions/ADR-015-Persistence-Identity.md) — `Proposed` (principios aprobados, proveedores pendientes); [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md) → `Superseded`
**Resumen**: Plataforma B2B independiente de Odoo (integración opcional). Embudo con entrada por catálogo, cotización o diagnóstico; política de precios aprobados. Fase 3: `/soluciones` y 31 fichas `/soluciones/[slug]` construidas sobre las ofertas existentes, sin precios.

### 2026-10-08 — Portal de clientes (Fase 2 de ADR-012)
**Tipo**: Hito de implementación (sin decisión nueva)
**ADR**: [ADR-012](docs/decisions/ADR-012-Public-Portal-Admin-Split.md) — `Accepted`; [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md) sigue `Proposed`
**Resumen**: `/app` con dashboard, servicios, productos, suscripciones, cloud, facturación, pagos, tickets, notificaciones y perfil; pantallas de acceso deshabilitadas; `middleware.ts`; adaptador de demostración solo en `next dev`. Nada accesible en producción hasta ADR-013. Estado detallado en [docs/architecture/2026-10-08-portal-integraciones-pendientes.md](docs/architecture/2026-10-08-portal-integraciones-pendientes.md).

### 2026-10-08 — Separación público / portal / admin y contratos de backend
**Tipo**: Arquitectura de aplicación
**ADR**: [ADR-012-Public-Portal-Admin-Split](docs/decisions/ADR-012-Public-Portal-Admin-Split.md) — `Accepted`; [ADR-013-Backend-Auth-Strategy](docs/decisions/ADR-013-Backend-Auth-Strategy.md) — `Proposed`
**Resumen**: Root layout mínimo y grupos de rutas `(public)`, `(auth)`, `(portal)`, `(admin)` sin cambiar URLs; dominio en `lib/domain`, contratos en `lib/server`; home reducida a introducción. El backend real (datos e identidad) queda pendiente de la decisión del negocio en ADR-013.

### 2026-10-08 — Intro de marca con el isotipo real y cooldown de 6 h
**Tipo**: Decisión de experiencia / arquitectura de UI
**ADR**: [ADR-011-Brand-Intro-Cooldown](docs/decisions/ADR-011-Brand-Intro-Cooldown.md) — `Accepted` (reemplaza en parte ADR-009 y ADR-010)
**Resumen**: La intro construye el isotipo real y abre la página por su hexágono central; se controla con un timestamp en `localStorage` (6 h, `lib/intro.ts`) en vez de `sessionStorage`. Se retiran `IntroLoader` y `ScrollExperience`. Reinicio solo en desarrollo (`?intro=1`, `resetIntro()`).

### 2026-10-08 — Tema claro/oscuro, tipografía condensada y experiencia de scroll
**Tipo**: Convención de marca + arquitectura de UI
**ADR**: [ADR-010-Reference-Alignment-Theme-Type](docs/decisions/ADR-010-Reference-Alignment-Theme-Type.md) — `Accepted` (modifica en parte ADR-005)
**Resumen**: Tokens semánticos con variables CSS habilitan el tema claro sin duplicar estilos; Barlow Condensed para titulares; intro de scroll y hero enmarcado con campo "cuéntanos qué quieres mejorar" en la home. Selector de idioma pospuesto (Fase 17).

### 2026-10-08 — Intro de marca, transiciones entre páginas y coreografía por capítulos
**Tipo**: Decisión de experiencia / arquitectura de UI
**ADR**: [ADR-009-Motion-Navigation-Experience](docs/decisions/ADR-009-Motion-Navigation-Experience.md) — `Accepted`
**Resumen**: Intro CSS solo en la primera entrada de la sesión, token `--intro-delay`, transición de cortina entre páginas sin dependencias, home por capítulos con cierre en verde de marca; el formulario de contacto pasa a vivir solo en `/contacto`.

### 2026-10-08 — Lenguaje visual editorial y gráfico de marca "La trama"
**Tipo**: Convención de marca
**ADR**: [ADR-008-Visual-Language-Trama](docs/decisions/ADR-008-Visual-Language-Trama.md) — `Accepted`
**Resumen**: Se reemplaza la estética "AI SaaS" (nodos, glow, tarjetas flotantes, titulares de dos tonos repetidos) por una composición editorial con un gráfico derivado del ápice del isotipo, una banda clara de contraste y copy concreto. Paleta, logo y tipografías se conservan.

### 2026-10-08 — Sitio corporativo multipágina con contenido centralizado
**Tipo**: Decisión de arquitectura de producto
**ADR**: [ADR-007-Multi-Page-Site](docs/decisions/ADR-007-Multi-Page-Site.md) — `Accepted`
**Resumen**: La landing de una página se reemplaza por un sitio multipágina (`/servicios/[slug]`, `/nosotros`, `/casos-de-exito`, `/contacto`) con contenido en `lib/`, sitemap generado (`app/sitemap.ts`) y fuentes vía `next/font`. Paleta, logo y tipografías de ADR-005 se conservan.

### 2026-07-07 — Adopción del sistema operativo de agentes de IA (workflows + agents)
**Tipo**: Decisión de proceso permanente
**ADR**: [ADR-006-AI-Operating-System](docs/decisions/ADR-006-AI-Operating-System.md) — `Accepted`
**Resumen**: Se adopta un sistema de dos capas — `.claude/agents/` (12 perfiles de rol con identidad, autoridad y límites de escalamiento) y `.claude/workflows/` (5 procesos repetibles con checkpoints y criterios de cierre) — construido sobre las guías de dominio ya existentes, sin duplicarlas. `AI_GUIDELINES.md` se recorta en las secciones que ahora tienen su versión detallada en `workflows/`, quedando como capa de principios constitucionales. `prompts/` se conserva como chuleta rápida que remite a `agents/`/`workflows/` como fuente de verdad.

### 2026-07-07 — Creación de la Knowledge Base estructurada en `.claude/`
**Tipo**: Hito estructural (sin ADR propio — no involucra alternativas técnicas evaluadas, es una decisión de organización documental)
**Resumen**: Se reorganiza toda la documentación del proyecto, antes concentrada en un único `CLAUDE.md`, en un árbol de guías especializadas por dominio (`BUSINESS_CONTEXT`, `ARCHITECTURE`, `DESIGN_SYSTEM`, `DEVELOPMENT_GUIDE`, `UX_GUIDE`, `SECURITY_GUIDE`, `SEO_GUIDE`, `PERFORMANCE_GUIDE`, `GIT_WORKFLOW`, `ROADMAP`, `AI_GUIDELINES`), un sistema formal de ADR en `docs/decisions/`, subcarpetas de `docs/` para contenido en crecimiento, y briefs de tarea en `prompts/`. `CLAUDE.md` en la raíz queda como punto de entrada corto y enlazado. Ver [CLAUDE.md](../CLAUDE.md) y [AI_GUIDELINES.md](AI_GUIDELINES.md).

### 2026-07-07 — Identidad visual y guías de marca
**Tipo**: Decisión de marca (documentada retroactivamente — ya implementada)
**ADR**: [ADR-005-Brand-Guidelines](docs/decisions/ADR-005-Brand-Guidelines.md) — `Accepted`
**Resumen**: Paleta de marca cerrada (verde `#12D56F` primario extraído del logo, turquesa `#14A4BC` secundario, azul `#0997D5` de acento) sobre fondo oscuro, con estética "glassmorphism". El acento azul reemplaza un acento morado usado en una iteración anterior.

### 2026-07-07 — Odoo como plataforma ERP principal ofrecida a clientes
**Tipo**: Decisión de negocio/producto (documentada retroactivamente — ya implementada)
**ADR**: [ADR-004-Why-Odoo](docs/decisions/ADR-004-Why-Odoo.md) — `Accepted`
**Resumen**: Odoo se adopta como plataforma ERP principal del catálogo de servicios de Evoltica, con ERPNext como alternativa para manufactura y Dolibarr para microempresas.

### 2026-07-07 — Tailwind CSS como sistema de estilos
**Tipo**: Decisión técnica (documentada retroactivamente — ya implementada)
**ADR**: [ADR-003-Why-Tailwind](docs/decisions/ADR-003-Why-Tailwind.md) — `Accepted`
**Resumen**: Tailwind CSS 3 se adopta como sistema de estilos del sitio, con tokens de marca centralizados en `tailwind.config.ts` y patrones visuales encapsulados en `app/globals.css`.

### 2026-07-07 — Vercel como plataforma de despliegue
**Tipo**: Decisión técnica (documentada retroactivamente — ya implementada)
**ADR**: [ADR-002-Why-Vercel](docs/decisions/ADR-002-Why-Vercel.md) — `Accepted`
**Resumen**: El sitio se despliega en Vercel, aprovechando el soporte nativo de Next.js y los Preview Deployments automáticos por PR.

### 2026-07-07 — Next.js (App Router) como framework del sitio
**Tipo**: Decisión técnica fundacional (documentada retroactivamente — ya implementada)
**ADR**: [ADR-001-Why-NextJS](docs/decisions/ADR-001-Why-NextJS.md) — `Accepted`
**Resumen**: Se adopta Next.js 15 con App Router como framework base, priorizando SEO nativo (SSR/SSG) y la posibilidad de tener API routes propias (usadas hoy por el endpoint de contacto) sin infraestructura adicional.

---

## Referencia rápida de estado vigente

| ADR | Decisión | Estado |
|---|---|---|
| [ADR-001](docs/decisions/ADR-001-Why-NextJS.md) | Next.js (App Router) | `Accepted` |
| [ADR-002](docs/decisions/ADR-002-Why-Vercel.md) | Vercel | `Accepted` |
| [ADR-003](docs/decisions/ADR-003-Why-Tailwind.md) | Tailwind CSS | `Accepted` |
| [ADR-004](docs/decisions/ADR-004-Why-Odoo.md) | Odoo como ERP principal | `Accepted` |
| [ADR-005](docs/decisions/ADR-005-Brand-Guidelines.md) | Identidad visual de marca | `Accepted` (modificado en parte por ADR-010) |
| [ADR-006](docs/decisions/ADR-006-AI-Operating-System.md) | Sistema operativo de agentes de IA (workflows + agents) | `Accepted` |
| [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md) | Sitio corporativo multipágina con contenido en `lib/` | `Accepted` |
| [ADR-008](docs/decisions/ADR-008-Visual-Language-Trama.md) | Lenguaje visual editorial y gráfico "La trama" | `Accepted` |
| [ADR-009](docs/decisions/ADR-009-Motion-Navigation-Experience.md) | Intro, transiciones entre páginas y coreografía por capítulos | `Accepted` (intro reemplazada por ADR-011) |
| [ADR-010](docs/decisions/ADR-010-Reference-Alignment-Theme-Type.md) | Tema claro/oscuro, tipografía condensada, experiencia de scroll | `Accepted` (experiencia de scroll reemplazada por ADR-011) |
| [ADR-011](docs/decisions/ADR-011-Brand-Intro-Cooldown.md) | Intro de marca con isotipo real y cooldown de 6 h | `Accepted` |
| [ADR-012](docs/decisions/ADR-012-Public-Portal-Admin-Split.md) | Separación público / portal / admin y contratos | `Accepted` |
| [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md) | Backend, sistema de registro y autenticación | `Superseded` por ADR-014/015 |
| [ADR-014](docs/decisions/ADR-014-Commercial-Platform.md) | Plataforma comercial propia, Odoo opcional | `Accepted` |
| [ADR-015](docs/decisions/ADR-015-Persistence-Identity.md) | Persistencia e identidad (principios) | `Proposed` |

## Referencias cruzadas

- [docs/decisions/](docs/decisions/) — el detalle completo de cada decisión (contexto, alternativas, consecuencias).
- [ARCHITECTURE.md](ARCHITECTURE.md) — arquitectura vigente resultante de estas decisiones.
- [ROADMAP.md](ROADMAP.md) — próximas fases que anticipan nuevas decisiones arquitectónicas (portal de clientes, blog/CMS, internacionalización).
- [AI_GUIDELINES.md § 14](AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación) — cuándo y cómo se actualiza este changelog.
