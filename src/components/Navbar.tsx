"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, PhoneCall, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenDemo: (presetPrompt?: string) => void;
}

const navLinks = [
  { label: "Voice AI", href: "#voice-demo" },
  { label: "Features", href: "#pillars" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ onOpenDemo }: NavbarProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Primary"
          className="glass-nav flex items-center justify-between rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5"
        >
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-950 dark:to-indigo-950 border border-sky-200/80 dark:border-sky-500/30 overflow-hidden shrink-0"
            >
              <img
                src="/mascot-v2.png"
                alt="Alphado mascot"
                className="h-9 w-9 object-contain object-top pt-0.5"
              />
            </motion.div>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              alphado
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-sky-500/10 dark:bg-sky-400/15 border border-sky-500/20 dark:border-sky-400/25 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
              AI
            </span>
          </a>

          {/* Desktop Links — All Navigation at the Top */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={toggleTheme}
              aria-label={
                mounted
                  ? theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
              title={
                mounted
                  ? theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
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
            </motion.button>

            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenDemo()}
              className="btn-brand hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Get Started</span>
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 lg:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-nav mt-2 rounded-3xl p-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-900/5 dark:text-slate-100 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenDemo();
                  }}
                  className="btn-brand mt-2 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Get Started</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
