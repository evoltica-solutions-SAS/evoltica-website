# Roadmap (24 meses)

> **Versión**: 1.4 · **Estado**: Active · **Última actualización**: 2026-10-10 · **Responsable**: Evoltica Solutions SAS

## Propósito

Da visibilidad sobre hacia dónde evoluciona el sitio de Evoltica Solutions SAS durante los próximos dos años, para que cualquier decisión técnica de corto plazo (qué dependencia agregar, qué tan genérico hacer un componente) se tome sabiendo qué viene después.

## Alcance

Cubre: fases de producto planeadas, su prioridad relativa, dependencias entre ellas y criterios de "terminado". Es un documento de **dirección**, no un compromiso de fechas exactas — las fechas son horizontes orientativos, no deadlines contractuales.

No cubre: el detalle de implementación de cada fase (eso se documenta cuando la fase se planea en concreto, como ADR nuevo en [docs/decisions/](docs/decisions/) si implica una decisión arquitectónica) ni el roadmap comercial/de ventas de Evoltica como empresa (ver [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) para el modelo de negocio que este roadmap sirve).

## Cómo leer este documento

- **Prioridad**: Crítica (bloquea o protege el negocio actual) / Alta (siguiente en la cola) / Media (valiosa, no urgente) / Baja (oportunista, sujeta a recursos).
- **Dependencias**: qué debe existir antes de empezar la fase — técnico, de contenido o de decisión de negocio.
- **Criterios de terminado**: la definición de "hecho" para esa fase. Una fase no se marca completa por estar "desplegada", sino por cumplir estos criterios.
- Las fases que implican un cambio arquitectónico mayor (introducir base de datos, autenticación, etc.) requieren un **ADR nuevo** en [docs/decisions/](docs/decisions/) antes de empezar la implementación — ver [ARCHITECTURE.md § Límites deliberados del proyecto](ARCHITECTURE.md#límites-deliberados-del-proyecto).

---

> **Nota (2026-10-08):** la dirección de producto cambió a una plataforma comercial propia ([ADR-014](docs/decisions/ADR-014-Commercial-Platform.md)). El plan de fases vigente para catálogo, solicitudes, cotizaciones, portal, admin y pagos está en [docs/architecture/2026-10-08-plataforma-comercial-b2b.md § 11](docs/architecture/2026-10-08-plataforma-comercial-b2b.md); este roadmap conserva los horizontes de consolidación (seguridad, analytics, testing, SEO).

## Horizonte 0 — Fundación (estado actual)

### Fase 0 — Landing
**Estado: completada, en producción.**
- **Objetivo**: comunicar la propuesta de valor de Evoltica y capturar leads calificados.
- **Funcionalidades**: landing original de una página. Reconstruida el 2026-10-08 como sitio multipágina ([ADR-007](docs/decisions/ADR-007-Multi-Page-Site.md)): home con hero, servicios, diferenciadores, proceso, capacidades, compromisos, FAQ y contacto; `/nosotros`; `/contacto`; 404; WhatsApp flotante.
- **Prioridad**: Crítica.
- **Dependencias**: ninguna (es la base del sitio).
- **Criterios de terminado**: ✅ desplegada, ✅ formulario de contacto funcional, ✅ responsive, ✅ SEO básico implementado.

### Fase 1 — Servicios
**Estado: completada, en producción.**
- **Objetivo**: dar detalle profundo de las 5 líneas de servicio para capturar búsquedas específicas y educar al lead antes del contacto.
- **Funcionalidades**: página `/servicios` (portafolio + metodología) y una página por servicio en `/servicios/[slug]` con el detalle completo de cada `ServiceData` (`lib/services-data.ts`).
- **Prioridad**: Crítica.
- **Dependencias**: Fase 0.
- **Criterios de terminado**: ✅ una sección por servicio, ✅ coherente con el orden del embudo comercial ([BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md)), ✅ enlazada desde la navegación principal.

---

## Horizonte 1 — Consolidación (0–6 meses)

Antes de agregar superficie nueva, se consolida la base: seguridad, rendimiento, calidad automatizada y medición. Esto no es burocracia — es lo que permite que las fases posteriores (portales, IA) se construyan sobre una base confiable.

### Fase 2 — Seguridad (hardening)
- **Objetivo**: reducir la superficie de riesgo del único endpoint expuesto y preparar el terreno de seguridad para las fases con datos de usuario (portales).
- **Funcionalidades**: rate limiting en `app/api/contact/route.ts`, cabeceras de seguridad (CSP, HSTS vía Vercel), auditoría de dependencias recurrente, revisión OWASP Top 10 aplicada al sitio actual.
- **Prioridad**: Alta.
- **Dependencias**: ninguna técnica; requiere acuerdo de negocio sobre tolerancia a fricción (p. ej. si se introduce CAPTCHA).
- **Criterios de terminado**: rate limiting activo y probado, cabeceras de seguridad verificadas con una herramienta externa (securityheaders.com o equivalente), checklist de [SECURITY_GUIDE.md](SECURITY_GUIDE.md) al día.

### Fase 3 — Performance (presupuesto formal)
- **Objetivo**: pasar de "cuidar el rendimiento por convención" a medirlo y protegerlo con un presupuesto explícito.
- **Funcionalidades**: monitoreo continuo de Core Web Vitals (Vercel Analytics o Lighthouse CI), presupuesto de tamaño de bundle por página.
- **Prioridad**: Alta.
- **Dependencias**: Fase 6 (Analytics) para tener la instrumentación base compartida.
- **Criterios de terminado**: LCP < 2.5s, CLS < 0.1, INP < 200ms sostenidos en producción (ver métricas en [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)), alerta automática si se degradan.

### Fase 4 — CI/CD
- **Objetivo**: que ningún cambio llegue a `main` sin pasar validaciones automáticas, reduciendo la dependencia de disciplina manual.
- **Funcionalidades**: pipeline (GitHub Actions o equivalente) que corra lint + build + tests en cada PR; bloqueo de merge si falla; previews de Vercel obligatorios antes de aprobar.
- **Prioridad**: Alta.
- **Dependencias**: Fase 5 (Testing) para tener algo que el pipeline ejecute más allá de lint/build.
- **Criterios de terminado**: PR no se puede mergear a `main` con el pipeline en rojo; tiempo de pipeline < 5 minutos.

### Fase 5 — Testing
- **Objetivo**: introducir una red de seguridad automatizada donde hoy solo hay verificación manual.
- **Funcionalidades**: tests unitarios para `lib/utils.ts` y validación de `app/api/contact/route.ts`; tests end-to-end básicos (Playwright) para el flujo de contacto y la navegación por anclas.
- **Prioridad**: Alta.
- **Dependencias**: ninguna técnica bloqueante; se beneficia de definirse junto con Fase 4.
- **Criterios de terminado**: cobertura de los flujos críticos de conversión (formulario, WhatsApp, navegación); tests corriendo en CI, no solo localmente.

### Fase 6 — Analytics
- **Objetivo**: medir el embudo de conversión real en vez de asumirlo (ver [BUSINESS_CONTEXT.md § Embudo de conversión](BUSINESS_CONTEXT.md#embudo-de-conversión)).
- **Funcionalidades**: analítica de producto (GA4, Plausible o similar) con eventos explícitos para envío de formulario, click en WhatsApp, click en CTAs por sección; dashboard de leads por fuente/servicio de interés.
- **Prioridad**: Crítica (es la base de datos para decidir todo lo demás).
- **Dependencias**: decisión de negocio sobre herramienta (privacidad/cookies) — coordinar con el modelo de consentimiento si aplica.
- **Criterios de terminado**: eventos de conversión instrumentados y validados en producción; reporte mensual accesible para el negocio.

### Fase 7 — Optimización SEO (siguiente ciclo)
- **Objetivo**: capitalizar el contenido ya existente y expandirlo con intención de búsqueda de cola larga.
- **Funcionalidades**: auditoría técnica SEO completa, expansión de contenido en `/servicios`, revisión de Core Web Vitals como factor de ranking (ver [SEO_GUIDE.md](SEO_GUIDE.md)).
- **Prioridad**: Alta.
- **Dependencias**: Fase 6 (Analytics, para medir impacto), Fase 3 (Performance).
- **Criterios de terminado**: crecimiento medible de tráfico orgánico trimestre a trimestre; sin errores de indexación en Google Search Console.

---

## Horizonte 2 — Expansión de contenido y prueba social (6–12 meses)

### Fase 8 — Casos de éxito
- **Objetivo**: aportar prueba social concreta al embudo comercial (hoy el sitio no muestra clientes reales ni resultados).
- **Estado (2026-10-08)**: estructura lista — ruta `/casos-de-exito`, tipo `CaseStudy` y componentes (`lib/cases-data.ts`). Falta el contenido real autorizado; mientras tanto la página es `noindex` y la home oculta la sección.
- **Funcionalidades**: sección/página de casos de éxito por línea de servicio, con métricas de impacto cuando el cliente lo autorice.
- **Prioridad**: Alta.
- **Dependencias**: autorización de clientes reales para publicar su caso (dependencia de negocio, no técnica); Fase 6 (Analytics) para medir su efecto en conversión.
- **Criterios de terminado**: al menos 3 casos publicados con estructura consistente (reto → solución → resultado); enlazados desde `/servicios`.

### Fase 9 — Blog
- **Objetivo**: capturar tráfico de intención informacional (no solo transaccional) y reforzar autoridad temática para SEO.
- **Funcionalidades**: listado + artículo individual, contenido editorial sobre ERP/Odoo, automatización y transformación digital.
- **Prioridad**: Media.
- **Dependencias**: **decisión arquitectónica** — el sitio hoy no tiene capa de contenido editorial ni CMS (ver [ARCHITECTURE.md § Límites deliberados del proyecto](ARCHITECTURE.md#límites-deliberados-del-proyecto)); requiere un ADR nuevo antes de implementarse (MDX local vs. CMS headless).
- **Criterios de terminado**: flujo de publicación definido y documentado; al menos 4 artículos publicados; integrado a sitemap y SEO.

---

## Horizonte 3 — Año 2, primer semestre — Productos digitales para clientes

### Fase 10 — Portal Clientes
- **Estado (2026-10-08)**: adelantada por decisión del negocio. Estructura, dominio y contratos en construcción ([ADR-012](docs/decisions/ADR-012-Public-Portal-Admin-Split.md)); backend e identidad pendientes de [ADR-013](docs/decisions/ADR-013-Backend-Auth-Strategy.md).
- **Objetivo**: dar a los clientes de Servicios Administrados un canal propio para ver el estado de su cuenta/soporte, reforzando la recurrencia (ver [BUSINESS_CONTEXT.md § Modelo de negocio](BUSINESS_CONTEXT.md#modelo-de-negocio-de-proyecto-a-recurrencia)).
- **Funcionalidades**: login de cliente, vista de tickets de mesa de ayuda, estado de servicios contratados.
- **Prioridad**: Alta (impacto directo en retención).
- **Dependencias**: **cambio arquitectónico mayor** — introduce autenticación y base de datos por primera vez. Requiere ADR explícito antes de iniciar (ver [ARCHITECTURE.md § Límites deliberados del proyecto](ARCHITECTURE.md#límites-deliberados-del-proyecto)). Depende también de que Fase 12 (Integraciones) defina de dónde vienen los datos de tickets/servicios (¿el ERP Odoo del cliente? ¿un sistema interno de Evoltica?).
- **Criterios de terminado**: autenticación segura funcionando; al menos un cliente piloto usando el portal en producción; datos sincronizados con la fuente real (no hardcodeados).

### Fase 11 — Automatizaciones
- **Objetivo**: automatizar procesos internos del propio sitio (no solo los que Evoltica vende a clientes), empezando por el enrutamiento de leads.
- **Funcionalidades**: automatización del flujo lead → CRM interno → asignación, usando las mismas herramientas que Evoltica ofrece a clientes (n8n/Make, ver [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md)) como caso de uso propio ("dogfooding").
- **Prioridad**: Media.
- **Dependencias**: Fase 12 (Integraciones) para tener un CRM/destino al cual automatizar el envío.
- **Criterios de terminado**: un lead nuevo llega al sistema interno correspondiente sin intervención manual; tiempo de primera respuesta medido (el compromiso de tiempo lo define el negocio; hoy no hay ninguno aprobado).

### Fase 12 — Integraciones
- **Objetivo**: conectar el sitio con las herramientas reales de operación comercial de Evoltica.
- **Funcionalidades**: integración con CRM (posiblemente el propio Odoo de Evoltica), email marketing, calendario para agendar la "reunión de descubrimiento" directamente desde el sitio, WhatsApp Business API si reemplaza al enlace `wa.me` actual.
- **Prioridad**: Alta.
- **Dependencias**: decisión de negocio sobre qué CRM/calendario usa Evoltica internamente.
- **Criterios de terminado**: al menos el flujo de agendamiento y el de CRM funcionando end-to-end sin pasos manuales.

---

## Horizonte 4 — Año 2, segundo semestre — Escala y diferenciación

### Fase 13 — Portal Empleados
- **Objetivo**: intranet ligera para el equipo de Evoltica (documentación interna, recursos, comunicación).
- **Funcionalidades**: acceso autenticado para empleados, recursos internos, posiblemente enlazado a Servicios Administrados como caso de uso propio.
- **Prioridad**: Baja.
- **Dependencias**: reutiliza la infraestructura de autenticación introducida en Fase 10 — no se implementa un sistema de auth paralelo.
- **Criterios de terminado**: empleados pueden autenticarse y acceder a al menos un recurso interno real.

### Fase 14 — Dashboard Administrativo
- **Estado (2026-10-08)**: adelantada junto con la Fase 10 como `/admin` (ADR-012).
- **Objetivo**: dar visibilidad interna a Evoltica sobre leads, estado comercial y métricas del sitio en un solo lugar.
- **Funcionalidades**: panel con leads capturados (integrado con Fase 12), métricas de Fase 6 (Analytics), estado de casos de éxito/contenido.
- **Prioridad**: Media.
- **Dependencias**: Fases 6, 10, 12 (necesita datos reales de esas fases para tener sentido).
- **Criterios de terminado**: al menos un usuario administrativo de Evoltica usándolo como reemplazo de un proceso manual existente (hoja de cálculo, etc.).

### Fase 15 — Inteligencia Artificial
- **Objetivo**: usar IA como diferenciador de producto, no como feature decorativa.
- **Funcionalidades**: candidatas a evaluar — chatbot de calificación inicial de leads (pre-formulario), asistente interno para el Dashboard Administrativo (Fase 14), generación asistida de borradores de contenido para el Blog (Fase 9). Se define el alcance concreto más cerca de la fecha, según madurez de las fases previas.
- **Prioridad**: Media (alto potencial, pero depende de que la base de datos/CRM de fases anteriores exista).
- **Dependencias**: Fase 12 (Integraciones) como mínimo, para que un chatbot de calificación tenga a dónde enviar los leads calificados.
- **Criterios de terminado**: se define por caso de uso concreto elegido; como mínimo, debe reducir medible-mente carga manual o mejorar la tasa de calificación de leads.

### Fase 16 — Internacionalización
- **Objetivo**: evaluar y, si el negocio lo decide, ejecutar la expansión a otro mercado además de Colombia.
- **Funcionalidades**: adaptación de `organizationSchema`/SEO local a nuevo país, posible dominio o subdominio por región.
- **Prioridad**: Baja (depende enteramente de una decisión de negocio, no de una necesidad técnica actual).
- **Dependencias**: decisión de negocio explícita sobre mercado objetivo; requiere ADR de arquitectura si implica multi-tenancy o contenido diferenciado por región.
- **Criterios de terminado**: se define en el ADR correspondiente cuando el negocio confirme el mercado.

### Fase 17 — Multiidioma
- **Objetivo**: soportar visitantes/clientes en otro idioma (probablemente inglés, si Fase 16 avanza).
- **Funcionalidades**: `next-intl` o equivalente, contenido traducido y mantenido en paralelo al español.
- **Prioridad**: Baja.
- **Dependencias**: Fase 16 (Internacionalización) — no tiene sentido priorizar multiidioma sin una decisión de mercado que lo justifique.
- **Criterios de terminado**: al menos un idioma adicional con paridad de contenido completa (no traducción parcial), URLs localizadas indexadas correctamente.

---

## Resumen de prioridades por horizonte

| Horizonte | Ventana orientativa | Foco |
|---|---|---|
| 0 | Completado | Landing + Servicios |
| 1 | 0–6 meses | Seguridad, performance, CI/CD, testing, analytics, SEO — consolidar la base |
| 2 | 6–12 meses | Casos de éxito, blog — prueba social y contenido |
| 3 | 12–18 meses | Portal Clientes, automatizaciones, integraciones — primer salto arquitectónico (auth + datos) |
| 4 | 18–24 meses | Portal Empleados, dashboard, IA, internacionalización, multiidioma — escala y diferenciación |

## Referencias cruzadas

- [ARCHITECTURE.md § Límites deliberados del proyecto](ARCHITECTURE.md#límites-deliberados-del-proyecto) — qué cambios de arquitectura habilitan qué fases.
- [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) — el modelo de negocio que este roadmap sirve.
- [docs/decisions/](docs/decisions/) — donde se documentan las decisiones arquitectónicas mayores que varias fases requieren (auth, CMS, i18n).
