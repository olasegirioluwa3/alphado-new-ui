"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import type { AlphadoUserProfile } from "./types";

type BrandStep = "sources" | "ideology" | "analyzing" | "review";

interface AlphadoBrandTabProps {
  profile: AlphadoUserProfile;
}

export function AlphadoBrandTab({ profile }: AlphadoBrandTabProps) {
  const [step, setStep] = useState<BrandStep>("sources");
  const [links, setLinks] = useState<string[]>([""]);
  const [files, setFiles] = useState<string[]>([]);
  const [ideology, setIdeology] = useState("");
  const [approved, setApproved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const progressPercent =
    step === "sources"
      ? 33
      : step === "ideology"
      ? 66
      : step === "analyzing"
      ? 85
      : 100;

  const stepNumber =
    step === "sources" ? 1 : step === "ideology" ? 2 : 3;

  const handleLinkChange = (idx: number, val: string) => {
    setLinks((prev) => prev.map((item, i) => (i === idx ? val : item)));
  };

  const handleAddLink = () => {
    setLinks((prev) => [...prev, ""]);
  };

  const handleRemoveLink = (idx: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;
    const names = Array.from(selected).map((f) => f.name);
    setFiles((prev) => Array.from(new Set([...prev, ...names])));
  };

  const handleUnderstandBrand = () => {
    setStep("analyzing");
    setTimeout(() => {
      setStep("review");
    }, 1100);
  };

  const validLinks = links.map((l) => l.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header matching Milestone / Brand Intelligence reference */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Brand Intelligence</span>
          </div>
          <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Teach Alphado your brand
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Give Alphado your website, brand documents, and ideas. It will
            research what{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {profile.businessName}
            </span>{" "}
            stands for, explain what it understands, and wait for your approval
            before saving it as brand memory.
          </p>
        </div>

        {/* Approval Status Badge */}
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-3.5 py-1.5 text-xs font-bold ${
            approved
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300"
          }`}
        >
          {approved ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Brand memory approved</span>
            </>
          ) : (
            <span>Not yet approved</span>
          )}
        </span>
      </div>

      {/* Progressive Onboarding Stepper Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
          <span>
            Step {stepNumber} of 3 —{" "}
            {step === "sources"
              ? "Source Material"
              : step === "ideology"
              ? "Brand Ideology & Voice"
              : "Review & Approve Memory"}
          </span>
          <span className="text-sky-600 dark:text-sky-400">
            {progressPercent}%
          </span>
        </div>
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 via-violet-500 to-pink-500"
          />
        </div>
      </div>

      {/* Onboarding Step Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <AnimatePresence mode="wait">
          {/* STEP 1: SOURCE MATERIAL (Links + Brand Documents) */}
          {step === "sources" && (
            <motion.div
              key="brand-sources"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  1. Give Alphado your source material
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Start with your website and social/about pages. Add more than
                  one link to help Alphado understand the full picture.
                </p>
              </div>

              {/* Website / Social Links */}
              <div className="space-y-2.5">
                {links.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => handleLinkChange(idx, e.target.value)}
                        placeholder={
                          idx === 0
                            ? "https://yourbrand.com/about"
                            : "https://instagram.com/yourbrand"
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                      />
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        aria-label="Remove link"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:text-rose-500 dark:border-slate-700 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddLink}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add another link</span>
                </button>
              </div>

              {/* Add Brand Documents Dropzone */}
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Add brand documents
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Text, Markdown, CSV, and HTML files (brand guides,
                        FAQs, scripts)
                      </p>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".txt,.md,.csv,.html,.pdf,.docx"
                    onChange={handleFilePick}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-bold text-sky-600 hover:bg-sky-50 dark:border-sky-500/30 dark:bg-slate-900 dark:text-sky-400 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Choose files</span>
                  </button>
                </div>

                {files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {files.map((fname) => (
                      <span
                        key={fname}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
                      >
                        <FileText className="h-3 w-3 text-sky-500" />
                        <span>{fname}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFiles((prev) => prev.filter((f) => f !== fname))
                          }
                          className="text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep("ideology")}
                  className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold cursor-pointer"
                >
                  <span>Next: Ideology &amp; Voice</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EXPLANATION, IDEOLOGY AND DIRECTION */}
          {step === "ideology" && (
            <motion.div
              key="brand-ideology"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  2. Your own explanation, ideology and direction
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Tell Alphado what your brand believes, why it exists, who it
                  serves, what it refuses to do, and how it should sound on
                  calls and DMs.
                </p>
              </div>

              <div>
                <textarea
                  rows={7}
                  maxLength={30000}
                  value={ideology}
                  onChange={(e) => setIdeology(e.target.value)}
                  placeholder="Tell Alphado what your brand believes, why it exists, who it serves, what it refuses to do, how it should sound, and any context that may not be on your website..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Supports up to 30,000 characters of brand context</span>
                  <span>{ideology.length.toLocaleString()} / 30,000</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("sources")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleUnderstandBrand}
                  className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Understand my brand →</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ANALYZING TRANSITION */}
          {step === "analyzing" && (
            <motion.div
              key="brand-analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold text-slate-950 dark:text-white">
                Researching {profile.businessName}...
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Synthesizing your links, documents, and voice direction into
                brand memory.
              </p>
            </motion.div>
          )}

          {/* STEP 3: REVIEW & APPROVE BRAND MEMORY */}
          {step === "review" && (
            <motion.div
              key="brand-review"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  3. Confirm what Alphado understood
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Review this summary before Alphado uses it for customer phone
                  calls, Instagram content, and DM replies.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-sky-200/80 bg-sky-50/50 p-5 dark:border-sky-500/25 dark:bg-sky-950/25">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    Brand Identity
                  </p>
                  <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    <strong>{profile.businessName}</strong> communicates with a
                    warm, confident, and helpful tone across outbound voice
                    calls and 24/7 Instagram interactions.
                  </p>
                </div>

                {ideology.trim() && (
                  <div className="border-t border-sky-200/60 pt-3 dark:border-sky-500/20">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                      Core Direction Captured
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {ideology.trim().slice(0, 280)}
                      {ideology.trim().length > 280 ? "..." : ""}
                    </p>
                  </div>
                )}

                <div className="border-t border-sky-200/60 pt-3 dark:border-sky-500/20 flex flex-wrap gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Sources indexed: {validLinks.length || 1} link(s)</span>
                  <span>•</span>
                  <span>Documents: {files.length} file(s)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setApproved(false);
                    setStep("ideology");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Edit Direction</span>
                </button>

                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold cursor-pointer transition-all ${
                    approved
                      ? "bg-emerald-600 text-white"
                      : "btn-brand"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {approved
                      ? "Approved & Saved to Brand Memory"
                      : "Approve Brand Memory"}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
