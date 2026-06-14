"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const NAV = [
  { label: "Tổng quan", href: "/admin", icon: "dashboard" },
  { label: "Doanh thu", href: "/admin/revenue", icon: "bar_chart" },
  { label: "Xếp hạng hiệu suất", href: "/admin/rankings", icon: "leaderboard" },
  { label: "Quản lý chi nhánh", href: "/admin/branches", icon: "storefront" },
  { label: "Branch Manager", href: "/admin/managers", icon: "badge" },
  { label: "Danh mục dịch vụ", href: "/admin/services", icon: "spa" },
  { label: "Khuyến mãi", href: "/admin/promotions", icon: "sell" },
  { label: "Nhật ký thông báo", href: "/admin/notifications", icon: "notifications" },
  { label: "Tài khoản", href: "/admin/account", icon: "manage_accounts" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout navItems={NAV} title="HQ Command Center">{children}</DashboardLayout>;
}
