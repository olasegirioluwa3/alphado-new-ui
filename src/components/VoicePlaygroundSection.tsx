"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cake,
  Megaphone,
  Radio,
  Instagram,
  PhoneCall,
  FileText,
  Globe,
  Play,
  Sparkles,
} from "lucide-react";
import { RollingCounter } from "./RollingCounter";

interface VoicePlaygroundSectionProps {
  onOpenDemo: (presetPrompt?: string) => void;
}

const useCases = [
  {
    id: "birthday",
    title: "Wish a happy birthday",
    icon: Cake,
    badge: "VIP Loyalty",
    accent: "from-pink-500 to-rose-500",
    summary:
      "Surprise clients and VIPs with a warm, personal birthday voice call in their language — plus an automatic gift code follow-up.",
    prompt:
      "Wish every VIP customer on our birthday list a warm happy birthday and share their 20% gift code.",
  },
  {
    id: "campaign",
    title: "Call people for campaigns",
    icon: Megaphone,
    badge: "No Cap Dialing",
    accent: "from-sky-500 to-blue-600",
    summary:
      "Upload 50 or 50,000 phone numbers and launch product drops, flash sales, or event invites one-by-one without hiring a call center.",
    prompt:
      "Call every lead in our launch sheet to announce our weekend sale and reserve VIP slots.",
  },
  {
    id: "gist",
    title: "Call for gist or ads",
    icon: Radio,
    badge: "Natural & Friendly",
    accent: "from-amber-500 to-orange-500",
    summary:
      "Deliver lively, conversational brand updates, promos, and local-vibe gist calls that sound human, warm, and genuinely engaging.",
    prompt:
      "Give our regulars a fun 30-second gist call about today's special bundle with express delivery.",
  },
  {
    id: "dm",
    title: "Call Instagram DM leads",
    icon: Instagram,
    badge: "DM → Instant Call",
    accent: "from-violet-500 to-purple-600",
    summary:
      "When someone messages your Instagram DM wanting to reach out, Alphado replies instantly and calls them on your behalf to close the sale.",
    prompt:
      "Call every customer from Instagram DMs who asked for pricing and summarize their order details.",
  },
];

export function VoicePlaygroundSection({
  onOpenDemo,
}: VoicePlaygroundSectionProps) {
  const [liveCount, setLiveCount] = useState(14820);
  const [summarizedCount, setSummarizedCount] = useState(14794);
  const [activeWave, setActiveWave] = useState(true);

  // Realistic, organic counting pace: calls tick +1 every 3.5s–6.5s,
  // and summaries follow naturally 1.2s–2.4s later as each call wraps up.
  useEffect(() => {
    let cancelled = false;
    let callTimer: ReturnType<typeof setTimeout>;
    let summaryTimer: ReturnType<typeof setTimeout>;

    const scheduleNextCall = () => {
      const delay = 3500 + Math.floor(Math.random() * 3000);
      callTimer = setTimeout(() => {
        if (cancelled) return;
        setLiveCount((c) => c + 1);

        const summaryDelay = 1200 + Math.floor(Math.random() * 1200);
        summaryTimer = setTimeout(() => {
          if (cancelled) return;
          setSummarizedCount((s) => s + 1);
        }, summaryDelay);

        scheduleNextCall();
      }, delay);
    };

    scheduleNextCall();

    return () => {
      cancelled = true;
      clearTimeout(callTimer);
      clearTimeout(summaryTimer);
    };
  }, []);

  return (
    <section
      id="voice-demo"
      className="relative py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/30 dark:bg-slate-900 dark:text-sky-300">
            <PhoneCall className="h-3.5 w-3.5" />
            <span>AI Voice Assistant</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            One short prompt.{" "}
            <span className="text-brand-gradient">Unlimited human-like calls.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Alphado calls every number on your document professionally in any
            language — and writes a crisp summary of every call so you never miss a
            detail.
          </p>
        </motion.div>

        {/* Live Counting Voice Call Demo Bar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-10 gradient-border-card shadow-lg"
        >
          <div className="gradient-border-inner p-5 sm:p-7">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-100/90 dark:bg-sky-950 border border-sky-200 dark:border-sky-500/30">
                  <img
                    src="/mascot-v2.png"
                    alt="Alphado voice assistant"
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Voice Activity
                  </span>
                  <h3 className="mt-1 font-display text-lg font-extrabold text-slate-950 dark:text-white">
                    Dialing &amp; Summarizing Live
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time call &amp; recap counter
                  </p>
                </div>
              </div>

              {/* Rolling Live Counters */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Calls Today</span>
                  </div>
                  <p className="mt-1.5 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
                    <RollingCounter value={liveCount} />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Summaries Ready</span>
                  </div>
                  <p className="mt-1.5 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
                    <RollingCounter value={summarizedCount} />
                  </p>
                </div>
              </div>

              {/* Waveform + Launch Demo CTA */}
              <div className="lg:col-span-3 flex flex-col items-stretch sm:items-end gap-2.5">
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveWave((w) => !w)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <Globe className="h-3 w-3 text-sky-500" />
                    <span>{activeWave ? "Audio Active" : "Paused"}</span>
                  </button>
                  <div className="flex h-5 items-center gap-[3px]">
                    {[35, 85, 55, 100, 65, 90, 45].map((h, i) => (
                      <span
                        key={i}
                        className={`w-[3px] rounded-full bg-sky-500 ${
                          activeWave ? "wave-bar" : ""
                        }`}
                        style={{
                          height: activeWave ? `${h * 0.18}px` : "4px",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onOpenDemo()}
                  className="btn-brand inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Get Started</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Concise Use-Case Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: idx * 0.08,
                  type: "spring",
                  stiffness: 240,
                  damping: 22,
                }}
                whileHover={{ y: -5 }}
                className="group flex flex-col justify-between rounded-[26px] border border-slate-200 bg-white p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-extrabold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDemo(item.prompt)}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Use this prompt →</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
