// Auth utilities — simulates JWT-based auth via cookies (no real backend)
// In production, replace with real API calls

export type UserRole = "customer" | "staff" | "manager" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string;
  avatar?: string;
}

const COOKIE_KEY = "auraspa_session";

// ─── Mock user database ───────────────────────────────────────────────────────
export const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: "c001",
    name: "Nguyễn Anh Đào",
    email: "customer@auraspa.vn",
    password: "Customer1",
    role: "customer",
    avatar: "",
  },
  {
    id: "s001",
    name: "Minh Anh",
    email: "staff@auraspa.vn",
    password: "Staff123",
    role: "staff",
    branchId: "b001",
    avatar: "",
  },
  {
    id: "m001",
    name: "Thanh Hằng",
    email: "manager@auraspa.vn",
    password: "Manager1",
    role: "manager",
    branchId: "b001",
    avatar: "",
  },
  {
    id: "o001",
    name: "Admin AuraSpa",
    email: "admin@auraspa.vn",
    password: "Owner123",
    role: "admin",
    avatar: "",
  },
];

// ─── Role → redirect map ──────────────────────────────────────────────────────
export const ROLE_REDIRECTS: Record<UserRole, string> = {
  customer: "/customer",
  staff: "/staff",
  manager: "/manager",
  admin: "/admin",
};

// ─── Client-side helpers (localStorage simulation) ────────────────────────────
export function getSessionClient(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSessionClient(user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_KEY, JSON.stringify(user));
  // Also set a plain cookie so middleware can read role
  const opts = [`path=/`, `max-age=${60 * 60 * 24}`, `SameSite=Lax`];
  if (window.location.protocol === "https:") opts.push("Secure");
  document.cookie = `auraspa_role=${user.role}; ${opts.join("; ")}`;
  document.cookie = `auraspa_uid=${user.id}; ${opts.join("; ")}`;
}

export function clearSessionClient(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_KEY);
  const delOpts = `path=/; max-age=0; SameSite=Lax`;
  document.cookie = `auraspa_role=; ${delOpts}`;
  document.cookie = `auraspa_uid=; ${delOpts}`;
}

// ─── Validation helpers ────────────────────────────────────────────────────────
export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Vui lòng nhập email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Email không hợp lệ.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa.";
  if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường.";
  if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ số.";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return "Vui lòng nhập số điện thoại.";
  // Allow spaces and dashes in input (e.g. "0912-345-678" or "+84 912 345 678")
  if (!/^(0|\+84)[0-9]{9}$/.test(phone.replace(/[\s-]/g, "")))
    return "Số điện thoại không hợp lệ. VD: 0912345678";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Vui lòng nhập họ và tên.";
  if (name.trim().length < 2) return "Họ và tên phải có ít nhất 2 ký tự.";
  return null;
}

export function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const map = [
    { label: "Yếu", color: "#ba1a1a" },
    { label: "Trung bình", color: "#EF9F27" },
    { label: "Mạnh", color: "#1D9E75" },
    { label: "Rất mạnh", color: "#713323" },
  ];
  return { score, ...map[Math.max(0, score - 1)] };
}
