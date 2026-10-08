# Guía de desarrollo

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-10-08 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define cómo se escribe código en este repositorio: convenciones de nomenclatura y estructura, reglas para componentes React, reglas de TypeScript, buenas prácticas transversales y los criterios que debe cumplir cualquier cambio antes de aprobarse.

## Alcance

Cubre: convenciones de código, reglas de componentes, reglas de TypeScript, buenas prácticas de desarrollo, criterios de revisión de código.

No cubre: estilos visuales (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)), estructura de carpetas (ver [ARCHITECTURE.md](ARCHITECTURE.md)) ni flujo de Git/commits (ver [GIT_WORKFLOW.md](GIT_WORKFLOW.md)).

## Convenciones de código

- Usa **funciones nombradas con `export function NombreComponente()`** para componentes, no `export default function`, salvo en archivos de rutas de Next (`page.tsx`, `layout.tsx`, `route.ts`) donde Next lo exige.
- Nombres de archivo de componentes en **PascalCase** (`Hero.tsx`, `WhatsAppButton.tsx`); hooks en **camelCase** con prefijo `use` (`useCounter.ts`).
- Importa siempre con el alias `@/*` (configurado en `tsconfig.json`), nunca rutas relativas largas (`../../../`).
- Mantén los datos de contenido en español (es el idioma del sitio); los identificadores de código (variables, funciones, props) en inglés, como ya es el patrón existente.
- Prioriza componentes de servidor por defecto. Añade `"use client"` solo cuando el componente use hooks de estado/efecto, event handlers del DOM, o librerías que lo requieran (Framer Motion, React Hook Form, hooks de `hooks/`).
- Evita lógica de negocio dentro de JSX profundamente anidado; extrae funciones auxiliares (como `isActivePath` en `Navbar.tsx`) al inicio del archivo o del componente.

**Ejemplo — componente correcto:**
```tsx
"use client";

interface KpiCardProps {
  value: number;
  label: string;
}

export function KpiCard({ value, label }: KpiCardProps) {
  return <div className="glass-card">{value} — {label}</div>;
}
```

## Reglas para componentes

- Un componente de sección = una responsabilidad visual = un archivo. No dividas una sección en múltiples archivos salvo que se reutilice en otra página.
- Sub-componentes puramente visuales usados solo dentro de una sección (p. ej. `Word` en `Manifesto.tsx` o `Field` en `ContactForm.tsx`) pueden vivir en el mismo archivo; solo promuévelos a `components/ui/` si se reutilizan en más de una sección.
- Tipa las props explícitamente con una interfaz o tipo inline; no uses `any` ni props sin tipar.
- Los componentes interactivos (botones, formularios, cualquier cosa con `onClick`/`onChange`) deben ser accesibles: elementos semánticos (`<button>`, no `<div onClick>`), estados de foco visibles, labels asociados a inputs. Detalle completo en [UX_GUIDE.md § Accesibilidad](UX_GUIDE.md#accesibilidad).
- Las animaciones de Framer Motion siguen los arquetipos definidos en [DESIGN_SYSTEM.md § Motion](DESIGN_SYSTEM.md#motion-framer-motion); no introduzcas curvas de easing nuevas sin razón.
- No agregues dependencias de UI (Radix, Headless UI, MUI, shadcn, etc.) para resolver algo que ya cubre Tailwind + Framer Motion, salvo que se discuta antes.

## Reglas de TypeScript

- `strict` está activado en `tsconfig.json`; no lo desactives ni lo debilites por archivo (`// @ts-nocheck`, `any` disfrazado) para evitar resolver un error de tipos.
- Tipa explícitamente las props de componentes, los payloads de API (`interface ContactPayload` en `app/api/contact/route.ts` como referencia) y los retornos de funciones de `lib/utils.ts`.
- Evita `any`; si el tipo es genuinamente desconocido, usa `unknown` y haz narrowing explícito.
- Prefiere `interface` para formas de props/objetos y `type` para uniones, alias o utilidades de tipos.
- Los datos estáticos tipados (como `services-data.ts`) deben exportar también su tipo (`export interface ServiceData { ... }`) para que se reutilice donde se consuman, en vez de inferir tipos duplicados en cada componente consumidor.

**Ejemplo — tipo desconocido manejado correctamente:**
```ts
function isValidPayload(data: unknown): data is ContactPayload {
  return typeof data === "object" && data !== null && "email" in data;
}
```

## Buenas prácticas

- Antes de tocar una sección, léela completa: el patrón de animaciones, textos y estructura de cada sección es consistente entre sí; no introduzcas un estilo distinto en una sola sección.
- No dupliques datos de contacto, número de WhatsApp o textos legales: reutiliza `SITE` (`lib/site-config.ts`) y `getWhatsAppUrl` (`lib/utils.ts`) en vez de hardcodearlos en otro componente.
- Mantén las secciones como Server Components: envuelve solo la parte animada con `Reveal`/`RevealGroup` en vez de marcar toda la sección con `"use client"`.
- Verifica siempre que el sitio compile y lintee antes de dar por terminado un cambio: `npm run lint` y `npm run build`.
- Prueba el formulario de contacto y la navegación (menú de servicios, menú móvil) manualmente (`npm run dev`) cuando el cambio los afecte; son los dos flujos de conversión del sitio (ver [UX_GUIDE.md](UX_GUIDE.md)).
- Mantén el contenido y las validaciones del formulario (`app/api/contact/route.ts`) sincronizados con lo que exige el formulario del cliente (React Hook Form) para no tener reglas divergentes entre frontend y backend (ver también [SECURITY_GUIDE.md](SECURITY_GUIDE.md)).

## Criterios de revisión de código

Todo PR (propio o de un agente) debe poder responder que sí a lo siguiente antes de aprobarse. Ver también el brief condensado en [prompts/code-review.md](prompts/code-review.md).

- **Correctitud**: ¿el cambio hace lo que dice el PR, sin romper otra sección o flujo (formulario, navegación por anclas, menú móvil)?
- **Arquitectura**: ¿respeta la separación descrita en [ARCHITECTURE.md](ARCHITECTURE.md#regla-de-ubicación-de-código-nuevo)? ¿No se filtró lógica de negocio a un lugar equivocado?
- **Sistema de diseño**: ¿usa los tokens y clases de [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) en vez de reinventar estilo?
- **Tipos**: ¿todo está tipado explícitamente, sin `any` nuevo, sin debilitar `strict`?
- **Accesibilidad**: ¿elementos interactivos son semánticos, con `aria-label` donde corresponde, foco visible, contraste suficiente? (ver [UX_GUIDE.md](UX_GUIDE.md))
- **SEO**: si el cambio toca `layout.tsx`, metadata de una página, encabezados o rutas públicas, ¿se actualizó lo correspondiente en [SEO_GUIDE.md](SEO_GUIDE.md)?
- **Rendimiento**: ¿se usó `next/image` para imágenes nuevas? ¿No se agregó una dependencia pesada innecesaria? (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md))
- **Seguridad**: si el cambio toca `app/api/contact/route.ts` o maneja input de usuario, ¿mantiene validación server-side y sanitización? (ver [SECURITY_GUIDE.md](SECURITY_GUIDE.md))
- **Contenido de negocio**: si el cambio toca copy, precios, tiempos de respuesta o alcance de servicios, ¿es coherente con [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md)?
- **Build limpio**: `npm run lint` y `npm run build` pasan sin errores ni warnings nuevos.
- **Verificación manual**: si el cambio es visual o afecta un flujo de usuario, ¿se probó en `npm run dev` (y en preview de Vercel) en al menos un viewport móvil y uno de escritorio?

## Referencias cruzadas

- [ARCHITECTURE.md](ARCHITECTURE.md) — dónde vive cada tipo de código.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — sistema visual que los componentes deben consumir.
- [UX_GUIDE.md](UX_GUIDE.md) — accesibilidad y patrones de interacción.
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) — reglas específicas para el endpoint de contacto y manejo de input.
- [GIT_WORKFLOW.md](GIT_WORKFLOW.md) — cómo llevar un cambio de código a `main`.
