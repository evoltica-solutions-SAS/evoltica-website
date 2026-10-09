"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RevealLine {
  text: string;
  className?: string;
}

interface SplitRevealProps {
  lines: RevealLine[];
  as?: "h1" | "h2" | "h3" | "p";
  /** "words": palabra por palabra · "lines": línea por línea. */
  mode?: "words" | "lines";
  id?: string;
  className?: string;
  /** Retraso inicial (s) y separación entre piezas (s). */
  delay?: number;
  stagger?: number;
  /** Fracción visible antes de animar. */
  amount?: number;
}

const piece: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Titular que aparece mediante máscaras, por palabra o por línea, al entrar en
 * pantalla. Solo anima `transform` (compositor). Con reduced-motion,
 * MotionConfig omite la transformación y el texto aparece completo.
 * El texto sigue siendo texto real para lectores de pantalla y buscadores.
 */
export function SplitReveal({
  lines,
  as = "h2",
  mode = "words",
  id,
  className,
  delay = 0,
  stagger = mode === "words" ? 0.045 : 0.1,
  amount = 0.35,
}: SplitRevealProps) {
  const Tag = motion[as];

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cn("block", line.className)}>
          {mode === "lines" ? (
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span className="block" variants={piece}>
                {line.text}
              </motion.span>
            </span>
          ) : (
            line.text.split(" ").map((word, wordIndex, words) => (
              <span key={`${word}-${wordIndex}`}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span className="inline-block" variants={piece}>
                    {word}
                  </motion.span>
                </span>
                {wordIndex < words.length - 1 && " "}
              </span>
            ))
          )}
        </span>
      ))}
    </Tag>
  );
}
