"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { CorePillarsSection } from "@/components/CorePillarsSection";
import { VoicePlaygroundSection } from "@/components/VoicePlaygroundSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { MissionBandSection } from "@/components/MissionBandSection";
import { ProactiveSection } from "@/components/ProactiveSection";
import { ResultsAndMetricsSection } from "@/components/ResultsAndMetricsSection";
import { GlobalCapabilitiesSection } from "@/components/GlobalCapabilitiesSection";
import { TestimonialsAndTrustSection } from "@/components/TestimonialsAndTrustSection";
import { FaqAndCtaSection } from "@/components/FaqAndCtaSection";

export default function HomePage() {
  const router = useRouter();

  const handleGoToAuth = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] bg-subtle-grid">
      <ScrollProgressBar />
      <Navbar onOpenDemo={handleGoToAuth} />
      <main>
        <HeroBanner onOpenDemo={handleGoToAuth} />
        <CorePillarsSection />
        <VoicePlaygroundSection onOpenDemo={handleGoToAuth} />
        <HowItWorksSection />
        <MissionBandSection />
        <ProactiveSection />
        <ResultsAndMetricsSection />
        <GlobalCapabilitiesSection />
        <TestimonialsAndTrustSection />
        <FaqAndCtaSection onOpenDemo={handleGoToAuth} />
      </main>
    </div>
  );
}
