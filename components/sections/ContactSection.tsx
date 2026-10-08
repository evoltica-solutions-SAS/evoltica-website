import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface ContactSectionProps {
  /** En /contacto el h1 está en el PageHero; aquí se omite el encabezado. */
  showHeading?: boolean;
}

const CHANNELS = [
  { icon: Mail, label: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Teléfono", value: SITE.phoneDisplay, href: SITE.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Escríbenos directamente", href: getWhatsAppUrl(), external: true },
  { icon: Clock, label: "Horario", value: SITE.officeHours },
  { icon: MapPin, label: "Ubicación", value: `${SITE.country} — remoto y presencial` },
];

export function ContactSection({ showHeading = true }: ContactSectionProps) {
  return (
    <section
      id="contacto"
      className="section-padding relative overflow-hidden"
      aria-labelledby={showHeading ? "contact-title" : undefined}
      aria-label={showHeading ? undefined : "Formulario de contacto"}
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" aria-hidden="true" />
      <div className="container-custom relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          {showHeading && (
            <>
              <SectionLabel>Contacto</SectionLabel>
              <h2 id="contact-title" className="mt-5 text-display-md font-semibold text-white text-balance">
                Cuéntanos qué quieres mejorar.
              </h2>
              <p className="mt-6 max-w-md text-lead text-slate-400">
                Agenda una reunión de descubrimiento sin compromiso. Te respondemos en menos de {SITE.responseTime}.
              </p>
            </>
          )}

          <ul className={showHeading ? "mt-12 space-y-1" : "space-y-1"}>
            {CHANNELS.map((channel) => {
              const content = (
                <>
                  <span className="icon-tile h-10 w-10 shrink-0">
                    <channel.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block break-all text-white">{channel.value}</span>
                  </span>
                </>
              );
              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 rounded-2xl p-3 -mx-3 transition-colors hover:bg-white/[0.04]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-3 -mx-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
