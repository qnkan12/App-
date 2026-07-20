"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projectFilters, projects, type Project } from "@/lib/data";
import { BrandIcon, Icon } from "./ui/Icon";
import { Magnetic, Reveal, SectionHeading } from "./ui/primitives";

const accentText: Record<Project["accent"], string> = {
  cyan: "text-cyan",
  azure: "text-azure",
  violet: "text-violet",
};
const accentBg: Record<Project["accent"], string> = {
  cyan: "from-cyan/30",
  azure: "from-azure/30",
  violet: "from-violet/30",
};
const accentGlow: Record<Project["accent"], string> = {
  cyan: "group-hover:shadow-[0_0_50px_-12px_rgba(45,212,255,0.5)]",
  azure: "group-hover:shadow-[0_0_50px_-12px_rgba(91,140,255,0.5)]",
  violet: "group-hover:shadow-[0_0_50px_-12px_rgba(163,113,255,0.5)]",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div className={`glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 ${accentGlow[project.accent]}`}>
        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${accentBg[project.accent]} to-transparent`} />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

          {/* category badge */}
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-void/50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-mist backdrop-blur-md">
            {project.category}
          </span>

          {/* hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-void/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <Magnetic strength={0.4}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="inline-flex items-center gap-2 rounded-full bg-mist px-5 py-2.5 text-sm font-semibold text-void"
              >
                <Icon name="arrowupright" className="h-4 w-4" /> Live
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code of ${project.title}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-mist backdrop-blur-md"
              >
                <BrandIcon name="github" className="h-4 w-4" /> Code
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-mist">{project.title}</h3>
            <Icon name="arrowupright" className={`h-4 w-4 shrink-0 ${accentText[project.accent]}`} />
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-fog">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] text-haze"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            Projects that <span className="text-gradient-accent">ship</span>
          </>
        }
        description="A selection of products and platforms I've designed, built, and scaled."
      />

      {/* Filters */}
      <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
        {projectFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f ? "text-void" : "text-fog hover:text-mist"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 -z-10 rounded-full bg-mist"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </Reveal>

      {/* Grid */}
      <motion.div layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
