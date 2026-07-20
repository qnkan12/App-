"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile, heroStats } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Magnetic } from "./ui/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

function Word({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        variants={{
          hidden: { y: "110%" },
          show: { y: 0, transition: { duration: 0.9, ease: EASE } },
        }}
        className={`inline-block ${accent ? "text-gradient-accent" : "text-gradient"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center px-4 pt-28 pb-20 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-fog"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          className="font-display text-[clamp(2.6rem,9vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block">
            <Word>Full</Word> <Word>Stack</Word>
          </span>
          <span className="block">
            <Word accent>Web</Word> <Word accent>&</Word> <Word accent>App</Word>{" "}
            <Word>Developer</Word>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-fog sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic as="a" strength={0.4}>
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-mist px-7 py-3.5 text-sm font-semibold text-void"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan via-azure to-violet opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              <span className="relative">View Projects</span>
              <Icon name="arrowupright" className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic as="a" strength={0.3}>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-mist transition-colors hover:bg-white/[0.08]"
            >
              Hire Me
              <Icon name="mail" className="h-4 w-4" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="mt-14 grid w-full max-w-lg grid-cols-3 gap-3"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
              <div className="font-display text-2xl font-bold text-mist sm:text-3xl">
                {s.value}
                <span className="text-cyan">{s.suffix}</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-haze">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-haze sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            animate={reduce ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-cyan"
          />
        </span>
      </motion.a>
    </section>
  );
}
