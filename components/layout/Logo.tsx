import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  priority?: boolean;
  /** Destino del enlace: el portal lleva a su propio inicio. */
  href?: string;
  /** Clases extra del texto "EVOLTICA SOLUTIONS" (p. ej. ocultarlo en un rango de anchos). */
  wordmarkClassName?: string;
}

/**
 * Única fuente autorizada del logo (public/brand/logo.png). El PNG original
 * tiene margen transparente superior; se encuadra con CSS sin alterar el archivo.
 */
export function Logo({ className, size = 36, showWordmark = true, priority = false, href = "/", wordmarkClassName }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
      aria-label="EVOLTICA SOLUTIONS — Inicio"
    >
      <span className="relative block shrink-0 overflow-hidden" style={{ width: size, height: size }}>
        <Image
          src="/brand/logo.png"
          alt=""
          fill
          sizes={`${Math.round(size * 1.4)}px`}
          className="origin-center -translate-y-[9%] scale-[1.32] object-contain transition-transform duration-500 group-hover:scale-[1.4]"
          priority={priority}
        />
      </span>
      {showWordmark && (
        <span className={cn("whitespace-nowrap text-[1.05rem] font-bold leading-none tracking-tight", wordmarkClassName)}>
          <span className="text-white">EVOLTICA</span>
          <span className="font-light text-secondary-400"> SOLUTIONS</span>
        </span>
      )}
    </Link>
  );
}
