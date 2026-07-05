"use client";

import { useRouter, usePathname } from "next/navigation";

const SCROLL_OFFSET = 80;

export function scrollToHash(hash: string) {
  const element = document.querySelector(hash);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Navigates to an in-page anchor (e.g. "#servicios") from anywhere in the app.
 * Smooth-scrolls when already on the homepage; otherwise routes to "/" + hash
 * and lets HashScrollOnMount finish the scroll once the homepage renders.
 */
export function useSectionNav() {
  const router = useRouter();
  const pathname = usePathname();

  const goToSection = (hash: string) => {
    if (pathname === "/") {
      scrollToHash(hash);
    } else {
      router.push(`/${hash}`);
    }
  };

  return { goToSection, isHome: pathname === "/" };
}
