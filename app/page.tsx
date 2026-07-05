import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { Technologies } from "@/components/sections/Technologies";
import { OurApproach } from "@/components/sections/OurApproach";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { HashScrollOnMount } from "@/components/layout/HashScrollOnMount";

export default function Home() {
  return (
    <>
      <HashScrollOnMount />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Process />
      <Technologies />
      <OurApproach />
      <Trust />
      <FAQ />
      <Contact />
    </>
  );
}
