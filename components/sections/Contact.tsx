"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building2,
  User,
  Briefcase,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type ServiceOption =
  | ""
  | "consultoria-empresarial"
  | "erp-y-automatizacion"
  | "infraestructura-y-cloud"
  | "servicios-administrados"
  | "desarrollo-e-integraciones";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceOption;
  message: string;
}

const serviceOptions: { value: ServiceOption; label: string }[] = [
  { value: "", label: "Selecciona un servicio..." },
  { value: "consultoria-empresarial", label: "Consultoría Empresarial" },
  { value: "erp-y-automatizacion", label: "ERP y Automatización" },
  { value: "infraestructura-y-cloud", label: "Infraestructura y Cloud" },
  { value: "servicios-administrados", label: "Servicios Administrados" },
  { value: "desarrollo-e-integraciones", label: "Desarrollo e Integraciones" },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "comercial@evoltica.com",
    href: "mailto:comercial@evoltica.com",
  },
  {
    icon: Phone,
    label: "WhatsApp / Teléfono",
    value: "+57 314 403 6151",
    href: "tel:+573144036151",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Colombia — Remoto / Presencial",
    href: null,
  },
  {
    icon: MessageSquare,
    label: "Horario de atención",
    value: "Lunes a Viernes, 8am – 6pm",
    href: null,
  },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar el formulario");
      }

      setSubmitStatus("success");
      reset();
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Por favor intenta de nuevo."
      );
    }
  };

  return (
    <section id="contacto" className="relative section-padding">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-[#080B12]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <SectionLabel>Contacto</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
              Hablemos de tu próximo
              <br />
              <span className="gradient-text-blue">proyecto digital</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Agenda una consultoría gratuita de 60 minutos. Sin compromiso,
              con resultados concretos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Contact info sidebar */}
            <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
              {/* Info card */}
              <div className="glass-card p-7">
                <h3 className="text-lg font-bold text-white mb-6">
                  Información de contacto
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-white font-medium hover:text-primary-300 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-white font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitment badge */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-semibold text-white">
                    Nuestro compromiso
                  </span>
                </div>
                <ul className="space-y-2">
                  {[
                    "Respondemos en menos de 4 horas hábiles",
                    "Propuesta técnica en 5 días hábiles",
                    "Consultoría inicial 100% gratuita",
                    "Sin costos ocultos ni letra pequeña",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-primary-400 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInRight} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      ¡Mensaje enviado con éxito!
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Hemos recibido tu solicitud. Nuestro equipo se pondrá en
                      contacto contigo en menos de 4 horas hábiles.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="btn-secondary text-sm"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-7 lg:p-8"
                  >
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-slate-300 mb-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <User className="w-3 h-3 text-slate-500" />
                              Nombre completo{" "}
                              <span className="text-primary-400" aria-hidden="true">*</span>
                            </span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Juan García"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={cn(
                              "input-field",
                              errors.name && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                            )}
                            {...register("name", {
                              required: "El nombre es obligatorio",
                              minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres",
                              },
                              maxLength: {
                                value: 100,
                                message: "Máximo 100 caracteres",
                              },
                            })}
                          />
                          {errors.name && (
                            <p
                              id="name-error"
                              role="alert"
                              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                            >
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Company */}
                        <div>
                          <label
                            htmlFor="contact-company"
                            className="block text-xs font-semibold text-slate-300 mb-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              Empresa{" "}
                              <span className="text-primary-400" aria-hidden="true">*</span>
                            </span>
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Nombre de tu empresa"
                            aria-required="true"
                            aria-invalid={!!errors.company}
                            aria-describedby={errors.company ? "company-error" : undefined}
                            className={cn(
                              "input-field",
                              errors.company && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                            )}
                            {...register("company", {
                              required: "El nombre de la empresa es obligatorio",
                              minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres",
                              },
                              maxLength: {
                                value: 150,
                                message: "Máximo 150 caracteres",
                              },
                            })}
                          />
                          {errors.company && (
                            <p
                              id="company-error"
                              role="alert"
                              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                            >
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {errors.company.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-slate-300 mb-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-500" />
                              Correo electrónico{" "}
                              <span className="text-primary-400" aria-hidden="true">*</span>
                            </span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            placeholder="juan@empresa.com"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={cn(
                              "input-field",
                              errors.email && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                            )}
                            {...register("email", {
                              required: "El correo electrónico es obligatorio",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Ingresa un correo electrónico válido",
                              },
                            })}
                          />
                          {errors.email && (
                            <p
                              id="email-error"
                              role="alert"
                              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                            >
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-semibold text-slate-300 mb-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-slate-500" />
                              Teléfono / WhatsApp{" "}
                              <span className="text-primary-400" aria-hidden="true">*</span>
                            </span>
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+57 300 000 0000"
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            className={cn(
                              "input-field",
                              errors.phone && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                            )}
                            {...register("phone", {
                              required: "El teléfono es obligatorio",
                              pattern: {
                                value: /^[+\d\s\-()]{7,20}$/,
                                message: "Ingresa un teléfono válido",
                              },
                            })}
                          />
                          {errors.phone && (
                            <p
                              id="phone-error"
                              role="alert"
                              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                            >
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Service selector */}
                      <div className="mb-5">
                        <label
                          htmlFor="contact-service"
                          className="block text-xs font-semibold text-slate-300 mb-2"
                        >
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-slate-500" />
                            Servicio de interés{" "}
                            <span className="text-primary-400" aria-hidden="true">*</span>
                          </span>
                        </label>
                        <select
                          id="contact-service"
                          aria-required="true"
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? "service-error" : undefined}
                          className={cn(
                            "input-field appearance-none cursor-pointer",
                            errors.service && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                          )}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                          }}
                          {...register("service", {
                            required: "Selecciona un servicio",
                            validate: (v) => v !== "" || "Selecciona un servicio",
                          })}
                        >
                          {serviceOptions.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              disabled={opt.value === ""}
                              style={{ background: "#0F172A", color: opt.value === "" ? "#475569" : "#ffffff" }}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <p
                            id="service-error"
                            role="alert"
                            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.service.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-slate-300 mb-2"
                        >
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 text-slate-500" />
                            Cuéntanos sobre tu proyecto{" "}
                            <span className="text-primary-400" aria-hidden="true">*</span>
                          </span>
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Describe el desafío o necesidad tecnológica de tu empresa. ¿Cuáles son tus objetivos? ¿Tienes una fecha objetivo de implementación?"
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={cn(
                            "input-field resize-none",
                            errors.message && "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                          )}
                          {...register("message", {
                            required: "El mensaje es obligatorio",
                            minLength: {
                              value: 20,
                              message: "Por favor describe tu proyecto con más detalle (mínimo 20 caracteres)",
                            },
                            maxLength: {
                              value: 2000,
                              message: "El mensaje no puede superar 2000 caracteres",
                            },
                          })}
                        />
                        {errors.message && (
                          <p
                            id="message-error"
                            role="alert"
                            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Server error */}
                      <AnimatePresence>
                        {submitStatus === "error" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5"
                            role="alert"
                          >
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-300 leading-relaxed">
                              {errorMessage}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Required fields note */}
                      <p className="text-xs text-slate-600 mb-4">
                        <span className="text-primary-400">*</span> Campos obligatorios. Tu
                        información está protegida bajo la Ley 1581 de Habeas Data.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting || submitStatus === "loading"}
                        className={cn(
                          "btn-primary w-full justify-center py-3.5 text-base transition-all",
                          (isSubmitting || submitStatus === "loading") && "opacity-70 cursor-not-allowed"
                        )}
                        aria-busy={isSubmitting || submitStatus === "loading"}
                      >
                        {isSubmitting || submitStatus === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando solicitud...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Solicitar Consultoría Gratuita
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
