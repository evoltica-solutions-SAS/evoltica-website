import { MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/lib/faq-data";
import { SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

/** `index` solo en páginas con capítulos numerados. */
export function FaqSection({ index }: { index?: string }) {
  return (
    <section id="faq" className="section-padding relative" aria-labelledby="faq-title">
      <div className="container-custom">
        <Reveal className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index={index}>Preguntas</SectionLabel>
            <h2 id="faq-title" className="mt-6 text-display-lg font-semibold text-white">
              Lo que nos preguntan
              <span className="block font-light text-slate-400">antes de la primera reunión.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8" amount={0.05}>
            <Accordion items={FAQS} />
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-10">
            <div className="border-l-2 border-primary pl-6 lg:sticky lg:top-32">
              <p className="text-xl font-medium leading-snug text-white">¿Prefieres preguntarle a una persona?</p>
              <p className="mt-3 leading-relaxed text-slate-400">
                Escríbenos por WhatsApp. Te responde alguien del equipo, no un bot.
              </p>
              <a
                href={getWhatsAppUrl("Hola, tengo una pregunta antes de agendar una reunión.")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-6"
              >
                <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
