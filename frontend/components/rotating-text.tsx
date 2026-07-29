"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function RotatingText({
  words,
  className,
  typeSpeed = 45,
  deleteSpeed = 30,
  pauseMs = 1800,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState(
    shouldReduceMotion ? (words[0] ?? "") : ""
  );
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (shouldReduceMotion || words.length === 0) return;
    const target = words[wordIndex];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const timer = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          typeSpeed
        );
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(timer);
    }

    if (displayed.length > 0) {
      const timer = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        deleteSpeed
      );
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(timer);
  }, [
    displayed,
    phase,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    pauseMs,
    shouldReduceMotion,
  ]);

  return (
    <span className={className}>
      {displayed}
      <span aria-hidden className="animate-pulse">
        ▍
      </span>
    </span>
  );
}
