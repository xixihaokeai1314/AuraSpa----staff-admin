"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

interface Props {
  navItems: NavItem[];
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ navItems, children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const initials = user?.name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase() ?? "?";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-on-surface/30 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed md:relative z-50 flex flex-col h-full w-72 bg-surface border-r border-outline-variant/30 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-outline-variant/20">
          <div className="flex items-center gap-3 mb-5">
            <span className="material-symbols-outlined text-primary text-3xl">spa</span>
            <span
              className="text-primary tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600 }}
            >
              AuraSpa
            </span>
          </div>
          {/* User card */}
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="font-label-md text-label-md text-on-surface truncate">{user?.name}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{title}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all font-label-md text-label-md ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto bg-error text-on-error text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-outline-variant/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-error-container/30 hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className={`h-16 flex items-center justify-between px-6 border-b border-outline-variant/30 bg-surface shrink-0 transition-shadow ${
            scrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-on-surface-variant"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span>AuraSpa</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-bold">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date */}
            <span className="hidden lg:block font-label-sm text-label-sm text-on-surface-variant">
              {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}
            </span>
            {/* Notifications */}
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            </button>
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => router.push(`/${user?.role === "owner" ? "admin" : user?.role}/account`)}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-container-lowest">
          {children}
        </main>
      </div>
    </div>
  );
}
