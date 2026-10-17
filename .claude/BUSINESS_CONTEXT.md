# Contexto de negocio

> **Versión**: 1.3 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Este documento es la fuente de verdad sobre **qué es Evoltica Solutions SAS, cómo gana dinero, a quién le vende y qué papel cumple el sitio web** dentro de esa estrategia. Cualquier persona o IA que escriba copy, defina prioridades de producto o discuta el roadmap debe partir de aquí, no de suposiciones genéricas sobre "una consultora de TI".

## Alcance

Cubre: modelo de negocio, líneas de servicio, embudo de conversión, audiencia objetivo, tono de marca, KPIs de negocio y contenido comercial/legal sensible.

No cubre: decisiones de stack técnico (ver [ARCHITECTURE.md](ARCHITECTURE.md)), identidad visual (ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) ni estrategia de palabras clave (ver [SEO_GUIDE.md](SEO_GUIDE.md)) — aunque las tres se apoyan en el contenido de este documento.

## Quién es Evoltica Solutions SAS

Evoltica Solutions SAS es una consultora tecnológica colombiana. Su posicionamiento central, presente en todo el copy del sitio, es que **no vende software: vende un socio tecnológico de largo plazo**. La frase que resume esto (y que debe tratarse como el mensaje de marca, no como una línea de marketing más) es:

> "El socio tecnológico que optimiza tu operación y se queda para sostenerla."
> "Transformamos procesos. Impulsamos crecimiento." (`COMPANY_TAGLINE`, `lib/services-data.ts`)

La implicación práctica: primero se vende comprensión del negocio del cliente (consultoría/diagnóstico), y solo después tecnología. La tecnología es el vehículo, no el punto de partida del discurso comercial.

## Modelo de negocio: de proyecto a recurrencia

El objetivo de negocio real de Evoltica no es cerrar proyectos de implementación puntuales, sino **convertir cada cliente implementado en ingreso recurrente mensual** a través de Servicios Administrados. Este es el KPI de negocio más importante detrás del sitio: cada sección y cada CTA debe entenderse como un paso hacia ese objetivo de largo plazo, no solo hacia "vender un ERP".

## Líneas de servicio

Fuente de verdad en código: `lib/services-data.ts` (`SERVICES`). El orden en que aparecen no es arbitrario — refleja el orden real del embudo comercial de Evoltica:

| # | Servicio | Rol en el embudo | Resumen |
|---|----------|-------------------|---------|
| 01 | **Consultoría Empresarial** | Puerta de entrada | Diagnóstico empresarial, levantamiento de procesos, optimización operativa, transformación digital, gestión documental, diseño organizacional. No se vende tecnología primero. |
| 02 | **ERP y Automatización** | Servicio principal | Implementación de Odoo (plataforma principal — ver [ADR-004](docs/decisions/ADR-004-Why-Odoo.md)), con ERPNext y Dolibarr como alternativas según el caso. Automatización con n8n, Make y Zapier. Inventarios, ventas/POS, compras, CRM, nómina/RRHH, integraciones. |
| 03 | **Infraestructura y Cloud** | Ventaja competitiva declarada | Hosting ERP administrado, VPS, backups, correo corporativo, VPN, monitoreo. Stack técnico de cliente: Proxmox VE, Zabbix, Grafana, Proxmox Backup Server, Hetzner Cloud, Contabo, Linux (Debian/Ubuntu). |
| 04 | **Servicios Administrados** | Objetivo de negocio real (recurrencia) | Administración ERP, mesa de ayuda con SLA, soporte TI (niveles 1-3), gestión de usuarios/permisos, analistas de procesos para mejora continua. |
| 05 | **Desarrollo e Integraciones** | Bajo demanda | Aplicaciones web, portales empresariales, ecommerce, APIs REST, integraciones. **No se ofrece proactivamente en la Fase 1** del embudo comercial — se activa cuando el cliente ya tiene ERP + Servicios Administrados activos y necesita algo a medida. |

Al escribir o modificar copy de servicios, respeta:
- El **orden** de la tabla (puerta de entrada → principal → ventaja competitiva → recurrencia → bajo demanda). No reordenar por gusto visual.
- Que **Desarrollo e Integraciones** se presente como complemento posterior, nunca como oferta inicial equivalente a las otras cuatro.
- Los **tipos de cliente objetivo** ya declarados por servicio (`clientTypes` en `services-data.ts`): microempresas, restaurantes, distribuidoras, talleres, empresas de servicios, constructoras. No inventes verticales nuevas sin que el negocio lo confirme.

## Embudo de conversión

Definido en `ENGAGEMENT_STEPS` (`lib/services-data.ts`):

1. **Reunión de descubrimiento** — conversación sin compromiso sobre el negocio del cliente.
2. **Diagnóstico** — identificación de las mejoras más urgentes.
3. **Propuesta personalizada** — plan, tiempos y valores claros y concretos.
4. **Implementación** — ejecución con acompañamiento incluido.

**Puntos de entrada ([ADR-014](docs/decisions/ADR-014-Commercial-Platform.md), 2026-10-08):** el embudo puede empezar desde el **catálogo** (`/soluciones`), una **solicitud de cotización** o un **diagnóstico/consultoría**. La reunión de descubrimiento sigue siendo el primer paso por defecto. Todo CTA desemboca en una solicitud que el equipo atiende (hoy, el formulario de `/contacto` o WhatsApp); no se crean caminos que el equipo no pueda atender.

**Catálogo de soluciones:** fuente tipada en `lib/catalog.ts`. Toma el texto de las ofertas ya publicadas en `lib/services-data.ts` (no lo duplica) y les asigna slug y modalidad comercial: Consultoría Empresarial → consultoría; ERP, Infraestructura y Servicios Administrados → cotización; **Desarrollo e Integraciones → siempre a la medida** (se puede descubrir y solicitar, pero no como oferta estándar).

## Audiencia objetivo

- **Mercado**: Colombia (ver también "Local SEO" en [SEO_GUIDE.md](SEO_GUIDE.md)).
- **Perfil de cliente**: PYMEs y empresas medianas — restaurantes, distribuidoras, talleres, constructoras, empresas de servicios, microempresas.
- **Lector tipo**: una persona de negocio (dueño, gerente general, gerente administrativo), **no necesariamente técnica**. El copy debe evitar jerga de TI sin explicarla, y priorizar resultados de negocio (tiempo, control, crecimiento, orden) sobre características técnicas del software.

## Tono de marca

- Cercano pero profesional, en **español neutro colombiano**.
- Orientado a la acción: los CTAs son verbos de compromiso concreto ("Solicitar Consultoría", "Ver Servicios"), no genéricos ("Más información").
- **Nunca alarmista ni de venta agresiva.** El posicionamiento es de confianza y acompañamiento sostenido, no de urgencia artificial ni de miedo ("si no digitalizas ahora vas a quebrar" está fuera de tono).
- Evita superlativos vacíos ("el mejor", "líder indiscutible") sin respaldo; el tono se apoya en concreción (tiempos, alcances, procesos) más que en adjetivos.

## KPIs de negocio que el sitio debe soportar

- **Leads calificados** vía formulario de contacto (`app/api/contact/route.ts`) y botón de WhatsApp.
- **Tiempo de respuesta**: **no hay un compromiso publicado.** El "4 horas hábiles" heredado no está aprobado como compromiso comercial y se retiró del sitio el 2026-10-10 (textos, `COMMITMENTS`, FAQ y respuesta de `/api/contact`; `SITE.responseTime` ya no existe). No se reintroduce un plazo sin autorización explícita.
- **Posicionamiento SEO local** en Colombia para búsquedas relacionadas con ERP/Odoo y transformación digital (detalle en [SEO_GUIDE.md](SEO_GUIDE.md)).

## Contenido comercial y legal sensible

Los siguientes elementos son **afirmaciones de la empresa hacia clientes reales**, no texto decorativo, y requieren confirmación explícita del negocio antes de modificarse:

- **Política de precios** (ADR-014): solo se publican precios **aprobados** por Evoltica (`ApprovedPrice`: monto, condiciones, quién y cuándo aprobó). Las modalidades de compra directa y suscripción exigen ese precio; sin él, el build falla. Hoy no hay ningún precio aprobado: todo el catálogo es cotización, consultoría o a la medida. Sin pasarela de pagos verificada no hay compra en línea (`CHECKOUT_ENABLED = false`).
- Garantías y compromisos de servicio (SLA de mesa de ayuda, niveles de soporte 1/2/3).
- Tiempos de respuesta (hoy ninguno publicado; ver § KPIs).
- Razón social y datos legales en `lib/site-config.ts` (footer, contacto) y en el JSON-LD de `app/layout.tsx` (teléfono, email, dirección, redes sociales).
- Compromisos públicos de servicio (`COMMITMENTS` en `lib/company-data.ts`, sección de `/nosotros`). **Hoy no hay ninguno confirmado:** la lista está vacía y la sección no se muestra.
- **Retirado el 2026-10-10 por no estar aprobado o no tener condiciones conocidas** (no reintroducir sin autorización): rangos de precio y modelos de pago del FAQ, "5 días hábiles" para la propuesta, "$0" / "sin costo" / "gratis" para la primera reunión, "monitoreo 24/7", planes de soporte con plazos y garantía de 30 días. El texto respaldado es el del embudo: la reunión de descubrimiento es **sin compromiso**. La mesa de ayuda se describe "con SLA" sin cifras, como en § Líneas de servicio.
- Afirmaciones legales: no hay política de tratamiento de datos publicada; el sitio no afirma protección legal (detalle en [SECURITY_GUIDE.md](SECURITY_GUIDE.md)).
- Situaciones operativas ilustrativas de la home (`OPERATIONAL_SYMPTOMS`): no son casos ni estadísticas; mantenerlas genéricas y verosímiles.
- Material visual (`lib/media.ts`): solo fotografías o capturas propias o autorizadas; nunca stock presentado como propio ni sistemas de clientes sin permiso.
- Casos de éxito (`lib/cases-data.ts`): solo con autorización escrita del cliente y cifras aprobadas por él.

Ver también la lista consolidada en [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [ARCHITECTURE.md](ARCHITECTURE.md) — cómo se traduce este negocio en estructura de código.
- [SEO_GUIDE.md](SEO_GUIDE.md) — cómo se traduce este posicionamiento en estrategia de búsqueda.
- [ROADMAP.md](ROADMAP.md) — cómo evoluciona el negocio (casos de éxito, portal de clientes, etc.) en los próximos dos años.
- [docs/decisions/ADR-004-Why-Odoo.md](docs/decisions/ADR-004-Why-Odoo.md) — por qué Odoo es la plataforma ERP principal ofrecida a clientes.
