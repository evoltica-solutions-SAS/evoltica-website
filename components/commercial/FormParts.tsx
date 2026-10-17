"use client";

import { forwardRef } from "react";
import { AlertCircle, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  COMMERCIAL_RULES,
  FIELD_NAMES,
  HONEYPOT_FIELD,
  type CommercialField,
  type CommercialFieldErrors,
} from "@/lib/commercial/validation";

/**
 * Piezas compartidas de los formularios de la Fase 4 (diagnóstico, consultoría,
 * cotización). Reutilizan las clases del sitio (`input-field`, chips con borde)
 * sin estilos nuevos.
 */

export const fieldId = (prefix: string, field: CommercialField) => `${prefix}-${FIELD_NAMES[field]}`;
/** Las listas de opciones enlazan su error con la primera opción (enfocable). */
export const optionId = (prefix: string, field: CommercialField, index: number) => `${fieldId(prefix, field)}-${index}`;

/** Aviso permanente: el formulario es un prototipo que no guarda ni envía. */
export function PrototypeNotice() {
  return (
    <p className="flex gap-3 border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm leading-relaxed text-slate-200">
      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" aria-hidden="true" />
      <span>
        <strong className="font-semibold text-white">Versión de prueba (solo en desarrollo).</strong> Este formulario
        revisa tus respuestas, pero no guarda ni envía nada a Evoltica.
      </span>
    </p>
  );
}

interface ErrorSummaryProps {
  prefix: string;
  message?: string;
  errors: CommercialFieldErrors;
  /** Orden visual de los campos del formulario: el resumen lo sigue. */
  order: CommercialField[];
  /** Primera opción de los campos de selección múltiple o única. */
  groupFields?: CommercialField[];
}

/** Resumen de errores al inicio: recibe el foco y enlaza cada campo. */
export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(function ErrorSummary(
  { prefix, message, errors, order, groupFields = [] },
  ref
) {
  const entries = order.filter((field) => errors[field]).map((field) => [field, errors[field]] as const);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className={cn("border border-red-500/30 bg-red-500/10 p-4 focus:outline-none", entries.length === 0 && "hidden")}
    >
      {entries.length > 0 && (
        <>
          <p className="flex items-center gap-2 text-sm font-semibold text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {message}
          </p>
          <ul className="mt-2 space-y-1 pl-6 text-sm text-red-300">
            {entries.map(([field, error]) => (
              <li key={field}>
                <a
                  href={`#${groupFields.includes(field) ? optionId(prefix, field, 0) : fieldId(prefix, field)}`}
                  className="underline underline-offset-4"
                >
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
});

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  ) : null;
}

function Optional() {
  return <span className="font-normal text-slate-500"> (opcional)</span>;
}

interface TextFieldProps {
  prefix: string;
  field: CommercialField;
  label: string;
  errors: CommercialFieldErrors;
  optional?: boolean;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function TextField({
  prefix,
  field,
  label,
  errors,
  optional,
  hint,
  multiline,
  rows = 4,
  maxLength,
  type = "text",
  autoComplete,
  placeholder,
  defaultValue,
  className,
}: TextFieldProps) {
  const id = fieldId(prefix, field);
  const error = errors[field];
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: FIELD_NAMES[field],
    maxLength,
    placeholder,
    defaultValue,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-required": !optional,
    "aria-describedby": describedBy,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {optional && <Optional />}
      </label>
      {multiline ? (
        <textarea rows={rows} className="input-field resize-y" {...common} />
      ) : (
        <input type={type} className="input-field" {...common} />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate-400">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

interface ChoiceGroupProps<T extends string> {
  prefix: string;
  field: CommercialField;
  legend: string;
  options: readonly T[];
  labels: Record<T, string>;
  errors: CommercialFieldErrors;
  /** checkbox = selección múltiple; radio = una sola. */
  type: "checkbox" | "radio";
  optional?: boolean;
  hint?: string;
  defaultValue?: T;
}

/** Opciones como chips (fieldset + legend), con el patrón visual de los filtros del catálogo. */
export function ChoiceGroup<T extends string>({
  prefix,
  field,
  legend,
  options,
  labels,
  errors,
  type,
  optional,
  hint,
  defaultValue,
}: ChoiceGroupProps<T>) {
  const id = fieldId(prefix, field);
  const error = errors[field];
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="mb-3 text-sm font-medium text-slate-300">
        {legend}
        {optional && <Optional />}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-3 text-xs leading-relaxed text-slate-400">
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <label key={option} className="relative inline-flex">
            <input
              id={optionId(prefix, field, index)}
              type={type}
              name={FIELD_NAMES[field]}
              value={option}
              defaultChecked={option === defaultValue}
              className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <span
              className={cn(
                "inline-flex min-h-[2.75rem] items-center border border-white/[0.14] px-3.5 py-2 text-sm text-slate-300 transition-colors",
                "peer-hover:border-white/40 peer-hover:text-white",
                "peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-medium peer-checked:text-white",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
              )}
            >
              {labels[option]}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

export const CONTACT_FIELDS: CommercialField[] = ["name", "company", "email", "phone"];

/** Nombre, empresa, correo y teléfono (opcional): el mínimo para responder. */
export function ContactFields({ prefix, errors }: { prefix: string; errors: CommercialFieldErrors }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <TextField
        prefix={prefix}
        field="name"
        label="Nombre"
        errors={errors}
        autoComplete="name"
        maxLength={COMMERCIAL_RULES.name.max}
      />
      <TextField
        prefix={prefix}
        field="company"
        label="Empresa"
        errors={errors}
        autoComplete="organization"
        maxLength={COMMERCIAL_RULES.company.max}
      />
      <TextField
        prefix={prefix}
        field="email"
        label="Correo de trabajo"
        type="email"
        errors={errors}
        autoComplete="email"
        placeholder="nombre@empresa.com"
        maxLength={COMMERCIAL_RULES.email.max}
      />
      <TextField
        prefix={prefix}
        field="phone"
        label="Teléfono / WhatsApp"
        type="tel"
        optional
        errors={errors}
        autoComplete="tel"
        placeholder="+57 300 000 0000"
        maxLength={20}
      />
    </div>
  );
}

/** Campo trampa: invisible para personas y tecnologías de asistencia. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        No llenar
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Nota fija sobre datos personales: no hay política publicada, así que no se pide autorización. */
export function DataNotice() {
  return (
    <p className="text-xs leading-relaxed text-slate-400">
      Solo pedimos los datos necesarios para responderte. Como esta versión no guarda ni envía nada, todavía no te pedimos
      autorización para tratar tus datos; se pedirá cuando el formulario se habilite.
    </p>
  );
}
