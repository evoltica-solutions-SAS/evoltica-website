# Arquitectura

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Describe el stack tecnológico, la estructura de carpetas y los principios arquitectónicos del sitio, para que cualquier cambio de código se ubique en el lugar correcto y respete las fronteras entre capas.

## Alcance

Cubre: stack tecnológico, estructura de directorios, principios de organización del código y límites técnicos deliberados del proyecto.

No cubre: convenciones de estilo de código línea a línea (ver [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)), sistema de diseño visual (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni el porqué histórico de cada elección tecnológica (ver [docs/decisions/](docs/decisions/)).

## Alcance técnico del proyecto

Es un sitio de **una sola página principal** (`/`) con secciones ancladas por hash (`#servicios`, `#contacto`, etc.), más una página secundaria de detalle (`/servicios`). No es una aplicación con lógica de negocio compleja: no tiene base de datos, no tiene autenticación, no tiene backend propio más allá de un único endpoint API para el formulario de contacto.

Este alcance es deliberado, no una limitación temporal por descuido — ver la sección [Límites deliberados](#límites-deliberados-del-proyecto) y el [ROADMAP.md](ROADMAP.md) para cuándo y cómo se planea expandirlo (portal de clientes, dashboard administrativo, etc.).

## Stack tecnológico

- **Next.js 15** (App Router, React Server Components por defecto) — ver [ADR-001](docs/decisions/ADR-001-Why-NextJS.md).
- **React 19**
- **TypeScript 5** en modo `strict`
- **Tailwind CSS 3** (dark mode vía clase `dark`, siempre activo) — ver [ADR-003](docs/decisions/ADR-003-Why-Tailwind.md).
- **Framer Motion** para animaciones
- **React Hook Form** para el formulario de contacto
- **lucide-react** para iconografía
- **clsx** + **tailwind-merge** (helper `cn()`) para composición de clases
- Despliegue en **Vercel** — ver [ADR-002](docs/decisions/ADR-002-Why-Vercel.md).

No se debe introducir un gestor de estado global, un ORM, autenticación, ni un CMS sin discutirlo antes: el sitio está deliberadamente diseñado para no necesitarlos en su fase actual.

## Estructura de carpetas

```
app/
  layout.tsx           # Layout raíz: metadata, SEO, JSON-LD, Navbar/Footer/WhatsAppButton globales
  page.tsx             # Composición de la home a partir de components/sections
  servicios/page.tsx   # Página de detalle de servicios
  api/contact/route.ts # Único endpoint API: validación + envío del formulario de contacto
  globals.css          # Tokens CSS, utilidades y clases de componente (@layer base/components/utilities)
components/
  layout/              # Navbar, Footer, Logo, HashScrollOnMount (chrome global de la página)
  sections/            # Un componente por sección de la landing (Hero, About, Services, Contact, FAQ, ...)
  ui/                  # Componentes pequeños y reutilizables (WhatsAppButton, SectionLabel)
hooks/                 # Hooks de UI (useCounter, useScrollAnimation, useSectionNav)
lib/                   # Datos estáticos (services-data.ts) y utilidades puras (utils.ts)
public/                # Assets estáticos, íconos, manifest, sitemap, robots.txt
.claude/               # Documentación del proyecto para desarrolladores e IA (este árbol de documentos)
```

## Principios de la arquitectura

- `app/page.tsx` es un **orquestador**: importa y ordena secciones de `components/sections/`, no contiene JSX de contenido propio.
- Cada sección vive en su propio archivo bajo `components/sections/` y es responsable únicamente de su propio bloque visual.
- Los datos de contenido (servicios, precios, textos repetidos) van en `lib/` como constantes tipadas, no hardcodeados dentro de los componentes cuando se reutilizan en más de un lugar (ver `lib/services-data.ts`).
- No hay capa de base de datos. Si se necesita persistencia o envío de datos, se hace vía `fetch` a un webhook externo configurado por variable de entorno (ver `EMAIL_WEBHOOK_URL` en `app/api/contact/route.ts`), nunca acoplando un proveedor específico en el código.

## Regla de ubicación de código nuevo

| Tipo de código | Ubicación | No va en |
|---|---|---|
| Contenido visual de una sección de la landing | `components/sections/` | `lib/`, `app/page.tsx` |
| Componente visual reutilizado en ≥2 secciones | `components/ui/` | duplicado dentro de cada sección |
| Chrome global (navbar, footer, logo) | `components/layout/` | `components/sections/` |
| Datos de negocio estructurados (servicios, pasos, tarifas) | `lib/` (con su tipo exportado) | hardcodeado en JSX |
| Lógica de UI con estado/efectos reutilizada | `hooks/` | duplicada en cada componente que la necesita |
| Rutas y layouts de Next | `app/` | fuera de la convención de App Router |

## Límites deliberados del proyecto

Estas ausencias son decisiones, no deuda técnica accidental:

- **Sin base de datos**: toda persistencia futura (leads, casos de éxito, blog) requiere una decisión explícita de qué motor usar — documentar como ADR nuevo en [docs/decisions/](docs/decisions/) antes de implementar.
- **Sin autenticación**: no hay áreas privadas hoy. Portal de Clientes, Portal de Empleados y Dashboard Administrativo (ver [ROADMAP.md](ROADMAP.md)) requerirán introducir auth como cambio arquitectónico mayor, con su propio ADR.
- **Sin gestor de estado global**: el estado de UI es local a cada componente (`useState`, hooks propios). No agregar Redux/Zustand/Context global mientras el sitio siga siendo mayormente estático.
- **Sin CMS**: el contenido vive en código (`lib/services-data.ts`, JSX de cada sección). Si el volumen de contenido editorial crece (blog, casos de éxito), evaluar un CMS headless como decisión explícita, no como adición silenciosa.

## Versionado de dependencias

Las versiones de Next.js, React y TypeScript en `package.json` están acopladas entre sí (Next 15 requiere React 19). No actualizar versiones mayores de estas tres sin confirmación explícita — ver [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — cómo escribir código dentro de esta estructura.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — cómo se aplica el sistema visual dentro de los componentes.
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) — superficie de seguridad del único endpoint API existente.
- [ROADMAP.md](ROADMAP.md) — qué cambios arquitectónicos se anticipan y cuándo.
- [docs/decisions/](docs/decisions/) — registro histórico de por qué se eligió cada pieza del stack.
- [CHANGELOG_ARCHITECTURE.md](CHANGELOG_ARCHITECTURE.md) — cuándo se tomó cada decisión arquitectónica, en orden cronológico.
