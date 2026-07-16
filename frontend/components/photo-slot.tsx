import Image from "next/image";

export function PhotoSlot({
  src,
  alt,
  path,
  className,
  sizes,
}: {
  src?: string;
  alt: string;
  path: string;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 border border-dashed border-border bg-surface p-4 text-center font-mono text-xs text-muted ${className ?? ""}`}
    >
      <span>Add photo at</span>
      <span className="text-accent">{path}</span>
    </div>
  );
}
