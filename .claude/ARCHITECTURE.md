# Arquitectura

> **Versión**: 1.8 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Describe el stack tecnológico, la estructura de carpetas y los principios arquitectónicos del sitio, para que cualquier cambio de código se ubique en el lugar correcto y respete las fronteras entre capas.

## Alcance

Cubre: stack tecnológico, estructura de directorios, principios de organización del código y límites técnicos deliberados del proyecto.

No cubre: convenciones de estilo de código línea a línea (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)), sistema de diseño visual (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni el porqué histórico de cada elección tecnológica (ver [docs/decisions/](docs/decisions/)).

## Alcance técnico del proyecto

Tres superficies separadas por grupos de rutas (ver [ADR-012](docs/decisions/ADR-012-Public-Portal-Admin-Split.md)): **sitio público** `(public)`, **acceso** `(auth)`, **portal de clientes** `(portal)/app` y **administración** `(admin)/admin`. El portal y el admin se construyen contra contratos tipados (`lib/server/`); su backend real (datos e identidad) está pendiente de [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md) y hoy solo funcionan con un adaptador de demostración en desarrollo.

El sitio público es un **sitio corporativo multipágina** (ver [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md)): home (`/`), portafolio (`/servicios`), una página por línea de servicio (`/servicios/[slug]`, prerenderizada desde `SERVICES`), `/nosotros`, `/casos-de-exito`, `/contacto` y una 404 propia. No es una aplicación con lógica de negocio compleja: no tiene base de datos, no tiene autenticación, no tiene backend propio más allá de un único endpoint API para el formulario de contacto. Todas las páginas son estáticas (SSG).

Este alcance es deliberado, no una limitación temporal por descuido — ver la sección [Límites deliberados](#límites-deliberados-del-proyecto) y el [ROADMAP.md](ROADMAP.md) para cuándo y cómo se planea expandirlo (portal de clientes, dashboard administrativo, etc.).

## Stack tecnológico

- **Next.js 15** (App Router, React Server Components por defecto) — ver [ADR-001](docs/decisions/ADR-001-Why-NextJS.md).
- **React 19**
- **TypeScript 5** en modo `strict`
- **Tailwind CSS 3** (dark mode vía clase `dark`, siempre activo) — ver [ADR-003](docs/decisions/ADR-003-Why-Tailwind.md).
- **`next/font`** para las familias de marca (Inter, JetBrains Mono), auto-alojadas — sin `@import` externo.
- **Framer Motion** para animaciones (con `MotionConfig reducedMotion="user"` global)
- **React Hook Form** para el formulario de contacto
- **lucide-react** para iconografía
- **server-only** — impide que `lib/server/**` llegue al bundle del navegador (ADR-012)
- **clsx** + **tailwind-merge** (helper `cn()`) para composición de clases
- Despliegue en **Vercel** — ver [ADR-002](docs/decisions/ADR-002-Why-Vercel.md).

No se debe introducir un gestor de estado global, un ORM, autenticación, ni un CMS sin discutirlo antes: el sitio está deliberadamente diseñado para no necesitarlos en su fase actual.

## Estructura de carpetas

```
app/
  layout.tsx                 # Raíz mínima: <html>, metadata base, fuentes, script de tema/intro, MotionProvider
  (public)/layout.tsx        # Chrome de marketing: BrandIntro, PageTransition, Navbar, Footer, WhatsApp, JSON-LD org
  (public)/page.tsx          # Home (introducción): hero, manifiesto, servicios, diferencial, casos, cierre
  (public)/servicios/page.tsx         # Índice de servicios + metodología + proceso + herramientas
  (public)/servicios/[slug]/page.tsx  # Detalle por servicio (SSG desde SERVICES, metadata y JSON-LD Service)
  (public)/nosotros/page.tsx          # Historia, misión, visión, valores, diferenciadores, compromisos
  (public)/casos-de-exito/page.tsx    # Casos reales (noindex mientras CASE_STUDIES esté vacío)
  (public)/contacto/page.tsx          # Formulario, canales, proceso y preguntas frecuentes
  (public)/soluciones/page.tsx        # Catálogo de soluciones con búsqueda y filtros (ADR-014)
  (public)/soluciones/[slug]/page.tsx # Ficha de solución (SSG desde lib/catalog.ts)
  (auth)/                    # login, registro, recuperar/restablecer contraseña (deshabilitados hasta ADR-013)
  (portal)/app/              # Portal de clientes: dashboard, servicios, productos, suscripciones, cloud,
                             #   facturación, pagos, tickets, notificaciones, perfil (dinámico, noindex)
  (public)/diagnostico|consultoria|cotizar/  # Fase 4: prototipo solo en `next dev`; en producción, aviso +
                             #   canales directos. noindex y fuera del sitemap (no reciben solicitudes reales)
  (public)/actions.ts        # Server action de las solicitudes comerciales (delega en lib/server/services)
  (admin)/admin/             # Fase 5 (pendiente)
  not-found.tsx              # 404 de marca (monta el chrome público: vive en el root layout)
  sitemap.ts                 # Sitemap generado desde lib/ (reemplaza public/sitemap.xml)
  api/contact/route.ts       # Único endpoint API: validación + envío; éxito solo si el canal confirma la entrega
  globals.css                # Tokens CSS y clases de componente (@layer base/components/utilities)
components/
  layout/                    # Navbar, Footer, Logo, MotionProvider, BrandIntro, PageTransition, ThemeToggle (chrome global)
  sections/                  # Bloques de página (Hero, ServicesIndex, Differentiators, ServiceDetail, ...)
  portal/                    # UI del portal: PortalShell, PortalNav, DataTable, FilterBar, StatusBadge, Panel,
                             #   StatCard, EmptyState, KeyValueList, IntegrationNote, DemoBanner, TicketForm, AuthCard...
  ui/                        # Piezas reutilizables (Reveal, SplitReveal, ChapterBackdrop, StrikeText, Magnetic, HeroPrompt,
                             #   SectionHeading, PageHero, ButtonLink, CtaBand, Trama, ContactForm, Accordion,
                             #   Breadcrumbs, JsonLd, WhatsAppButton)
  commercial/                # Formularios de la Fase 4 (diagnóstico, consultoría, cotización), aviso de no disponible
hooks/                       # useScrollAnimation — variantes de motion · useCommercialForm — envío de la Fase 4
lib/                         # Contenido y configuración tipados + utilidades puras
  site-config.ts             #   Identidad, contacto, navegación (MAIN_NAV, PRIMARY_CTA), SITE_URL
  services-data.ts           #   5 líneas de servicio + embudo (ENGAGEMENT_STEPS)
  company-data.ts            #   Historia, misión, visión, valores, diferenciadores, compromisos, equipo
  process-data.ts            #   Metodología de ejecución (7 etapas)
  faq-data.ts · technologies-data.ts · cases-data.ts
  media.ts                   #   Material visual REAL (fotos/capturas propias); vacío hasta que exista
  catalog.ts                 #   Catálogo de soluciones: slug + modalidad sobre las ofertas de services-data;
                             #   valida la política de precios al cargar (ADR-014)
  intro.ts                   #   Cooldown de la intro de marca + script inline de <head> (ADR-011)
  domain/                    #   Tipos del dominio del portal/admin (puros, sin I/O) — ADR-012
  server/                    #   Solo servidor ("server-only"): contratos de datos (data/) y de identidad (auth/),
                             #   adaptadores (data/adapters/demo = ficticio, solo next dev), env.ts, portal.ts
  portal/                    #   Etiquetas de estado, formatos es-CO, navegación, validación de tickets, params
  commercial/                #   Fase 4: listas y etiquetas, validación compartida cliente/servidor, resumen
  server/services/           #   Servicios de aplicación (hoy: commercial-requests.ts, sin persistencia)
  auth-cookies.ts            #   Nombres de cookies de sesión (compartido con middleware)
  utils.ts                   #   cn() (tailwind-merge con la escala tipográfica propia), WhatsApp
middleware.ts                # Redirección optimista de /app y /admin sin cookie de sesión (no autoriza)
public/                      # Assets estáticos, íconos, manifest, robots.txt
.claude/                     # Documentación del proyecto para desarrolladores e IA
```

## Principios de la arquitectura

- Cada `page.tsx` es un **orquestador**: define su `metadata` (con `canonical` propio) e importa y ordena secciones; no contiene contenido de negocio hardcodeado.
- Cada sección vive en su propio archivo bajo `components/sections/` y es responsable únicamente de su propio bloque visual.
- Los datos de contenido (servicios, valores, FAQ, contacto, navegación) van en `lib/` como constantes tipadas con su tipo exportado. Los componentes los consumen; no los duplican.
- Rutas nuevas: se agregan en `app/`, en `app/sitemap.ts` y, si son navegación principal, en `MAIN_NAV` (`lib/site-config.ts`).
- Server Components por defecto; la interactividad (motion, formulario, menú) se aísla en componentes cliente pequeños (`Reveal`, `ContactForm`, `Navbar`...) para que las secciones sigan siendo de servidor.
- No hay capa de base de datos. Si se necesita persistencia o envío de datos, se hace vía `fetch` a un webhook externo configurado por variable de entorno (ver `EMAIL_WEBHOOK_URL` en `app/api/contact/route.ts`), nunca acoplando un proveedor específico en el código. Una solicitud solo se confirma como enviada si ese canal la acepta.
- Las páginas no hablan con datos ni integraciones directamente: llaman a un **servicio de aplicación** en `lib/server/services/` (ADR-014/015). Hoy el de solicitudes comerciales no persiste nada; la Fase 5 le añadirá el adaptador real sin cambiar las pantallas.

## Regla de ubicación de código nuevo

| Tipo de código | Ubicación | No va en |
|---|---|---|
| Contenido visual de una sección/bloque de página | `components/sections/` | `lib/`, `app/**/page.tsx` |
| Componente visual reutilizado en ≥2 secciones | `components/ui/` | duplicado dentro de cada sección |
| Chrome global (navbar, footer, logo) | `components/layout/` | `components/sections/` |
| Datos de negocio estructurados (servicios, pasos, FAQ, casos) | `lib/` (con su tipo exportado) | hardcodeado en JSX |
| Datos de contacto, navegación, URL del sitio | `lib/site-config.ts` | repetidos en cada componente |
| Lógica de UI con estado/efectos reutilizada | `hooks/` | duplicada en cada componente que la necesita |
| Rutas y layouts de Next | `app/` | fuera de la convención de App Router |

## Límites deliberados del proyecto

Estas ausencias son decisiones, no deuda técnica accidental:

- **Portal y admin sin backend real todavía** ([ADR-012](docs/decisions/ADR-012-Public-Portal-Admin-Split.md)): la estructura, el dominio y los contratos existen; la base de datos, el proveedor de identidad y las integraciones solo se introducen al aceptar [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md). Nunca se muestran datos de demostración en producción. Estado real vs. demostración: [docs/architecture/2026-10-08-portal-integraciones-pendientes.md](docs/architecture/2026-10-08-portal-integraciones-pendientes.md).
- **Plataforma comercial** ([ADR-014](docs/decisions/ADR-014-Commercial-Platform.md)): propia e independiente de Odoo (integración opcional). Persistencia e identidad: principios aprobados en [ADR-015](docs/decisions/ADR-015-Persistence-Identity.md), proveedores sin elegir; nada desplegado.
- **Sin base de datos**: toda persistencia futura (leads, casos de éxito, blog) requiere una decisión explícita de qué motor usar — documentar como ADR nuevo en [docs/decisions/](docs/decisions/) antes de implementar.
- **Sin autenticación real**: las áreas privadas (`/app`, `/admin`) tienen guardias de rol y contrato `AuthProvider`, pero el proveedor real se decide en ADR-013.
- **Sin gestor de estado global**: el estado de UI es local a cada componente (`useState`, hooks propios). No agregar Redux/Zustand/Context global mientras el sitio siga siendo mayormente estático.
- **Sin CMS**: el contenido vive en código (`lib/*.ts`). Si el volumen de contenido editorial crece (blog, casos de éxito), evaluar un CMS headless como decisión explícita, no como adición silenciosa.

## Versionado de dependencias

Las versiones de Next.js, React y TypeScript en `package.json` están acopladas entre sí (Next 15 requiere React 19). No actualizar versiones mayores de estas tres sin confirmación explícita — ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — cómo escribir código dentro de esta estructura.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — cómo se aplica el sistema visual dentro de los componentes.
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) — superficie de seguridad del único endpoint API existente.
- [ROADMAP.md](ROADMAP.md) — qué cambios arquitectónicos se anticipan y cuándo.
- [docs/decisions/](docs/decisions/) — registro histórico de por qué se eligió cada pieza del stack.
- [CHANGELOG_ARCHITECTURE.md](CHANGELOG_ARCHITECTURE.md) — cuándo se tomó cada decisión arquitectónica, en orden cronológico.
