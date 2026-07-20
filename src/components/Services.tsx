"use client";

import { services } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { SectionHeading, Stagger, StaggerItem } from "./ui/primitives";

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            What I can <span className="text-gradient-accent">build</span> for you
          </>
        }
        description="End-to-end product engineering — from first wireframe to production scale."
      />

      <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {services.map((s, i) => (
          <StaggerItem key={s.title}>
            <div className="group glass relative h-full overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:bg-white/[0.06]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-5 top-5 font-display text-sm font-bold text-white/10">
                0{i + 1}
              </span>
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.03] text-cyan transition-all duration-300 group-hover:scale-110 group-hover:border-cyan/30">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-mist">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog">{s.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
