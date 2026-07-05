"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowDown, Sparkles } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";

const kpis = [
  { value: 5, prefix: "", suffix: "", label: "Servicios", sublabel: "líneas integrales" },
  { value: 24, prefix: "", suffix: "/7", label: "Soporte", sublabel: "monitoreo continuo" },
  { value: 100, prefix: "", suffix: "%", label: "Gratuita", sublabel: "consultoría inicial" },
  { value: 4, prefix: "", suffix: "h", label: "Respuesta", sublabel: "tiempo máximo hábil" },
];

function KpiCard({
  value,
  prefix,
  suffix,
  label,
  sublabel,
  delay,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
}) {
  const { ref, count } = useCounter(value, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center p-4 rounded-2xl glass border border-white/[0.08] hover:border-primary/30 transition-all group"
    >
      <span className="text-2xl lg:text-3xl font-black text-white tracking-tight group-hover:text-primary-300 transition-colors">
        {prefix}
        {suffix === "/7" ? (suffix === "/7" && count >= value ? "24" : count) : count}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-white mt-1">{label}</span>
      <span className="text-xs text-slate-500 mt-0.5">{sublabel}</span>
    </motion.div>
  );
}

export function Hero() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top =
        element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-slow animation-delay-300" />
      <div className="absolute top-3/4 left-1/3 w-60 h-60 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-200" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/60"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -80, -20],
            x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
          style={{
            left: `${15 + i * 14}%`,
            top: `${60 + (i % 3) * 10}%`,
          }}
        />
      ))}

      <div className="container-custom relative z-10 text-center py-16 lg:py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary-300 text-sm font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Transformamos procesos. Impulsamos crecimiento.
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto"
        >
          <span className="text-white">Impulsamos la</span>
          <br />
          <span className="relative inline-block">
            <span className="gradient-text-blue">evolución digital</span>
            {/* Underline accent */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent origin-left"
            />
          </span>
          <br />
          <span className="text-white">de tu empresa</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Consultoría empresarial,{" "}
          <span className="text-slate-200 font-medium">
            ERP y automatización, infraestructura, servicios administrados y
            desarrollo
          </span>{" "}
          — el socio tecnológico que optimiza tu operación y se queda para
          sostenerla.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => handleNavClick("#contacto")}
            className="btn-primary text-base px-7 py-3.5 group"
          >
            Solicitar Consultoría
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => handleNavClick("#servicios")}
            className="btn-secondary text-base px-7 py-3.5 group"
          >
            Ver Servicios
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* KPIs grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} {...kpi} delay={0.6 + i * 0.1} />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
            onClick={() => handleNavClick("#sobre-nosotros")}
          >
            <span className="text-xs font-medium tracking-widest uppercase">
              Explorar
            </span>
            <div className="w-5 h-8 border border-slate-700 rounded-full flex items-start justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
