"use client";

import React, { useState } from "react";
import {
  FileText,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Search,
} from "lucide-react";

type CallStatus = "Answered" | "Missed" | "AI Outgoing";

interface CallLogItem {
  id: string;
  contact: string;
  phone: string;
  status: CallStatus;
  language: string;
  duration: string;
  time: string;
  summary: string;
}

const initialCallLogs: CallLogItem[] = [
  {
    id: "c-1",
    contact: "Ngozi Eze",
    phone: "+234 803 412 4812",
    status: "Answered",
    language: "English",
    duration: "01:38",
    time: "Today, 10:15 AM",
    summary:
      "Confirmed order for 2x Signature Glow Kit. Requested delivery to Lekki Phase 1 at 4 PM and received checkout link via Instagram DM.",
  },
  {
    id: "c-2",
    contact: "Ibrahim Musa",
    phone: "+234 809 551 7290",
    status: "Missed",
    language: "Pidgin / English",
    duration: "00:00",
    time: "Today, 9:42 AM",
    summary:
      "Customer missed incoming call. Alphado queued an automatic retry for 2:00 PM and sent a polite Instagram DM check-in.",
  },
  {
    id: "c-3",
    contact: "Claire Dubois",
    phone: "+33 6 44 18 41 09",
    status: "AI Outgoing",
    language: "French",
    duration: "01:12",
    time: "Yesterday, 6:20 PM",
    summary:
      "Delivered warm birthday greeting in fluent French with 20% VIP loyalty code. Customer expressed interest in the Weekend Starter Pack.",
  },
  {
    id: "c-4",
    contact: "Bola Adewale",
    phone: "+234 701 884 1198",
    status: "Answered",
    language: "Yoruba / English",
    duration: "02:05",
    time: "Yesterday, 3:10 PM",
    summary:
      "Booked VIP Priority Consultation for Friday 11:00 AM. Asked for a calendar invite via email and SMS reminder.",
  },
  {
    id: "c-5",
    contact: "David Okafor",
    phone: "+234 812 309 4410",
    status: "Missed",
    language: "English",
    duration: "00:00",
    time: "Nov 23, 5:04 PM",
    summary:
      "Incoming inquiry call missed while line was busy. Ready for 1-click AI callback.",
  },
];

export function CallLogsTab({
  onCallBack,
}: {
  onCallBack: (contactName: string) => void;
}) {
  const [filter, setFilter] = useState<"All" | CallStatus>("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>(initialCallLogs[0].id);

  const filtered = initialCallLogs.filter((log) => {
    const matchesFilter = filter === "All" || log.status === filter;
    const matchesSearch =
      log.contact.toLowerCase().includes(search.toLowerCase()) ||
      log.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const selectedLog =
    filtered.find((l) => l.id === selectedId) || filtered[0] || null;

  const counts = {
    All: initialCallLogs.length,
    Answered: initialCallLogs.filter((l) => l.status === "Answered").length,
    Missed: initialCallLogs.filter((l) => l.status === "Missed").length,
    "AI Outgoing": initialCallLogs.filter((l) => l.status === "AI Outgoing")
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Call Logs
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track answered, missed, and outgoing AI calls with instant
            conversation summaries.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {(["All", "Answered", "Missed", "AI Outgoing"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
              filter === tab
                ? "btn-brand"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span>{tab}</span>
            <span className="opacity-75">({counts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Split Layout: Call List + AI Summary Detail */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedId(log.id)}
                  className={`flex flex-wrap items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-sky-50/75 dark:bg-sky-950/35"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                        log.status === "Missed"
                          ? "bg-rose-500/12 text-rose-600 dark:text-rose-400"
                          : log.status === "Answered"
                          ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                          : "bg-sky-500/12 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {log.status === "Missed" ? (
                        <PhoneMissed className="h-4 w-4" />
                      ) : log.status === "Answered" ? (
                        <PhoneIncoming className="h-4 w-4" />
                      ) : (
                        <PhoneOutgoing className="h-4 w-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                        {log.contact}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {log.phone} • {log.language}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          log.status === "Missed"
                            ? "bg-rose-500/12 text-rose-700 dark:text-rose-300"
                            : log.status === "Answered"
                            ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
                            : "bg-sky-500/12 text-sky-700 dark:text-sky-300"
                        }`}
                      >
                        {log.status}
                      </span>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {log.duration} • {log.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
                No calls match your filter.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Call AI Summary Card */}
        <div className="lg:col-span-5">
          {selectedLog && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/12 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-300">
                  <FileText className="h-3.5 w-3.5" />
                  <span>AI Call Summary</span>
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {selectedLog.duration}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                {selectedLog.contact}
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {selectedLog.phone} • {selectedLog.language} • {selectedLog.time}
              </p>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
                {selectedLog.summary}
              </div>

              <button
                type="button"
                onClick={() => onCallBack(selectedLog.contact)}
                className="btn-brand mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-bold cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Back in Chat &amp; Call</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
