export interface WorkspaceItem {
  id: string;
  name: string;
  industry: string;
}

export interface AlphadoUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  igHandle: string;
  igConnected: boolean;
  avatarUrl?: string;
  phone?: string;
  roleTitle?: string;
  workspaces?: WorkspaceItem[];
}

const STORAGE_KEY = "alphado_user_profile";

export const DEFAULT_USER_PROFILE: AlphadoUserProfile = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex@alphado.ai",
  businessName: "Aura Studio",
  igHandle: "@aura_studio",
  igConnected: true,
  avatarUrl: "",
  phone: "+234 803 000 1240",
  roleTitle: "Founder & Owner",
  workspaces: [
    { id: "ws-default", name: "Aura Studio", industry: "E-commerce & Brand" },
  ],
};

export function saveUserProfile(profile: AlphadoUserProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage quota errors
  }
}

export function loadUserProfile(): AlphadoUserProfile {
  if (typeof window === "undefined") return DEFAULT_USER_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PROFILE;
    const parsed = JSON.parse(raw) as Partial<AlphadoUserProfile>;
    const businessName =
      parsed.businessName || DEFAULT_USER_PROFILE.businessName;
    return {
      firstName: parsed.firstName || DEFAULT_USER_PROFILE.firstName,
      lastName: parsed.lastName || DEFAULT_USER_PROFILE.lastName,
      email: parsed.email || DEFAULT_USER_PROFILE.email,
      businessName,
      igHandle: parsed.igHandle || DEFAULT_USER_PROFILE.igHandle,
      igConnected:
        typeof parsed.igConnected === "boolean"
          ? parsed.igConnected
          : DEFAULT_USER_PROFILE.igConnected,
      avatarUrl: parsed.avatarUrl || "",
      phone: parsed.phone || DEFAULT_USER_PROFILE.phone,
      roleTitle: parsed.roleTitle || DEFAULT_USER_PROFILE.roleTitle,
      workspaces:
        parsed.workspaces && parsed.workspaces.length > 0
          ? parsed.workspaces
          : [
              {
                id: "ws-primary",
                name: businessName,
                industry: "Primary Workspace",
              },
            ],
    };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function clearUserProfile() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
