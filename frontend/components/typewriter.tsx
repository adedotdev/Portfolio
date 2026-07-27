"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function Typewriter({
  text,
  className,
  speed = 35,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(shouldReduceMotion ? text : "");

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion, text, speed]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">
        {displayed}
        {displayed.length < text.length && (
          <span className="animate-pulse">▍</span>
        )}
      </span>
    </span>
  );
}
