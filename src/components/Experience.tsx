"use client";

import { timeline } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui/primitives";

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Career"
        title={
          <>
            The road <span className="text-gradient-accent">so far</span>
          </>
        }
        description="Eight years of building products, leading teams, and leveling up the craft."
      />

      <div className="relative mt-16">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-cyan/60 via-line to-transparent" />
        <div className="space-y-5">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.06}>
              <div className="relative pl-10">
                <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-cyan bg-void shadow-[0_0_14px_2px_rgba(45,212,255,0.45)]" />
                <span className="absolute left-[5px] top-[14px] h-px w-5 bg-line" />
                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:bg-white/[0.06]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-mist">{item.role}</h3>
                    <span className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-cyan">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-fog">{item.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-haze">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
