"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useCommercialForm } from "@/hooks/useCommercialForm";
import { COMPANY_SIZES, PROCESS_AREAS, SECTORS, TIME_SLOTS } from "@/lib/domain";
import {
  COMPANY_SIZE_LABELS,
  PROCESS_LABELS,
  SECTOR_LABELS,
  TIME_SLOT_LABELS,
  type SolutionOption,
} from "@/lib/commercial/options";
import { COMMERCIAL_RULES, DIAGNOSIS_STEPS, type CommercialField } from "@/lib/commercial/validation";
import { ChoiceGroup, ContactFields, DataNotice, ErrorSummary, Honeypot, PrototypeNotice, TextField } from "./FormParts";
import { RequestOutcome } from "./RequestOutcome";
import { SolutionSelect } from "./SolutionSelect";

const PREFIX = "diag";
const STEP_TITLES = ["Qué quieres resolver", "Tu empresa", "Solución de interés", "Cómo contactarte"];
const REVIEW = STEP_TITLES.length;
const GROUPS = ["processes", "companySize", "sector", "availability"] as const;

interface DiagnosisFormProps {
  solutions: SolutionOption[];
  defaultSolution?: string;
}

/**
 * Diagnóstico guiado en 4 pasos + revisión. Un solo <form>: los pasos ocultos
 * conservan sus valores (en memoria, nunca en localStorage: son datos personales).
 */
export function DiagnosisForm({ solutions, defaultSolution }: DiagnosisFormProps) {
  const form = useCommercialForm("DIAGNOSTICO", solutions);
  const [step, setStep] = useState(0);
  const [review, setReview] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    // Al cambiar de paso, el foco va al encabezado (no en la carga inicial).
    if (moved.current) headingRef.current?.focus();
  }, [step]);

  // Si el envío final trae errores, se vuelve al primer paso que los contiene.
  useEffect(() => {
    const fields = Object.keys(form.errors) as CommercialField[];
    if (step !== REVIEW || fields.length === 0) return;
    const target = DIAGNOSIS_STEPS.findIndex((stepFields) => stepFields.some((field) => fields.includes(field)));
    if (target >= 0) setStep(target);
  }, [form.errors, step]);

  const goTo = (next: number) => {
    moved.current = true;
    if (next === REVIEW) setReview(form.currentSummary());
    setStep(next);
  };

  const advance = () => {
    if (form.validateFields(DIAGNOSIS_STEPS[step])) goTo(step + 1);
  };

  const showOutcome = form.status === "prototype" || form.status === "unavailable" || form.status === "error";

  return (
    <div className="card p-6 sm:p-8 lg:p-10">
      {showOutcome && (
        <RequestOutcome
          status={form.status as "prototype" | "unavailable" | "error"}
          message={form.message}
          summary={form.requestSummary || review}
          subject="Solicitud de diagnóstico"
          onBack={form.backToForm}
        />
      )}

      <form ref={form.formRef} onSubmit={form.onSubmit} noValidate hidden={showOutcome} aria-label="Diagnóstico guiado" className="relative space-y-8">
        <PrototypeNotice />

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400" aria-live="polite">
            {step < REVIEW ? `Paso ${step + 1} de ${STEP_TITLES.length}` : "Revisión"}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-display-sm font-semibold text-white focus:outline-none">
            {step < REVIEW ? STEP_TITLES[step] : "Revisa tus respuestas"}
          </h2>
        </div>

        <ErrorSummary ref={form.summaryRef} prefix={PREFIX} message={form.message} errors={form.errors} order={DIAGNOSIS_STEPS.flat()} groupFields={[...GROUPS]} />

        <Honeypot />

        <section hidden={step !== 0} className="space-y-6">
          <TextField
            prefix={PREFIX}
            field="problem"
            label="¿Qué quieres resolver?"
            hint="En tus palabras: qué pasa hoy y qué te gustaría que pasara."
            multiline
            maxLength={COMMERCIAL_RULES.problem.max}
            errors={form.errors}
          />
          <ChoiceGroup
            prefix={PREFIX}
            field="processes"
            legend="¿Qué procesos se ven afectados?"
            hint="Puedes elegir varios."
            type="checkbox"
            options={PROCESS_AREAS}
            labels={PROCESS_LABELS}
            errors={form.errors}
          />
        </section>

        <section hidden={step !== 1} className="space-y-6">
          <ChoiceGroup
            prefix={PREFIX}
            field="companySize"
            legend="¿Cuántas personas trabajan en tu empresa?"
            type="radio"
            options={COMPANY_SIZES}
            labels={COMPANY_SIZE_LABELS}
            errors={form.errors}
          />
          <ChoiceGroup
            prefix={PREFIX}
            field="sector"
            legend="Sector"
            type="radio"
            optional
            options={SECTORS}
            labels={SECTOR_LABELS}
            errors={form.errors}
          />
          <TextField
            prefix={PREFIX}
            field="currentTools"
            label="¿Qué herramientas usan hoy?"
            hint="Por ejemplo: Excel, un software contable, un ERP."
            optional
            maxLength={COMMERCIAL_RULES.currentTools.max}
            errors={form.errors}
          />
        </section>

        <section hidden={step !== 2} className="space-y-6">
          <SolutionSelect
            prefix={PREFIX}
            solutions={solutions}
            defaultValue={defaultSolution}
            optional
            hint="Si ya viste una solución del catálogo que te interesa. Si no, déjalo vacío: para eso es el diagnóstico."
            errors={form.errors}
          />
        </section>

        <section hidden={step !== 3} className="space-y-6">
          <ContactFields prefix={PREFIX} errors={form.errors} />
          <ChoiceGroup
            prefix={PREFIX}
            field="availability"
            legend="¿Cuándo te queda mejor que te contactemos?"
            hint="Días hábiles. Es una preferencia, no una cita: el equipo propone el horario."
            type="checkbox"
            optional
            options={TIME_SLOTS}
            labels={TIME_SLOT_LABELS}
            errors={form.errors}
          />
          <DataNotice />
        </section>

        <section hidden={step !== REVIEW} className="space-y-4">
          <pre className="whitespace-pre-wrap break-words border border-white/[0.1] bg-white/[0.02] p-4 font-sans text-sm leading-relaxed text-slate-200">
            {review}
          </pre>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {STEP_TITLES.map((title, index) => (
              <li key={title}>
                <button type="button" onClick={() => goTo(index)} className="text-slate-300 underline underline-offset-4 hover:text-white">
                  Editar: {title.toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Atrás
            </button>
          ) : (
            <span />
          )}
          {step < REVIEW ? (
            <button type="button" onClick={advance} className="btn-primary">
              {step === REVIEW - 1 ? "Revisar respuestas" : "Continuar"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={form.pending} aria-busy={form.pending} className="btn-primary">
              {form.pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Comprobar solicitud (prueba)
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
