"use client";

import React, { useState } from "react";
import { Megaphone, PackagePlus } from "lucide-react";
import { ProductsTab } from "./ProductsTab";
import { AdsTab } from "./AdsTab";

export function ProductsAndAdsTab({
  initialSection = "products",
}: {
  initialSection?: "products" | "ads";
}) {
  const [section, setSection] = useState<"products" | "ads">(initialSection);

  return (
    <div className="space-y-6">
      {/* Clean Top Sub-Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setSection("products")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              section === "products"
                ? "btn-brand"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <PackagePlus className="h-3.5 w-3.5" />
            <span>Products</span>
          </button>

          <button
            type="button"
            onClick={() => setSection("ads")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              section === "ads"
                ? "btn-brand"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Megaphone className="h-3.5 w-3.5" />
            <span>Running Ads</span>
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {section === "products"
            ? "Create, publish & auto-promote products"
            : "Monitor & control all active ad campaigns"}
        </span>
      </div>

      {section === "products" ? <ProductsTab /> : <AdsTab />}
    </div>
  );
}
