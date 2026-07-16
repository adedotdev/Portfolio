import { profile } from "@/data/profile";
import { PhotoSlot } from "./photo-slot";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-4xl flex-col-reverse gap-10 px-6 pb-20 pt-24 sm:flex-row sm:items-center sm:pt-32"
    >
      <div className="flex flex-1 flex-col gap-6">
        <Reveal>
          <p className="font-mono text-sm text-accent">$ whoami</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg text-muted">{profile.tagline}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl leading-relaxed text-muted">{profile.bio}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-sm">
            <a
              href={profile.resumeUrl}
              download
              className="rounded-md bg-accent px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              Download Resume
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
      </div>
      <Reveal delay={0.1} className="shrink-0 self-center sm:self-auto">
        <PhotoSlot
          src={profile.photo}
          alt={profile.name}
          path="frontend/public/images/profile.jpeg"
          sizes="384px"
          className="aspect-square w-72 rounded-2xl border border-border sm:w-96"
        />
      </Reveal>
    </section>
  );
}
