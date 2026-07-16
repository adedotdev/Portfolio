import { leadership } from "@/data/leadership";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading index="04" title="Leadership & Campus Involvement" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {leadership.map((entry, i) => (
          <Reveal key={entry.organization} delay={i * 0.05}>
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4">
              <span className="text-sm font-medium text-foreground">
                {entry.organization}
              </span>
              <span className="font-mono text-xs text-accent">
                {entry.role}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
