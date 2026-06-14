"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthUser,
  UserRole,
  ROLE_REDIRECTS,
  MOCK_USERS,
  getSessionClient,
  setSessionClient,
  clearSessionClient,
  validateEmail,
  validatePassword,
} from "@/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LoginResult {
  success: boolean;
  error?: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (data: RegisterData) => Promise<LoginResult>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Track failed login attempts per email: { [email]: count }
  const [failCounts, setFailCounts] = useState<Record<string, number>>({});
  // Lock timestamps: { [email]: unlockTime }
  const [lockUntil, setLockUntil] = useState<Record<string, number>>({});

  const router = useRouter();

  // Rehydrate session on mount
  useEffect(() => {
    const stored = getSessionClient();
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      // Input validation
      const emailErr = validateEmail(email);
      if (emailErr) return { success: false, error: emailErr };
      const pwErr = validatePassword(password);
      if (pwErr) return { success: false, error: pwErr };

      const normalizedEmail = email.trim().toLowerCase();

      // Check if locked (UC-02 E1: 5 attempts → 30 min lock)
      const now = Date.now();
      const unlockAt = lockUntil[normalizedEmail] ?? 0;
      if (unlockAt > now) {
        const mins = Math.ceil((unlockAt - now) / 60000);
        return {
          success: false,
          error: `Tài khoản bị khóa. Vui lòng thử lại sau ${mins} phút.`,
        };
      }

      // Simulate API call delay
      await new Promise((r) => setTimeout(r, 600));

      // Find user in mock DB
      const found = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (!found) {
        const newCount = (failCounts[normalizedEmail] ?? 0) + 1;
        setFailCounts((prev) => ({ ...prev, [normalizedEmail]: newCount }));

        if (newCount >= 5) {
          const lockTime = Date.now() + 30 * 60 * 1000;
          setLockUntil((prev) => ({ ...prev, [normalizedEmail]: lockTime }));
          setFailCounts((prev) => ({ ...prev, [normalizedEmail]: 0 }));
          return {
            success: false,
            error:
              "Sai thông tin đăng nhập quá 5 lần. Tài khoản bị khóa 30 phút.",
          };
        }

        return {
          success: false,
          error: `Email hoặc mật khẩu không đúng. (${newCount}/5 lần)`,
        };
      }

      // Reset fail count on success
      setFailCounts((prev) => ({ ...prev, [normalizedEmail]: 0 }));

      // Build session user (omit password)
      const sessionUser: AuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role as UserRole,
        branchId: found.branchId,
        avatar: found.avatar,
      };

      setUser(sessionUser);
      setSessionClient(sessionUser);

      // Role-based redirect (UC-02 Normal Flow step 8)
      router.push(ROLE_REDIRECTS[sessionUser.role]);
      return { success: true };
    },
    [router, failCounts, lockUntil]
  );

  // ── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(
    async (data: RegisterData): Promise<LoginResult> => {
      await new Promise((r) => setTimeout(r, 800));

      const normalizedEmail = data.email.trim().toLowerCase();

      // E1: Email already registered
      const exists = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );
      if (exists) {
        return {
          success: false,
          error: "Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.",
        };
      }

      // Create new customer (in real app this hits API)
      const newUser: AuthUser = {
        id: `c${Date.now()}`,
        name: `${data.lastName} ${data.firstName}`.trim(),
        email: normalizedEmail,
        role: "customer",
      };

      // Persist to mock DB (session only)
      MOCK_USERS.push({ ...newUser, password: data.password });

      setUser(newUser);
      setSessionClient(newUser);

      return { success: true };
    },
    []
  );

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null);
    clearSessionClient();
    router.push("/login");
  }, [router]);

  // ── Update profile ────────────────────────────────────────────────────────
  const updateProfile = useCallback(
    (updates: Partial<AuthUser>) => {
      if (!user) return;
      const updated = { ...user, ...updates };
      setUser(updated);
      setSessionClient(updated);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
