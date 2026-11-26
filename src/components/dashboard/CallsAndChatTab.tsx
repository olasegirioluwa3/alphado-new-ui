"use client";

import React, { useState } from "react";
import { MessageSquare, PhoneCall } from "lucide-react";
import { ChatCallTab } from "./ChatCallTab";
import { CallLogsTab } from "./CallLogsTab";

export function CallsAndChatTab() {
  const [section, setSection] = useState<"logs" | "chat">("chat");
  const [pendingCallContact, setPendingCallContact] = useState<string | null>(
    null
  );

  const handleCallBack = (contactName: string) => {
    setPendingCallContact(contactName);
    setSection("chat");
  };

  return (
    <div className="space-y-6">
      {/* Clean Top Sub-Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => {
              setSection("chat");
              setPendingCallContact(null);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              section === "chat"
                ? "btn-brand"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Live Chat &amp; Call</span>
          </button>

          <button
            type="button"
            onClick={() => setSection("logs")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              section === "logs"
                ? "btn-brand"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Call Logs</span>
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {section === "chat"
            ? "Customer DMs merged with direct AI & voice calls"
            : "Answered, missed, outgoing calls & AI recaps"}
        </span>
      </div>

      {section === "chat" ? (
        <ChatCallTab initialCallContact={pendingCallContact} />
      ) : (
        <CallLogsTab onCallBack={handleCallBack} />
      )}
    </div>
  );
}
