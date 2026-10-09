import { cn } from "@/lib/utils";

export interface KeyValue {
  label: string;
  value: React.ReactNode;
}

/** Pares etiqueta/valor como lista de definición. */
export function KeyValueList({ items, className }: { items: KeyValue[]; className?: string }) {
  return (
    <dl className={cn("divide-y divide-white/[0.06]", className)}>
      {items.map((item) => (
        <div key={item.label} className="grid gap-1 py-3 sm:grid-cols-[minmax(6rem,12rem)_minmax(0,1fr)] sm:gap-4">
          <dt className="text-sm text-slate-400">{item.label}</dt>
          <dd className="min-w-0 break-words text-sm text-white">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
