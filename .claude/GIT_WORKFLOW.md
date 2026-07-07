# Flujo de trabajo con Git

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define cómo se ramifica, revisa, integra y despliega el código de este repositorio, y qué forma deben tener los mensajes de commit.

## Alcance

Cubre: modelo de ramas, convenciones de commits, proceso de pull request, entornos de despliegue y rollback.

No cubre: criterios de calidad del contenido de un PR (ver [DEVELOPMENT_GUIDE.md § Criterios de revisión de código](DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código)).

## Convenciones de Git

- `main` es la rama principal y desplegable; no se hace trabajo directamente sospechoso de romper el build ahí sin pasar por revisión.
- Crea ramas de feature/fix con prefijo descriptivo: `feat/<algo>`, `fix/<algo>`, `chore/<algo>`, `content/<algo>` (para cambios de copy/textos que no tocan lógica).
- Commits pequeños y enfocados: un commit no debería mezclar un cambio de contenido/copy con un cambio de lógica o de dependencias.
- No hagas commit de `.env`, `.env.local`, `node_modules`, `.next`, `.vercel` (ya cubiertos por `.gitignore`) ni de secretos (tokens de webhook, API keys).
- No reescribas historia (`rebase -i`, `push --force`) en `main` ni en ramas compartidas sin acuerdo explícito.

## Flujo de trabajo

- **Modelo de ramas**: trunk-based simplificado. `main` siempre debe estar en estado desplegable. Todo cambio no trivial se hace en una rama de vida corta (`feat/...`, `fix/...`, `content/...`) y se integra a `main` vía pull request, incluso en un equipo pequeño — esto deja rastro de revisión y permite el preview de Vercel.
- **Vercel Preview Deployments**: cada PR debería poder generar un preview deployment antes de mergear a `main`; úsalo para validar visualmente el cambio (especialmente contenido, copy y ajustes visuales) antes de aprobar.
- **Antes de abrir un PR**: corre `npm run lint` y `npm run build` localmente; un PR no debería abrirse con el build roto.
- **Tamaño de PR**: preferir PRs pequeños y enfocados en un solo cambio lógico (una sección, un fix, un ajuste de SEO) sobre PRs grandes que mezclan refactors con contenido nuevo — facilita la revisión y el rollback selectivo.
- **Merge**: squash merge por defecto para mantener el historial de `main` limpio y legible, salvo que el equipo decida lo contrario para un caso puntual.
- **Rollback**: dado que Vercel mantiene deployments anteriores, un problema en producción se resuelve primero con un rollback de deployment en Vercel (rápido, reversible) y luego con el fix correspondiente en el código — no al revés.
- **Entornos**: no hay entorno de "staging" persistente separado; el preview deployment de cada PR cumple ese rol. `main` mapea a producción. La configuración del proyecto en el dashboard de Vercel (dominios, redirects, variables de entorno) está fuera del control de este repositorio — cualquier cambio ahí se coordina directamente con quien administra la cuenta.

## Convenciones de commits

Se usa **Conventional Commits**:

```
<tipo>(<alcance opcional>): <resumen en imperativo, minúsculas, sin punto final>
```

Tipos permitidos: `feat`, `fix`, `content`, `style`, `refactor`, `perf`, `chore`, `docs`, `seo`.

Ejemplos:
- `feat(contact): agregar validación de teléfono en el endpoint`
- `content(hero): actualizar copy del subtítulo principal`
- `seo(layout): agregar schema.org de Organization`
- `fix(navbar): corregir scroll offset en anclas`
- `docs(architecture): documentar límites deliberados del proyecto`

El resumen va en español (idioma del contenido del proyecto) y describe el *porqué/qué* del cambio, no una lista de archivos tocados.

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md § Criterios de revisión de código](DEVELOPMENT_GUIDE.md#criterios-de-revisión-de-código) — qué debe verificar un revisor antes de aprobar.
- [prompts/git.md](prompts/git.md) — brief condensado para escribir ramas/commits.
- [AI_GUIDELINES.md](AI_GUIDELINES.md) — reglas de autonomía de IA sobre acciones de Git (push, PR, etc.).
