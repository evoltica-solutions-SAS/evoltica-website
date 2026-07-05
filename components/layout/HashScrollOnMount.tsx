"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/hooks/useSectionNav";

/**
 * Finishes cross-page anchor navigation: when a link from another route
 * (e.g. /servicios) lands on "/#servicios", this scrolls to that section
 * once the homepage has mounted.
 */
export function HashScrollOnMount() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return null;
}
