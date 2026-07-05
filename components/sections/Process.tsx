"use client";

import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Map,
  Code2,
  Rocket,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizamos en profundidad tu empresa, procesos actuales, brechas tecnológicas y oportunidades de mejora para entender tu situación real.",
    duration: "1-2 semanas",
    deliverable: "Informe de diagnóstico",
    color: "from-primary to-primary-700",
    accent: "#12D56F",
  },
  {
    number: "02",
    icon: FileText,
    title: "Análisis",
    description:
      "Definimos requerimientos técnicos y funcionales, arquitectura de la solución, integraciones necesarias y el alcance detallado del proyecto.",
    duration: "1-2 semanas",
    deliverable: "Documento de especificaciones",
    color: "from-secondary to-secondary-700",
    accent: "#14A4BC",
  },
  {
    number: "03",
    icon: Map,
    title: "Planeación",
    description:
      "Estructuramos el roadmap de desarrollo con sprints, hitos, entregables, presupuesto y cronograma ajustado a tus prioridades de negocio.",
    duration: "1 semana",
    deliverable: "Plan de proyecto & presupuesto",
    color: "from-accent to-accent-700",
    accent: "#0997D5",
  },
  {
    number: "04",
    icon: Code2,
    title: "Desarrollo",
    description:
      "Construimos la solución con metodologías ágiles, entregas iterativas y validaciones continuas para asegurar que cumple tus expectativas.",
    duration: "4-16 semanas",
    deliverable: "Software validado y probado",
    color: "from-primary to-primary-700",
    accent: "#12D56F",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Implementación",
    description:
      "Desplegamos la solución en producción con estrategia de migración de datos, pruebas de rendimiento y plan de contingencia.",
    duration: "1-2 semanas",
    deliverable: "Sistema en producción",
    color: "from-secondary to-secondary-700",
    accent: "#14A4BC",
  },
  {
    number: "06",
    icon: GraduationCap,
    title: "Capacitación",
    description:
      "Formamos a tu equipo con talleres prácticos, documentación completa y material de referencia para una adopción exitosa.",
    duration: "1-2 semanas",
    deliverable: "Equipo certificado",
    color: "from-accent to-accent-700",
    accent: "#0997D5",
  },
  {
    number: "07",
    icon: HeartHandshake,
    title: "Soporte",
    description:
      "Brindamos acompañamiento post-implementación con monitoreo proactivo, mantenimiento evolutivo y soporte especializado.",
    duration: "Continuo",
    deliverable: "SLA definido",
    color: "from-primary to-primary-700",
    accent: "#12D56F",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1220] to-[#0B0F19]" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Vertical line connector */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <SectionLabel>Proceso</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              De la idea a la realidad,
              <br />
              <span className="gradient-text-blue">con metodología probada</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Nuestro proceso de 7 etapas garantiza claridad, calidad y
              resultados predecibles en cada proyecto que emprendemos juntos.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                custom={index}
                className={`flex flex-col lg:flex-row gap-6 items-start lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content card */}
                <div className="flex-1 glass-card p-6 group hover:border-white/[0.15] transition-all">
                  <div className="flex items-start gap-4">
                    {/* Step icon */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className="w-5.5 h-5.5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono font-bold tracking-wider"
                          style={{ color: step.accent }}
                        >
                          {step.number}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600">Duración:</span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: step.accent }}
                          >
                            {step.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600">Entregable:</span>
                          <span className="text-xs font-medium text-slate-300">
                            {step.deliverable}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center connector (desktop) */}
                <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 text-white"
                    style={{
                      borderColor: step.accent,
                      background: `${step.accent}20`,
                      color: step.accent,
                      boxShadow: `0 0 20px ${step.accent}40`,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <p className="text-slate-400 mb-6">
              ¿Listo para comenzar tu proceso de transformación digital?
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#contacto");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="btn-primary px-8 py-3.5"
            >
              Iniciar Diagnóstico Gratuito
              <span className="ml-1">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
