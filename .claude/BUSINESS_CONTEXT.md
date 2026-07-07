# Contexto de negocio

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

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

El sitio existe para mover al visitante por este embudo hasta el primer paso (agendar la reunión de descubrimiento vía formulario o WhatsApp). Ninguna sección debe proponer un camino de conversión alterno que no desemboque en esto.

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
- **Tiempo de respuesta comprometido**: "4 horas hábiles" (ver `Hero.tsx`, mensaje de éxito del formulario). Es una promesa pública al cliente, no un texto decorativo.
- **Posicionamiento SEO local** en Colombia para búsquedas relacionadas con ERP/Odoo y transformación digital (detalle en [SEO_GUIDE.md](SEO_GUIDE.md)).

## Contenido comercial y legal sensible

Los siguientes elementos son **afirmaciones de la empresa hacia clientes reales**, no texto decorativo, y requieren confirmación explícita del negocio antes de modificarse:

- Precios y tarifas (actualmente el sitio no publica precios; si se agregan, deben ser aprobados por el negocio).
- Garantías y compromisos de servicio (SLA de mesa de ayuda, niveles de soporte 1/2/3).
- Tiempos de respuesta comprometidos ("4h hábiles").
- Razón social y datos legales en el footer y en el JSON-LD de `app/layout.tsx` (teléfono, email, dirección, redes sociales).

Ver también la lista consolidada en [AI_GUIDELINES.md § Qué nunca modificar sin autorización](AI_GUIDELINES.md#qué-nunca-modificar-sin-autorización).

## Referencias cruzadas

- [ARCHITECTURE.md](ARCHITECTURE.md) — cómo se traduce este negocio en estructura de código.
- [SEO_GUIDE.md](SEO_GUIDE.md) — cómo se traduce este posicionamiento en estrategia de búsqueda.
- [ROADMAP.md](ROADMAP.md) — cómo evoluciona el negocio (casos de éxito, portal de clientes, etc.) en los próximos dos años.
- [docs/decisions/ADR-004-Why-Odoo.md](docs/decisions/ADR-004-Why-Odoo.md) — por qué Odoo es la plataforma ERP principal ofrecida a clientes.
