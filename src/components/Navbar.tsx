"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountDropdown from "@/components/auth/AccountDropdown";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/branches", label: "Chi nhánh" },
  { href: "/promotions", label: "Ưu đãi" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-gutter h-16 max-w-container-max mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-headline-md text-headline-md text-primary tracking-tight hover:opacity-80 transition-opacity"
          >
            AuraSpa
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-md text-label-md transition-colors ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden md:inline-flex items-center gap-1 bg-primary text-on-primary px-5 py-2 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_month</span>
            Đặt lịch
          </Link>
          <AccountDropdown />
        </div>
      </div>
    </nav>
  );
}
