"use client";

import { useId, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { ATTACHMENT_LIMITS } from "@/lib/domain";
import { formatBytes } from "@/lib/portal/format";
import { validateAttachments, type AttachmentInput } from "@/lib/portal/ticket-validation";

/**
 * Selector de adjuntos. Valida tipo, tamaño y cantidad en el navegador y envía
 * al servidor SOLO los metadatos (campo oculto `adjuntos`), que el servidor
 * vuelve a validar. El contenido no se sube todavía: el almacenamiento de
 * archivos está pendiente (AttachmentStorage, ADR-013).
 */
export function AttachmentPicker({ serverError }: { serverError?: string }) {
  const inputId = useId();
  const [files, setFiles] = useState<AttachmentInput[]>([]);
  const [error, setError] = useState<string>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []).map((file) => ({
      name: file.name,
      mimeType: file.type,
      size: file.size,
    }));
    const next = [...files, ...picked];
    const problem = validateAttachments(next);
    setError(problem);
    if (!problem) setFiles(next);
    event.target.value = "";
  };

  const message = error ?? serverError;

  return (
    <div>
      <input type="hidden" name="adjuntos" value={JSON.stringify(files)} />
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/[0.18] px-4 py-5 text-sm text-slate-300 transition-colors hover:border-primary/60 focus-within:border-primary"
      >
        <Paperclip className="h-4 w-4" aria-hidden="true" />
        Adjuntar archivos
        <input
          id={inputId}
          type="file"
          multiple
          accept={ATTACHMENT_LIMITS.mimeTypes.join(",")}
          onChange={onChange}
          className="sr-only"
          aria-describedby={`${inputId}-help${message ? ` ${inputId}-error` : ""}`}
        />
      </label>
      <p id={`${inputId}-help`} className="mt-2 text-xs text-slate-500">
        Hasta {ATTACHMENT_LIMITS.maxFiles} archivos de {ATTACHMENT_LIMITS.maxBytes / (1024 * 1024)} MB: imágenes, PDF, TXT o CSV.
        Por ahora se validan pero no se suben: el almacenamiento de archivos está pendiente.
      </p>
      {message && (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm font-medium text-white">
          {message}
        </p>
      )}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-md border border-white/[0.08] px-3 py-2 text-sm"
            >
              <span className="min-w-0 truncate text-white">{file.name}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                {formatBytes(file.size)}
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Quitar {file.name}</span>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
