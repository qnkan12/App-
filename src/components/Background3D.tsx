"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => null,
});

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function Background3D() {
  const [mounted, setMounted] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setQuality(mobile ? "low" : "high");
    setShow3D(!prefersReducedMotion());
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient field */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(91,140,255,0.16),transparent_55%)]" />
      <div className="absolute left-[-8%] top-[18%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(163,113,255,0.16),transparent_62%)] blur-2xl animate-aurora" />
      <div className="absolute right-[-6%] top-[8%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(45,212,255,0.14),transparent_62%)] blur-2xl animate-aurora [animation-delay:-6s]" />

      {/* WebGL canvas */}
      {mounted && show3D && (
        <CanvasBoundary>
          <Scene quality={quality} />
        </CanvasBoundary>
      )}

      {/* Grid overlay with radial mask */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      {/* Top + bottom vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
