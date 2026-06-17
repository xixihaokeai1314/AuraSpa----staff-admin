"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ROLE_LABELS: Record<string, string> = {
  customer: "Khách hàng",
  staff: "Nhân viên",
  manager: "Quản lý chi nhánh",
  admin: "Chủ sở hữu",
};

const ROLE_HOME: Record<string, string> = {
  customer: "/customer",
  staff: "/staff",
  manager: "/manager",
  admin: "/admin",
};

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Tài khoản"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-outline-variant"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs border border-outline-variant">
            {initials}
          </div>
        )}
        <span className="hidden md:block font-label-md text-label-md text-on-surface">
          {user.name.split(" ").pop()}
        </span>
        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-surface border border-outline-variant/40 rounded-xl shadow-lg z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-outline-variant/30 bg-surface-container-low">
            <p className="font-label-md text-label-md text-on-surface">{user.name}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{user.email}</p>
            <span
              className="inline-block mt-1 px-2 py-0.5 rounded-full text-on-primary bg-primary"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em" }}
            >
              {ROLE_LABELS[user.role]}
            </span>
          </div>

          <ul className="py-2">
            <li>
              <Link
                href={ROLE_HOME[user.role] ?? "/"}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors font-body-md text-body-md text-on-surface"
              >
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>home</span>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href={`${ROLE_HOME[user.role]}/account`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors font-body-md text-body-md text-on-surface"
              >
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>manage_accounts</span>
                Quản lý tài khoản
              </Link>
            </li>
            {user.role === "customer" && (
              <li>
                <Link
                  href="/customer/bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors font-body-md text-body-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>calendar_month</span>
                  Lịch hẹn của tôi
                </Link>
              </li>
            )}
          </ul>

          <div className="border-t border-outline-variant/30 py-2">
            <button
              onClick={() => { setOpen(false); logout(); }}
              className="flex items-center gap-3 px-4 py-3 w-full hover:bg-error-container/30 transition-colors font-body-md text-body-md text-error"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
