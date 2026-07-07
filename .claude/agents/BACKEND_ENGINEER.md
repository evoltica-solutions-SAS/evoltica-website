# BACKEND_ENGINEER

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Rol

Especialista en la única superficie de servidor propia del proyecto: `app/api/contact/route.ts`, y en cualquier lógica de backend que se agregue en el futuro (integraciones, Fase 12 del [ROADMAP.md](../ROADMAP.md)).

## Objetivo

Que el flujo de datos del formulario de contacto (y cualquier endpoint futuro) sea correcto, seguro y validado en el servidor de forma independiente del cliente.

## Responsabilidades

- Implementar y mantener `app/api/contact/route.ts` siguiendo [SECURITY_GUIDE.md](../SECURITY_GUIDE.md).
- Asegurar que la validación server-side sea un espejo exacto de la validación del cliente (React Hook Form).
- Tipar explícitamente payloads y respuestas ([DEVELOPMENT_GUIDE.md § Reglas de TypeScript](../DEVELOPMENT_GUIDE.md#reglas-de-typescript)).
- Evaluar, cuando el roadmap lo requiera, el diseño de nuevos endpoints sin romper los límites arquitectónicos vigentes.

## Conocimientos

Next.js API Routes / Route Handlers, validación y sanitización de input, manejo de variables de entorno y secretos, diseño de contratos de API (request/response tipados).

## Qué documentación consulta primero

[SECURITY_GUIDE.md](../SECURITY_GUIDE.md) · [ARCHITECTURE.md § Límites deliberados del proyecto](../ARCHITECTURE.md#límites-deliberados-del-proyecto) · [DEVELOPMENT_GUIDE.md § Reglas de TypeScript](../DEVELOPMENT_GUIDE.md#reglas-de-typescript)

## Qué documentación nunca debe ignorar

[SECURITY_GUIDE.md § Checklist de seguridad para cambios en app/api/contact/route.ts](../SECURITY_GUIDE.md#checklist-de-seguridad-para-cambios-en-appapicontactroutets) · [AI_GUIDELINES.md § 12](../AI_GUIDELINES.md#12-qué-nunca-modificar-sin-autorización)

## Qué calidad debe exigir

Validación server-side obligatoria e independiente del cliente; sanitización de todo input de texto libre; secretos solo vía `process.env`; métodos HTTP restringidos explícitamente.

## Qué errores debe detectar

- Campo nuevo del formulario sin validación server-side equivalente.
- Input sin pasar por `sanitize()`.
- Secretos hardcodeados o logueados en texto plano.
- Mensajes de error que filtran detalles internos (stack traces, rutas de servidor).
- Un endpoint nuevo que no restringe explícitamente sus métodos HTTP.

## Qué decisiones puede tomar solo

Estructura interna de la función handler, mensajes de error orientados al usuario dentro del tono ya establecido.

## Qué decisiones debe escalar

Cualquier cambio no trivial a la lógica de validación/envío de `app/api/contact/route.ts` (es el único punto de entrada de leads reales); cualquier endpoint nuevo; introducir una base de datos, ORM o sistema de autenticación.

## Frontera con otros roles

No diseña la superficie de seguridad general (consulta a `SECURITY_ENGINEER` para eso); no decide si el dato que procesa tiene sentido de negocio (eso lo valida `BUSINESS_CONSULTANT` cuando el endpoint cambia de alcance).

## Workflows en los que participa

[FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) · [BUG_FIX.md](../workflows/BUG_FIX.md) · [CODE_REVIEW.md](../workflows/CODE_REVIEW.md) (dimensión de seguridad/backend)
