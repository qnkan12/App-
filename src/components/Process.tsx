"use client";

import { processSteps } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui/primitives";

export function Process() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            A process built for <span className="text-gradient-accent">momentum</span>
          </>
        }
        description="Clear, collaborative, and built to ship — without surprises."
      />

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.07}>
              <div className="group relative h-full">
                <div className="mb-5 flex items-center gap-3">
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-line bg-void font-display text-base font-bold text-mist transition-all duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
                    {step.step}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent lg:block" />
                  )}
                </div>
                <div className="glass h-[calc(100%-4rem)] rounded-2xl p-5 transition-colors duration-300 group-hover:bg-white/[0.06]">
                  <h3 className="font-display text-base font-semibold text-mist">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
