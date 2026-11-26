"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Eye,
  Instagram,
  Package,
  PhoneCall,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  status: "Published" | "Draft";
  views: string;
  sales: number;
  igAutoPost: boolean;
  aiVoicePromo: boolean;
}

const initialProducts: ProductItem[] = [
  {
    id: "prod-1",
    name: "Signature Glow Kit",
    price: "$75",
    category: "Skincare",
    description:
      "3-step hydration bundle promoted automatically via Instagram Reels and AI callback campaigns.",
    status: "Published",
    views: "4.2K",
    sales: 128,
    igAutoPost: true,
    aiVoicePromo: true,
  },
  {
    id: "prod-2",
    name: "VIP Priority Consultation",
    price: "$150",
    category: "Service",
    description:
      "1-on-1 strategy session booked directly through Alphado voice follow-ups and DM replies.",
    status: "Published",
    views: "1.9K",
    sales: 46,
    igAutoPost: true,
    aiVoicePromo: true,
  },
  {
    id: "prod-3",
    name: "Weekend Starter Pack",
    price: "$49",
    category: "Bundle",
    description:
      "Introductory customer pack tailored for birthday call waves and first-time Instagram leads.",
    status: "Draft",
    views: "310",
    sales: 9,
    igAutoPost: false,
    aiVoicePromo: true,
  },
];

export function ProductsTab() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [showCreator, setShowCreator] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Product");
  const [description, setDescription] = useState("");
  const [igAutoPost, setIgAutoPost] = useState(true);
  const [aiVoicePromo, setAiVoicePromo] = useState(true);

  const handleCreateProduct = (e: React.FormEvent, status: "Published" | "Draft") => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    const formattedPrice = price.trim().startsWith("$")
      ? price.trim()
      : `$${price.trim()}`;

    const newItem: ProductItem = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      price: formattedPrice,
      category: category.trim() || "Product",
      description:
        description.trim() ||
        "Published with Alphado automated voice & Instagram growth enabled.",
      status,
      views: "New",
      sales: 0,
      igAutoPost,
      aiVoicePromo,
    };

    setProducts((prev) => [newItem, ...prev]);
    setName("");
    setPrice("");
    setCategory("Product");
    setDescription("");
    setShowCreator(false);
  };

  const toggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Published" ? "Draft" : "Published" }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Products
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Create and publish products for Alphado to promote on Instagram and
            pitch on customer calls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreator((v) => !v)}
          className="btn-brand inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold cursor-pointer"
        >
          {showCreator ? (
            <>
              <X className="h-4 w-4" />
              <span>Close Form</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Create Product</span>
            </>
          )}
        </button>
      </div>

      {/* Create / Publish Product Form */}
      {showCreator && (
        <form
          onSubmit={(e) => handleCreateProduct(e, "Published")}
          className="rounded-3xl border border-sky-200 bg-white p-6 shadow-sm dark:border-sky-500/30 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                Create &amp; Publish Product
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add details below and publish immediately or save as draft.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Product Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Executive Bundle"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Price
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. $89"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Skincare, Coaching"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
              Short Pitch Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this offer great? Alphado uses this when calling leads and posting on Instagram."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={igAutoPost}
                onChange={(e) => setIgAutoPost(e.target.checked)}
                className="h-4 w-4 rounded accent-sky-600"
              />
              <span>Auto-post to Instagram</span>
            </label>

            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={aiVoicePromo}
                onChange={(e) => setAiVoicePromo(e.target.checked)}
                className="h-4 w-4 rounded accent-sky-600"
              />
              <span>Enable in AI Voice Calls</span>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={(e) => handleCreateProduct(e, "Draft")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="btn-brand rounded-full px-5 py-2 text-xs font-bold cursor-pointer"
            >
              Publish Now
            </button>
          </div>
        </form>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 via-indigo-500/15 to-pink-500/15 text-sky-600 dark:text-sky-400">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {product.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    product.status === "Published"
                      ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {product.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {product.igAutoPost && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/10 px-2.5 py-1 text-[11px] font-semibold text-pink-700 dark:text-pink-300">
                    <Instagram className="h-3 w-3" />
                    IG Auto-Post
                  </span>
                )}
                {product.aiVoicePromo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                    <PhoneCall className="h-3 w-3" />
                    Voice Ready
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  {product.price}
                </span>
                <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {product.views}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    {product.sales}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleStatus(product.id)}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-500" />
                <span>
                  {product.status === "Published" ? "Unpublish" : "Publish"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
