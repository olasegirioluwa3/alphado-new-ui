"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  Menu,
  Moon,
  PackagePlus,
  PenTool,
  PhoneCall,
  Settings,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
  DEFAULT_USER_PROFILE,
  loadUserProfile,
  saveUserProfile,
  type AlphadoUserProfile,
} from "@/components/dashboard/types";
import { HomeOverviewTab } from "@/components/dashboard/HomeOverviewTab";
import {
  PlatformTour,
  PLATFORM_TOUR_STEPS,
  type TourTab,
} from "@/components/dashboard/PlatformTour";
import { ProductsAndAdsTab } from "@/components/dashboard/ProductsAndAdsTab";
import { AlphadoBrandTab } from "@/components/dashboard/AlphadoBrandTab";
import { ContentStudioTab } from "@/components/dashboard/ContentStudioTab";
import { CallsAndChatTab } from "@/components/dashboard/CallsAndChatTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";

type DashboardTab = TourTab;

const navItems: {
  id: DashboardTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: PackagePlus },
  { id: "alphado", label: "Alphado", icon: Sparkles },
  { id: "content", label: "Content Studio", icon: PenTool },
  { id: "calls", label: "Calls", icon: PhoneCall },
  { id: "settings", label: "Settings", icon: Settings },
];

const headerTitles: Record<DashboardTab, string> = {
  home: "Overview",
  products: "Products & Ads",
  alphado: "Alphado Brand Intelligence",
  content: "Content Studio",
  calls: "Calls & Chat",
  settings: "Settings",
};

export default function DashboardPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [profile, setProfile] = useState<AlphadoUserProfile>(
    DEFAULT_USER_PROFILE
  );
  const [activeTab, setActiveTab] = useState<DashboardTab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);

  useEffect(() => {
    setProfile(loadUserProfile());

    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get("tour") === "welcome") {
      setTourStep(0);
      currentUrl.searchParams.delete("tour");
      window.history.replaceState(
        window.history.state,
        "",
        `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
      );
    }
  }, []);

  useEffect(() => {
    if (tourStep === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTourStep(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tourStep]);

  const handleUpdateProfile = (next: AlphadoUserProfile) => {
    setProfile(next);
    saveUserProfile(next);
  };

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);

    if (tourStep !== null) {
      const selectedStep = PLATFORM_TOUR_STEPS.findIndex(
        (step) => step.tab === tab
      );
      if (selectedStep >= 0) setTourStep(selectedStep);
    }
  };

  const navigateTour = (stepIndex: number) => {
    const step = PLATFORM_TOUR_STEPS[stepIndex];
    if (!step) return;
    setActiveTab(step.tab);
    setTourStep(stepIndex);
    setMobileMenuOpen(false);
  };

  const handleTourNext = () => {
    if (tourStep === null) return;
    if (tourStep === PLATFORM_TOUR_STEPS.length - 1) {
      setTourStep(null);
      return;
    }
    navigateTour(tourStep + 1);
  };

  const handleTourPrevious = () => {
    if (tourStep === null || tourStep === 0) return;
    navigateTour(tourStep - 1);
  };

  const userInitial = (profile.firstName || "A").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex lg:w-64 ${
          tourStep !== null ? "z-40" : ""
        }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 border border-sky-200/80 dark:from-sky-950 dark:via-indigo-950 dark:to-slate-900 dark:border-sky-500/35 overflow-hidden">
              <img
                src="/mascot-v2.png"
                alt="Alphado"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block font-display text-base font-extrabold tracking-tight text-slate-950 dark:text-white leading-none">
                alphado
              </span>
              <span className="mt-0.5 block truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {profile.businessName}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Dashboard navigation"
          className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isTourTarget =
              tourStep !== null && PLATFORM_TOUR_STEPS[tourStep]?.tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`relative flex w-full items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/14 via-indigo-500/12 to-pink-500/10 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-500/30"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white border-transparent"
                } ${
                  isTourTarget
                    ? "z-40 ring-2 ring-sky-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                    : ""
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User Profile Pill */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleSelectTab("settings")}
            className="flex w-full items-center gap-3 rounded-2xl p-2 text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.firstName}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-300/80 font-display text-sm font-extrabold text-slate-900 dark:bg-sky-500/30 dark:text-sky-100">
                {userInitial}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-extrabold text-slate-950 dark:text-white">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {profile.email}
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex w-72 max-w-[82vw] flex-col bg-white p-4 shadow-2xl dark:bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <img
                  src="/mascot-v2.png"
                  alt="Alphado"
                  className="h-9 w-9 object-contain"
                />
                <div>
                  <span className="block font-display text-base font-extrabold text-slate-950 dark:text-white leading-none">
                    alphado
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {profile.businessName}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-4 flex-1 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isTourTarget =
                  tourStep !== null && PLATFORM_TOUR_STEPS[tourStep]?.tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold ${
                      isActive
                        ? "bg-sky-500/12 text-sky-700 dark:text-sky-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    } ${
                      isTourTarget
                        ? "relative z-40 rounded-2xl ring-2 ring-sky-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                        : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Right Main Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-950/90">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-extrabold text-slate-950 dark:text-white">
                {headerTitles[activeTab]}
              </span>
              <span className="hidden sm:inline-block rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                {profile.businessName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

            <button
              type="button"
              onClick={() => navigateTour(0)}
              aria-label="Take the platform tour"
              title="Take the platform tour"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/40 dark:hover:bg-slate-800 dark:hover:text-sky-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Take tour</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab("settings")}
              aria-label="Open account settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300/80 font-display text-xs font-extrabold text-slate-900 dark:bg-sky-500/30 dark:text-sky-100 overflow-hidden cursor-pointer"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.firstName}
                  className="h-9 w-9 object-cover"
                />
              ) : (
                userInitial
              )}
            </button>
          </div>
        </header>

        {/* Active Workspace */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {activeTab === "home" && (
            <HomeOverviewTab profile={profile} onNavigate={handleSelectTab} />
          )}
          {activeTab === "products" && <ProductsAndAdsTab />}
          {activeTab === "alphado" && <AlphadoBrandTab profile={profile} />}
          {activeTab === "content" && <ContentStudioTab />}
          {activeTab === "calls" && <CallsAndChatTab />}
          {activeTab === "settings" && (
            <SettingsTab
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onClose={() => handleSelectTab("home")}
            />
          )}
        </main>
      </div>

      {tourStep !== null && (
        <PlatformTour
          stepIndex={tourStep}
          onPrevious={handleTourPrevious}
          onNext={handleTourNext}
          onClose={() => setTourStep(null)}
        />
      )}
    </div>
  );
}
