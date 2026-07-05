"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { SERVICES, type BrandColorKey } from "@/lib/services-data";

const colorClasses: Record<BrandColorKey, { text: string; border: string; bg: string }> = {
  green: { text: "text-primary-400", border: "border-primary/25", bg: "bg-primary/10" },
  teal: { text: "text-secondary-400", border: "border-secondary/25", bg: "bg-secondary/10" },
  blue: { text: "text-accent-400", border: "border-accent/25", bg: "bg-accent/10" },
  navy: { text: "text-navy-300", border: "border-navy-400/30", bg: "bg-navy-500/20" },
};

export function OurApproach() {
  return (
    <section id="enfoque" className="relative section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-[#0D1220]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <SectionLabel>Nuestro Enfoque</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Cómo pensamos
              <br />
              <span className="gradient-text-blue">cada línea de servicio</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Cada servicio que ofrecemos responde a un propósito claro dentro
              de la relación con tu empresa: entender el negocio, resolverlo
              con tecnología y quedarnos para sostener el resultado.
            </p>
          </motion.div>

          {/* Approach rows */}
          <div className="space-y-5">
            {SERVICES.map((service, index) => {
              const colors = colorClasses[service.color];
              return (
                <motion.div
                  key={service.slug}
                  variants={fadeInUp}
                  custom={index}
                  className="relative p-7 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all group"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
                      >
                        {service.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {service.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quote / institutional intro */}
                    <div className="lg:col-span-2 relative">
                      <Quote
                        className={`w-6 h-6 ${colors.text} opacity-30 mb-2`}
                        aria-hidden="true"
                      />
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        {service.intro}
                      </p>
                    </div>

                    {/* Ideal para */}
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                        {service.objective ? "Objetivo" : "Ideal para"}
                      </span>
                      {service.objective ? (
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {service.objective}
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {(service.clientTypes ?? service.features).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-slate-300 bg-white/[0.05] px-2.5 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/servicios#${service.slug}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold mt-6 ${colors.text} group-hover:gap-2.5 transition-all`}
                  >
                    Ver detalle del servicio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
