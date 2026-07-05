"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Info,
  Sparkles,
  Boxes,
  Database,
  Cpu,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { useSectionNav } from "@/hooks/useSectionNav";
import {
  SERVICES,
  ENGAGEMENT_STEPS,
  COMPANY_TAGLINE,
  type BrandColorKey,
} from "@/lib/services-data";

const colorClasses: Record<
  BrandColorKey,
  { gradient: string; text: string; bg: string; border: string; ring: string }
> = {
  green: {
    gradient: "from-primary to-primary-700",
    text: "text-primary-400",
    bg: "bg-primary/10",
    border: "border-primary/30",
    ring: "rgba(18,213,111,0.15)",
  },
  teal: {
    gradient: "from-secondary to-secondary-700",
    text: "text-secondary-400",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    ring: "rgba(20,164,188,0.15)",
  },
  blue: {
    gradient: "from-accent to-accent-700",
    text: "text-accent-400",
    bg: "bg-accent/10",
    border: "border-accent/30",
    ring: "rgba(9,151,213,0.15)",
  },
  navy: {
    gradient: "from-navy-400 to-navy-600",
    text: "text-navy-300",
    bg: "bg-navy-500/30",
    border: "border-navy-400/40",
    ring: "rgba(45,76,110,0.2)",
  },
};

function ServiceSection({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { goToSection } = useSectionNav();
  const colors = colorClasses[service.color];
  const isEven = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className={`relative scroll-mt-24 section-padding ${
        isEven ? "bg-[#0D1220]" : "bg-[#0B0F19]"
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: colors.ring }}
      />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="max-w-3xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shrink-0 shadow-lg`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${colors.text} mb-1`}
                >
                  <span className="font-mono">{service.number}</span>
                  {service.tag}
                </span>
                <h2 className="text-2xl lg:text-4xl font-bold text-white tracking-tight">
                  {service.titleLines[0]} {service.titleLines[1]}
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              {service.intro}
            </p>
          </motion.div>

          {/* Core items */}
          {service.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {service.items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6"
                >
                  <span className="text-2xl mb-3 inline-block" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Servicios Administrados: tiers */}
          {service.tiers && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {service.tiers.map((tier) => (
                <motion.div
                  key={tier.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6"
                >
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colors.bg} ${colors.text} mb-4`}
                  >
                    {tier.tag}
                  </span>
                  <span className="text-2xl mb-3 block" aria-hidden="true">
                    {tier.icon}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {tier.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* ERP: platforms + automation tools */}
          {service.platforms && (
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-slate-500" />
                Plataformas ERP
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {service.platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="glass-card p-5"
                  >
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider ${colors.text} mb-2`}
                    >
                      {platform.tier}
                    </span>
                    <p className="text-white font-bold mb-1.5">{platform.name}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {service.automationTools && (
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-500" />
                Automatización
              </h3>
              <div className="flex flex-wrap gap-3">
                {service.automationTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="tech-badge !py-2 !px-4"
                  >
                    <span className="font-bold text-slate-200 mr-1.5">
                      {tool.name}
                    </span>
                    {tool.description}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Infraestructura: tech stack */}
          {service.techStack && (
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-500" />
                Tecnologías
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Servicios administrados: recurrence bullets */}
          {service.recurrenceBullets && (
            <motion.div
              variants={fadeInUp}
              className={`flex flex-wrap gap-x-6 gap-y-2 p-5 rounded-2xl mb-10 ${colors.bg} border ${colors.border}`}
            >
              {service.recurrenceBullets.map((bullet) => (
                <span
                  key={bullet}
                  className="flex items-center gap-2 text-sm font-medium text-white"
                >
                  <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                  {bullet}
                </span>
              ))}
            </motion.div>
          )}

          {/* Objective + client types (Consultoría / ERP) */}
          {(service.objective || service.clientTypes) && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] mb-10"
            >
              {service.objective && (
                <div className="flex items-start gap-2.5">
                  <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
                  <p className="text-sm text-slate-300">
                    <span className="font-semibold text-white">Objetivo: </span>
                    {service.objective}
                  </p>
                </div>
              )}
              {service.clientTypes && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
                    Ideal para:
                  </span>
                  {service.clientTypes.map((type) => (
                    <span
                      key={type}
                      className="text-xs font-medium text-slate-300 bg-white/[0.05] px-2.5 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Activation note (Desarrollo e Integraciones) */}
          {service.note && (
            <motion.div
              variants={fadeInUp}
              className="flex items-start gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-10"
            >
              <Info className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
              <p className="text-sm text-slate-400 leading-relaxed">
                {service.note}
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div variants={fadeInUp}>
            <button
              onClick={() => goToSection("#contacto")}
              className="btn-primary"
            >
              Solicitar información sobre este servicio
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function ServicesDetail() {
  const { goToSection } = useSectionNav();

  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Portafolio de Servicios</SectionLabel>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5 max-w-3xl mx-auto">
              <span className="text-white">Nuestros </span>
              <span className="gradient-text-blue">5 servicios</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              {COMPANY_TAGLINE} Todo lo que hacemos cumple al menos una
              condición: genera ingresos recurrentes, facilita otra venta, o
              es escalable.
            </p>

            {/* Quick jump chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {SERVICES.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="tech-badge !py-2 !px-4"
                >
                  <span className="font-mono text-slate-500 mr-1.5">
                    {service.number}
                  </span>
                  {service.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Per-service sections */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.slug} service={service} index={index} />
      ))}

      {/* Engagement process + closing CTA */}
      <section className="relative section-padding bg-[#080B12]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-custom relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <SectionLabel>Cómo empezar</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
                ¿Listo para transformar
                <br />
                <span className="gradient-text-blue">tu operación?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {ENGAGEMENT_STEPS.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="glass-card p-6 text-center"
                >
                  <span className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 text-primary-400 font-bold text-sm flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center">
              <button
                onClick={() => goToSection("#contacto")}
                className="btn-primary px-8 py-3.5"
              >
                Agendar reunión de descubrimiento
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
