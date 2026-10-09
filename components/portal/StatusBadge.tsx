import { AlertTriangle } from "lucide-react";
import type { StatusMeta, StatusTone } from "@/lib/portal/labels";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<StatusTone, string> = {
  success: "border-primary/40 bg-primary/10 text-primary-400",
  progress: "border-secondary/40 bg-secondary/10 text-secondary-400",
  info: "border-accent/40 bg-accent/10 text-accent-400",
  attention: "border-white/50 bg-white/[0.08] font-semibold text-white",
  neutral: "border-white/[0.16] text-slate-300",
  muted: "border-white/[0.08] text-slate-500",
};

/** Estado del dominio como etiqueta. El texto siempre está presente: el color no es la única señal. */
export function StatusBadge({ status, className }: { status: StatusMeta; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full sm:whitespace-nowrap border px-2.5 py-0.5 text-xs font-medium",
        TONE_CLASS[status.tone],
        className,
      )}
    >
      {status.tone === "attention" && <AlertTriangle className="h-3 w-3" aria-hidden="true" />}
      {status.label}
    </span>
  );
}
