"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commandActions } from "@/lib/data";
import { Icon, BrandIcon } from "./ui/Icon";

function navigateTo(href: string) {
  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandActions;
    return commandActions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) {
        close();
        navigateTo(item.href);
      }
    }
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("cmdk:open", onOpen);
    return () => window.removeEventListener("cmdk:open", onOpen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-void/70 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-label="Command palette"
              className="glass-strong relative z-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Icon name="search" className="h-4 w-4 shrink-0 text-haze" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onListKey}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-4 text-sm text-mist placeholder:text-haze focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-line bg-white/5 px-1.5 py-0.5 font-sans text-[10px] text-haze sm:block">
                  ESC
                </kbd>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-haze">No results found.</p>
                ) : (
                  <ul>
                    {results.map((item, i) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          onClick={() => {
                            close();
                            navigateTo(item.href);
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            i === active ? "bg-white/[0.07] text-mist" : "text-fog hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03]">
                            {item.icon === "github" ? (
                              <BrandIcon name="github" className="h-4 w-4" />
                            ) : (
                              <Icon name={item.icon} className="h-4 w-4" />
                            )}
                          </span>
                          <span className="flex-1 text-sm font-medium">{item.label}</span>
                          <span className="text-xs text-haze">{item.hint}</span>
                          {i === active && <Icon name="corner" className="h-3.5 w-3.5 text-cyan" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-haze">
                <span className="flex items-center gap-1.5">
                  <Icon name="command" className="h-3 w-3" /> Adrian Voss · Portfolio
                </span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">↑↓ navigate</span>
                  <span className="flex items-center gap-1">↵ select</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
