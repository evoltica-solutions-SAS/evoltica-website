"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/site-config";

/**
 * Formulario de contacto. Las reglas de validación DEBEN coincidir con
 * app/api/contact/route.ts (ver .claude/SECURITY_GUIDE.md). Los valores del
 * selector son los slugs de SERVICES, que son las mismas claves que valida
 * `serviceLabels` en el endpoint.
 */
interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_PATTERN = /^[+\d\s\-()]{7,20}$/;

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label} <span className="text-primary-400" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function fieldA11y(id: string, hasError: boolean, registration: UseFormRegisterReturn) {
  return {
    id,
    "aria-required": true as const,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `${id}-error` : undefined,
    ...registration,
  };
}

export function ContactForm({ className }: { className?: string }) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", company: "", email: "", phone: "", service: "", message: "" },
  });

  // Preselecciona el servicio cuando se llega desde /contacto?servicio=<slug>.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("servicio");
    if (slug && SERVICES.some((service) => service.slug === slug)) {
      setValue("service", slug);
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No pudimos enviar el formulario.");
      }

      setSubmitStatus("success");
      reset();
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Ocurrió un error inesperado. Por favor intenta de nuevo."
      );
    }
  };

  const isLoading = submitStatus === "loading";

  return (
    <div className={cn("card p-6 sm:p-8 lg:p-10", className)}>
      <AnimatePresence mode="wait">
        {submitStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center"
            role="status"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary-400" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-semibold text-white">¡Solicitud enviada!</h3>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-400">
              Recibimos tu información. Nuestro equipo te contactará en menos de {SITE.responseTime}.
            </p>
            <button type="button" onClick={() => setSubmitStatus("idle")} className="btn-secondary mt-8">
              Enviar otra solicitud
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Formulario de contacto"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="contact-name" label="Nombre completo" error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className="input-field"
                  {...fieldA11y(
                    "contact-name",
                    !!errors.name,
                    register("name", {
                      required: "El nombre es obligatorio",
                      validate: (v) => v.trim().length >= 2 || "Mínimo 2 caracteres",
                      maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    })
                  )}
                />
              </Field>

              <Field id="contact-company" label="Empresa" error={errors.company?.message}>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Nombre de tu empresa"
                  className="input-field"
                  {...fieldA11y(
                    "contact-company",
                    !!errors.company,
                    register("company", {
                      required: "El nombre de la empresa es obligatorio",
                      validate: (v) => v.trim().length >= 2 || "Mínimo 2 caracteres",
                      maxLength: { value: 150, message: "Máximo 150 caracteres" },
                    })
                  )}
                />
              </Field>

              <Field id="contact-email" label="Correo electrónico" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="nombre@empresa.com"
                  className="input-field"
                  {...fieldA11y(
                    "contact-email",
                    !!errors.email,
                    register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: { value: EMAIL_PATTERN, message: "Ingresa un correo electrónico válido" },
                    })
                  )}
                />
              </Field>

              <Field id="contact-phone" label="Teléfono / WhatsApp" error={errors.phone?.message}>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+57 300 000 0000"
                  className="input-field"
                  {...fieldA11y(
                    "contact-phone",
                    !!errors.phone,
                    register("phone", {
                      required: "El teléfono es obligatorio",
                      pattern: { value: PHONE_PATTERN, message: "Ingresa un teléfono válido (7 a 20 dígitos)" },
                    })
                  )}
                />
              </Field>

              <Field
                id="contact-service"
                label="Servicio de interés"
                error={errors.service?.message}
                className="sm:col-span-2"
              >
                <select
                  className="select-field"
                  {...fieldA11y(
                    "contact-service",
                    !!errors.service,
                    register("service", {
                      validate: (v) => v !== "" || "Selecciona un servicio",
                    })
                  )}
                >
                  <option value="" disabled>
                    Selecciona un servicio…
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="contact-message"
                label="Cuéntanos sobre tu empresa y tu necesidad"
                error={errors.message?.message}
                className="sm:col-span-2"
              >
                <textarea
                  rows={5}
                  placeholder="¿Qué proceso quieres mejorar? ¿Qué sistemas usas hoy? ¿Tienes una fecha objetivo?"
                  className="input-field resize-y"
                  {...fieldA11y(
                    "contact-message",
                    !!errors.message,
                    register("message", {
                      required: "El mensaje es obligatorio",
                      validate: (v) =>
                        v.trim().length >= 20 || "Describe tu necesidad con más detalle (mínimo 20 caracteres)",
                      maxLength: { value: 2000, message: "El mensaje no puede superar 2000 caracteres" },
                    })
                  )}
                />
              </Field>
            </div>

            <AnimatePresence>
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-red-300">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-slate-400 sm:max-w-xs">
                <span className="text-primary-400">*</span> Campos obligatorios. Tu información está protegida bajo
                la Ley 1581 de Habeas Data.
              </p>
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="btn-primary w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Solicitar Consultoría
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
