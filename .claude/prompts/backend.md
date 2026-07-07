# Brief: tareas de backend

> **Versión**: 1.1 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

Brief condensado para tareas que tocan `app/api/contact/route.ts` — la única superficie de backend del proyecto.

**Rol completo:** [agents/BACKEND_ENGINEER.md](../agents/BACKEND_ENGINEER.md) · **Proceso completo:** [workflows/FEATURE_DEVELOPMENT.md](../workflows/FEATURE_DEVELOPMENT.md) · [workflows/BUG_FIX.md](../workflows/BUG_FIX.md)

## Antes de escribir código

1. Este endpoint es el único punto de entrada de datos de clientes potenciales. Trátalo como el archivo de mayor riesgo del repositorio.
2. Relee el archivo completo, no solo la función que vas a tocar — la validación, sanitización y envío están entrelazadas.

## Reglas mínimas a respetar

- Toda validación del cliente (React Hook Form) debe tener su espejo exacto en el servidor.
- Todo input de texto libre pasa por `sanitize()`.
- Secretos solo vía `process.env`, nunca hardcodeados ni logueados en texto plano.
- El endpoint solo acepta `POST`; cualquier otro método se rechaza explícitamente.
- No agregues logging de PII fuera de lo ya existente (solo en `NODE_ENV === "development"`).

## Nunca sin autorización

Cambios en la lógica de validación/envío de este endpoint pueden silenciar leads reales sin que nadie lo note — confirma con el usuario antes de mergear un cambio no trivial aquí.

## Al terminar

- `npm run lint` && `npm run build`.
- Prueba el envío real del formulario en `npm run dev`.

## Documentación completa

[SECURITY_GUIDE.md](../SECURITY_GUIDE.md) · [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md)
