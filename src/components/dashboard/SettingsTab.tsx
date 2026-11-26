"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Coins,
  CreditCard,
  Info,
  Instagram,
  Link2,
  Lock,
  LogOut,
  MessageSquare,
  Moon,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  User,
  UserPlus,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
  clearUserProfile,
  type AlphadoUserProfile,
  type WorkspaceItem,
} from "./types";

type SubPanelId =
  | null
  | "usage"
  | "profile"
  | "scheduled"
  | "accounts"
  | "wallet"
  | "teams"
  | "preferences"
  | "security"
  | "feedback"
  | "about";

interface SettingsTabProps {
  profile: AlphadoUserProfile;
  onUpdateProfile: (next: AlphadoUserProfile) => void;
  onClose: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
  isYou?: boolean;
  pending?: boolean;
}

interface SavedCard {
  id: string;
  brand: "Visa" | "Mastercard" | "Verve";
  holder: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const subscriptionPlans = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Starter",
    price: "₦5,000",
    credits: "5,000 credits per month",
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Growth plan",
    price: "₦15,000",
    credits: "20,000 credits per month",
  },
  {
    id: "agency",
    name: "Agency",
    subtitle: "Agency",
    price: "₦35,000",
    credits: "50,000 credits per month",
  },
  {
    id: "autopilot-basic",
    name: "Autopilot Basic",
    subtitle: "Autopilot basic",
    price: "₦10,000",
    credits: "12,000 credits per month",
  },
  {
    id: "autopilot-growth",
    name: "Autopilot Growth",
    subtitle: "Autopilot Growth",
    price: "₦25,000",
    credits: "35,000 credits per month",
  },
  {
    id: "autopilot-agency",
    name: "Autopilot Agency",
    subtitle: "Autopilot Agency",
    price: "₦60,000",
    credits: "80,000 credits per month",
  },
];

function detectCardBrand(num: string): "Visa" | "Mastercard" | "Verve" {
  const digits = num.replace(/\D/g, "");
  if (digits.startsWith("506") || digits.startsWith("650")) return "Verve";
  if (digits.startsWith("5") || digits.startsWith("2")) return "Mastercard";
  return "Visa";
}

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function SettingsTab({
  profile,
  onUpdateProfile,
  onClose,
}: SettingsTabProps) {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const [activeSub, setActiveSub] = useState<SubPanelId>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  // Usage & Platform Credits state
  const [selectedPlan, setSelectedPlan] = useState<string>("growth");
  const [refreshingCredits, setRefreshingCredits] = useState(false);

  // Wallet (Add Card & Saved Cards) state
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: "card-1",
      brand: "Mastercard",
      holder: `${profile.firstName} ${profile.lastName}`,
      last4: "4829",
      expiry: "09/28",
      isDefault: true,
    },
  ]);
  const [cardHolder, setCardHolder] = useState(
    `${profile.firstName} ${profile.lastName}`
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardAddedToast, setCardAddedToast] = useState(false);

  // Professional Profile & Workspaces state
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [editFirst, setEditFirst] = useState(profile.firstName);
  const [editLast, setEditLast] = useState(profile.lastName);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPhone, setEditPhone] = useState(
    profile.phone || "+234 803 000 1240"
  );
  const [editRoleTitle, setEditRoleTitle] = useState(
    profile.roleTitle || "Founder & Owner"
  );
  const [editAvatar, setEditAvatar] = useState(profile.avatarUrl || "");
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsIndustry, setNewWsIndustry] = useState("E-commerce & Retail");

  // Teams & Members state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Member" | "Admin" | "Viewer">(
    "Member"
  );
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "owner-1",
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      role: "OWNER",
      isYou: true,
    },
  ]);

  const accountItems = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "scheduled" as const, label: "Scheduled tasks", icon: Clock },
    { id: "accounts" as const, label: "Accounts", icon: Link2 },
    { id: "wallet" as const, label: "Wallet", icon: CreditCard },
    { id: "teams" as const, label: "Teams", icon: Users },
  ];

  const systemItems = [
    { id: "preferences" as const, label: "System Preferences", icon: Settings },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "feedback" as const, label: "Submit Feedback", icon: MessageSquare },
    { id: "about" as const, label: "About", icon: Info },
  ];

  const matches = (label: string) =>
    !searchQuery.trim() ||
    label.toLowerCase().includes(searchQuery.toLowerCase());

  const handleSignOut = () => {
    clearUserProfile();
    router.push("/");
  };

  const handleRefreshCredits = () => {
    setRefreshingCredits(true);
    setTimeout(() => setRefreshingCredits(false), 650);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (dataUrl) {
        setEditAvatar(dataUrl);
        onUpdateProfile({
          ...profile,
          avatarUrl: dataUrl,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      firstName: editFirst.trim() || profile.firstName,
      lastName: editLast.trim() || profile.lastName,
      email: editEmail.trim() || profile.email,
      phone: editPhone.trim(),
      roleTitle: editRoleTitle.trim(),
      avatarUrl: editAvatar,
    });
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2600);
  };

  const workspaces: WorkspaceItem[] =
    profile.workspaces && profile.workspaces.length > 0
      ? profile.workspaces
      : [
          {
            id: "ws-default",
            name: profile.businessName,
            industry: "Primary Workspace",
          },
        ];

  const handleAddWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newWsName.trim();
    if (!cleaned) return;
    const nextWs: WorkspaceItem = {
      id: `ws-${Date.now()}`,
      name: cleaned,
      industry: newWsIndustry.trim() || "Business",
    };
    onUpdateProfile({
      ...profile,
      businessName: cleaned,
      workspaces: [...workspaces, nextWs],
    });
    setNewWsName("");
    setShowAddWorkspace(false);
  };

  const handleSwitchWorkspace = (ws: WorkspaceItem) => {
    onUpdateProfile({
      ...profile,
      businessName: ws.name,
    });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (!cardHolder.trim() || digits.length < 12 || cardExpiry.length < 4) {
      return;
    }
    const newCard: SavedCard = {
      id: `card-${Date.now()}`,
      brand: detectCardBrand(digits),
      holder: cardHolder.trim(),
      last4: digits.slice(-4),
      expiry: cardExpiry,
      isDefault: savedCards.length === 0,
    };
    setSavedCards((prev) => [newCard, ...prev]);
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardAddedToast(true);
    setTimeout(() => setCardAddedToast(false), 2600);
  };

  const handleSetDefaultCard = (id: string) => {
    setSavedCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === id }))
    );
  };

  const handleRemoveCard = (id: string) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inviteEmail.trim();
    if (!cleaned || !cleaned.includes("@")) return;
    const prefix = cleaned.split("@")[0];
    const displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    setMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        name: displayName,
        email: cleaned,
        role: inviteRole.toUpperCase() as TeamMember["role"],
        pending: true,
      },
    ]);
    setInviteEmail("");
  };

  const initialLetter = (profile.firstName || "A").charAt(0).toUpperCase();
  const isWideView =
    activeSub === "usage" ||
    activeSub === "wallet" ||
    activeSub === "teams" ||
    activeSub === "profile";

  const previewBrand = detectCardBrand(cardNumber || "4242");
  const previewDigits =
    cardNumber.trim() || "•••• •••• •••• ••••";

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-sky-100/75 via-slate-100/90 to-indigo-100/70 px-4 py-8 sm:px-8 sm:py-10 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900/95 dark:to-sky-950/60">
      {/* Top-Right Circular Close (X) Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close settings"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-xs backdrop-blur-md hover:bg-white dark:bg-slate-800/85 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className={`mx-auto transition-all duration-200 ${
          isWideView ? "max-w-5xl" : "max-w-[560px]"
        }`}
      >
        {/* MAIN GROUPED SETTINGS LIST */}
        {activeSub === null ? (
          <>
            {/* Header Row: Avatar + Name + Email + Search Button */}
            <div className="flex items-center justify-between gap-3 pr-12 sm:pr-0">
              <div className="flex items-center gap-3.5 min-w-0">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="h-11 w-11 shrink-0 rounded-full object-cover border border-white/80 shadow-xs"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-300/80 font-display text-base font-extrabold text-slate-900 dark:bg-sky-500/30 dark:text-sky-100">
                    {initialLetter}
                  </div>
                )}
                <div className="min-w-0">
                  <h1 className="truncate font-display text-xl font-extrabold text-slate-950 dark:text-white leading-tight">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                    {profile.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSearch((v) => !v);
                  setSearchQuery("");
                }}
                aria-label="Search settings"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow-xs hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {showSearch && (
              <div className="mt-4">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter settings..."
                  className="w-full rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/90 dark:text-white dark:placeholder:text-slate-400"
                />
              </div>
            )}

            <div className="mt-6 space-y-4">
              {/* Group 1: alphado (no 'pro') + Upgrade + Usage and plan */}
              {(matches("alphado") || matches("Usage and plan")) && (
                <div className="overflow-hidden rounded-[26px] border border-white/80 bg-white/80 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/85">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
                      alphado
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSub("usage")}
                      className="rounded-full bg-slate-950 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Upgrade
                    </button>
                  </div>

                  <div className="h-px bg-slate-200/70 dark:bg-slate-800" />

                  <button
                    type="button"
                    onClick={() => setActiveSub("usage")}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 hover:bg-white/70 dark:text-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <span>Usage and plan</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              )}

              {/* Group 2: Profile, Scheduled tasks, Accounts, Wallet, Teams */}
              {accountItems.some((item) => matches(item.label)) && (
                <div className="overflow-hidden rounded-[26px] border border-white/80 bg-white/80 shadow-xs backdrop-blur-md divide-y divide-slate-200/70 dark:border-slate-800 dark:bg-slate-900/85 dark:divide-slate-800">
                  {accountItems
                    .filter((item) => matches(item.label))
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSub(item.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 hover:bg-white/70 dark:text-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-3.5">
                            <Icon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                            <span>{item.label}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Group 3: System Preferences, Security, Submit Feedback, About */}
              {systemItems.some((item) => matches(item.label)) && (
                <div className="overflow-hidden rounded-[26px] border border-white/80 bg-white/80 shadow-xs backdrop-blur-md divide-y divide-slate-200/70 dark:border-slate-800 dark:bg-slate-900/85 dark:divide-slate-800">
                  {systemItems
                    .filter((item) => matches(item.label))
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSub(item.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 hover:bg-white/70 dark:text-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-3.5">
                            <Icon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                            <span>{item.label}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Sign Out Pill Button */}
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3.5 rounded-[22px] border border-white/60 bg-white/55 px-5 py-3.5 text-left text-sm font-semibold text-slate-800 hover:bg-white/85 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        ) : activeSub === "wallet" ? (
          /* WALLET VIEW — ADD CARD & PAYMENT METHODS */
          <div className="space-y-6 pr-2">
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Settings</span>
            </button>

            <div className="pr-10 sm:pr-12">
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Wallet &amp; Cards
                </h2>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Add and manage debit or credit cards for {profile.businessName}{" "}
                ad spend, voice calling, and top-ups.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left: Live Card Preview + Saved Cards */}
              <div className="space-y-5 lg:col-span-5">
                {/* Interactive Live Gradient Card Preview */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 p-6 text-white shadow-xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/25 blur-2xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-2xl"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="font-display text-sm font-extrabold tracking-tight text-white/90">
                      alphado
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide">
                      {previewBrand}
                    </span>
                  </div>

                  {/* Chip */}
                  <div className="relative mt-6 h-8 w-11 rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-500/90 opacity-90" />

                  <p className="relative mt-5 font-mono text-lg sm:text-xl font-bold tracking-[0.16em] text-white">
                    {previewDigits}
                  </p>

                  <div className="relative mt-6 flex items-end justify-between text-xs">
                    <div className="min-w-0 pr-3">
                      <p className="text-[10px] uppercase tracking-wider text-white/60">
                        Card Holder
                      </p>
                      <p className="mt-0.5 truncate font-bold uppercase tracking-wide">
                        {cardHolder.trim() || "YOUR NAME"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] uppercase tracking-wider text-white/60">
                        Expires
                      </p>
                      <p className="mt-0.5 font-mono font-bold">
                        {cardExpiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Saved Cards List */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Saved Cards ({savedCards.length})
                  </h3>

                  <div className="mt-3.5 space-y-2.5">
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-xs font-extrabold text-slate-950 dark:text-white">
                                {card.brand} •••• {card.last4}
                              </p>
                              {card.isDefault && (
                                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {card.holder} · Exp {card.expiry}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {!card.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultCard(card.id)}
                              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
                            >
                              Set default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(card.id)}
                            aria-label="Remove card"
                            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {savedCards.length === 0 && (
                      <p className="py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                        No cards saved yet. Add a card on the right.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Add New Card Form */}
              <form
                onSubmit={handleAddCard}
                className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                      Add New Card
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Visa, Mastercard, and Verve cards accepted
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    <Lock className="h-3 w-3" />
                    <span>Encrypted</span>
                  </span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Full name on card"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="5399 4820 1940 8821"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 font-mono text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 font-mono text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      CVV
                    </label>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="•••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 font-mono text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>
                </div>

                {cardAddedToast && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Card securely added to your wallet!</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    256-bit SSL secured · Card tokenization via Paystack
                  </p>
                  <button
                    type="submit"
                    className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Save Card</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : activeSub === "profile" ? (
          /* PROFESSIONAL PROFILE & WORKSPACES PAGE */
          <div className="space-y-6 pr-2">
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Settings</span>
            </button>

            <div className="pr-10 sm:pr-12">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Profile &amp; Workspaces
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Manage your personal identity, profile picture, and active
                business workspaces.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left: Avatar + Personal Details Form */}
              <form
                onSubmit={handleSaveProfile}
                className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5"
              >
                {/* Profile Picture Uploader */}
                <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                  <div className="relative">
                    {editAvatar ? (
                      <img
                        src={editAvatar}
                        alt="Profile avatar"
                        className="h-20 w-20 rounded-full object-cover border-2 border-sky-400/50 shadow-sm"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 font-display text-2xl font-extrabold text-white shadow-sm">
                        {(editFirst || "A").charAt(0).toUpperCase()}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      aria-label="Upload profile picture"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-950 text-white shadow-sm hover:bg-sky-600 dark:border-slate-900 cursor-pointer"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                      Profile Picture
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      JPG, PNG or WebP. Shown across your workspace &amp; team.
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 cursor-pointer"
                      >
                        {editAvatar ? "Change photo" : "Add photo"}
                      </button>
                      {editAvatar && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditAvatar("");
                            onUpdateProfile({ ...profile, avatarUrl: "" });
                          }}
                          className="rounded-full px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editable Name & Contact Fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editFirst}
                      onChange={(e) => setEditFirst(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editLast}
                      onChange={(e) => setEditLast(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editRoleTitle}
                    onChange={(e) => setEditRoleTitle(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-950 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-sky-400"
                  />
                </div>

                {profileSavedToast && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="btn-brand rounded-full px-6 py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

              {/* Right: Workspaces Manager ("Add Workspace") */}
              <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                        Workspaces
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddWorkspace((v) => !v)}
                      className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Workspace</span>
                    </button>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Switch between businesses or add a new workspace for another
                    brand.
                  </p>

                  {showAddWorkspace && (
                    <form
                      onSubmit={handleAddWorkspace}
                      className="mt-4 space-y-3 rounded-2xl border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-500/30 dark:bg-sky-950/25"
                    >
                      <input
                        type="text"
                        required
                        value={newWsName}
                        onChange={(e) => setNewWsName(e.target.value)}
                        placeholder="Workspace / Business name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <input
                        type="text"
                        value={newWsIndustry}
                        onChange={(e) => setNewWsIndustry(e.target.value)}
                        placeholder="Industry (e.g. Fashion, Real Estate)"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddWorkspace(false)}
                          className="rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-brand rounded-full px-4 py-1.5 text-xs font-bold cursor-pointer"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="mt-4 space-y-2.5">
                    {workspaces.map((ws) => {
                      const isCurrent = ws.name === profile.businessName;
                      return (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => handleSwitchWorkspace(ws)}
                          className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                            isCurrent
                              ? "border-sky-400 bg-sky-50/70 dark:border-sky-500/50 dark:bg-sky-950/35"
                              : "border-slate-200 bg-slate-50/60 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-display text-xs font-extrabold text-white dark:bg-sky-600">
                              {ws.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                                {ws.name}
                              </p>
                              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                                {ws.industry}
                              </p>
                            </div>
                          </div>

                          {isCurrent && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                              <Check className="h-3 w-3" />
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeSub === "usage" ? (
          /* USAGE & PLAN — PLATFORM CREDITS & SUBSCRIPTION PLANS */
          <div className="space-y-6 pr-2">
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Settings</span>
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3 pr-10 sm:pr-12">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Platform Credits
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {profile.businessName} · One balance for AI generation and
                  platform operations.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRefreshCredits}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${
                    refreshingCredits ? "animate-spin text-sky-500" : ""
                  }`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                Subscription plans
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Choose a workspace plan for a recurring monthly or yearly
                Platform Credit allowance.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subscriptionPlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-950/30"
                          : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-sm font-extrabold text-slate-950 dark:text-white">
                            {plan.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {plan.subtitle}
                          </p>
                        </div>
                        <span className="rounded-full bg-sky-500/12 px-2.5 py-0.5 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                          Popular
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="font-display text-xl font-extrabold text-slate-950 dark:text-white">
                          {plan.price}
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {" "}
                            /month
                          </span>
                        </p>
                        <p className="mt-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {plan.credits}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                Plan checkout and subscription management are being connected to
                Paystack. Manage cards anytime in Wallet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-white p-5 shadow-xs dark:border-sky-500/30 dark:from-sky-950/40 dark:via-slate-900 dark:to-slate-900">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  <Coins className="h-4 w-4" />
                  <span>Available Balance</span>
                </div>
                <p className="mt-3 font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                  0
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Credits available to spend right now
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-slate-400" />
                  <span>Monthly balance</span>
                </div>
                <p className="mt-3 font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                  0
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Remaining from your plan allowance
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Wallet className="h-4 w-4 text-slate-400" />
                  <span>Purchased balance</span>
                </div>
                <p className="mt-3 font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                  0
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Remaining from credit top-ups
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Activity className="h-4 w-4 text-slate-400" />
                  <span>Reserved</span>
                </div>
                <p className="mt-3 font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                  0
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Held by operations in progress
                </p>
              </div>
            </div>
          </div>
        ) : activeSub === "teams" ? (
          /* TEAMS & MEMBERS VIEW */
          <div className="space-y-6 pr-2">
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Settings</span>
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-5 pr-10 sm:pr-12 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <Users className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    Team &amp; Members
                  </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Manage who has access to {profile.businessName} and assign
                  permission levels
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span>Your role:</span>
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-extrabold tracking-wide text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  OWNER
                </span>
              </div>
            </div>

            <form
              onSubmit={handleInviteMember}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
                <UserPlus className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Invite New Team Member</span>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:border-sky-400"
                />

                <div className="relative sm:w-44">
                  <select
                    value={inviteRole}
                    onChange={(e) =>
                      setInviteRole(
                        e.target.value as "Member" | "Admin" | "Viewer"
                      )
                    }
                    aria-label="Member role"
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 pr-9 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="Member">Role: Member</option>
                    <option value="Admin">Role: Admin</option>
                    <option value="Viewer">Role: Viewer</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>

                <button
                  type="submit"
                  className="btn-brand rounded-xl px-5 py-3 text-sm font-bold whitespace-nowrap cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>

            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  Active Members ({members.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 font-display text-sm font-extrabold text-white dark:bg-sky-600">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                            {member.name}
                          </p>
                          {member.isYou && (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              You
                            </span>
                          )}
                          {member.pending && (
                            <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              Invited
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-[11px] font-extrabold tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Standard Compact Sub-Panels */
          <div className="mt-4 rounded-[26px] border border-white/80 bg-white/88 p-6 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/92">
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Settings</span>
            </button>

            {activeSub === "scheduled" && (
              <div className="mt-4 space-y-2.5">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  Scheduled Tasks
                </h2>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/60">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Daily Birthday Voice Wave
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Runs every morning at 9:00 AM
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/60">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Instagram 24/7 Reels &amp; DM Autopilot
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Active continuously
                  </p>
                </div>
              </div>
            )}

            {activeSub === "accounts" && (
              <div className="mt-4 space-y-3">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  Connected Accounts
                </h2>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Instagram Business
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {profile.igHandle}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {profile.igConnected ? "Connected" : "Not Connected"}
                  </span>
                </div>
              </div>
            )}

            {activeSub === "preferences" && (
              <div className="mt-4 space-y-3">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  System Preferences
                </h2>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Appearance
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Switch between Light and Dark mode
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 cursor-pointer"
                  >
                    {mounted && theme === "dark" ? (
                      <>
                        <Sun className="h-3.5 w-3.5 text-amber-400" />
                        <span>Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5 text-indigo-600" />
                        <span>Dark</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeSub === "security" && (
              <div className="mt-4 space-y-2.5">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  Security
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Email 6-digit verification is active on this device. All
                  customer phone numbers and call recaps remain private to your
                  workspace.
                </p>
              </div>
            )}

            {activeSub === "feedback" && (
              <div className="mt-4 space-y-3">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  Submit Feedback
                </h2>
                {feedbackSent ? (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Thank you! Your feedback has been sent to the Alphado team.
                  </p>
                ) : (
                  <>
                    <textarea
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Share an idea or tell us what we can improve..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (feedbackText.trim()) setFeedbackSent(true);
                      }}
                      className="btn-brand rounded-full px-5 py-2 text-xs font-bold cursor-pointer"
                    >
                      Send Feedback
                    </button>
                  </>
                )}
              </div>
            )}

            {activeSub === "about" && (
              <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                  About Alphado
                </h2>
                <p>
                  Alphado AI Voice Assistant &amp; 24/7 Instagram Business
                  Automation — v1.0
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
