"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className, size = 34, showWordmark = true }: LogoProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={cn("flex items-center gap-2.5 group shrink-0", className)}
      aria-label="EVOLTICA SOLUTIONS — Inicio"
    >
      <span className="relative shrink-0 block" style={{ width: size, height: size }}>
        <Image
          src="/brand/logo.png"
          alt="EVOLTICA SOLUTIONS"
          fill
          sizes={`${size}px`}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </span>
      {showWordmark && (
        <span className="text-lg font-bold tracking-tight leading-none">
          <span className="text-white">EVOLTICA</span>
          <span className="text-secondary-400 font-light"> SOLUTIONS</span>
        </span>
      )}
    </Link>
  );
}
