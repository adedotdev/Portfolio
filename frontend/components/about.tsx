import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="01" title="About Me" />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.05}>
          <div className="h-full rounded-lg border border-border bg-surface p-6 sm:p-8">
            {/* <p className="font-mono text-sm text-accent">$ cat about.md</p> */}
            <div className="mt-4 flex flex-col gap-4 leading-relaxed text-muted">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {profile.seeking && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                {profile.seeking}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative h-full rounded-lg border border-border bg-surface p-6 sm:p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 text-accent"
              fill="currentColor"
            >
              <circle cx="12" cy="9" r="6" />
              <path d="M11 14h2l-1 7z" />
            </svg>

            <div className="flex items-center gap-4">
              <PhotoSlot
                src={education.photo}
                alt={education.school}
                path="frontend/public/images/education.jpeg"
                sizes="64px"
                className="aspect-square w-16 shrink-0 rounded-full border border-border"
              />
              <h3 className="text-xl font-bold text-foreground">
                {education.school}
              </h3>
            </div>

            <p className="mt-4 font-semibold text-foreground">
              {education.degree}
            </p>

            {education.affiliations && (
              <div className="mt-4 flex flex-col gap-1.5">
                {education.affiliations.map((a) => (
                  <p key={a.organization} className="text-sm">
                    <span className="font-semibold text-foreground">
                      {a.organization}
                    </span>
                    <span className="text-muted"> · {a.role}</span>
                  </p>
                ))}
              </div>
            )}

            <div className="mt-6">
              <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                Relevant Coursework
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {education.coursework.join(" · ")}
              </p>
            </div>

            <p className="mt-6 font-mono text-xs text-muted">
              {education.date} · {education.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
