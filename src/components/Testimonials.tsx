"use client";

import { testimonials, type Testimonial } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Marquee, Reveal, SectionHeading } from "./ui/primitives";

const accentGradient: Record<Testimonial["accent"], string> = {
  cyan: "from-cyan to-azure",
  azure: "from-azure to-violet",
  violet: "from-violet to-cyan",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass flex w-[330px] shrink-0 flex-col justify-between rounded-3xl p-6 transition-colors duration-300 hover:bg-white/[0.06] sm:w-[380px]">
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Icon key={i} name="star" className="h-4 w-4 fill-cyan text-cyan" />
        ))}
      </div>
      <blockquote className="text-[15px] leading-relaxed text-mist">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${accentGradient[t.accent]} font-display text-sm font-bold text-void`}
        >
          {initials(t.name)}
        </span>
        <div>
          <div className="text-sm font-semibold text-mist">{t.name}</div>
          <div className="text-xs text-haze">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Trusted by <span className="text-gradient-accent">founders</span> & teams
            </>
          }
          description="Kind words from people I've built with."
        />
      </div>
      <Reveal className="mask-fade-x mt-14 flex flex-col gap-5">
        <Marquee>
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee reverse>
          {[...testimonials].reverse().map((t) => (
            <Card key={t.name + "-r"} t={t} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
