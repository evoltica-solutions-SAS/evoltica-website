"use client";

import { motion } from "framer-motion";
import {
  Search,
  HeartHandshake,
  ShieldCheck,
  Code2,
  ClipboardList,
  Layers,
  Clock,
  FileCheck,
  Gift,
  Ban,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const pillars = [
  {
    icon: Search,
    title: "Diagnóstico antes que tecnología",
    description:
      "No vendemos software primero. Empezamos por entender tu negocio, tus procesos y tus verdaderas prioridades.",
    color: "from-primary to-primary-700",
  },
  {
    icon: HeartHandshake,
    title: "Nos quedamos, no solo implementamos",
    description:
      "Nuestra meta no es entregar un proyecto y desaparecer. Construimos relaciones de largo plazo con soporte y mejora continua.",
    color: "from-secondary to-secondary-700",
  },
  {
    icon: ShieldCheck,
    title: "Infraestructura que nunca duerme",
    description:
      "Monitoreo, backups y seguridad continuos para que la tecnología nunca sea el problema de tu negocio.",
    color: "from-accent to-accent-700",
  },
  {
    icon: Code2,
    title: "Solo desarrollamos cuando aporta valor",
    description:
      "No ofrecemos desarrollo a medida por defecto. Se activa únicamente cuando tu negocio realmente lo necesita.",
    color: "from-primary to-primary-700",
  },
  {
    icon: ClipboardList,
    title: "Procesos documentados y medibles",
    description:
      "Cada mejora que implementamos queda documentada, con roles, responsabilidades e indicadores claros de gestión.",
    color: "from-secondary to-secondary-700",
  },
  {
    icon: Layers,
    title: "Un solo socio para toda tu operación",
    description:
      "Desde el ERP hasta el hosting y el soporte diario: todo bajo un mismo equipo que conoce tu negocio.",
    color: "from-accent to-accent-700",
  },
];

const commitments = [
  { icon: Clock, label: "Respuesta en menos de 4 horas hábiles" },
  { icon: FileCheck, label: "Propuesta técnica en 5 días hábiles" },
  { icon: Gift, label: "Consultoría inicial 100% gratuita" },
  { icon: Ban, label: "Sin costos ocultos ni letra pequeña" },
];

export function Trust() {
  return (
    <section id="compromiso" className="relative section-padding">
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <SectionLabel>Nuestro Compromiso</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Principios que guían
              <br />
              <span className="gradient-text-blue">cada proyecto que entregamos</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Aún estamos construyendo nuestro historial de casos públicos.
              Mientras tanto, esto es lo que puedes esperar de nosotros desde
              el primer día.
            </p>
          </motion.div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative p-6 rounded-2xl glass-card group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <pillar.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Commitments bar */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 p-6 lg:p-8 rounded-2xl glass border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {commitments.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm text-slate-300 leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
