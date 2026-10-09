# CLAUDE.md

> **Versión**: 1.3 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

Punto de entrada oficial del proyecto **Evoltica Solutions SAS — sitio web**. Este archivo se auto-carga en cada sesión de Claude Code. Es deliberadamente corto: su trabajo es orientarte hacia el documento correcto en `.claude/`, no contener el detalle en sí. Ningún contenido de aquí se duplica en otro archivo — si buscas una regla y no está aquí, está en uno de los documentos enlazados abajo.

## Descripción del proyecto

Sitio web corporativo de Evoltica Solutions SAS, una consultora tecnológica colombiana. Sitio corporativo multipágina: home (`/`), portafolio y una página por servicio (`/servicios`, `/servicios/[slug]`), `/nosotros`, `/casos-de-exito` y `/contacto` (ver ADR-007), más el catálogo de soluciones (`/soluciones`, `/soluciones/[slug]`). Evoluciona hacia una plataforma comercial B2B propia, independiente de Odoo, con portal de clientes (`/app`) y administración (`/admin`) (ver ADR-012 y ADR-014); persistencia e identidad aún sin proveedor elegido (ADR-015). Next.js 15 + TypeScript + Tailwind, desplegado en Vercel. Su función es comunicar la propuesta de valor de la empresa y convertir visitantes en leads vía formulario de contacto y WhatsApp.

## Cómo usar esta documentación

La documentación completa vive en **`.claude/`** y está organizada por dominio para que consultes solo lo necesario según la tarea — no necesitas leer todo el árbol en cada sesión. Usa esta tabla de enrutamiento:

| Si tu tarea toca... | Lee |
|---|---|
| Negocio, servicios, tono de marca, copy | [`.claude/BUSINESS_CONTEXT.md`](.claude/BUSINESS_CONTEXT.md) |
| Stack, estructura de carpetas, dónde va un archivo nuevo | [`.claude/ARCHITECTURE.md`](.claude/ARCHITECTURE.md) |
| Color, tipografía, animación, Tailwind | [`.claude/DESIGN_SYSTEM.md`](.claude/DESIGN_SYSTEM.md) |
| Componentes React, TypeScript, convenciones de código | [`.claude/DEVELOPMENT_GUIDE.md`](.claude/DEVELOPMENT_GUIDE.md) |
| Navegación, formulario, accesibilidad | [`.claude/UX_GUIDE.md`](.claude/UX_GUIDE.md) |
| El endpoint de contacto, secretos, validación de input | [`.claude/SECURITY_GUIDE.md`](.claude/SECURITY_GUIDE.md) |
| Metadata, JSON-LD, sitemap, palabras clave | [`.claude/SEO_GUIDE.md`](.claude/SEO_GUIDE.md) |
| Imágenes, bundle, Core Web Vitals | [`.claude/PERFORMANCE_GUIDE.md`](.claude/PERFORMANCE_GUIDE.md) |
| Ramas, commits, PRs, despliegue | [`.claude/GIT_WORKFLOW.md`](.claude/GIT_WORKFLOW.md) |
| Prioridades y funcionalidades futuras | [`.claude/ROADMAP.md`](.claude/ROADMAP.md) |
| Cómo debe operar cualquier IA sobre este repo (principios) | [`.claude/AI_GUIDELINES.md`](.claude/AI_GUIDELINES.md) |
| Qué rol/perfil debe encarnar la IA según la tarea (arquitecto, frontend, revisor...) | [`.claude/agents/`](.claude/agents/) |
| Qué proceso paso a paso seguir según el tipo de tarea (feature, bug, refactor, review, docs) | [`.claude/workflows/`](.claude/workflows/) |
| Por qué se tomó una decisión técnica o de marca (detalle completo) | [`.claude/docs/decisions/`](.claude/docs/decisions/) (ADRs) |
| Cuándo se tomó cada decisión arquitectónica (vista cronológica rápida) | [`.claude/CHANGELOG_ARCHITECTURE.md`](.claude/CHANGELOG_ARCHITECTURE.md) |

Para tareas muy acotadas, [`.claude/prompts/`](.claude/prompts/) tiene chuletas de una página por tipo de tarea que resumen lo esencial — úsalas como atajo rápido, pero el rol y el proceso completos siempre viven en `.claude/agents/` y `.claude/workflows/`.

**Si eres una IA trabajando en este repositorio: el punto de partida es [`.claude/AI_GUIDELINES.md`](.claude/AI_GUIDELINES.md) (principios), que te dirige a [`.claude/workflows/`](.claude/workflows/) (qué proceso seguir) y [`.claude/agents/`](.claude/agents/) (qué rol encarnar en cada paso).** Léelo antes de tu primera modificación de código en una sesión nueva.

## Índice completo de la documentación

```
CLAUDE.md                    # este archivo — punto de entrada
.claude/
  BUSINESS_CONTEXT.md        # negocio, servicios, embudo, tono de marca
  ARCHITECTURE.md            # stack, carpetas, límites deliberados
  DESIGN_SYSTEM.md           # paleta, tipografía, motion, clases de Tailwind
  DEVELOPMENT_GUIDE.md       # convenciones de código, componentes, TypeScript, code review
  UX_GUIDE.md                # experiencia de usuario y accesibilidad
  SECURITY_GUIDE.md          # validación, secretos, PII
  SEO_GUIDE.md                # metadata, JSON-LD, estrategia de posicionamiento
  PERFORMANCE_GUIDE.md       # Core Web Vitals, reglas de rendimiento
  GIT_WORKFLOW.md            # ramas, commits, PRs, despliegue
  ROADMAP.md                  # plan a 2 años, por fases
  AI_GUIDELINES.md            # principios constitucionales para cualquier IA en este repo
  CHANGELOG_ARCHITECTURE.md   # historial cronológico de decisiones arquitectónicas
  agents/                      # sistema operativo — QUIÉN: 12 perfiles de rol
    README.md · ARCHITECT.md · FRONTEND_ENGINEER.md · BACKEND_ENGINEER.md
    REVIEWER.md · SECURITY_ENGINEER.md · PERFORMANCE_ENGINEER.md · SEO_SPECIALIST.md
    COPYWRITER.md · DESIGNER.md · DEVOPS_ENGINEER.md · BUSINESS_CONSULTANT.md · ODOO_SPECIALIST.md
  workflows/                   # sistema operativo — CUÁNDO/CÓMO: 5 procesos repetibles
    README.md · FEATURE_DEVELOPMENT.md · BUG_FIX.md · REFACTOR.md
    CODE_REVIEW.md · DOCUMENTATION.md
  docs/
    business/                # notas de negocio puntuales (no reglas vigentes)
    design/                  # exploraciones visuales puntuales
    development/             # postmortems, investigación técnica
    deployment/               # runbooks operativos de despliegue
    architecture/             # análisis técnico previo a una decisión
    decisions/                # Architecture Decision Records (ADR-001...)
    meeting-notes/            # notas de reuniones relevantes
    research/                  # investigación exploratoria
  prompts/                    # chuletas de una página por tipo de tarea (remiten a agents/ y workflows/)
    frontend.md · backend.md · uiux.md · seo.md · accessibility.md
    performance.md · code-review.md · copywriting.md · deployment.md · git.md
```

## Reglas generales

Estas son las únicas reglas que viven directamente en este archivo — aplican siempre, sin importar la tarea. Todo lo demás está en los documentos enlazados arriba.

1. **El sitio es de marketing, deliberadamente simple**: sin base de datos, sin autenticación, sin CMS hoy. No introduzcas ninguno de estos sin confirmarlo antes — ver [`.claude/ARCHITECTURE.md`](.claude/ARCHITECTURE.md).
2. **`app/api/contact/route.ts` es el único backend** y el único punto de entrada de datos de clientes reales — cualquier cambio ahí requiere el cuidado descrito en [`.claude/SECURITY_GUIDE.md`](.claude/SECURITY_GUIDE.md).
3. **El copy y los servicios no son texto libre**: reflejan un modelo de negocio real (ver [`.claude/BUSINESS_CONTEXT.md`](.claude/BUSINESS_CONTEXT.md)); precios, garantías y tiempos de respuesta comprometidos requieren autorización explícita antes de cambiarse.
4. **El sistema de diseño es cerrado**: paleta, tipografía y logo de marca no se improvisan por componente — ver [`.claude/DESIGN_SYSTEM.md`](.claude/DESIGN_SYSTEM.md).
5. **No se hace `git push`, ni se abren/mergean PRs, ni se toca configuración de Vercel sin que el usuario lo pida explícitamente** para esa acción concreta — ver [`.claude/GIT_WORKFLOW.md`](.claude/GIT_WORKFLOW.md).
6. **Una decisión difícil de revertir se documenta como ADR** antes o durante la implementación, no después — ver [`.claude/docs/decisions/README.md`](.claude/docs/decisions/README.md).
7. **La lista completa de "qué nunca modificar sin autorización" vive en un solo lugar**: [`.claude/AI_GUIDELINES.md § 12`](.claude/AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización). Consúltala antes de tocar datos de contacto, secretos, metadata de indexación o versiones mayores de dependencias.
8. **Política de mantenimiento de la documentación** (detalle operativo completo en [`.claude/AI_GUIDELINES.md § 14`](.claude/AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación)):
   - Toda decisión arquitectónica permanente debe generar o actualizar un ADR en [`.claude/docs/decisions/`](.claude/docs/decisions/) y una entrada en [`.claude/CHANGELOG_ARCHITECTURE.md`](.claude/CHANGELOG_ARCHITECTURE.md).
   - Toda modificación importante de arquitectura, estándares o procesos actualiza la documentación correspondiente **en el mismo cambio**, no después.
   - No se acepta un cambio estructural que deje la documentación desactualizada respecto al código.
   - Si el código y la documentación se contradicen, se señala explícitamente antes de continuar — nunca se asume en silencio cuál de los dos tiene razón.
9. **Documentos pequeños y especializados**: ningún documento crece indefinidamente. Al superar ~500–700 líneas o abarcar más de una responsabilidad, se divide en documentos especializados — se prioriza una arquitectura documental modular sobre documentos monolíticos. Detalle en [`.claude/AI_GUIDELINES.md § 14`](.claude/AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación).
10. **Todo documento de la Knowledge Base lleva metadata de versión** (Versión, Estado, Última actualización, Responsable) justo debajo de su título. Formato y reglas de actualización en [`.claude/AI_GUIDELINES.md § 14`](.claude/AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación).
11. **Todo trabajo sigue un workflow y un rol, no memoria de sesión.** Antes de una tarea no trivial, identifica el proceso en [`.claude/workflows/`](.claude/workflows/) y el/los rol(es) en [`.claude/agents/`](.claude/agents/) que aplican — ver [`.claude/AI_GUIDELINES.md § 1`](.claude/AI_GUIDELINES.md#1-cómo-analizar-el-proyecto). Esto es lo que permite que cualquier IA (Claude Code u otra) trabaje con el mismo estándar sin depender de un prompt largo repetido cada vez.

## Convenciones para mantener esta documentación actualizada

- **Una sola fuente de verdad por tema.** Si vas a escribir algo que ya existe en otro documento, enlázalo (`[texto](archivo.md#sección)`) en vez de copiarlo. Esto aplica también a este `CLAUDE.md`: nunca vuelvas a pegar aquí contenido de un documento especializado.
- **Actualiza en el mismo cambio, no después.** Si tu tarea introduce una convención nueva, retira una dependencia, o cambia una regla de negocio reflejada en la documentación, actualiza el documento correspondiente como parte del mismo commit/PR.
- **Ubicación lógica siempre.** Toda documentación nueva tiene un lugar dentro de `.claude/` — usa la tabla de enrutamiento de arriba y los `README.md` de cada subcarpeta de `.claude/docs/` para decidir dónde va. No crees archivos de documentación sueltos en la raíz del repo ni dentro de `app/`/`components/`.
- **Decisiones difíciles de revertir → ADR + entrada en `CHANGELOG_ARCHITECTURE.md`.** No como nota suelta en otro documento.
- **Si un documento crece demasiado (~500–700 líneas) o empieza a cubrir más de una responsabilidad**, propón dividirlo en documentos especializados antes de hacerlo — no fragmentes la documentación unilateralmente.
- **Este archivo (`CLAUDE.md`) se mantiene deliberadamente corto.** Si sientes la tentación de agregarle una sección larga, esa sección probablemente pertenece a un documento especializado en `.claude/`, con solo una línea de referencia añadida aquí.

## Documentación viva

Esta Knowledge Base no es un artefacto que se escribe una vez y se congela: debe evolucionar al mismo ritmo que el proyecto. Un documento desactualizado es más peligroso que la ausencia de documentación, porque genera confianza falsa — alguien (humano o IA) actúa sobre una regla que ya no es cierta.

Por eso, ningún documento de `.claude/` se trata como definitivo: cada cambio estructural relevante es también una oportunidad para revisar si la documentación existente sigue siendo precisa. Mantener la documentación viva es responsabilidad de quien hace el cambio de código, no una tarea separada para "después". Ver el detalle en [`.claude/AI_GUIDELINES.md § 15`](.claude/AI_GUIDELINES.md#15-documentación-viva) y la política de mantenimiento en [§ 14](.claude/AI_GUIDELINES.md#14-política-de-mantenimiento-de-la-documentación).
