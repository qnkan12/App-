"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { SectionHeading, Stagger, StaggerItem, TiltCard } from "./ui/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Capabilities"
        title={
          <>
            A full-stack <span className="text-gradient-accent">toolkit</span>
          </>
        }
        description="From polished interfaces to distributed backends and AI — I work fluently across the entire stack."
      />

      <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {skillCategories.map((cat) => (
          <StaggerItem key={cat.title}>
            <TiltCard className="group h-full" intensity={6}>
              <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:bg-white/[0.06]">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.03] text-cyan">
                    <Icon name={cat.icon} className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl font-bold text-white/10 transition-colors group-hover:text-white/20">
                    {cat.level}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-mist">{cat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fog">{cat.blurb}</p>

                {/* progress */}
                <div className="mt-5">
                  <div className="mb-1.5 flex justify-between text-[11px] uppercase tracking-wider text-haze">
                    <span>Proficiency</span>
                    <span>{cat.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.level}%` }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan via-azure to-violet"
                    />
                  </div>
                </div>

                {/* tech pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cat.techs.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-xs text-fog transition-colors hover:border-cyan/40 hover:text-mist"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
