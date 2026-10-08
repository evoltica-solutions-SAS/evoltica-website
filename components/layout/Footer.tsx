import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MAIN_NAV, PRIMARY_CTA, SITE, SOCIAL_LINKS } from "@/lib/site-config";
import { SERVICES } from "@/lib/services-data";

// TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — política de privacidad / tratamiento
// de datos (Ley 1581) y términos. Los enlaces anteriores apuntaban a páginas
// inexistentes (404) y se retiraron hasta contar con el texto legal aprobado.

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-brand-line opacity-40" aria-hidden="true" />

      <div className="container-custom pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-md text-display-sm font-semibold text-white text-balance">
              {SITE.promise}
            </p>
            <Link href={PRIMARY_CTA.href} className="btn-primary mt-8">
              {PRIMARY_CTA.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow">Servicios</h2>
              <ul className="mt-6 space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="text-[0.95rem] text-slate-400 transition-colors hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Empresa</h2>
              <ul className="mt-6 space-y-3">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[0.95rem] text-slate-400 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Contacto</h2>
              <ul className="mt-6 space-y-4 text-[0.95rem]">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                    <span className="break-all">{SITE.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <MapPin className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                  {SITE.country}
                </li>
              </ul>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Marca de agua decorativa en SVG (no es texto de lectura). */}
        <svg viewBox="0 0 1000 170" className="mt-20 w-full select-none" aria-hidden="true" focusable="false">
          <text
            x="500"
            y="150"
            textAnchor="middle"
            fontSize="205"
            fontWeight="700"
            letterSpacing="-10"
            fill="rgba(255,255,255,0.04)"
          >
            EVOLTICA
          </text>
        </svg>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. Todos los derechos reservados.
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
