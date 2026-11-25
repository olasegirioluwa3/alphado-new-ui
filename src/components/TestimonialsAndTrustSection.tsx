"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Instagram,
  Cake,
  Globe,
  Megaphone,
  Sparkles,
} from "lucide-react";

function TwitterVerifiedBadge({
  className = "h-4 w-4 text-sky-500",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="Verified on X / Twitter"
      className={`shrink-0 ${className}`}
      fill="currentColor"
    >
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function XLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ReviewReel {
  id: string;
  name: string;
  handle: string;
  role: string;
  time: string;
  headline: string;
  metric: string;
  quote: string;
  icon: React.ComponentType<{ className?: string }>;
  background: string;
  borderColor: string;
}

const reviewReels: ReviewReel[] = [
  {
    id: "tolu",
    name: "Toluwanimi Adeyemi",
    handle: "@tolu_luxeskin",
    role: "Skincare Founder • Lagos",
    time: "3m ago",
    headline: "114 ORDERS FROM ONE SHEET.",
    metric: "600 calls • English & Pidgin",
    quote:
      "Uploaded 600 customer numbers and one short prompt. Alphado called everyone in English & Pidgin, closed 114 orders, and handed me clean call summaries to read over coffee.",
    icon: PhoneCall,
    background: "linear-gradient(165deg, #0ea5e9 0%, #2563eb 52%, #3730a3 100%)",
    borderColor: "rgba(125, 211, 252, 0.45)",
  },
  {
    id: "marcus",
    name: "Marcus Lee",
    handle: "@marcusurbangrill",
    role: "Restaurant Owner • London",
    time: "14m ago",
    headline: "BIRTHDAY CALLS = LOYAL FANS.",
    metric: "3.1x repeat diners",
    quote:
      "The birthday calling feature turned first-time diners into loyal regulars. Customers literally tag us on Instagram stories because Alphado called to wish them happy birthday!",
    icon: Cake,
    background: "linear-gradient(165deg, #f59e0b 0%, #ea580c 52%, #e11d48 100%)",
    borderColor: "rgba(253, 186, 116, 0.5)",
  },
  {
    id: "chioma",
    name: "Chioma Okafor",
    handle: "@chiomacreates",
    role: "Creative Director • Abuja",
    time: "38m ago",
    headline: "IG 24/7 + INSTANT DM CALLS.",
    metric: "Avg reply: 4 seconds",
    quote:
      "Our Instagram now posts 24/7, replies to every DM in seconds, and calls warm DM leads automatically. Feels like hiring a full growth team overnight.",
    icon: Instagram,
    background: "linear-gradient(165deg, #1e1b4b 0%, #312e81 52%, #0f172a 100%)",
    borderColor: "rgba(129, 140, 248, 0.4)",
  },
  {
    id: "elena",
    name: "Elena Rossi",
    handle: "@elenabrandstudio",
    role: "Boutique Owner • Milan",
    time: "1h ago",
    headline: "3 LANGUAGES, ZERO ACCENT LAG.",
    metric: "98% customer delight",
    quote:
      "Speaks Italian, French, and English like a real person on my team. I skim the 3-bullet call summaries every evening instead of stressing over missed calls.",
    icon: Globe,
    background: "linear-gradient(165deg, #7c3aed 0%, #9333ea 52%, #c026d3 100%)",
    borderColor: "rgba(216, 180, 254, 0.45)",
  },
  {
    id: "david",
    name: "David Mensah",
    handle: "@davidk_realty",
    role: "Real Estate Broker • Accra",
    time: "2h ago",
    headline: "2,400 LEADS. NO CAP.",
    metric: "63 viewings booked",
    quote:
      "No cap on calling lists is wild. We dialed 2,400 open-house leads from one Excel sheet and booked 63 property inspections in a single afternoon.",
    icon: Megaphone,
    background: "linear-gradient(165deg, #10b981 0%, #0d9488 52%, #0369a1 100%)",
    borderColor: "rgba(110, 231, 183, 0.45)",
  },
  {
    id: "sophie",
    name: "Sophie Adams",
    handle: "@sophiesolobrand",
    role: "Brand Founder • Toronto",
    time: "4h ago",
    headline: "+72% AUDIENCE ON AUTOPILOT.",
    metric: "Solo founder favorite",
    quote:
      "Zero learning curve. Drop your contact sheet, type your prompt, and watch Alphado bring in customers by voice and Instagram while you fulfill orders.",
    icon: Sparkles,
    background: "linear-gradient(165deg, #f43f5e 0%, #db2777 52%, #6d28d9 100%)",
    borderColor: "rgba(249, 168, 212, 0.45)",
  },
];

const privacyPillars = [
  {
    icon: Lock,
    title: "Encrypted by design",
    description:
      "Every contact sheet, call summary, and Instagram session is encrypted in transit and at rest.",
  },
  {
    icon: ShieldCheck,
    title: "Full data ownership",
    description:
      "Your receiver numbers and call summaries belong 100% to you. Export or delete anytime.",
  },
  {
    icon: CheckCircle2,
    title: "Safe, respectful outreach",
    description:
      "Quiet-hour controls, instant opt-out handling, and official Instagram publishing keep your brand trusted.",
  },
];

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function TestimonialsAndTrustSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = reviewReels.length;

  // Automatically swipes left every 2.8s; waits whenever cursor is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section id="reviews" className="py-20 sm:py-28 overflow-x-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Clean Reviews Heading (No instruction text) */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-800 shadow-xs dark:border-sky-500/30 dark:bg-slate-900 dark:text-sky-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <TwitterVerifiedBadge />
            <span>Verified Customer Reviews on X</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Less anxiety,{" "}
            <span className="text-brand-gradient">more business.</span>
          </h2>
        </div>
      </div>

      {/* 3D Curved Reels Carousel — Guaranteed Visible & Rock-Solid GPU Transforms */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mx-auto mt-10 w-full max-w-[1360px] px-4"
      >
        <div
          style={{
            position: "relative",
            height: "480px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {reviewReels.map((reel, idx) => {
            const offset = getWrappedOffset(idx, activeIndex, total);
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isVisible = absOffset <= 2;

            const tx =
              offset === 0
                ? 0
                : offset === -1
                ? -265
                : offset === 1
                ? 265
                : offset === -2
                ? -485
                : offset === 2
                ? 485
                : offset < 0
                ? -620
                : 620;

            const ry =
              offset === 0
                ? 0
                : offset === -1
                ? 20
                : offset === 1
                ? -20
                : offset === -2
                ? 38
                : offset === 2
                ? -38
                : offset < 0
                ? 48
                : -48;

            const scale =
              offset === 0 ? 1 : absOffset === 1 ? 0.9 : absOffset === 2 ? 0.78 : 0.65;

            const opacity =
              offset === 0 ? 1 : absOffset === 1 ? 0.94 : absOffset === 2 ? 0.72 : 0;

            const zIndex = offset === 0 ? 30 : absOffset === 1 ? 20 : absOffset === 2 ? 10 : 1;

            const Icon = reel.icon;

            return (
              <article
                key={reel.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "445px",
                  background: reel.background,
                  border: `1.5px solid ${reel.borderColor}`,
                  borderRadius: "28px",
                  padding: "22px",
                  color: "#ffffff",
                  zIndex,
                  opacity,
                  transform: `translateX(${tx}px) perspective(1200px) rotateY(${ry}deg) scale(${scale})`,
                  transition:
                    "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, box-shadow 0.35s ease",
                  boxShadow: isCenter
                    ? "0 28px 60px -15px rgba(15, 23, 42, 0.45)"
                    : "0 18px 36px -14px rgba(15, 23, 42, 0.32)",
                  pointerEvents: isVisible ? "auto" : "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  userSelect: "none",
                }}
              >
                <div>
                  {/* Top Reel Story Progress Bars */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {reviewReels.map((_, barIdx) => (
                      <div
                        key={barIdx}
                        style={{
                          height: "4px",
                          flex: 1,
                          borderRadius: "9999px",
                          backgroundColor: "rgba(255,255,255,0.28)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "9999px",
                            backgroundColor: "#ffffff",
                            width:
                              barIdx < activeIndex
                                ? "100%"
                                : barIdx === activeIndex
                                ? "100%"
                                : "0%",
                            opacity: barIdx <= activeIndex ? 1 : 0,
                            transition: "width 0.35s ease",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Verified Twitter / X Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        style={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          border: "1px solid rgba(255,255,255,0.35)",
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold text-white"
                      >
                        {reel.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="truncate text-sm font-bold text-white">
                            {reel.name}
                          </p>
                          <TwitterVerifiedBadge className="h-4 w-4 text-sky-200" />
                        </div>
                        <p className="truncate text-[11px] font-medium text-white/80">
                          {reel.handle} • {reel.time}
                        </p>
                      </div>
                    </div>
                    <XLogo className="h-4 w-4 text-white/85 shrink-0" />
                  </div>

                  {/* Metric Pill + Bold Headline */}
                  <div className="mt-4">
                    <span
                      style={{
                        backgroundColor: "rgba(255,255,255,0.18)",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{reel.metric}</span>
                    </span>
                    <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight leading-[1.1] text-white">
                      {reel.headline}
                    </h3>
                  </div>

                  {/* Quoted Review Box */}
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.24)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                    }}
                    className="mt-4 rounded-2xl p-3.5"
                  >
                    <Quote
                      aria-hidden="true"
                      className="h-4 w-4 text-white/80 mb-1"
                    />
                    <blockquote className="text-[13px] leading-relaxed font-medium text-white">
                      &ldquo;{reel.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{ borderTop: "1px solid rgba(255,255,255,0.22)" }}
                  className="mt-3 pt-3 flex items-center justify-between gap-2 text-[11px] font-semibold text-white/90"
                >
                  <span className="inline-flex items-center gap-1.5 truncate">
                    <TwitterVerifiedBadge className="h-3.5 w-3.5 text-sky-200" />
                    <span className="truncate">{reel.role}</span>
                  </span>
                  <span
                    style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    Verified X
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Minimal Controls (Arrows + Dots only) */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {reviewReels.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View review from ${r.name}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeIndex
                    ? "w-8 bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Privacy & Trust Strip */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
            With great powers comes great privacy.
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {privacyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                whileHover={{ y: -3 }}
                className="glass-panel rounded-3xl p-6 text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-slate-950 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
