import { Hero } from "@/components/hero";
import { SkillsMarquee } from "@/components/skills-marquee";
import { DotOrb } from "@/components/dot-orb";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Leadership } from "@/components/leadership";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      {/* Temporary standalone preview — placement (next to name vs. behind photo) TBD */}
      <div className="flex justify-center py-12">
        <DotOrb />
      </div>
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <Contact />
    </>
  );
}
