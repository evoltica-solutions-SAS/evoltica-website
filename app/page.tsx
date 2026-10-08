import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PlatformsStrip } from "@/components/sections/PlatformsStrip";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { Differentiators } from "@/components/sections/Differentiators";
import { EngagementTimeline } from "@/components/sections/EngagementTimeline";
import { Capabilities } from "@/components/sections/Capabilities";
import { Commitments } from "@/components/sections/Commitments";
import { CasesPreview } from "@/components/sections/CasesPreview";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformsStrip />
      <Manifesto />
      <ServicesIndex />
      <Differentiators />
      <EngagementTimeline />
      <Capabilities />
      <Commitments />
      <CasesPreview />
      <FaqSection />
      <ContactSection />
    </>
  );
}
