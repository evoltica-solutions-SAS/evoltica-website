import { ContactForm } from "@/components/ui/ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Trama } from "@/components/ui/Trama";
import { SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface ContactSectionProps {
  /** En /contacto el h1 está en el PageHero; aquí se omite el encabezado. */
  showHeading?: boolean;
}

const CHANNELS = [
  { label: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Teléfono", value: SITE.phoneDisplay, href: SITE.phoneHref },
  { label: "WhatsApp", value: "Escríbenos directamente", href: getWhatsAppUrl(), external: true },
  { label: "Horario", value: SITE.officeHours },
  { label: "Dónde", value: `${SITE.country} — remoto y presencial` },
];

export function ContactSection({ showHeading = true }: ContactSectionProps) {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-white/[0.08] pb-24 pt-20 lg:pb-32 lg:pt-28"
      aria-labelledby={showHeading ? "contact-title" : undefined}
      aria-label={showHeading ? undefined : "Formulario de contacto"}
    >
      {showHeading && (
        <div
          className="pointer-events-none absolute -right-[38vw] -top-[14vw] w-[70vw] opacity-40 lg:-right-[16vw] lg:-top-[10vw] lg:w-[40vw] lg:opacity-80"
          aria-hidden="true"
        >
          <Trama id="contact-trama" band={58} draw={false} hatch={false} />
        </div>
      )}

      <div className="container-custom relative">
        {showHeading && (
          <Reveal className="mb-16 lg:mb-24">
            <SectionLabel index="08">Contacto</SectionLabel>
            <h2 id="contact-title" className="mt-6 font-semibold text-white text-display-hero">
              Hablemos de
              <span className="block lg:ml-[14%]">tu operación.</span>
            </h2>
            <p className="mt-8 max-w-lg text-lead text-slate-300 lg:ml-[14%]">
              Cuéntanos qué quieres mejorar. La primera reunión es sin compromiso.
            </p>
          </Reveal>
        )}

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-white/[0.1]">
              {CHANNELS.map((channel) => (
                <div key={channel.label} className="border-b border-white/[0.1] py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">{channel.label}</dt>
                  <dd className="mt-1.5 break-words text-lg text-white">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-primary-300 hover:decoration-primary"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      channel.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
