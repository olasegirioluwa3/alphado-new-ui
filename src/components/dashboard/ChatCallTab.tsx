"use client";

import React, { useEffect, useState } from "react";
import {
  Bot,
  Instagram,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Search,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "customer" | "ai" | "user" | "call_summary";
  text: string;
  time: string;
  duration?: string;
}

interface Thread {
  id: string;
  name: string;
  handle: string;
  phone: string;
  channel: "Instagram DM" | "Phone + IG";
  status: string;
  unread: number;
  avatarBg: string;
  messages: ChatMessage[];
}

const initialThreads: Thread[] = [
  {
    id: "t-1",
    name: "Ngozi Eze",
    handle: "@ngozi.styles",
    phone: "+234 803 412 4812",
    channel: "Phone + IG",
    status: "Active now",
    unread: 2,
    avatarBg: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    messages: [
      {
        id: "m-1",
        sender: "customer",
        text: "Hi! I saw your Signature Glow Kit reel. Can I order 2 packs today?",
        time: "10:12 AM",
      },
      {
        id: "m-2",
        sender: "ai",
        text: "Hey Ngozi! Yes — we have them in stock with same-day delivery. Would you like Alphado to ring you quickly to confirm your address?",
        time: "10:12 AM",
      },
      {
        id: "m-3",
        sender: "call_summary",
        text: "AI Voice Call completed • Confirmed 2x Signature Glow Kit, delivery to Lekki Phase 1 at 4 PM. Customer requested payment link.",
        duration: "01:38",
        time: "10:15 AM",
      },
      {
        id: "m-4",
        sender: "customer",
        text: "Got the link, paying right now! Thank you so much.",
        time: "10:16 AM",
      },
    ],
  },
  {
    id: "t-2",
    name: "Tunde Adeyemi",
    handle: "@tunde_builds",
    phone: "+234 809 221 7290",
    channel: "Instagram DM",
    status: "Replied 8m ago",
    unread: 1,
    avatarBg: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
    messages: [
      {
        id: "m-5",
        sender: "customer",
        text: "Can we reschedule my VIP Consultation to Thursday afternoon?",
        time: "9:48 AM",
      },
      {
        id: "m-6",
        sender: "ai",
        text: "Of course, Tunde! Thursday 2:00 PM or 4:30 PM are open. Tap a time or let me call you to confirm.",
        time: "9:48 AM",
      },
    ],
  },
  {
    id: "t-3",
    name: "Claire Dubois",
    handle: "@claire.paris",
    phone: "+33 6 44 18 41 09",
    channel: "Phone + IG",
    status: "French • AI handled",
    unread: 0,
    avatarBg: "bg-pink-500/15 text-pink-700 dark:text-pink-300",
    messages: [
      {
        id: "m-7",
        sender: "call_summary",
        text: "AI Call (French) • Delivered birthday 20% VIP code. Claire asked to browse the new bundle in DM.",
        duration: "01:12",
        time: "Yesterday",
      },
      {
        id: "m-8",
        sender: "customer",
        text: "Merci beaucoup! The voice call in French was so warm.",
        time: "Yesterday",
      },
    ],
  },
];

export function ChatCallTab({
  initialCallContact,
}: {
  initialCallContact?: string | null;
}) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeId, setActiveId] = useState<string>(initialThreads[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  // Merged Live Call state right inside the Chat interface
  const [inCall, setInCall] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(true);

  useEffect(() => {
    if (initialCallContact) {
      const found = threads.find((t) =>
        t.name.toLowerCase().includes(initialCallContact.toLowerCase())
      );
      if (found) setActiveId(found.id);
      setInCall(true);
      setCallSeconds(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCallContact]);

  useEffect(() => {
    if (!inCall) return;
    const timer = window.setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [inCall]);

  const activeThread =
    threads.find((t) => t.id === activeId) || threads[0];

  const filteredThreads = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.handle.toLowerCase().includes(query.toLowerCase())
  );

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartCall = () => {
    setCallSeconds(0);
    setMuted(false);
    setAiSpeaking(true);
    setInCall(true);
  };

  const handleEndCall = () => {
    const dur = formatTimer(Math.max(callSeconds, 12));
    setInCall(false);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  id: `call-${Date.now()}`,
                  sender: "call_summary",
                  text: `Live Call ended (${
                    aiSpeaking ? "Alphado AI Voice" : "Direct Voice"
                  }) • Summary automatically logged for ${t.name}.`,
                  duration: dur,
                  time: "Just now",
                },
              ],
            }
          : t
      )
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draft.trim();
    if (!cleaned) return;

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              unread: 0,
              messages: [
                ...t.messages,
                {
                  id: `msg-${Date.now()}`,
                  sender: "user",
                  text: cleaned,
                  time: "Just now",
                },
              ],
            }
          : t
      )
    );
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          Chat &amp; Call
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Unified Instagram DM inbox merged directly with live voice &amp; AI
          calling.
        </p>
      </div>

      {/* Unified Two-Pane Chat + Call Container */}
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-12 min-h-[580px]">
        {/* Left: Conversation List */}
        <div className="border-b border-slate-200 lg:col-span-4 lg:border-b-0 lg:border-r dark:border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chats or customers..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
              />
            </div>
          </div>

          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread.id;
              const lastMsg = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => {
                    setActiveId(thread.id);
                    setThreads((prev) =>
                      prev.map((t) =>
                        t.id === thread.id ? { ...t, unread: 0 } : t
                      )
                    );
                  }}
                  className={`flex w-full items-start gap-3 p-4 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-sky-50/80 dark:bg-sky-950/35"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold ${thread.avatarBg}`}
                  >
                    {thread.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                        {thread.name}
                      </p>
                      {thread.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1.5 text-[10px] font-bold text-white">
                          {thread.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {thread.handle}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-600 dark:text-slate-400">
                      {lastMsg?.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat + Integrated Call Workspace */}
        <div className="flex flex-col lg:col-span-8">
          {/* Header with Direct Call Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold ${activeThread.avatarBg}`}
              >
                {activeThread.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-extrabold text-slate-950 dark:text-white">
                  {activeThread.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <Instagram className="h-3 w-3 text-pink-500" />
                  <span>{activeThread.handle}</span>
                  <span>•</span>
                  <span>{activeThread.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!inCall ? (
                <button
                  type="button"
                  onClick={handleStartCall}
                  className="btn-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Call Now</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 cursor-pointer"
                >
                  <PhoneOff className="h-3.5 w-3.5" />
                  <span>End Call</span>
                </button>
              )}
            </div>
          </div>

          {/* Integrated Live Call Bar (clean inline expansion, zero overlap!) */}
          {inCall && (
            <div className="border-b border-sky-200 bg-gradient-to-r from-sky-50 via-indigo-50/70 to-pink-50/60 px-5 py-3.5 dark:border-sky-500/30 dark:from-sky-950/60 dark:via-indigo-950/50 dark:to-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-white">
                    <Volume2 className="h-4 w-4 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-950 dark:text-white">
                      {aiSpeaking
                        ? `Alphado AI speaking with ${activeThread.name}`
                        : `Live voice call with ${activeThread.name}`}
                    </p>
                    <p className="text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                      Connected • {formatTimer(callSeconds)} • Auto-summarizing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAiSpeaking((v) => !v)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      aiSpeaking
                        ? "bg-sky-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <Bot className="h-3.5 w-3.5" />
                    <span>{aiSpeaking ? "AI Voice On" : "Take Over"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Unmute microphone" : "Mute microphone"}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    {muted ? (
                      <MicOff className="h-3.5 w-3.5 text-rose-500" />
                    ) : (
                      <Mic className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages & Inline Call Summaries */}
          <div className="flex-1 space-y-3.5 overflow-y-auto p-5 max-h-[420px]">
            {activeThread.messages.map((msg) => {
              if (msg.sender === "call_summary") {
                return (
                  <div
                    key={msg.id}
                    className="mx-auto max-w-lg rounded-2xl border border-sky-200/80 bg-sky-50/70 px-4 py-3 dark:border-sky-500/25 dark:bg-sky-950/35"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Call Summary • {msg.duration}</span>
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                      {msg.text}
                    </p>
                  </div>
                );
              }

              const isOutgoing = msg.sender === "user" || msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isOutgoing ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-sky-600 text-white"
                        : msg.sender === "ai"
                        ? "border border-indigo-200 bg-indigo-50 text-slate-900 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-slate-100"
                        : "border border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <span className="mb-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                        <Bot className="h-3 w-3" />
                        Alphado AI
                      </span>
                    )}
                    <p>{msg.text}</p>
                  </div>
                  <span className="mt-1 px-1 text-[10px] font-medium text-slate-400">
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2.5 border-t border-slate-200 p-4 dark:border-slate-800"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${activeThread.name} or instruct Alphado...`}
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-950 placeholder:text-slate-400 caret-sky-600 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:caret-sky-400 dark:focus:border-sky-400 dark:focus:bg-slate-800"
            />
            <button
              type="submit"
              className="btn-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-pointer"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
