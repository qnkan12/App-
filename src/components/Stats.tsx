"use client";

import { stats } from "@/lib/data";
import { Counter, Reveal, SectionHeading } from "./ui/primitives";

export function Stats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,140,255,0.12),transparent_60%)]" />
          <div className="relative grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-haze">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
