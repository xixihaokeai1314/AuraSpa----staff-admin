"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const NAV = [
  { label: "Lịch trình & Phòng", href: "/staff", icon: "calendar_view_day" },
  { label: "Khách vãng lai", href: "/staff/walkin", icon: "person_add" },
  { label: "Khách hàng", href: "/staff/customers", icon: "group" },
  { label: "Hồ sơ sức khỏe", href: "/staff/health", icon: "medical_information" },
  { label: "Tư vấn trực tuyến", href: "/staff/consult", icon: "chat", badge: 2 },
  { label: "Đăng ký lịch làm", href: "/staff/schedule", icon: "edit_calendar" },
  { label: "Tạo hóa đơn", href: "/staff/invoice", icon: "receipt_long" },
  { label: "Kho vật tư", href: "/staff/inventory", icon: "inventory_2" },
  { label: "Tài khoản", href: "/staff/account", icon: "manage_accounts" },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout navItems={NAV} title="Nhân viên">{children}</DashboardLayout>;
}
