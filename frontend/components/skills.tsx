import { skills } from "@/data/skills";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="04" title="Skills" />
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="font-mono text-sm text-accent">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border px-2 py-1 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
