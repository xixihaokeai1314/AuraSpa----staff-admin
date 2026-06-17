"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

type Tab = "login" | "register";

// Inner component that uses useSearchParams — must be inside Suspense
function LoginPageInner() {
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (!isLoading && user) {
      const from = searchParams.get("from");
      const redirects: Record<string, string> = {
        customer: "/customer",
        staff: "/staff",
        manager: "/manager",
        admin: "/admin",
      };
      router.replace(from ?? redirects[user.role] ?? "/");
    }
  }, [user, isLoading, router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-4xl animate-spin">
            autorenew
          </span>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Đang tải...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen overflow-hidden">
      <HeroPanel />
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-background overflow-y-auto px-8 md:px-14 py-10">
        <div className="w-full max-w-md stagger-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex justify-center mb-8">
            <span
              className="text-primary tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600 }}
              onClick={() => router.push("/")}
            >
              AuraSpa
            </span>
          </div>
          <div
            className="flex border-b mb-8"
            style={{ borderColor: "rgba(217,193,188,0.4)" }}
          >
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              ĐĂNG NHẬP
            </button>
            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              ĐĂNG KÝ
            </button>
          </div>
          {activeTab === "login" ? (
            <LoginForm onSwitchTab={() => setActiveTab("register")} />
          ) : (
            <RegisterForm onSwitchTab={() => setActiveTab("login")} />
          )}
        </div>
        <div className="py-6 text-center" style={{ fontSize: 12, color: "rgba(83,67,63,0.4)" }}>
          © 2024 AuraSpa. Elevated Serenity.
        </div>
      </section>
    </main>
  );
}

// Default export wraps inner component in Suspense (required for useSearchParams)
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <span className="material-symbols-outlined text-primary text-4xl animate-spin">autorenew</span>
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}

// ─── Hero Panel ───────────────────────────────────────────────────────────────
function HeroPanel() {
  return (
    <section className="relative hidden lg:flex lg:w-1/2 overflow-hidden items-end px-14 pb-14">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWEYRfVna0SrdyH4XrP3nsUbc0GWGGI-CtVW6LES2Vxy-I60UATkUsfL3PrE-mG-G0fDLTE9U_3D2ZiK3aPGzMGQKxdD7sjCqmqnIUHZUWdO8mfzTmajhsYmM02-Qmqssk5KWXzypsn0kJVVr0kv6ZCTtR-PPbY91qxZf3nWAY7o92lj3Xa_osRtyzTWQtLKyUlCwo88ouZ1GWJBvJaWzM4LMwyZJIPurkrEzAxrXxq_l4KnJKMeich56w9cU7Pp5LLnURDcw565Y"
          alt="AuraSpa Wellness"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-lg stagger-up">
        <h1
          className="text-white mb-5"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, lineHeight: 1.15, fontWeight: 600 }}
        >
          Đánh thức giác quan,<br />Tìm lại bản ngã.
        </h1>
        <div className="h-px w-20 mb-5" style={{ background: "rgba(255,255,255,0.4)" }} />
        <p
          className="text-white/85 uppercase italic"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em" }}
        >
          Vẻ đẹp được tái sinh qua sự tĩnh lặng. — AURASPA
        </p>
        <div className="mt-12 flex items-center gap-4">
          <div className="w-12 h-px bg-white/50" />
          <span className="text-white/70 font-label-sm text-label-sm tracking-widest uppercase">
            Since 2024
          </span>
        </div>
      </div>
    </section>
  );
}
