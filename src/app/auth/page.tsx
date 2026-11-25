"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Instagram,
  Loader2,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type FlowStep = "email" | "verify" | "name" | "business" | "instagram" | "done";

const stepOrder: FlowStep[] = [
  "email",
  "verify",
  "name",
  "business",
  "instagram",
  "done",
];

function AlphadoLogoMark() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 dark:from-sky-950 dark:via-indigo-950 dark:to-slate-900 border border-sky-200/80 dark:border-sky-500/35 shadow-sm overflow-hidden">
        <img
          src="/mascot-v2.png"
          alt="Alphado"
          className="h-13 w-13 object-contain"
        />
      </div>
      <span className="mt-2 font-display text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
        alphado
      </span>
    </div>
  );
}

export default function AuthAndOnboardingPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [step, setStep] = useState<FlowStep>("email");

  // Step 1: Email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 2: 6-digit OTP Verification
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [resentNotice, setResentNotice] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 3: Name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Step 4: Business Name
  const [businessName, setBusinessName] = useState("");

  // Step 5: Connect Instagram
  const [igState, setIgState] = useState<"idle" | "connecting" | "connected">("idle");

  // Focus first OTP box when arriving at verify step
  useEffect(() => {
    if (step === "verify") {
      const t = setTimeout(() => otpRefs.current[0]?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [step]);

  const currentIdx = stepOrder.indexOf(step);
  // Progress bar across onboarding steps (shows on name / business / instagram / done, and subtly on verify)
  const onboardingProgress =
    step === "email"
      ? 15
      : step === "verify"
      ? 35
      : step === "name"
      ? 58
      : step === "business"
      ? 78
      : step === "instagram"
      ? igState === "connected"
        ? 100
        : 92
      : 100;

  const onboardingStepLabel =
    step === "name"
      ? "Step 1 of 3"
      : step === "business"
      ? "Step 2 of 3"
      : step === "instagram"
      ? "Step 3 of 3"
      : null;

  const handleBack = () => {
    if (currentIdx > 0) {
      setStep(stepOrder[currentIdx - 1]);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!cleaned || !cleaned.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setStep("verify");
  };

  const handleOtpChange = (index: number, rawVal: string) => {
    const digits = rawVal.replace(/\D/g, "");
    if (!digits) {
      const next = [...otp];
      next[index] = "";
      setOtp(next);
      return;
    }

    if (digits.length > 1) {
      const next = [...otp];
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        next[index + i] = digits[i];
      }
      setOtp(next);
      const focusIdx = Math.min(index + digits.length, 5);
      otpRefs.current[focusIdx]?.focus();
      return;
    }

    const next = [...otp];
    next[index] = digits[0];
    setOtp(next);
    if (index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((d) => d.length === 1);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete) return;
    setStep("name");
  };

  const handleResend = () => {
    setResentNotice(true);
    setTimeout(() => setResentNotice(false), 3000);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    setStep("business");
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    setStep("instagram");
  };

  const handleConnectInstagram = () => {
    if (igState !== "idle") return;
    setIgState("connecting");
    setTimeout(() => {
      setIgState("connected");
    }, 850);
  };

  const igHandle =
    "@" +
    (businessName.trim() || "yourbrand")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");

  return (
    <div className="relative min-h-screen bg-[var(--canvas)] text-[var(--ink)] flex flex-col">
      {/* Top Progress Bar (Visible smoothly across progression) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/70 dark:bg-slate-800/80">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-600 via-violet-500 to-pink-500"
          initial={{ width: "15%" }}
          animate={{ width: `${onboardingProgress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        />
      </div>

      {/* Top Bar: Back Circle Button (exact reference feel) + Theme Toggle */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 pt-7 sm:px-8">
        {step === "email" ? (
          <Link
            href="/"
            aria-label="Back to landing page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back to previous step"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-center gap-3">
          {onboardingStepLabel && (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {onboardingStepLabel}
            </span>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-indigo-600 dark:text-sky-300" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Centered Auth / Onboarding Stage */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: EMAIL LOGIN / SIGN UP */}
            {step === "email" && (
              <motion.div
                key="step-email"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <AlphadoLogoMark />

                <h1 className="mt-6 font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Log in or create an account
                </h1>

                <form onSubmit={handleEmailSubmit} className="mt-7 text-left">
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-950 placeholder:text-slate-400 shadow-2xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400"
                  />

                  {emailError && (
                    <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {emailError}
                    </p>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    You&apos;ll receive a one-time 6-digit verification code from
                    Alphado to confirm your account.{" "}
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      Learn more
                    </span>
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-brand mt-6 w-full rounded-full py-3.5 text-sm font-bold cursor-pointer"
                  >
                    Continue
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: 6-DIGIT VERIFICATION CODE */}
            {step === "verify" && (
              <motion.div
                key="step-verify"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <AlphadoLogoMark />

                <h1 className="mt-6 font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Enter your code to sign up
                </h1>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  To confirm your account, enter the 6-digit code we sent to{" "}
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {email}
                  </span>
                  .{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-semibold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
                  >
                    Resend code
                  </button>
                </p>

                {resentNotice && (
                  <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Fresh 6-digit code sent to your inbox!
                  </p>
                )}

                <form onSubmit={handleVerifySubmit} className="mt-7">
                  {/* 6 Individual Rounded OTP Input Boxes (exact reference feel) */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        aria-label={`Verification digit ${i + 1}`}
                        className="h-14 w-12 sm:h-15 sm:w-14 rounded-2xl border border-slate-300 bg-white text-center font-display text-xl font-extrabold text-slate-950 shadow-2xs transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                      />
                    ))}
                  </div>

                  {/* Remember this device */}
                  <label className="mt-5 flex items-center gap-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-sky-600 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>

                  <motion.button
                    whileHover={isOtpComplete ? { scale: 1.01 } : {}}
                    whileTap={isOtpComplete ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={!isOtpComplete}
                    className={`mt-6 w-full rounded-full py-3.5 text-sm font-bold transition-all ${
                      isOtpComplete
                        ? "btn-brand cursor-pointer"
                        : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Confirm
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: ONBOARDING 1 — FIRST NAME & LAST NAME */}
            {step === "name" && (
              <motion.div
                key="step-name"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <AlphadoLogoMark />

                {/* Inline Step Progress Bar */}
                <div className="mt-5 mx-auto max-w-[220px]">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "33%" }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 to-violet-500"
                    />
                  </div>
                </div>

                <h1 className="mt-5 font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-slate-950 dark:text-white">
                  What&apos;s your name?
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Let Alphado know who it&apos;s working for.
                </p>

                <form onSubmit={handleNameSubmit} className="mt-7 space-y-3.5 text-left">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      First name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      required
                      autoFocus
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Tunde"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Last name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Adeyemi"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400"
                    />
                  </div>

                  <motion.button
                    whileHover={
                      firstName.trim() && lastName.trim() ? { scale: 1.01 } : {}
                    }
                    whileTap={
                      firstName.trim() && lastName.trim() ? { scale: 0.98 } : {}
                    }
                    type="submit"
                    disabled={!firstName.trim() || !lastName.trim()}
                    className={`mt-4 w-full rounded-full py-3.5 text-sm font-bold transition-all ${
                      firstName.trim() && lastName.trim()
                        ? "btn-brand cursor-pointer"
                        : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* STEP 4: ONBOARDING 2 — BUSINESS NAME */}
            {step === "business" && (
              <motion.div
                key="step-business"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <AlphadoLogoMark />

                {/* Inline Step Progress Bar */}
                <div className="mt-5 mx-auto max-w-[220px]">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                      initial={{ width: "33%" }}
                      animate={{ width: "66%" }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 via-violet-500 to-pink-500"
                    />
                  </div>
                </div>

                <h1 className="mt-5 font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-slate-950 dark:text-white">
                  What&apos;s your business name?
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Alphado uses this when calling your customers and replying to DMs.
                </p>

                <form onSubmit={handleBusinessSubmit} className="mt-7 text-left">
                  <label
                    htmlFor="business-name"
                    className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    Business name
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    required
                    autoFocus
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Aura Studio"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400"
                  />

                  <motion.button
                    whileHover={businessName.trim() ? { scale: 1.01 } : {}}
                    whileTap={businessName.trim() ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={!businessName.trim()}
                    className={`mt-6 w-full rounded-full py-3.5 text-sm font-bold transition-all ${
                      businessName.trim()
                        ? "btn-brand cursor-pointer"
                        : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* STEP 5: ONBOARDING 3 — CONNECT INSTAGRAM (GLOWING GRADIENT ROUNDED RECTANGLE) */}
            {step === "instagram" && (
              <motion.div
                key="step-instagram"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <AlphadoLogoMark />

                {/* Inline Step Progress Bar */}
                <div className="mt-5 mx-auto max-w-[220px]">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                      initial={{ width: "66%" }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-600 via-violet-500 to-pink-500"
                    />
                  </div>
                </div>

                <h1 className="mt-5 font-display text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Connect your Instagram
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Link{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    {businessName}
                  </strong>{" "}
                  so Alphado can post 24/7, reply to DMs, and call hot leads.
                </p>

                {/* Glowing Brand-Gradient Rounded Rectangle Card */}
                <div className="relative mt-8">
                  {/* Outer glowing halo matching our brand gradient */}
                  <div
                    aria-hidden="true"
                    className="ig-glow-border pointer-events-none absolute -inset-1 rounded-[30px] opacity-65 blur-xl dark:opacity-55"
                  />

                  {/* Crisp animated glowing gradient rounded rectangle frame */}
                  <div className="ig-glow-border relative rounded-[28px] p-[2.5px] shadow-xl">
                    <div className="rounded-[25.5px] bg-white p-6 dark:bg-slate-900">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 text-left min-w-0">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-violet-500 to-pink-500 text-white shadow-md">
                            <Instagram className="h-6 w-6" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-display text-base font-extrabold text-slate-950 dark:text-white">
                              Instagram Business
                            </p>
                            <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                              {igState === "connected"
                                ? `${igHandle} • Synced`
                                : `Ready to link ${igHandle}`}
                            </p>
                          </div>
                        </div>

                        {/* Connect / Connected Button */}
                        <motion.button
                          whileHover={igState === "idle" ? { scale: 1.04 } : {}}
                          whileTap={igState === "idle" ? { scale: 0.96 } : {}}
                          type="button"
                          onClick={handleConnectInstagram}
                          disabled={igState !== "idle"}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                            igState === "connected"
                              ? "bg-emerald-600 text-white shadow-sm cursor-default"
                              : igState === "connecting"
                              ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-wait"
                              : "btn-brand cursor-pointer"
                          }`}
                        >
                          {igState === "connecting" && (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>Connecting...</span>
                            </>
                          )}
                          {igState === "connected" && (
                            <>
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                              <span>Connected</span>
                            </>
                          )}
                          {igState === "idle" && <span>Connect</span>}
                        </motion.button>
                      </div>

                      {igState === "connected" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-left text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          <span>
                            Instagram connected! 24/7 posting &amp; DM callbacks
                            enabled.
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Finish CTA */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setStep("done")}
                  className={`mt-7 w-full rounded-full py-3.5 text-sm font-bold transition-all cursor-pointer ${
                    igState === "connected"
                      ? "btn-brand"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {igState === "connected" ? "Finish Setup" : "Skip for now"}
                </motion.button>
              </motion.div>
            )}

            {/* STEP 6: WELCOME COMPLETE */}
            {step === "done" && (
              <motion.div
                key="step-done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="text-center"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 dark:from-sky-950 dark:via-indigo-950 dark:to-slate-900 border border-sky-200 dark:border-sky-500/30 shadow-md">
                  <img
                    src="/mascot-v2.png"
                    alt="Alphado ready"
                    className="h-20 w-20 object-contain"
                  />
                </div>

                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 border border-emerald-500/25 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Workspace Ready</span>
                </div>

                <h1 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Welcome to Alphado, {firstName}!
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Your AI assistant for{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    {businessName}
                  </strong>{" "}
                  is configured and ready to roll.
                </p>

                <div className="mt-6 space-y-2.5 rounded-3xl border border-slate-200 bg-white p-5 text-left text-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Account</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {firstName} {lastName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Email</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Business</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {businessName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Instagram</span>
                    <span
                      className={`font-bold ${
                        igState === "connected"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {igState === "connected" ? `${igHandle} • Connected` : "Not linked yet"}
                    </span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="btn-brand mt-7 inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold"
                >
                  Back to Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
