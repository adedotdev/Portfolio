"use client";

import { useEffect, useMemo, useRef } from "react";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const IDLE_DEG_PER_SEC = 45;
const DRAG_SENSITIVITY = 0.5;

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
  onDirectionChange,
}: {
  size?: number;
  count?: number;
  className?: string;
  onDirectionChange?: (direction: 1 | -1) => void;
}) {
  const radius = size / 2;
  const points = useMemo(() => generateSpherePoints(count), [count]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!draggingRef.current && !reduceMotion) {
        angleRef.current += IDLE_DEG_PER_SEC * directionRef.current * dt;
      }
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    angleRef.current += deltaX * DRAG_SENSITIVITY;

    if (Math.abs(deltaX) > 0.5) {
      const newDirection = deltaX > 0 ? 1 : -1;
      if (newDirection !== directionRef.current) {
        directionRef.current = newDirection;
        onDirectionChange?.(newDirection);
      }
    }
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  return (
    <div
      role="presentation"
      aria-label="Drag to spin"
      className={`mx-auto cursor-grab touch-none select-none active:cursor-grabbing ${className ?? ""}`}
      style={{ width: size, height: size, perspective: size * 3 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        ref={wrapperRef}
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {points.map((point, i) => {
          const depth = (point.z + 1) / 2; // 0 (far) -> 1 (near)
          const dotSize = (3 + depth * 4).toFixed(2);
          const opacity = (0.25 + depth * 0.75).toFixed(2);
          const x = (point.x * radius).toFixed(2);
          const y = (point.y * radius).toFixed(2);
          const z = (point.z * radius).toFixed(2);

          return (
            <span
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-accent"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
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
