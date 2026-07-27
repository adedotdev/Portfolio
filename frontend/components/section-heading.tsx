export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
