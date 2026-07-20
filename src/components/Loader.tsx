"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export function Loader() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLoading(false);
      return;
    }
    document.body.style.overflow = "hidden";
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(100, n + Math.random() * 15 + 7);
      setPct(Math.floor(n));
      if (n >= 100) clearInterval(iv);
    }, 130);
    const done = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1750);
    return () => {
      clearInterval(iv);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.12),transparent_60%)]" />
          <motion.div
            className="relative grid h-20 w-20 place-items-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-transparent"
              style={{ borderTopColor: "rgba(45,212,255,0.9)", borderRightColor: "rgba(163,113,255,0.4)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
            <span className="font-display text-2xl font-bold text-mist">{profile.initials}</span>
          </motion.div>
          <div className="mt-7 h-px w-44 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan via-azure to-violet"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="mt-3 font-mono text-xs tabular-nums text-haze">{pct}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
