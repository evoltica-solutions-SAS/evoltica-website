import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  /** Alineación numérica (montos, fechas). */
  align?: "start" | "end";
}

interface DataTableProps<T> {
  /** Descripción de la tabla para lectores de pantalla. */
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Si existe, la primera columna enlaza al detalle. */
  rowHref?: (row: T) => string;
  /** Total del listado (para el pie "Mostrando X de Y"). */
  total?: number;
}

/**
 * Tabla responsive del portal: tabla semántica desde `md`, tarjetas apiladas en
 * móvil (mismos datos, sin scroll horizontal). La primera columna es el título
 * de la fila; si hay `rowHref`, es el enlace al detalle.
 */
export function DataTable<T>({ caption, columns, rows, rowKey, rowHref, total }: DataTableProps<T>) {
  const [first, ...rest] = columns;
  const primary = (row: T) =>
    rowHref ? (
      <Link href={rowHref(row)} className="font-medium text-white underline-offset-4 hover:text-primary-400 hover:underline">
        {first.cell(row)}
      </Link>
    ) : (
      <span className="font-medium text-white">{first.cell(row)}</span>
    );

  return (
    <div>
      <table className="hidden w-full text-left text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-slate-500">
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={cn("px-5 py-3 font-medium", column.align === "end" && "text-right", column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="transition-colors hover:bg-white/[0.02]">
              <th scope="row" className={cn("px-5 py-3.5 font-normal", first.className)}>
                {primary(row)}
              </th>
              {rest.map((column) => (
                <td
                  key={column.header}
                  className={cn(
                    "px-5 py-3.5 text-slate-300",
                    column.align === "end" && "text-right tabular-nums",
                    column.className,
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-white/[0.06] md:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={rowKey(row)} className="px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              {primary(row)}
              {rowHref && <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {rest.map((column) => (
                <div key={column.header} className="min-w-0">
                  <dt className="text-xs text-slate-500">{column.header}</dt>
                  <dd className="mt-0.5 text-slate-300">{column.cell(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {total !== undefined && (
        <p className="border-t border-white/[0.06] px-5 py-3 text-xs text-slate-500">
          Mostrando {rows.length} de {total}
        </p>
      )}
    </div>
  );
}
