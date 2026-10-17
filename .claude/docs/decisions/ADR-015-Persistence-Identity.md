# ADR-015: Estrategia de persistencia e identidad de la plataforma

**Fecha**: 2026-10-08
**Estado**: Proposed — **principios aprobados**; la elección de proveedores está pendiente
**Versión**: 0.1
**Responsable**: Evoltica Solutions SAS

## Contexto

[ADR-014](ADR-014-Commercial-Platform.md) requiere persistencia e identidad propias. El negocio autorizó **diseñar** la arquitectura de una base de datos y una autenticación real, sin desplegar infraestructura ni elegir proveedores todavía (2026-10-08). La comparación de opciones está en [docs/architecture/2026-10-08-plataforma-comercial-b2b.md § 9](../architecture/2026-10-08-plataforma-comercial-b2b.md).

## Principios aprobados

1. **Base de datos relacional**, con **PostgreSQL como candidato preferido**: cotización → pedido → servicio necesitan transacciones e integridad referencial.
2. **Acceso a datos detrás de repositorios** por agregado. Las páginas y los servicios de aplicación no conocen el motor; el adaptador de demostración (solo `next dev`) y el real cumplen los mismos contratos.
3. **Identidad detrás de una interfaz intercambiable** (`AuthProvider`, `lib/server/auth/contracts.ts`). La elección (librería en la app con sesiones en la base de datos, o proveedor gestionado) no cambia páginas ni servicios.
4. **Autorización en el servidor**, en cada operación (servicios de aplicación), con aislamiento por organización y roles (cliente: OWNER/MIEMBRO; personal: ADMIN/COMERCIAL/SOPORTE/FINANZAS). MFA para el personal.
5. **Contraseñas** nunca en texto plano: hash lento o delegación al proveedor. Sesiones httpOnly/Secure con rotación y expiración.
6. **Registro** por invitación o aprobación, con verificación de correo.
7. **Auditoría** de toda escritura del personal y de las decisiones del cliente (p. ej. aceptar una cotización).
8. **Datos personales:** si la base de datos o la identidad quedan fuera de Colombia, se requiere base legal y aviso de transferencia internacional (Ley 1581). El texto legal lo aporta Evoltica.

## Pendiente de decisión (no elegido)

| Tema | Qué falta comparar o confirmar |
|---|---|
| Hosting de PostgreSQL | Gestionado serverless, gestionado tradicional o autoalojado en la infraestructura de Evoltica: costo, seguridad, copias de respaldo y restauración probada, operación, ubicación de los datos |
| Identidad | Librería en la app (versión, mantenimiento, hash, 2FA, rate limiting) frente a proveedor gestionado B2B (costo por usuario, ubicación de los datos, dependencia) |
| Acceso a datos | Drizzle o Prisma (migraciones revisables, peso en serverless) |
| Rate limiting | Almacén (base de datos o KV) y si se acepta un CAPTCHA |

## Consecuencias

- Hasta que este ADR pase a `Accepted` con proveedores elegidos, **no se despliega** base de datos ni identidad, y las solicitudes comerciales reales (Fase 4) no se persisten.
- Reemplaza la parte de identidad y persistencia de [ADR-013](ADR-013-Backend-Auth-Strategy.md).
