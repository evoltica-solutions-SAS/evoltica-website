"use client";

import { useCounter } from "@/hooks/useCounter";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const { ref, count } = useCounter(value, 1600);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
