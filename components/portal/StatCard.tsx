import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  detail?: React.ReactNode;
  href: string;
  icon: LucideIcon;
}

/** Métrica del dashboard. Toda la tarjeta es un enlace a su sección. */
export function StatCard({ label, value, detail, href, icon: Icon }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-md border border-white/[0.08] bg-surface-alt p-5 transition-colors hover:border-primary/40"
    >
      <span className="flex items-center justify-between text-sm text-slate-400">
        {label}
        <Icon className="h-4 w-4 text-slate-500 transition-colors group-hover:text-primary-400" aria-hidden="true" />
      </span>
      <span className="mt-3 font-display text-4xl font-semibold leading-none text-white">{value}</span>
      {detail && <span className="mt-2 text-sm text-slate-400">{detail}</span>}
    </Link>
  );
}
