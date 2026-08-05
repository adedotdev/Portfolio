import { TbStar } from "react-icons/tb";
import { projects } from "@/data/projects";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type RepoStats = { stars: number; updatedAt: string };

function parseGithubUrl(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

async function getRepoStats(githubUrl: string): Promise<RepoStats | null> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/github/repos/${parsed.owner}/${parsed.repo}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return { stars: data.stars, updatedAt: data.updatedAt };
  } catch {
    return null;
  }
}

export async function Projects() {
  const projectsWithStats = await Promise.all(
    projects.map(async (project) => ({
      project,
      stats: project.githubUrl ? await getRepoStats(project.githubUrl) : null,
    }))
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="03" title="Projects" />
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2">
        {projectsWithStats.map(({ project, stats }, i) => (
          <Reveal key={project.title} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-lg border border-border p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif text-lg text-foreground">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {project.date}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {project.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="shrink-0 text-accent">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-muted">
                {project.stack.join(" · ")}
              </p>
              {(project.githubUrl || project.liveUrl || stats) && (
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Live
                    </a>
                  )}
                  {stats && (
                    <span className="ml-auto inline-flex items-center gap-3 text-muted">
                      <span className="inline-flex items-center gap-1">
                        <TbStar className="size-3.5 text-accent" />
                        {stats.stars}
                      </span>
                      <span>
                        Updated{" "}
                        {new Date(stats.updatedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
