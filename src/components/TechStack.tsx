"use client";

import { techStack } from "@/lib/data";
import { Marquee, Reveal, SectionHeading } from "./ui/primitives";

export function TechStack() {
  const half = Math.ceil(techStack.length / 2);
  const rowA = techStack.slice(0, half);
  const rowB = techStack.slice(half);

  const Pill = ({ name }: { name: string }) => (
    <div className="group/item flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-fog transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.05] hover:text-mist hover:shadow-[0_0_24px_-6px_rgba(45,212,255,0.4)]">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan to-violet transition-transform duration-300 group-hover/item:scale-150" />
      {name}
    </div>
  );

  return (
    <section className="relative py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px_rgba(45,212,255,0.7)]" />
          Tech Stack
        </span>
      </Reveal>

      <div className="mask-fade-x flex flex-col gap-4">
        <Marquee>
          {rowA.map((t) => (
            <Pill key={t} name={t} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowB.map((t) => (
            <Pill key={t} name={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
