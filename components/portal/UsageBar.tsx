/** Uso de un recurso (0–100 %). Accesible como `meter`. */
export function UsageBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-white">{clamped} %</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
      >
        <div
          className={clamped >= 85 ? "h-full bg-white" : "h-full bg-primary"}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
