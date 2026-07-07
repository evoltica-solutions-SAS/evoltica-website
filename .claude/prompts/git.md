# Brief: ramas y commits

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para nombrar ramas y escribir mensajes de commit.

**Rol completo:** [agents/DEVOPS_ENGINEER.md](../agents/DEVOPS_ENGINEER.md) · **Proceso completo:** fase final de [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md)

## Ramas

Prefijo descriptivo: `feat/<algo>`, `fix/<algo>`, `chore/<algo>`, `content/<algo>`. Ramas de vida corta, un cambio lógico por rama.

## Commits (Conventional Commits, en español)

```
<tipo>(<alcance opcional>): <resumen en imperativo, minúsculas, sin punto final>
```

Tipos: `feat`, `fix`, `content`, `style`, `refactor`, `perf`, `chore`, `docs`, `seo`.

Ejemplos:
- `feat(contact): agregar validación de teléfono en el endpoint`
- `content(hero): actualizar copy del subtítulo principal`
- `fix(navbar): corregir scroll offset en anclas`

## Reglas mínimas

- Commits pequeños y enfocados; no mezclar contenido/copy con lógica en el mismo commit.
- Nunca commitear `.env`, `.env.local`, secretos, ni carpetas de build (`.next`, `node_modules`).
- No reescribir historia (`rebase -i`, `push --force`) en `main` ni ramas compartidas.
- No hacer `git push` ni abrir/mergear PRs sin que el usuario lo pida explícitamente para esa acción concreta.

## Documentación completa

[GIT_WORKFLOW.md](../GIT_WORKFLOW.md)
