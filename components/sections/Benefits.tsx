"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Layers,
  Zap,
  TrendingUp,
  Database,
  BarChart2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, fadeInLeft, staggerContainer } from "@/hooks/useScrollAnimation";
import { useCounter } from "@/hooks/useCounter";

const benefits = [
  {
    icon: DollarSign,
    title: "Reducción de Costos",
    description:
      "Automatización de procesos manuales que elimina errores, reduce tiempos y genera ahorros operativos desde el primer mes.",
    stat: "35",
    statSuffix: "%",
    statLabel: "ahorro potencial en costos operativos",
    color: "text-primary-400",
    bg: "from-primary/10 to-primary/5",
    border: "border-primary/20",
  },
  {
    icon: Layers,
    title: "Escalabilidad",
    description:
      "Arquitecturas cloud-native diseñadas para crecer con tu negocio sin interrupciones, desde microempresas hasta operaciones complejas.",
    stat: "10",
    statSuffix: "x",
    statLabel: "capacidad de crecimiento sin re-arquitectura",
    color: "text-secondary-400",
    bg: "from-secondary/10 to-secondary/5",
    border: "border-secondary/20",
  },
  {
    icon: Zap,
    title: "Automatización Inteligente",
    description:
      "Flujos de trabajo automatizados que operan 24/7, eliminando tareas repetitivas y liberando a tu equipo para lo que importa.",
    stat: "80",
    statSuffix: "%",
    statLabel: "reducción esperada en tiempo de procesos manuales",
    color: "text-accent-400",
    bg: "from-accent/10 to-accent/5",
    border: "border-accent/20",
  },
  {
    icon: TrendingUp,
    title: "Mayor Productividad",
    description:
      "Herramientas intuitivas y procesos optimizados que aumentan la eficiencia de tu equipo y aceleran la toma de decisiones.",
    stat: "47",
    statSuffix: "%",
    statLabel: "incremento potencial en productividad del equipo",
    color: "text-primary-400",
    bg: "from-primary/10 to-primary/5",
    border: "border-primary/20",
  },
  {
    icon: Database,
    title: "Centralización de Datos",
    description:
      "Una única fuente de verdad para toda tu información empresarial, accesible en tiempo real desde cualquier lugar.",
    stat: "100",
    statSuffix: "%",
    statLabel: "visibilidad de datos en tiempo real",
    color: "text-secondary-400",
    bg: "from-secondary/10 to-secondary/5",
    border: "border-secondary/20",
  },
  {
    icon: BarChart2,
    title: "Analítica Empresarial",
    description:
      "Dashboards e inteligencia de negocio que transforman datos crudos en insights accionables para impulsar el crecimiento.",
    stat: "3",
    statSuffix: "x",
    statLabel: "más rápido en toma de decisiones estratégicas",
    color: "text-accent-400",
    bg: "from-accent/10 to-accent/5",
    border: "border-accent/20",
  },
];

function BenefitStat({
  value,
  suffix,
  label,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const { ref, count } = useCounter(value, 2000);

  return (
    <div ref={ref} className="mt-5 pt-5 border-t border-white/[0.06]">
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className={`text-3xl font-black ${color}`}>{count}</span>
        <span className={`text-xl font-bold ${color}`}>{suffix}</span>
      </div>
      <p className="text-xs text-slate-500 leading-snug">{label}</p>
    </div>
  );
}

export function Benefits() {
  return (
    <section id="beneficios" className="relative section-padding">
      <div className="absolute inset-0 bg-[#0B0F19]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Glow accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
            <motion.div variants={fadeInLeft}>
              <SectionLabel>Beneficios</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
                Resultados reales,{" "}
                <span className="gradient-text-blue">impacto medible</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Cada solución que entregamos está diseñada para generar valor
                concreto y cuantificable en las operaciones de tu empresa.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:text-right">
              <button
                onClick={() => {
                  const el = document.querySelector("#contacto");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="btn-primary inline-flex"
              >
                Ver cómo lo logramos
                <span className="ml-1">→</span>
              </button>
            </motion.div>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${benefit.bg} border ${benefit.border} group cursor-default transition-all`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${benefit.color} bg-white/[0.04]`}
                >
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
                <BenefitStat
                  value={parseInt(benefit.stat)}
                  suffix={benefit.statSuffix}
                  label={benefit.statLabel}
                  color={benefit.color}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
