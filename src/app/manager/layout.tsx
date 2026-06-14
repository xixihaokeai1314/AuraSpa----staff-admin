"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const NAV = [
  { label: "Tổng quan", href: "/manager", icon: "dashboard" },
  { label: "Lịch hẹn hôm nay", href: "/manager/bookings", icon: "event_note" },
  { label: "Quản lý nhân viên", href: "/manager/staff", icon: "badge" },
  { label: "Phân công ca làm", href: "/manager/shifts", icon: "calendar_month" },
  { label: "Phân công lại KTV", href: "/manager/reassign", icon: "swap_horiz" },
  { label: "Cấu hình đặt lịch", href: "/manager/slots", icon: "tune" },
  { label: "Khiếu nại", href: "/manager/complaints", icon: "report", badge: 2 },
  { label: "Tồn kho", href: "/manager/inventory", icon: "inventory" },
  { label: "Báo cáo hiệu suất", href: "/manager/reports", icon: "bar_chart" },
  { label: "Tài khoản", href: "/manager/account", icon: "manage_accounts" },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout navItems={NAV} title="Quản lý chi nhánh">{children}</DashboardLayout>;
}
