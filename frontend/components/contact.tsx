import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading index="06" title="Contact" />
      </Reveal>
      <Reveal delay={0.05}>
        <div className="rounded-lg border border-border bg-surface p-8">
          <p className="max-w-lg leading-relaxed text-muted">
            I&apos;m always open to talking about new opportunities,
            collaborations, or just software in general. The fastest way to
            reach me is email.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md bg-accent px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              {profile.email}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
