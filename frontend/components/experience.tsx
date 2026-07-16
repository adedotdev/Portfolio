import { experience } from "@/data/experience";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading index="01" title="Experience" />
      </Reveal>
      <div className="flex flex-col gap-10">
        {experience.map((role, i) => (
          <Reveal key={role.organization} delay={i * 0.05}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {role.role}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {role.date}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {role.organization} · {role.location}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
