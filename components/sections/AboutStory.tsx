import { Eye, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { COMPANY_STORY, MISSION, TEAM, VALUES, VISION } from "@/lib/company-data";
import { SITE } from "@/lib/site-config";

/** Historia, misión, visión, valores y (si hay datos) equipo de Evoltica. */
export function AboutStory() {
  return (
    <>
      {/* Historia */}
      <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="story-title">
        <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Nuestra historia</SectionLabel>
            <h2 id="story-title" className="mt-5 text-display-md font-semibold text-white text-balance">
              {SITE.tagline}
            </h2>
          </Reveal>
          <Reveal className="space-y-6 lg:col-span-6 lg:col-start-7" delay={0.1}>
            {COMPANY_STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lead text-slate-300">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="relative pb-24 lg:pb-32" aria-label="Misión y visión">
        <div className="container-custom grid gap-4 md:grid-cols-2">
          {[
            { icon: Target, title: "Misión", text: MISSION },
            { icon: Eye, title: "Visión", text: VISION },
          ].map((block, index) => (
            <Reveal key={block.title} delay={index * 0.08} className="card relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <span className="icon-tile">
                <block.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-3xl font-semibold text-white">{block.title}</h2>
              <p className="mt-4 text-lead text-slate-400">{block.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding relative bg-ink-800/60" aria-labelledby="values-title">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Valores"
            title={<span id="values-title">Los principios detrás de cada decisión.</span>}
            size="md"
          />
          <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <RevealItem as="li" key={value.title} className="bg-ink-800 p-8 lg:p-10">
                <value.icon className="h-6 w-6 text-primary-400" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-semibold text-white">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{value.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Equipo — solo con datos reales (ver TEAM en lib/company-data.ts) */}
      {TEAM.length > 0 && (
        <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="team-title">
          <div className="container-custom">
            <SectionHeading eyebrow="Equipo" size="md" title={<span id="team-title">Las personas detrás de Evoltica.</span>} />
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <RevealItem as="li" key={member.name} className="card p-7">
                  <p className="text-lg font-semibold text-white">{member.name}</p>
                  <p className="mt-1 text-sm text-primary-400">{member.role}</p>
                  {member.bio && <p className="mt-4 text-sm leading-relaxed text-slate-400">{member.bio}</p>}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
