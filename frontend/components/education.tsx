import { education } from "@/data/education";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading index="05" title="Education" />
      </Reveal>
      <Reveal delay={0.05}>
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              {education.school}
            </h3>
            <span className="font-mono text-xs text-accent">
              {education.date}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {education.degree} · {education.location}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="rounded-md border border-border px-2 py-1 text-sm text-muted"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
