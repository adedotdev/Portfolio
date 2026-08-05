import { skills } from "@/data/skills";
import { skillIcons } from "./skill-icons";

export function SkillsMarquee({
  direction = 1,
}: {
  direction?: 1 | -1;
}) {
  const frameworks =
    skills.find((group) => group.category === "Frameworks/Libraries")
      ?.items ?? [];
  const items = [...frameworks, ...frameworks];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent sm:w-32" />
      <div
        className="flex w-max animate-marquee gap-10 motion-reduce:animate-none hover:[animation-play-state:paused]"
        style={{ animationDirection: direction === 1 ? "normal" : "reverse" }}
      >
        {items.map((item, i) => {
          const icons = skillIcons[item];
          return (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-muted"
            >
              {icons?.map((Icon, idx) => (
                <Icon key={idx} className="size-4 text-accent" />
              ))}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
