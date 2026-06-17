"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountDropdown from "@/components/auth/AccountDropdown";
import Footer from "@/components/Footer";
import { TODAY_APPOINTMENTS, SERVICES, formatCurrency } from "@/lib/mock-data";

// Mock treatment history
const TREATMENT_HISTORY = [
  { id: "h1", service: "Massage Thụy Điển", date: "15/10/2024", branch: "AuraSpa Quận 1", points: 120, status: "completed" },
  { id: "h2", service: "Chăm sóc da mặt Basic", date: "02/10/2024", branch: "AuraSpa Quận 1", points: 80, status: "completed" },
  { id: "h3", service: "Ngâm Khoáng Nóng", date: "18/09/2024", branch: "AuraSpa Thảo Điền", points: 100, status: "completed" },
];

const QUICK_ACTIONS = [
  { icon: "event_available", label: "Đặt lịch mới", href: "/book" },
  { icon: "near_me", label: "Chi nhánh gần bạn", href: "/branches" },
  { icon: "history", label: "Lịch sử liệu trình", href: "/customer/bookings" },
  { icon: "card_membership", label: "Quyền lợi thành viên", href: "/membership" },
];

export default function CustomerHome() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ").pop() ?? "bạn";

  // Next upcoming appointment
  const upcomingAppt = TODAY_APPOINTMENTS.find(
    (a) => a.customerId === (user?.id ?? "c001") && (a.status === "confirmed" || a.status === "checked_in")
  ) ?? TODAY_APPOINTMENTS[0];

  // Personalized service suggestions (top 3 by bookings)
  const suggestedServices = [...SERVICES]
    .filter((s) => s.status === "active")
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 3);

  const memberPoints = 2450;
  const pointsToNext = 550;
  const progressPct = Math.round((memberPoints / (memberPoints + pointsToNext)) * 100);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 h-16 flex items-center justify-between px-gutter">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>language</span>
          <Link href="/customer" className="font-headline-md text-headline-sm md:text-headline-md text-primary tracking-tight">
            AuraSpa
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/customer" className="font-label-md text-label-md text-primary font-bold">Tổng quan</Link>
          <Link href="/services" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Dịch vụ</Link>
          <Link href="/customer/bookings" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Lịch hẹn</Link>
          <Link href="/promotions" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Ưu đãi</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full transition-colors">
            notifications
          </button>
          <AccountDropdown />
        </div>
      </header>

      <main className="pt-24 pb-32 px-gutter max-w-container-max mx-auto">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-label-md text-label-md text-secondary tracking-[0.2em] uppercase mb-2">
                Chào mừng trở lại
              </p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Chào {firstName},
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                Hôm nay là một ngày tuyệt vời để chăm sóc bản thân. Không gian thư giãn tại AuraSpa đã sẵn sàng đón chờ bạn.
              </p>
            </div>

            {/* Membership Card */}
            <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-outline-variant/20 shadow-sm min-w-[320px] shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-on-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1", fontSize: 24 }}
                >
                  stars
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Hạng Thành Viên &amp; Điểm thưởng
                </p>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="font-headline-sm text-headline-sm text-primary">Gold Member</p>
                  <p className="font-body-lg font-bold text-secondary">{memberPoints.toLocaleString()} pts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:bg-primary-container hover:text-on-primary-container transition-all group text-center"
            >
              <span
                className="material-symbols-outlined text-3xl mb-2 text-primary group-hover:text-on-primary-container transition-colors"
                style={{ fontSize: 32 }}
              >
                {action.icon}
              </span>
              <span className="font-label-md text-label-md">{action.label}</span>
            </Link>
          ))}
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Upcoming Appointment */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10">
            {/* Background icon */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: 200, fontVariationSettings: "'wght' 100" }}
              >
                spa
              </span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-primary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}>
                  calendar_month
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider">Lịch hẹn sắp tới</span>
              </div>
              <h3 className="font-headline-lg text-headline-md md:text-headline-lg mb-4">
                {upcomingAppt.service}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Thời gian</p>
                  <p className="font-body-md font-semibold">{upcomingAppt.time} · {upcomingAppt.date}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Kỹ thuật viên</p>
                  <p className="font-body-md font-semibold">{upcomingAppt.technicianName}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Phòng</p>
                  <p className="font-body-md font-semibold">{upcomingAppt.room}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
                  Dời lịch
                </button>
                <Link
                  href="/customer/bookings"
                  className="border border-primary text-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors"
                >
                  Chi tiết
                </Link>
              </div>
            </div>
          </div>

          {/* Right column: Points + Birthday offer */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Points Progress */}
            <div className="bg-secondary-container/30 p-6 rounded-xl border border-secondary/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-label-md text-label-md font-bold text-secondary">Tiến trình thăng hạng</h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {pointsToNext} pts tới Platinum
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-3 font-label-sm text-label-sm text-on-surface-variant">
                Bạn đã hoàn thành {progressPct}% mục tiêu quý này!
              </p>
            </div>

            {/* Birthday Offer */}
            <div className="bg-primary-container p-6 rounded-xl text-on-primary-container flex-1 flex flex-col justify-between">
              <div>
                <span
                  className="material-symbols-outlined text-4xl mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  redeem
                </span>
                <h4 className="font-headline-sm text-headline-sm mb-2">Ưu đãi sinh nhật</h4>
                <p className="font-body-md opacity-90">
                  Giảm ngay 20% cho gói chăm sóc da mặt chuyên sâu.
                </p>
              </div>
              <Link
                href="/book?promotion=BIRTHDAY20"
                className="mt-6 flex items-center gap-2 font-label-md text-label-md underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Sử dụng ngay
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Personalized Service Suggestions */}
          <div className="lg:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md">Gợi ý dựa trên sở thích</h3>
                <p className="font-body-md text-on-surface-variant">
                  Phân tích từ {TREATMENT_HISTORY.length} lần trị liệu gần nhất của bạn
                </p>
              </div>
              <Link
                href="/services"
                className="font-label-md text-label-md text-primary flex items-center gap-1 hover:underline"
              >
                Xem tất cả
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestedServices.map((svc, idx) => (
                <div key={svc.id} className="group cursor-pointer">
                  {/* Placeholder image area */}
                  <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-surface-container relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-outline-variant"
                        style={{ fontSize: 64, fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                      >
                        spa
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30">
                      <p className="font-label-sm text-label-sm text-primary">
                        {idx === 0 ? "Dành cho bạn" : idx === 1 ? "Phổ biến" : "Mới"}
                      </p>
                    </div>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm mb-1 group-hover:text-primary transition-colors">
                    {svc.name}
                  </h4>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4">
                    {svc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-primary">
                      {svc.duration} Phút · {formatCurrency(svc.price)}
                    </span>
                    <Link
                      href={`/book?serviceId=${svc.id}`}
                      className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearest Branch */}
          <div className="lg:col-span-12">
            <div className="bg-surface-container-high rounded-xl p-8 border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-3 text-primary shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <span className="font-label-md text-label-md uppercase tracking-wider">Chi nhánh gợi ý</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-headline-sm mb-1">AuraSpa Quận 1</h4>
                <p className="font-body-md text-on-surface-variant">12 Lê Thánh Tôn, Bến Nghé</p>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mt-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                  <span>Đang mở cửa · Còn phòng trống</span>
                </div>
              </div>
              <Link
                href="/book?branchId=b001"
                className="shrink-0 bg-surface text-primary border border-primary px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all"
              >
                Đặt chỗ ngay
              </Link>
            </div>
          </div>

          {/* Treatment History */}
          <div className="lg:col-span-12 mt-4">
            <h3 className="font-headline-md text-headline-md mb-8">Lịch sử liệu trình gần đây</h3>
            <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-high">
                    <tr>
                      {["Dịch vụ", "Ngày thực hiện", "Chi nhánh", "Điểm tích lũy", "Trạng thái"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {TREATMENT_HISTORY.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-surface-container/50 transition-colors"
                      >
                        <td className="px-6 py-5 font-body-md font-semibold">{item.service}</td>
                        <td className="px-6 py-5 font-body-md text-on-surface-variant">{item.date}</td>
                        <td className="px-6 py-5 font-body-md text-on-surface-variant">{item.branch}</td>
                        <td className="px-6 py-5 font-body-md text-secondary font-bold">
                          +{item.points} pts
                        </td>
                        <td className="px-6 py-5">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            Hoàn tất
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 flex justify-center border-t border-outline-variant/20">
                <Link
                  href="/customer/bookings"
                  className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                >
                  Xem toàn bộ lịch sử
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30">
        <Link href="/customer" className="flex flex-col items-center justify-center text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}>dashboard</span>
          <span className="font-label-sm text-label-sm" style={{ fontSize: 10 }}>Tổng quan</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>spa</span>
          <span className="font-label-sm text-label-sm" style={{ fontSize: 10 }}>Dịch vụ</span>
        </Link>
        <Link href="/customer/bookings" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>event_note</span>
          <span className="font-label-sm text-label-sm" style={{ fontSize: 10 }}>Lịch hẹn</span>
        </Link>
        <Link href="/customer/account" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>account_circle</span>
          <span className="font-label-sm text-label-sm" style={{ fontSize: 10 }}>Hồ sơ</span>
        </Link>
      </nav>

      {/* Floating booking button */}
      <Link href="/book" className="fixed bottom-24 right-6 md:bottom-8 z-40">
        <button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center group hover:scale-110 transition-all">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
          <span className="absolute right-full mr-4 bg-primary text-on-primary px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-label-md text-label-md">
            Đặt lịch nhanh
          </span>
        </button>
      </Link>
    </div>
  );
}
