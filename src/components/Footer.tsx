"use client";

import { motion } from "framer-motion";
import { navLinks, profile, socials } from "@/lib/data";
import { BrandIcon, Icon } from "./ui/Icon";
import { Magnetic } from "./ui/primitives";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Big CTA */}
        <div className="flex flex-col items-center gap-6 pb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-[0.95] text-gradient"
          >
            Let&apos;s create the
            <br />
            <span className="text-gradient-accent">next big thing.</span>
          </motion.h2>
          <Magnetic as="a" strength={0.4}>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-mist px-8 py-4 text-sm font-semibold text-void"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan via-azure to-violet opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              <span className="relative">Start a project</span>
              <Icon name="arrowupright" className="relative h-4 w-4" />
            </a>
          </Magnetic>
        </div>

        {/* Links */}
        <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center">
                <span className="absolute inset-0 rounded-xl border border-cyan/40 bg-gradient-to-br from-cyan/20 to-violet/20" />
                <span className="relative font-display text-sm font-bold text-mist">{profile.initials}</span>
              </span>
              <span className="font-display text-base font-semibold text-mist">
                {profile.firstName}
                <span className="text-cyan">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
              {profile.role} crafting premium digital products from {profile.location}.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-haze">Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-fog transition-colors hover:text-cyan">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-haze">Connect</h4>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm text-fog transition-colors hover:text-cyan"
                  >
                    <BrandIcon name={s.icon} className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-haze">
            © {new Date().getFullYear()} {profile.name}. Crafted with care.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-haze">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> All systems operational
            </span>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-xs text-fog transition-colors hover:text-cyan"
            >
              Back to top <Icon name="arrowupright" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
