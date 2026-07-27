import { skills } from "@/data/skills";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { skillIcons } from "./skill-icons";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <SectionHeading index="04" title="Skills" />
      </Reveal>
      <div className="flex flex-col">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05}>
            <div
              className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-baseline sm:gap-8 ${
                i < skills.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <h3 className="w-40 shrink-0 font-mono text-xs tracking-wider text-accent uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => {
                  const icons = skillIcons[item];
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 text-sm text-muted"
                    >
                      {icons?.map((Icon, idx) => (
                        <Icon key={idx} className="size-3.5 text-accent" />
                      ))}
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
