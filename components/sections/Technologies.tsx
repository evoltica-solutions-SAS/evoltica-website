"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const technologies = [
  {
    name: "AWS",
    icon: "☁️",
    color: "#FF9900",
    benefit: "Infraestructura respaldada por Amazon, con disponibilidad y seguridad de nivel mundial.",
  },
  {
    name: "React",
    icon: "⚛️",
    color: "#61DAFB",
    benefit: "Interfaces rápidas y fluidas que mejoran la experiencia de tus clientes.",
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "#FFFFFF",
    benefit: "Sitios y aplicaciones que cargan más rápido, mejorando tu posicionamiento y conversión.",
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "#339933",
    benefit: "Sistemas capaces de crecer junto con tu empresa sin perder velocidad.",
  },
  {
    name: "Python",
    icon: "🐍",
    color: "#3776AB",
    benefit: "El lenguaje líder mundial en automatización e inteligencia de datos.",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    color: "#4169E1",
    benefit: "Tu información protegida y organizada con estándares de nivel bancario.",
  },
  {
    name: "Docker",
    icon: "🐳",
    color: "#2496ED",
    benefit: "Implementaciones estables que reducen fallas y tiempos de inactividad.",
  },
  {
    name: "Odoo",
    icon: "🔴",
    color: "#714B67",
    benefit: "El ERP más usado del mundo, adaptable a cualquier tipo de empresa.",
  },
  {
    name: "Linux",
    icon: "🐧",
    color: "#FCC624",
    benefit: "El sistema operativo detrás de la infraestructura crítica mundial: estable y seguro.",
  },
  {
    name: "GitHub",
    icon: "🐙",
    color: "#FFFFFF",
    benefit: "Control total y trazabilidad de cada cambio realizado en tu software.",
  },
];

export function Technologies() {
  return (
    <section id="tecnologias" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.07] via-transparent to-transparent" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <SectionLabel>Tecnologías</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Tecnología reconocida mundialmente,
              <br />
              <span className="gradient-text-blue">respaldada por resultados</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Trabajamos únicamente con herramientas líderes de la industria
              para que tu inversión tecnológica sea sólida, segura y esté
              respaldada por los estándares más altos del mercado.
            </p>
          </motion.div>

          {/* Tech grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15]"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${tech.color}15, transparent 60%)`,
                  }}
                />

                <span className="text-3xl">{tech.icon}</span>

                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    {tech.name}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {tech.benefit}
                  </p>
                </div>

                <div
                  className="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ background: tech.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
