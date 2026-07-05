"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function useCounter(
  end: number,
  duration: number = 2000,
  prefix: string = "",
  suffix: string = ""
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const startTime = Date.now();
      const startValue = 0;

      const easeOutQuad = (t: number) => t * (2 - t);

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(
          startValue + (end - startValue) * easedProgress
        );

        setCount(currentValue);

        if (progress >= 1) {
          setCount(end);
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration, hasStarted]);

  return { ref, count, display: `${prefix}${count}${suffix}` };
}
