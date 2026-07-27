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
      <div className="grid gap-10 lg:grid-cols-2 lg:divide-x lg:divide-border">
        <Reveal delay={0.05} className="lg:pr-10">
          <div className="flex h-full flex-col gap-4 leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {profile.seeking && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {profile.seeking}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-10">
          <div className="flex items-center gap-4">
            <PhotoSlot
              src={education.photo}
              alt={education.school}
              path="frontend/public/images/education.jpeg"
              sizes="64px"
              className="aspect-square w-16 shrink-0 rounded-full border border-border"
            />
            <h3 className="font-serif text-xl text-foreground">
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
        </Reveal>
      </div>
    </section>
  );
}
