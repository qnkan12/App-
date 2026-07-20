"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Magnetic } from "./ui/primitives";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 260 && !menuOpen);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const ids = ["home", ...navLinks.map((l) => l.href.slice(1))];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openCmd = () => window.dispatchEvent(new Event("cmdk:open"));

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative grid h-9 w-9 place-items-center">
              <span className="absolute inset-0 rounded-xl border border-cyan/40 bg-gradient-to-br from-cyan/20 to-violet/20" />
              <span className="absolute inset-0 rounded-xl border border-white/5 animate-spin-slow" style={{ borderStyle: "dashed" }} />
              <span className="relative font-display text-sm font-bold text-mist">{profile.initials}</span>
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-mist sm:block">
              {profile.firstName}
              <span className="text-cyan">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? "text-mist" : "text-fog hover:text-mist"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCmd}
              aria-label="Search"
              className="hidden h-9 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 text-xs text-fog transition-colors hover:bg-white/[0.07] hover:text-mist xl:inline-flex"
            >
              <Icon name="search" className="h-3.5 w-3.5" />
              <kbd className="rounded border border-line bg-white/5 px-1.5 py-0.5 font-sans text-[10px] text-haze">
                ⌘K
              </kbd>
            </button>

            <Magnetic as="a" className="hidden sm:block">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-mist px-4 py-2 text-sm font-semibold text-void transition-transform"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-violet opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                <span className="relative">Hire Me</span>
                <Icon name="arrowupright" className="relative h-4 w-4" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.03] text-mist lg:hidden"
            >
              <Icon name={menuOpen ? "x" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="glass-panel absolute inset-x-3 top-20 rounded-3xl p-4"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="flex items-center justify-between border-b border-line/60 px-3 py-4 text-lg font-medium text-mist last:border-0"
                  >
                    {link.label}
                    <Icon name="arrowright" className="h-4 w-4 text-haze" />
                  </motion.a>
                ))}
              </div>
              <button
                onClick={openCmd}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.03] py-3 text-sm text-fog"
              >
                <Icon name="search" className="h-4 w-4" /> Search the site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
