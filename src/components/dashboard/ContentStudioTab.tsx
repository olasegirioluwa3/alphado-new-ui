"use client";

import React, { useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Edit3,
  PenTool,
  Sparkles,
  Trash2,
} from "lucide-react";

interface ContentDraft {
  id: string;
  contentType: string;
  platform: string;
  tone: string;
  prompt: string;
  body: string;
  createdAt: string;
}

const CONTENT_TYPES = [
  "Post",
  "Reel Script",
  "Carousel",
  "Story Sequence",
  "Ad Copy",
  "Voice Call Pitch",
];

const PLATFORMS = [
  "Instagram",
  "WhatsApp",
  "TikTok",
  "X (Twitter)",
  "LinkedIn",
  "Phone Voice Script",
];

const TONES = [
  "Professional",
  "Friendly & Warm",
  "Bold & Persuasive",
  "Playful",
  "Luxury / Editorial",
  "Nigerian Pidgin Friendly",
];

function buildGeneratedDraft(
  prompt: string,
  contentType: string,
  platform: string,
  tone: string
): string {
  const topic = prompt.trim();
  if (contentType === "Voice Call Pitch" || platform === "Phone Voice Script") {
    return `"Hi there! Calling quickly with an update on ${topic}. We reserved early access for our favorite customers today—would you like me to text or DM the quick link right now?"`;
  }
  if (contentType === "Reel Script") {
    return `[Hook - 0:03] Stop scrolling if you've been waiting for ${topic}.\n[Body - 0:15] Here's why customers love it — effortless quality, instant delivery, and zero friction.\n[CTA - 0:25] Drop "INFO" in the comments or tap our link to grab yours today!`;
  }
  return `Introducing ${topic} — crafted in a ${tone.toLowerCase()} voice for ${platform}.\n\nDesigned to save you time and deliver standout results from day one. Tap the link in bio or send us a quick DM to get started right away. ✨`;
}

export function ContentStudioTab() {
  const [composerOpen, setComposerOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = prompt.trim();
    if (!cleaned) {
      setComposerOpen(true);
      promptInputRef.current?.focus();
      return;
    }

    const newDraft: ContentDraft = {
      id: `draft-${Date.now()}`,
      contentType,
      platform,
      tone,
      prompt: cleaned,
      body: buildGeneratedDraft(cleaned, contentType, platform, tone),
      createdAt: "Just now",
    };

    setDrafts((prev) => [newDraft, ...prev]);
    setPrompt("");
  };

  const handleCopy = (draft: ContentDraft) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(draft.body).catch(() => {});
    }
    setCopiedId(draft.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDelete = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header matching Content Studio reference */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Content Studio
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Generate, edit, and manage your social media content
          </p>
        </div>

        <button
          type="button"
          onClick={() => setComposerOpen((v) => !v)}
          className="btn-brand inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>{composerOpen ? "Close" : "Create Content"}</span>
        </button>
      </div>

      {/* AI Content Generator Card with 3 fully working dropdowns */}
      {composerOpen && (
        <form
          onSubmit={handleGenerate}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
        >
          <label
            htmlFor="content-prompt"
            className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            What would you like to create content about?
          </label>
          <textarea
            id="content-prompt"
            ref={promptInputRef}
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A post about our new product launch highlighting its key features..."
            className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
          />

          {/* 3 Working Dropdown Selectors */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="studio-content-type"
                className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Content Type
              </label>
              <div className="relative">
                <select
                  id="studio-content-type"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-2xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  {CONTENT_TYPES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <div>
              <label
                htmlFor="studio-platform"
                className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Platform
              </label>
              <div className="relative">
                <select
                  id="studio-platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-2xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  {PLATFORMS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <div>
              <label
                htmlFor="studio-tone"
                className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Tone
              </label>
              <div className="relative">
                <select
                  id="studio-tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-2xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  {TONES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={!prompt.trim()}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                prompt.trim()
                  ? "btn-brand cursor-pointer"
                  : "bg-sky-500/40 text-white cursor-not-allowed dark:bg-sky-500/25 dark:text-slate-300"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate with AI</span>
            </button>
          </div>
        </form>
      )}

      {/* Drafts Section or Empty State matching reference */}
      {drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <PenTool className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-base font-extrabold text-slate-950 dark:text-white">
            No content drafts
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Generate your first piece of content using AI
          </p>
          <button
            type="button"
            onClick={() => {
              setComposerOpen(true);
              setTimeout(() => promptInputRef.current?.focus(), 60);
            }}
            className="btn-brand mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate Content</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
              Content Drafts ({drafts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-sky-500/12 px-2.5 py-0.5 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                        {draft.platform}
                      </span>
                      <span className="rounded-full bg-indigo-500/12 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                        {draft.contentType}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {draft.tone}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {draft.createdAt}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {draft.body}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleCopy(draft)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {copiedId === draft.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(draft.id)}
                    aria-label="Delete draft"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
