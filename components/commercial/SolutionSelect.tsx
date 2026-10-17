"use client";

import { useState } from "react";
import type { SolutionOption } from "@/lib/commercial/options";
import { FIELD_NAMES, type CommercialFieldErrors } from "@/lib/commercial/validation";
import { FieldError, fieldId } from "./FormParts";

interface SolutionSelectProps {
  prefix: string;
  solutions: SolutionOption[];
  errors: CommercialFieldErrors;
  defaultValue?: string;
  optional?: boolean;
  hint?: string;
  label?: string;
}

/**
 * Selector de soluciones publicadas, agrupadas por línea de servicio. Si la
 * línea tiene una nota de activación publicada, se muestra al elegirla.
 */
export function SolutionSelect({
  prefix,
  solutions,
  errors,
  defaultValue = "",
  optional,
  hint,
  label = "Solución del catálogo",
}: SolutionSelectProps) {
  const [selected, setSelected] = useState(defaultValue);
  const id = fieldId(prefix, "solution");
  const error = errors.solution;
  const note = solutions.find((solution) => solution.slug === selected)?.note;
  const describedBy = [hint && `${id}-hint`, note && `${id}-note`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const lines = Array.from(new Set(solutions.map((solution) => solution.lineTitle)));

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {optional && <span className="font-normal text-slate-500"> (opcional)</span>}
      </label>
      <select
        id={id}
        name={FIELD_NAMES.solution}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-required={!optional}
        aria-describedby={describedBy}
        className="select-field"
      >
        <option value="">{optional ? "Aún no lo sé" : "Selecciona una solución…"}</option>
        {lines.map((line) => (
          <optgroup key={line} label={line}>
            {solutions
              .filter((solution) => solution.lineTitle === line)
              .map((solution) => (
                <option key={solution.slug} value={solution.slug}>
                  {solution.title}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate-400">
          {hint}
        </p>
      )}
      {note && (
        <p id={`${id}-note`} className="mt-3 border-l-2 border-secondary/60 pl-3 text-sm leading-relaxed text-slate-300">
          {note}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
