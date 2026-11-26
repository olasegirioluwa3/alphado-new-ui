"use client";

import React, { useState } from "react";
import {
  Instagram,
  Megaphone,
  Pause,
  PhoneCall,
  Play,
  Plus,
  TrendingUp,
  X,
} from "lucide-react";

interface AdCampaign {
  id: string;
  name: string;
  channel: "Instagram Reels" | "Instagram DM + Voice" | "AI Call Wave";
  status: "Running" | "Paused";
  budget: string;
  impressions: string;
  clicks: string;
  roas: string;
}

const initialAds: AdCampaign[] = [
  {
    id: "ad-1",
    name: "Signature Glow Kit — Reels Growth",
    channel: "Instagram Reels",
    status: "Running",
    budget: "$45 / day",
    impressions: "42,810",
    clicks: "1,640",
    roas: "4.2x",
  },
  {
    id: "ad-2",
    name: "Hot DM Leads — Instant Callback Ad",
    channel: "Instagram DM + Voice",
    status: "Running",
    budget: "$30 / day",
    impressions: "19,400",
    clicks: "912",
    roas: "5.1x",
  },
  {
    id: "ad-3",
    name: "VIP Birthday Exclusive Wave",
    channel: "AI Call Wave",
    status: "Running",
    budget: "$20 / day",
    impressions: "8,920",
    clicks: "540",
    roas: "3.8x",
  },
  {
    id: "ad-4",
    name: "Weekend Flash Promo Retargeting",
    channel: "Instagram Reels",
    status: "Paused",
    budget: "$25 / day",
    impressions: "14,200",
    clicks: "428",
    roas: "2.9x",
  },
];

export function AdsTab() {
  const [ads, setAds] = useState<AdCampaign[]>(initialAds);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newChannel, setNewChannel] =
    useState<AdCampaign["channel"]>("Instagram Reels");
  const [newBudget, setNewBudget] = useState("$35 / day");

  const runningCount = ads.filter((a) => a.status === "Running").length;

  const toggleAdStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === "Running" ? "Paused" : "Running" }
          : ad
      )
    );
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAds((prev) => [
      {
        id: `ad-${Date.now()}`,
        name: newName.trim(),
        channel: newChannel,
        status: "Running",
        budget: newBudget.trim() || "$30 / day",
        impressions: "Just launched",
        clicks: "0",
        roas: "Learning",
      },
      ...prev,
    ]);
    setNewName("");
    setShowNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Ads
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            All your running Instagram and AI voice promotion campaigns in one
            place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNew((v) => !v)}
          className="btn-brand inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold cursor-pointer"
        >
          {showNew ? (
            <>
              <X className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Launch New Ad</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Running Ads
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            {runningCount}{" "}
            <span className="text-sm font-semibold text-slate-400">
              / {ads.length} total
            </span>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Impressions
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            85,330
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Average ROAS
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" />
            <span>4.1x</span>
          </p>
        </div>
      </div>

      {/* Quick Launch Form */}
      {showNew && (
        <form
          onSubmit={handleCreateAd}
          className="rounded-3xl border border-sky-200 bg-white p-5 shadow-sm dark:border-sky-500/30 dark:bg-slate-900"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Campaign Name
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Holiday Flash Reel"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Channel
              </label>
              <select
                value={newChannel}
                onChange={(e) =>
                  setNewChannel(e.target.value as AdCampaign["channel"])
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              >
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="Instagram DM + Voice">
                  Instagram DM + Voice
                </option>
                <option value="AI Call Wave">AI Call Wave</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Daily Budget
              </label>
              <input
                type="text"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="btn-brand rounded-full px-5 py-2 text-xs font-bold cursor-pointer"
            >
              Start Campaign
            </button>
          </div>
        </form>
      )}

      {/* List of All Running Ads */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {ad.channel === "AI Call Wave" ? (
                    <PhoneCall className="h-5 w-5 text-sky-500" />
                  ) : ad.channel === "Instagram Reels" ? (
                    <Instagram className="h-5 w-5 text-pink-500" />
                  ) : (
                    <Megaphone className="h-5 w-5 text-indigo-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-display text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
                      {ad.name}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        ad.status === "Running"
                          ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/12 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          ad.status === "Running"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {ad.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {ad.channel} • Budget: {ad.budget}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 lg:gap-6">
                <div className="text-left sm:text-right">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Impressions
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {ad.impressions}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Clicks
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {ad.clicks}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[11px] font-semibold text-slate-400">
                    ROAS
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {ad.roas}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAdStatus(ad.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {ad.status === "Running" ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
