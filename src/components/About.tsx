"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutHighlights, profile } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem } from "./ui/primitives";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Engineer by trade,
            <br className="hidden sm:block" /> <span className="text-gradient-accent">craftsperson</span> at heart
          </>
        }
        description={profile.bioShort}
      />

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] gradient-border">
            <div className="absolute inset-0 bg-gradient-to-br from-azure/30 via-violet/20 to-cyan/30" />
            <Image
              src="/images/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(max-width: 768px) 80vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong absolute left-4 top-4 rounded-2xl px-3.5 py-2.5"
            >
              <div className="font-display text-2xl font-bold text-mist">
                <Counter value={8} suffix="+" />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-haze">Years exp.</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="glass-strong absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
            >
              <Icon name="map" className="h-4 w-4 text-cyan" />
              <span className="text-xs font-medium text-mist">{profile.location}</span>
            </motion.div>
          </div>
          {/* glow */}
          <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.18),transparent_70%)] blur-2xl" />
        </Reveal>

        {/* Bio + highlights */}
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-fog">{profile.bioLong}</p>
          </Reveal>

          <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
            {aboutHighlights.map((h) => (
              <StaggerItem key={h.title}>
                <div className="glass group h-full rounded-2xl p-5 transition-colors hover:bg-white/[0.06]">
                  <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-cyan transition-transform group-hover:scale-110">
                    <Icon name={h.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-mist">{h.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fog">{h.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-white/[0.07]"
              >
                <Icon name="mail" className="h-4 w-4 text-cyan" /> Let&apos;s work together
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fog transition-colors hover:text-mist"
              >
                Download CV <Icon name="arrowupright" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
