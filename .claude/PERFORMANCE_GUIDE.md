# Guía de rendimiento

> **Versión**: 1.0 · **Estado**: Active · **Última actualización**: 2026-07-07 · **Responsable**: Evoltica Solutions SAS

## Propósito

Define las reglas para mantener el sitio rápido en primer contacto, ya que el rendimiento afecta directamente tanto la conversión (usuarios abandonan sitios lentos) como el posicionamiento SEO (Core Web Vitals como factor de ranking, ver [SEO_GUIDE.md](SEO_GUIDE.md)).

## Alcance

Cubre: uso de imágenes, componentes de servidor vs. cliente, dependencias, efectos decorativos y carga de scripts de terceros.

No cubre: infraestructura de hosting del cliente final de Evoltica (eso es contenido de negocio, ver [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md) — Infraestructura y Cloud es un *servicio que Evoltica vende*, no la infraestructura de este sitio).

## Reglas

- Usa `next/image` para cualquier imagen nueva (no `<img>` plano) para aprovechar optimización automática y lazy loading.
- Mantén los componentes como Server Components por defecto; solo agrega `"use client"` en el componente más pequeño posible que realmente necesite interactividad, no en su ancestro completo.
- Evita añadir librerías pesadas de animación/UI adicionales; Framer Motion ya cubre las necesidades del sitio y cada dependencia nueva impacta el bundle de un sitio que debe cargar rápido en el primer contacto (LCP).
- Ten cuidado con los efectos decorativos pesados (blurs grandes, `backdrop-filter`, la trama SVG de `Trama.tsx`): son aceptables en cantidades ya presentes, pero no los multipliques sin medir el impacto en rendimiento (especialmente en móviles de gama baja).
- No agregues fuentes, scripts de terceros (analytics, chats, pixels) sin usar `next/font` o carga diferida (`next/script` con estrategia `lazyOnload`/`afterInteractive`), para no bloquear el render inicial.
- Revisa el peso de imágenes subidas a `public/` (usa formatos modernos, comprime) antes de commitear assets nuevos.

## Métricas objetivo (Core Web Vitals)

Como referencia para cualquier cambio que pueda afectar el rendimiento percibido:

| Métrica | Objetivo | Por qué importa aquí |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | El Hero es la primera impresión del embudo comercial (ver [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md)); un LCP lento pierde leads antes de que vean el CTA. |
| CLS (Cumulative Layout Shift) | < 0.1 | Animaciones de entrada (Framer Motion) deben reservar espacio del layout, no causar saltos visuales. |
| INP (Interaction to Next Paint) | < 200ms | El formulario de contacto y la navegación por anclas son los flujos de conversión; deben sentirse instantáneos. |

Estas métricas también son señal de ranking en Google (ver [SEO_GUIDE.md § Estrategia SEO](SEO_GUIDE.md#estrategia-seo)).

## Checklist antes de mergear un cambio con impacto potencial en rendimiento

- [ ] ¿Las imágenes nuevas usan `next/image`?
- [ ] ¿El componente nuevo es Server Component salvo que realmente necesite `"use client"`?
- [ ] ¿No se agregó una dependencia pesada evitable?
- [ ] ¿Los efectos decorativos nuevos se probaron en un dispositivo/emulación de gama baja?
- [ ] ¿Algún script de terceros nuevo usa carga diferida?

## Referencias cruzadas

- [SEO_GUIDE.md](SEO_GUIDE.md) — por qué el rendimiento es también una palanca de SEO.
- [ARCHITECTURE.md](ARCHITECTURE.md) — límites de stack que evitan sobrecargar el bundle.
- [ROADMAP.md](ROADMAP.md) — fase dedicada de "Performance" con presupuesto de rendimiento formal.
- [prompts/performance.md](prompts/performance.md) — brief condensado para tareas de rendimiento.
