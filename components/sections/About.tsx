"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Users, Shield, Zap, Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";

const values = [
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Adoptamos las tecnologías más avanzadas para ofrecer soluciones que marquen la diferencia en el mercado.",
    color: "from-primary to-primary-700",
    glow: "rgba(18,213,111,0.2)",
  },
  {
    icon: Users,
    title: "Colaboración",
    description:
      "Trabajamos como una extensión del equipo de nuestros clientes, construyendo relaciones duraderas.",
    color: "from-secondary to-secondary-700",
    glow: "rgba(20,164,188,0.2)",
  },
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Comprometidos con la transparencia, la seguridad y la entrega de resultados medibles y verificables.",
    color: "from-accent to-accent-700",
    glow: "rgba(9,151,213,0.2)",
  },
  {
    icon: Zap,
    title: "Excelencia",
    description:
      "Cada línea de código, cada diseño y cada proceso que entregamos cumple estándares de calidad empresarial.",
    color: "from-primary-600 to-secondary-600",
    glow: "rgba(18,213,111,0.2)",
  },
];

export function About() {
  return (
    <section id="sobre-nosotros" className="relative section-padding">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0D1220] to-[#0B0F19]" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <SectionLabel>Sobre Nosotros</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Tecnología que transforma,
              <br />
              <span className="gradient-text-blue">equipos que evolucionan</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Somos un equipo de profesionales apasionados por la tecnología,
              comprometidos con el éxito digital de cada empresa con la que
              trabajamos.
            </p>
          </motion.div>

          {/* Historia + Misión / Visión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Historia */}
            <motion.div
              variants={fadeInLeft}
              className="glass-card p-8 border-gradient"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Nuestra Historia</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                EVOLTICA SOLUTIONS SAS nació de la convicción de que las empresas
                colombianas merecen acceso a tecnología de clase mundial, adaptada
                a su realidad, cultura y ambición de crecimiento.
              </p>
              <p className="text-slate-400 leading-relaxed">
                No vendemos tecnología primero: vendemos comprensión del
                negocio, diagnóstico real y confianza. Acompañamos a cada
                empresa desde el primer diagnóstico hasta la operación diaria,
                quedándonos como socio de largo plazo en lugar de desaparecer
                después de la entrega.
              </p>

              {/* Tagline accent */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  Evoltica Solutions SAS
                </span>
              </div>
            </motion.div>

            {/* Misión y Visión */}
            <motion.div variants={fadeInRight} className="flex flex-col gap-5">
              {/* Misión */}
              <div className="glass-card p-7 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-700 flex items-center justify-center">
                    <Target className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Misión</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Impulsar la competitividad de las empresas mediante soluciones
                  tecnológicas innovadoras, ágiles y escalables que optimizan
                  procesos, reducen costos y generan ventajas competitivas
                  sostenibles en el mercado global.
                </p>
              </div>

              {/* Visión */}
              <div className="glass-card p-7 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-secondary-700 flex items-center justify-center">
                    <Eye className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Visión</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Ser el socio tecnológico de referencia para empresas
                  latinoamericanas que buscan transformación digital integral,
                  consolidando presencia en los principales mercados de la
                  región.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Valores */}
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-primary-400" />
              <h3 className="text-2xl font-bold text-white">Nuestros Valores</h3>
            </div>
            <p className="text-slate-500 text-sm">
              Los principios que guían cada decisión que tomamos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center group cursor-default"
                style={{ ["--glow-color" as string]: value.glow }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="w-5.5 h-5.5 text-white" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
