"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATEMENT =
  "No vendemos software primero. Entendemos cómo funciona tu negocio, lo resolvemos con la tecnología correcta y nos quedamos para sostener el resultado.";

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Declaración de marca que se "enciende" palabra por palabra con el scroll. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = STATEMENT.split(" ");

  return (
    <section className="section-padding relative" aria-labelledby="manifesto-title">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel>
              <span id="manifesto-title">Nuestra forma de trabajar</span>
            </SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <p ref={ref} className="text-display-md font-medium text-white">
              {prefersReducedMotion
                ? STATEMENT
                : words.map((word, index) => (
                    <Word
                      key={`${word}-${index}`}
                      word={word}
                      progress={scrollYProgress}
                      range={[index / words.length, (index + 1) / words.length]}
                    />
                  ))}
            </p>
            <div className="mt-12">
              <ButtonLink href="/nosotros" variant="arrow">
                Conoce a Evoltica
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
