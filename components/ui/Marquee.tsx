import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  label: string;
  className?: string;
}

/**
 * Cinta infinita en CSS puro (arquetipo 3: loop decorativo). La copia
 * duplicada es aria-hidden; con reduced-motion la animación se detiene.
 */
export function Marquee({ items, label, className }: MarqueeProps) {
  const renderRow = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap pr-10 font-mono text-sm uppercase tracking-[0.18em] text-slate-400 sm:gap-14 sm:pr-14 sm:text-base"
        >
          {item}
          <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("mask-fade-x overflow-hidden", className)} role="region" aria-label={label}>
      <div className="flex w-max animate-marquee pause-on-hover">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
