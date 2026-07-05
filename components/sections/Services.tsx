"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { useSectionNav } from "@/hooks/useSectionNav";
import { SERVICES, type BrandColorKey } from "@/lib/services-data";

const colorClasses: Record<
  BrandColorKey,
  { gradient: string; text: string; glow: string; border: string }
> = {
  green: {
    gradient: "from-primary to-primary-700",
    text: "text-primary-400",
    glow: "rgba(18,213,111,0.15)",
    border: "rgba(18,213,111,0.25)",
  },
  teal: {
    gradient: "from-secondary to-secondary-700",
    text: "text-secondary-400",
    glow: "rgba(20,164,188,0.15)",
    border: "rgba(20,164,188,0.25)",
  },
  blue: {
    gradient: "from-accent to-accent-700",
    text: "text-accent-400",
    glow: "rgba(9,151,213,0.15)",
    border: "rgba(9,151,213,0.25)",
  },
  navy: {
    gradient: "from-navy-400 to-navy-600",
    text: "text-navy-300",
    glow: "rgba(45,76,110,0.2)",
    border: "rgba(45,76,110,0.3)",
  },
};

export function Services() {
  const { goToSection } = useSectionNav();

  return (
    <section id="servicios" className="relative section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-[#0D1220]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <SectionLabel>Servicios</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Cinco líneas de servicio,
              <br />
              <span className="gradient-text-blue">un solo socio tecnológico</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Desde el diagnóstico hasta la implementación y el soporte
              continuo, cada servicio está diseñado para generar ingresos
              recurrentes, facilitar otra venta o escalar con tu negocio.
            </p>
          </motion.div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SERVICES.map((service, index) => {
              const colors = colorClasses[service.color];
              return (
                <motion.div
                  key={service.slug}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 60%)`,
                      border: `1px solid ${colors.border}`,
                    }}
                  />

                  {/* Icon + tag */}
                  <div className="relative flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <service.icon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 relative">
                    {service.number} · {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5 relative">
                    {service.summary}
                  </p>

                  {/* Features */}
                  <ul className="relative space-y-1.5 mb-5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <CheckCircle
                          className={`w-3.5 h-3.5 shrink-0 ${colors.text}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    href={`/servicios#${service.slug}`}
                    className={`relative flex items-center gap-1.5 text-xs font-semibold transition-colors group/link ${colors.text}`}
                  >
                    Conocer más
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA card */}
            <motion.div
              variants={fadeInUp}
              className="relative p-6 rounded-2xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center text-center gap-4 group hover:border-primary/30 transition-all cursor-pointer min-h-[240px]"
              onClick={() => goToSection("#contacto")}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">
                  ¿Necesitas algo más específico?
                </p>
                <p className="text-xs text-slate-500">
                  Cuéntanos tu desafío y diseñamos la solución
                </p>
              </div>
              <span className="text-xs font-semibold text-primary-400 group-hover:text-primary transition-colors">
                Consultoría personalizada →
              </span>
            </motion.div>
          </div>

          {/* Link to full services page */}
          <motion.div variants={fadeInUp} className="text-center mt-10">
            <Link href="/servicios" className="btn-secondary">
              Ver portafolio completo de servicios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
