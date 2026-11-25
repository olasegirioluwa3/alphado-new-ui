"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PhoneCall, Headphones, Instagram } from "lucide-react";

interface FaqAndCtaSectionProps {
  onOpenDemo: (presetPrompt?: string) => void;
}

const faqs = [
  {
    q: "How does Alphado call everyone on my contact sheet with no cap?",
    a: "Upload your document (CSV, Excel, or text list) containing all receiver numbers and type a short prompt. Alphado calls every contact one-by-one seamlessly — 20 VIPs or 10,000 campaign leads — and delivers a crisp summary after each call.",
  },
  {
    q: "Does Alphado really speak professionally in any language?",
    a: "Yes. Alphado speaks 95+ languages and local dialects naturally — including English, Nigerian Pidgin, Yoruba, French, Spanish, Arabic, German, and more — matching your brand's friendly, professional tone.",
  },
  {
    q: "How do call summaries work?",
    a: "Right after each call ends, Alphado generates a concise summary card showing customer mood, key takeaways, orders, and next steps so you can review dozens of calls in minutes.",
  },
  {
    q: "How does Alphado run my Instagram 24/7 and call DM leads?",
    a: "Connect your Instagram once. Alphado posts daily around the clock, promotes your account to grow your audience, replies to customer DMs immediately, and places a live voice call whenever a DM lead wants to reach out.",
  },
  {
    q: "What kinds of calls can I prompt Alphado to make?",
    a: "Wish customers a happy birthday, run sales or event campaigns, deliver friendly brand gist or ads, confirm orders, or follow up with customers directly from your Instagram DMs.",
  },
];

export function FaqAndCtaSection({ onOpenDemo }: FaqAndCtaSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <>
      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Intro + 24/7 Human Mascot Support Card */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                  Skeptical?{" "}
                  <span className="text-brand-gradient">Good. Read this.</span>
                </h2>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Alphado handles the calls, summaries, and 24/7 Instagram growth —
                  you stay in complete control.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onOpenDemo()}
                  className="btn-brand mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Get Started</span>
                </motion.button>
              </div>

              <div className="glass-panel rounded-[28px] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-950 dark:to-indigo-950 border border-sky-200/80 dark:border-sky-500/30">
                    <img
                      src="/mascot-v2.png"
                      alt="Alphado 24/7 Support Mascot"
                      className="h-18 w-18 object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Headphones className="h-3.5 w-3.5" />
                      <span>Support available 24/7</span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-extrabold text-slate-950 dark:text-white">
                      Need help launching?
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      Friendly onboarding before &amp; after your first call wave.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Animated Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors dark:border-slate-800 dark:bg-slate-900"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-sm sm:text-base font-bold text-slate-950 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-sky-500" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer — All Navigation Lives at the Top */}
      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-500/30 overflow-hidden">
                <img
                  src="/mascot-v2.png"
                  alt="Alphado"
                  className="h-9 w-9 object-contain object-top pt-0.5"
                />
              </div>
              <div>
                <span className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  alphado
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  AI Voice Caller &amp; 24/7 Instagram Growth
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>© {new Date().getFullYear()} Alphado AI</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <Instagram className="h-3.5 w-3.5 text-pink-500" />
                <span>@alphado.ai</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
