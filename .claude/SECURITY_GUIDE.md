# Estándares de seguridad

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define la superficie de riesgo del sitio y las reglas para manejar input de usuarios, secretos y datos personales sin introducir vulnerabilidades.

## Alcance

Cubre: validación y sanitización de input, manejo de secretos y variables de entorno, datos personales (PII), métodos HTTP y dependencias.

No cubre: SEO/indexación (ver [SEO_GUIDE.md](SEO_GUIDE.md)) ni rendimiento (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)).

## Superficie de riesgo

**Única superficie de entrada de datos externos**: `app/api/contact/route.ts`. Trátalo como el punto de mayor riesgo del proyecto — es también el único lugar del sitio donde entran datos que Evoltica no controla.

## Reglas

- **Validación en el servidor es obligatoria e independiente de la del cliente**: aunque React Hook Form valide en el navegador, el servidor debe re-validar todo (nombre, empresa, email, teléfono, servicio, mensaje) exactamente como ya hace `route.ts` — nunca confíes en la validación del cliente como única barrera.
- **Sanitización**: todo input de texto libre pasa por `sanitize()` (strip de `<`/`>`) antes de usarse o reenviarse. Si agregas un campo nuevo al formulario, debe pasar por el mismo tratamiento; no interpoles input crudo del usuario en HTML, en el asunto de un email, ni en logs sin sanitizar.
- **Sin inyección de HTML/JS de terceros sin revisar**: el único uso de `dangerouslySetInnerHTML` permitido es para JSON-LD estático controlado por el propio código (`app/layout.tsx`). No lo uses para renderizar contenido proveniente de un usuario o de una fuente externa no confiable.
- **Secretos y variables de entorno**: `EMAIL_WEBHOOK_URL`, `EMAIL_WEBHOOK_SECRET`, `NOTIFICATION_EMAIL` viven únicamente en variables de entorno (`.env.local` en desarrollo, configuración del proyecto en Vercel en producción). Nunca se hardcodean, nunca se loguean en texto plano, nunca se commitean.
- **Datos personales (PII)**: el payload de contacto incluye datos personales (nombre, email, teléfono, IP). No agregues logging adicional de este payload fuera de lo ya existente (log solo en `NODE_ENV === "development"`), y no lo persistas en ningún almacenamiento nuevo sin evaluar dónde y por cuánto tiempo se retiene.
- **Métodos HTTP**: el endpoint de contacto expone explícitamente solo `POST` (`GET` responde 405). Cualquier endpoint nuevo debe declarar explícitamente qué métodos acepta y rechazar el resto, no depender del comportamiento por defecto del framework.
- **Rate limiting / abuso**: el endpoint de contacto no tiene actualmente límite de tasa. Si el volumen de spam se vuelve un problema, la solución se discute antes de implementarse (p. ej. rate limiting en el borde con Vercel, CAPTCHA, o validación adicional), no se improvisa sobre la marcha.
- **Dependencias**: antes de agregar una dependencia nueva, revisa que sea mantenida activamente y evalúa su necesidad real (ver [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)); no agregues paquetes para resolver algo trivial que se puede escribir en unas líneas.
- **Cabeceras y transporte**: el sitio se sirve sobre HTTPS vía Vercel; no se debe introducir contenido mixto (`http://`) en assets, links o llamadas `fetch`.

## Checklist de seguridad para cambios en `app/api/contact/route.ts`

- [ ] ¿Todo campo nuevo tiene validación server-side equivalente a la del cliente?
- [ ] ¿Todo input de texto libre pasa por `sanitize()`?
- [ ] ¿Los mensajes de error no filtran detalles internos (stack traces, rutas de servidor)?
- [ ] ¿Los secretos siguen viniendo de `process.env`, nunca hardcodeados?
- [ ] ¿El método HTTP sigue restringido explícitamente?
- [ ] ¿Se corrió `npm run build` y se probó el envío real del formulario?

## Cuándo escalar antes de actuar

Cualquier cambio que toque: validación del endpoint de contacto, manejo de secretos, o que introduzca una nueva superficie de entrada de datos (nuevo endpoint, nuevo formulario) debe confirmarse con el negocio antes de mergear — ver la lista consolidada en [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) — reglas generales de TypeScript aplicables al endpoint.
- [UX_GUIDE.md](UX_GUIDE.md) — cómo se presentan al usuario los errores de validación.
- [prompts/backend.md](prompts/backend.md) — brief condensado para tareas sobre el endpoint de contacto.
