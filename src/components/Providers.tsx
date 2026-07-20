"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";
import { Cursor } from "./Cursor";
import { CommandPalette } from "./CommandPalette";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-cyan via-azure to-violet"
      style={{ scaleX }}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
      window.__lenis = undefined;
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <CommandPalette />
      {children}
    </>
  );
}
