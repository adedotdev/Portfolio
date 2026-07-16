import { leadership } from "@/data/leadership";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading index="04" title="Leadership & Campus Involvement" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {leadership.map((entry, i) => (
          <Reveal key={entry.organization} delay={i * 0.05}>
            <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
              <PhotoSlot
                src={entry.photo}
                alt={entry.organization}
                path={`frontend/public/images/leadership/${slugify(entry.organization)}.jpeg`}
                sizes="176px"
                className="aspect-square w-44 shrink-0 rounded-lg border border-border"
              />
              <div className="flex flex-1 items-center justify-between gap-4">
                <span className="text-sm font-medium text-foreground">
                  {entry.organization}
                </span>
                <span className="font-mono text-xs text-accent">
                  {entry.role}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
