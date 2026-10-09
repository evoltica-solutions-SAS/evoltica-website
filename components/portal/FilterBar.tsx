import Link from "next/link";
import { Search } from "lucide-react";

export interface FilterSelect {
  name: string;
  label: string;
  value?: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  /** Ruta de la propia página: los filtros viajan en la URL (?estado=…). */
  action: string;
  selects: FilterSelect[];
  search?: { name: string; label: string; value?: string; placeholder?: string };
  /** Hay algún filtro aplicado: muestra "Limpiar". */
  active: boolean;
}

const fieldClass =
  "h-10 w-full rounded-md border border-white/[0.12] bg-background px-3 text-sm text-white focus:border-primary focus:outline-none";

/**
 * Filtros por formulario GET: funcionan sin JavaScript, se pueden compartir por
 * URL y el servidor los aplica al consultar el repositorio.
 */
export function FilterBar({ action, selects, search, active }: FilterBarProps) {
  return (
    <form
      method="get"
      action={action}
      role="search"
      className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:flex-wrap sm:items-end"
    >
      {search && (
        <div className="sm:min-w-[14rem] sm:flex-1">
          <label htmlFor={`f-${search.name}`} className="mb-1.5 block text-xs text-slate-400">
            {search.label}
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              id={`f-${search.name}`}
              name={search.name}
              type="search"
              defaultValue={search.value}
              placeholder={search.placeholder}
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>
      )}
      {selects.map((select) => (
        <div key={select.name} className="sm:w-48">
          <label htmlFor={`f-${select.name}`} className="mb-1.5 block text-xs text-slate-400">
            {select.label}
          </label>
          <select id={`f-${select.name}`} name={select.name} defaultValue={select.value ?? ""} className={fieldClass}>
            <option value="">Todos</option>
            {select.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex gap-2">
        <button type="submit" className="btn-secondary h-10 !py-0">
          Filtrar
        </button>
        {active && (
          <Link href={action} className="inline-flex h-10 items-center px-3 text-sm text-slate-400 hover:text-white">
            Limpiar
          </Link>
        )}
      </div>
    </form>
  );
}
