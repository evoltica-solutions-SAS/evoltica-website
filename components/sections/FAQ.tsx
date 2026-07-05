"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question:
      "¿Cuánto tiempo tarda en desarrollarse un proyecto de software empresarial?",
    answer:
      "El tiempo varía según la complejidad del proyecto. Un ERP básico puede estar listo en 8-12 semanas, mientras que soluciones más complejas con múltiples integraciones pueden tomar 16-24 semanas. Durante la fase de diagnóstico y análisis definimos un cronograma detallado y realista que respetamos durante toda la ejecución. Trabajamos con metodologías ágiles que permiten entregas parciales para que puedas ver avances desde las primeras semanas.",
  },
  {
    question: "¿Desarrollan software completamente a medida o usan plataformas existentes?",
    answer:
      "Hacemos ambas cosas, dependiendo de lo que sea mejor para tu negocio. Para ERP y CRM frecuentemente usamos Odoo como base y lo personalizamos profundamente, lo que reduce costos y tiempos. Para plataformas web, aplicaciones móviles o sistemas muy específicos, desarrollamos desde cero con Next.js, React Native, Python y Node.js. Siempre recomendamos la opción que entrega mayor valor al menor costo de propiedad total.",
  },
  {
    question: "¿Cuál es el costo aproximado de un proyecto de transformación digital?",
    answer:
      "El presupuesto depende del alcance, complejidad y tecnologías involucradas. Proyectos de automatización de procesos puntuales pueden partir desde $15M COP, mientras que implementaciones ERP o plataformas empresariales completas pueden estar entre $50M y $300M COP. Ofrecemos modelos de pago por hitos y también opciones de suscripción mensual. El primer paso es una consultoría gratuita donde dimensionamos exactamente lo que necesitas.",
  },
  {
    question: "¿Qué sucede si el proyecto tiene cambios durante el desarrollo?",
    answer:
      "Entendemos que los negocios evolucionan y los requerimientos cambian. Manejamos cambios a través de un proceso de control de cambios (change management) claro: el cliente solicita el cambio, lo evaluamos en términos de impacto en tiempo y costo, y si se aprueba, lo incorporamos al plan. Trabajamos con sprints de 2 semanas que permiten ajustes periódicos sin afectar la calidad del entregable final.",
  },
  {
    question: "¿Ofrecen soporte y mantenimiento después de la implementación?",
    answer:
      "Sí, ofrecemos planes de soporte post-implementación con distintos niveles de SLA. El plan básico incluye corrección de bugs y soporte por tickets (24-48h respuesta). El plan estándar añade soporte prioritario (4h respuesta) y monitoreo de infraestructura. El plan premium incluye un Technical Account Manager dedicado, monitoreo 24/7, mantenimiento evolutivo y upgrades de seguridad. Todos los proyectos incluyen 30 días de garantía gratuita post-lanzamiento.",
  },
  {
    question: "¿Pueden integrar el nuevo sistema con los sistemas que ya tenemos?",
    answer:
      "Esta es una de nuestras fortalezas principales. Contamos con amplia experiencia integrando sistemas mediante APIs REST, webhooks, conectores nativos y middlewares. Hemos integrado ERPs con sistemas contables (Siigo, World Office, SAP), plataformas e-commerce (Shopify, WooCommerce), pasarelas de pago, sistemas de facturación electrónica DIAN y decenas de herramientas empresariales. Antes de cualquier propuesta, auditamos tu ecosistema tecnológico actual.",
  },
  {
    question:
      "¿Cómo garantizan la seguridad de los datos empresariales durante y después del desarrollo?",
    answer:
      "La seguridad es una prioridad no negociable. Implementamos: encriptación AES-256 en reposo y en tránsito (HTTPS/TLS 1.3), autenticación multifactor (MFA), control de acceso basado en roles (RBAC), auditorías de seguridad del código (SAST), backups automáticos cifrados, y cumplimiento con la Ley 1581 de Habeas Data de Colombia. Para sectores regulados (financiero, salud) aplicamos controles adicionales según el marco normativo correspondiente.",
  },
  {
    question:
      "¿Trabajan con empresas fuera de Colombia?",
    answer:
      "Sí, atendemos clientes en toda Latinoamérica. Nuestro modelo de trabajo es principalmente remoto con reuniones virtuales por videollamada, lo cual nos permite servir empresas en Colombia, Ecuador, Perú, Venezuela, Panamá y otros países de la región. Para proyectos que requieren presencia física, podemos coordinar visitas. Los contratos y pagos son en pesos colombianos o dólares según la preferencia del cliente.",
  },
  {
    question: "¿Qué tan difícil es para nuestro equipo adaptarse a la nueva tecnología?",
    answer:
      "El cambio tecnológico puede generar resistencia, por eso el proceso de capacitación y gestión del cambio es parte integral de nuestra metodología. Entregamos: talleres prácticos presenciales/virtuales, documentación en español con capturas de pantalla, videos tutoriales grabados, un período de soporte intensivo post-lanzamiento y acceso a materiales de referencia permanentes. Diseñamos las interfaces priorizando la usabilidad y la curva de aprendizaje mínima.",
  },
  {
    question:
      "¿Cómo empiezo? ¿Cuál es el primer paso para trabajar con EVOLTICA?",
    answer:
      "El proceso comienza con una consultoría inicial gratuita de 60 minutos donde conversamos sobre tu empresa, tus desafíos actuales y tus objetivos de negocio. No necesitas tener todo claro de antemano, nosotros hacemos las preguntas correctas. A partir de esa sesión, en los siguientes 5 días hábiles preparamos una propuesta técnica y económica detallada sin costo ni compromiso. Puedes agendar directamente por WhatsApp o completando el formulario de contacto.",
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-primary/30 bg-primary/[0.04]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-xs font-mono font-bold text-primary-400 mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-sm font-semibold transition-colors ${
              isOpen ? "text-white" : "text-slate-300"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <div
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-primary text-[#04160D]" : "bg-white/[0.06] text-slate-400"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 pl-14">
              <p className="text-sm text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1220] to-[#0B0F19]" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Preguntas frecuentes
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Todo lo que necesitas saber antes de comenzar tu proyecto de
              transformación digital.
            </p>
          </motion.div>

          {/* FAQ list */}
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#contacto");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="btn-secondary text-sm"
            >
              Envíanos tu pregunta
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
