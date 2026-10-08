# Arquitectura

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Describe el stack tecnológico, la estructura de carpetas y los principios arquitectónicos del sitio, para que cualquier cambio de código se ubique en el lugar correcto y respete las fronteras entre capas.

## Alcance

Cubre: stack tecnológico, estructura de directorios, principios de organización del código y límites técnicos deliberados del proyecto.

No cubre: convenciones de estilo de código línea a línea (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)), sistema de diseño visual (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni el porqué histórico de cada elección tecnológica (ver [docs/decisions/](docs/decisions/)).

## Alcance técnico del proyecto

Es un **sitio corporativo multipágina** (ver [ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md)): home (`/`), portafolio (`/servicios`), una página por línea de servicio (`/servicios/[slug]`, prerenderizada desde `SERVICES`), `/nosotros`, `/casos-de-exito`, `/contacto` y una 404 propia. No es una aplicación con lógica de negocio compleja: no tiene base de datos, no tiene autenticación, no tiene backend propio más allá de un único endpoint API para el formulario de contacto. Todas las páginas son estáticas (SSG).

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
- **clsx** + **tailwind-merge** (helper `cn()`) para composición de clases
- Despliegue en **Vercel** — ver [ADR-002](docs/decisions/ADR-002-Why-Vercel.md).

No se debe introducir un gestor de estado global, un ORM, autenticación, ni un CMS sin discutirlo antes: el sitio está deliberadamente diseñado para no necesitarlos en su fase actual.

## Estructura de carpetas

```
app/
  layout.tsx                 # Layout raíz: metadata, fuentes, JSON-LD, Navbar/Footer/WhatsAppButton, MotionProvider
  page.tsx                   # Home: orquesta secciones de components/sections
  servicios/page.tsx         # Portafolio de servicios
  servicios/[slug]/page.tsx  # Detalle por servicio (SSG desde SERVICES, metadata y JSON-LD Service)
  nosotros/page.tsx          # Historia, misión, visión, valores, diferenciadores
  casos-de-exito/page.tsx    # Casos reales (noindex mientras CASE_STUDIES esté vacío)
  contacto/page.tsx          # Formulario + canales de contacto
  not-found.tsx              # 404 de marca
  sitemap.ts                 # Sitemap generado desde lib/ (reemplaza public/sitemap.xml)
  api/contact/route.ts       # Único endpoint API: validación + envío del formulario de contacto
  globals.css                # Tokens CSS y clases de componente (@layer base/components/utilities)
components/
  layout/                    # Navbar, Footer, Logo, MotionProvider (chrome global)
  sections/                  # Bloques de página (Hero, ServicesIndex, Differentiators, ServiceDetail, ...)
  ui/                        # Piezas reutilizables (Reveal, SectionHeading, PageHero, ButtonLink, CtaBand,
                             #   ContactForm, Accordion, Marquee, Counter, Breadcrumbs, JsonLd, WhatsAppButton)
hooks/                       # Hooks de UI (useCounter, useScrollAnimation — variantes de motion)
lib/                         # Contenido y configuración tipados + utilidades puras
  site-config.ts             #   Identidad, contacto, navegación (MAIN_NAV, PRIMARY_CTA), SITE_URL
  services-data.ts           #   5 líneas de servicio + embudo (ENGAGEMENT_STEPS)
  company-data.ts            #   Historia, misión, visión, valores, diferenciadores, compromisos, equipo
  process-data.ts            #   Metodología de ejecución (7 etapas)
  faq-data.ts · technologies-data.ts · cases-data.ts
  utils.ts                   #   cn() (tailwind-merge con la escala tipográfica propia), WhatsApp
public/                      # Assets estáticos, íconos, manifest, robots.txt
.claude/                     # Documentación del proyecto para desarrolladores e IA
```

## Principios de la arquitectura

- Cada `page.tsx` es un **orquestador**: define su `metadata` (con `canonical` propio) e importa y ordena secciones; no contiene contenido de negocio hardcodeado.
- Cada sección vive en su propio archivo bajo `components/sections/` y es responsable únicamente de su propio bloque visual.
- Los datos de contenido (servicios, valores, FAQ, contacto, navegación) van en `lib/` como constantes tipadas con su tipo exportado. Los componentes los consumen; no los duplican.
- Rutas nuevas: se agregan en `app/`, en `app/sitemap.ts` y, si son navegación principal, en `MAIN_NAV` (`lib/site-config.ts`).
- Server Components por defecto; la interactividad (motion, formulario, menú) se aísla en componentes cliente pequeños (`Reveal`, `ContactForm`, `Navbar`...) para que las secciones sigan siendo de servidor.
- No hay capa de base de datos. Si se necesita persistencia o envío de datos, se hace vía `fetch` a un webhook externo configurado por variable de entorno (ver `EMAIL_WEBHOOK_URL` en `app/api/contact/route.ts`), nunca acoplando un proveedor específico en el código.

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

- **Sin base de datos**: toda persistencia futura (leads, casos de éxito, blog) requiere una decisión explícita de qué motor usar — documentar como ADR nuevo en [docs/decisions/](docs/decisions/) antes de implementar.
- **Sin autenticación**: no hay áreas privadas hoy. Portal de Clientes, Portal de Empleados y Dashboard Administrativo (ver [ROADMAP.md](ROADMAP.md)) requerirán introducir auth como cambio arquitectónico mayor, con su propio ADR.
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
