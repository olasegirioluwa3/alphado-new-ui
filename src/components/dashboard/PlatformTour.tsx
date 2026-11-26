"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";

export const PLATFORM_TOUR_STEPS = [
  {
    tab: "home",
    title: "Your business at a glance",
    description:
      "Start here each day. See performance, recent activity, and quick links to the work that matters most.",
  },
  {
    tab: "products",
    title: "Products & Ads",
    description:
      "Keep your catalog organized, publish products, and manage the campaigns that bring customers in.",
  },
  {
    tab: "alphado",
    title: "Teach Alphado your brand",
    description:
      "Share your voice, business details, and customer preferences so every call and reply feels like you.",
  },
  {
    tab: "content",
    title: "Create with Content Studio",
    description:
      "Plan on-brand posts, reels, and scripts in one place, then keep your publishing workflow moving.",
  },
  {
    tab: "calls",
    title: "Calls, chats & customer history",
    description:
      "Review conversations, call summaries, and follow-ups so no customer interaction gets missed.",
  },
  {
    tab: "settings",
    title: "Make Alphado yours",
    description:
      "Manage your profile, workspace, and preferences. You can revisit this tour any time from the header.",
  },
] as const;

export type TourTab = (typeof PLATFORM_TOUR_STEPS)[number]["tab"];

interface PlatformTourProps {
  stepIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function PlatformTour({
  stepIndex,
  onPrevious,
  onNext,
  onClose,
}: PlatformTourProps) {
  const step = PLATFORM_TOUR_STEPS[stepIndex];
  const isLastStep = stepIndex === PLATFORM_TOUR_STEPS.length - 1;

  if (!step) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 bg-slate-950/20 transition-opacity"
      />
      <aside
        aria-label="Alphado platform tour"
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[78vh] w-auto max-w-[440px] overflow-y-auto rounded-[28px] border border-slate-200/90 bg-white p-5 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.5)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[min(440px,calc(100vw-3rem))] sm:p-6 dark:border-slate-700 dark:bg-slate-950"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 dark:border-sky-500/30 dark:from-sky-950 dark:via-indigo-950 dark:to-slate-900">
              <img
                src="/mascot-v2.png"
                alt=""
                aria-hidden="true"
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                Alphado guide
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Essential tour · {String(stepIndex + 1).padStart(2, "0")} of {String(PLATFORM_TOUR_STEPS.length).padStart(2, "0")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close platform tour"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-label="Tour progress"
          aria-valuemin={1}
          aria-valuemax={PLATFORM_TOUR_STEPS.length}
          aria-valuenow={stepIndex + 1}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 transition-[width] duration-300"
            style={{ width: `${((stepIndex + 1) / PLATFORM_TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        <p className="mt-5 text-xs font-bold text-sky-700 dark:text-sky-300">
          {stepIndex === 0 ? "A quick welcome" : `Part ${stepIndex + 1}`}
        </p>
        <h2
          id="platform-tour-title"
          className="mt-1 font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-white"
          aria-live="polite"
        >
          {step.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {step.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-400 dark:hover:text-white"
          >
            Skip tour
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={stepIndex === 0}
              aria-label="Previous tour step"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={isLastStep ? "Finish tour" : "Next tour step"}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 px-5 text-xs font-extrabold text-white shadow-md shadow-indigo-500/20 transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              {isLastStep ? "Finish tour" : "Next"}
              {!isLastStep && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
