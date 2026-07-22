import { experience } from "@/data/experience";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const [current, ...past] = experience;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="02" title="Experience" />
      </Reveal>
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-lg border border-accent/40 bg-surface p-6 sm:flex-row sm:p-8">
            <PhotoSlot
              src={current.photo}
              alt={current.organization}
              path={`frontend/public${current.photo ?? "/images/<file>.jpg"}`}
              sizes="200px"
              fit="contain"
              className="aspect-square w-full shrink-0 rounded-lg sm:w-48"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {current.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                    Current
                  </span>
                </div>
                <span className="font-mono text-xs text-accent">
                  {current.date}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {current.organization} · {current.location}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {current.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {current.stack && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {past.map((role, i) => (
          <Reveal key={role.organization} delay={(i + 1) * 0.05}>
            <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:p-8">
              <PhotoSlot
                src={role.photo}
                alt={role.organization}
                path={`frontend/public${role.photo ?? "/images/<file>.jpg"}`}
                sizes="200px"
                fit="contain"
                className="aspect-square w-full shrink-0 rounded-lg sm:w-48"
              />
              <div className="flex-1">
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
                {role.stack && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
