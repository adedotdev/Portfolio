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
  const [featured, ...rest] = leadership;

  return (
    <section id="leadership" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="05" title="Leadership & Campus Involvement" />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col gap-6 rounded-lg border border-accent/40 bg-surface p-6 sm:flex-row sm:p-8">
          <PhotoSlot
            src={featured.photo}
            alt={featured.organization}
            path={`frontend/public/images/leadership/${slugify(featured.organization)}.jpeg`}
            sizes="320px"
            className="aspect-square w-full shrink-0 rounded-lg border border-border sm:w-80"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold text-foreground">
                {featured.organization}
              </h3>
              {featured.date && (
                <span className="font-mono text-xs text-accent">
                  {featured.date}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-sm text-accent">
              {featured.role}
            </p>
            {featured.bullets && (
              <ul className="mt-4 flex flex-col gap-2">
                {featured.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {rest.map((entry, i) => (
          <Reveal key={entry.organization} delay={i * 0.05}>
            <div className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <PhotoSlot
                  src={entry.photo}
                  alt={entry.organization}
                  path={`frontend/public/images/leadership/${slugify(entry.organization)}.jpeg`}
                  sizes="112px"
                  className="aspect-square w-28 shrink-0 rounded-md border border-border"
                />
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {entry.organization}
                  </h4>
                  <p className="font-mono text-xs text-accent">
                    {entry.role}
                  </p>
                </div>
              </div>
              {entry.bullets && (
                <ul className="flex flex-col gap-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {entry.link && (
                <a
                  href={entry.link.href}
                  className="mt-auto font-mono text-xs text-accent hover:underline"
                >
                  {entry.link.label} →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
