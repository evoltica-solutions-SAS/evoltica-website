"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { submitCommercialRequestAction, type CommercialFormState } from "@/app/(public)/actions";
import { buildRequestSummary } from "@/lib/commercial/summary";
import {
  parseCommercialRequest,
  type CommercialField,
  type CommercialFieldErrors,
} from "@/lib/commercial/validation";
import type { SolutionOption } from "@/lib/commercial/options";
import type { RequestKind } from "@/lib/domain";

export type CommercialFormStatus = CommercialFormState["status"] | "error";

/**
 * Estado y envío de los formularios de la Fase 4. Valida en el navegador con la
 * misma función que el servidor y después llama a la server action, que vuelve
 * a validar. No usa `<form action>`: React reinicia los campos tras una acción y
 * se perderían las respuestas de los pasos anteriores.
 */
export function useCommercialForm(kind: RequestKind, solutions: SolutionOption[]) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<CommercialFormStatus>("idle");
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState<CommercialFieldErrors>({});
  const [requestSummary, setRequestSummary] = useState("");
  const [pending, startTransition] = useTransition();
  const slugs = useMemo(() => new Set(solutions.map((solution) => solution.slug)), [solutions]);

  const parse = () => parseCommercialRequest(kind, new FormData(formRef.current ?? undefined), slugs);

  const showErrors = (found: CommercialFieldErrors) => {
    const count = Object.keys(found).length;
    setErrors(found);
    setStatus("invalid");
    setMessage(count === 1 ? "Revisa 1 campo." : `Revisa ${count} campos.`);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  /** Valida solo `fields` (un paso del asistente). Devuelve true si están bien. */
  const validateFields = (fields: CommercialField[]): boolean => {
    const { errors: all } = parse();
    const found = Object.fromEntries(
      Object.entries(all).filter(([field]) => fields.includes(field as CommercialField))
    ) as CommercialFieldErrors;
    if (Object.keys(found).length > 0) {
      showErrors(found);
      return false;
    }
    setErrors({});
    setStatus("idle");
    setMessage(undefined);
    return true;
  };

  /** Lo que la persona ve en la revisión y lo que puede enviar por un canal real. */
  const currentSummary = () => {
    const { input } = parse();
    if (!input) return "";
    const title = solutions.find((solution) => solution.slug === input.solution)?.title;
    return buildRequestSummary(input, title);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { input, errors: found } = parse();
    if (!input) {
      showErrors(found);
      return;
    }
    const formData = new FormData(event.currentTarget);
    const summary = currentSummary();
    startTransition(async () => {
      try {
        const result = await submitCommercialRequestAction(kind, formData);
        setStatus(result.status);
        setMessage(result.message);
        if (result.status === "invalid") showErrors(result.fieldErrors ?? {});
        else setErrors({});
        setRequestSummary(result.status === "prototype" ? summary : "");
      } catch {
        setStatus("error");
        setMessage("No pudimos procesar tu solicitud y no se guardó nada. Intenta de nuevo o escríbenos por WhatsApp.");
      }
    });
  };

  const backToForm = () => {
    setStatus("idle");
    setMessage(undefined);
  };

  return {
    formRef,
    summaryRef,
    status,
    message,
    errors,
    pending,
    requestSummary,
    onSubmit,
    validateFields,
    currentSummary,
    backToForm,
  };
}
