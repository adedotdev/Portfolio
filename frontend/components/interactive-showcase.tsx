"use client";

import { useState } from "react";
import { DotOrb } from "./dot-orb";
import { SkillsMarquee } from "./skills-marquee";

export function InteractiveShowcase() {
  const [direction, setDirection] = useState<1 | -1>(1);

  return (
    <>
      <SkillsMarquee direction={direction} />
      <div className="flex flex-col items-center gap-3 py-12">
        <DotOrb onDirectionChange={setDirection} />
        {/* <p className="font-mono text-xs text-muted">drag to spin</p> */}
      </div>
    </>
  );
}
