const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function generateSpherePoints(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;

    return {
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    };
  });
}

export function DotOrb({
  size = 240,
  count = 160,
  className,
}: {
  size?: number;
  count?: number;
  className?: string;
}) {
  const radius = size / 2;
  const points = generateSpherePoints(count);

  return (
    <div
      className={`mx-auto ${className ?? ""}`}
      style={{ width: size, height: size, perspective: size * 3 }}
    >
      <div
        className="relative size-full animate-orb-rotate motion-reduce:animate-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {points.map((point, i) => {
          const depth = (point.z + 1) / 2; // 0 (far) -> 1 (near)
          const dotSize = 3 + depth * 4;
          const opacity = 0.25 + depth * 0.75;
          const x = (point.x * radius).toFixed(2);
          const y = (point.y * radius).toFixed(2);
          const z = (point.z * radius).toFixed(2);

          return (
            <span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 rounded-full bg-accent"
              style={{
                width: dotSize,
                height: dotSize,
                opacity,
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
