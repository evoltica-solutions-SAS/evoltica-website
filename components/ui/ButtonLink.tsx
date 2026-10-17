import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "arrow";
  className?: string;
  /** Muestra la flecha al final (por defecto en primary y arrow). */
  withArrow?: boolean;
  external?: boolean;
}

const variantClass = {
  primary: "btn-primary group",
  secondary: "btn-secondary group",
  arrow: "link-arrow group",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  withArrow = variant !== "secondary",
  external = false,
}: ButtonLinkProps) {
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(variantClass[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(variantClass[variant], className)}>
      {content}
    </Link>
  );
}
