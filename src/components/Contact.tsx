"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profile, socials } from "@/lib/data";
import { BrandIcon, Icon } from "./ui/Icon";
import { Magnetic, Reveal, SectionHeading } from "./ui/primitives";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Tell me a bit more (10+ characters)"),
});
type FormData = z.infer<typeof schema>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-fog">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-cyan">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-mist placeholder:text-haze transition-colors focus:border-cyan/50 focus:bg-white/[0.05] focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient-accent">remarkable</span>
          </>
        }
        description="Have a project in mind? Tell me about it — I usually reply within a day."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: info + map */}
        <Reveal className="flex flex-col gap-5">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold text-mist">Get in touch</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog">
              {profile.bioShort} Currently {profile.availability.toLowerCase()}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-cyan">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-haze">Email</div>
                <div className="text-sm font-medium text-mist">{profile.email}</div>
              </div>
            </a>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-cyan">
                <Icon name="map" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-haze">Location</div>
                <div className="text-sm font-medium text-mist">{profile.location}</div>
              </div>
            </div>
          </div>

          {/* Stylized map */}
          <div className="glass relative h-44 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,255,0.16),transparent_55%)]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-cyan" />
              </span>
            </div>
            <span className="absolute bottom-3 left-4 text-xs text-haze">{profile.location} · {profile.timezone}</span>
          </div>

          {/* socials */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex flex-col items-center gap-2 rounded-2xl p-4 text-fog transition-colors hover:text-mist"
                >
                  <BrandIcon name={s.icon} className="h-5 w-5" />
                  <span className="text-[11px]">{s.label}</span>
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-strong flex h-full flex-col rounded-3xl p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input className={inputCls} placeholder="Jane Doe" {...register("name")} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input className={inputCls} placeholder="jane@company.com" type="email" {...register("email")} />
              </Field>
            </div>
            <div className="mt-4 flex flex-1 flex-col">
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  className={`${inputCls} min-h-[150px] flex-1 resize-none`}
                  placeholder="Tell me about your project, goals, and timeline…"
                  {...register("message")}
                />
              </Field>
            </div>

            <Magnetic strength={0.25}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-mist px-6 py-3.5 text-sm font-semibold text-void transition-opacity disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan via-azure to-violet opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                <span className="relative">
                  {isSubmitting ? "Sending…" : "Send message"}
                </span>
                <Icon name="send" className="relative h-4 w-4" />
              </button>
            </Magnetic>

            {status !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-xl border p-3.5 text-sm ${
                  status === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-red-400/30 bg-red-400/10 text-red-300"
                }`}
              >
                {status === "success"
                  ? "Thanks! Your message has landed — I'll be in touch shortly."
                  : "Something went wrong. Please try again or email me directly."}
              </motion.div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
