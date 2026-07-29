import { profile } from "@/data/profile";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="06" title="Contact" />
      </Reveal>
      <div className="grid gap-10 sm:grid-cols-2 sm:divide-x sm:divide-border">
        <Reveal delay={0.05} className="flex h-full flex-col justify-between sm:pr-10">
          <p className="leading-relaxed text-muted">
            I look forward to networking with industry colleagues, 
            exploring new opportunities, and contributing to innovative projects. 
            Please feel free to reach out with any inquiries or ideas you may have.
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
        </Reveal>
        <Reveal delay={0.1} className="sm:pl-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
