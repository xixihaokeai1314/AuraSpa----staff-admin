"use client";
import Link from "next/link";
import { TODAY_APPOINTMENTS, STAFF_LIST, INVENTORY, COMPLAINTS, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/mock-data";
import KpiCard from "@/components/dashboard/KpiCard";

export default function ManagerDashboard() {
  const todayRevenue = TODAY_APPOINTMENTS.filter((a) => a.status === "completed").reduce((s, a) => s + a.price, 0);
  const pendingAppts = TODAY_APPOINTMENTS.filter((a) => a.status === "confirmed").length;
  const activeStaff = STAFF_LIST.filter((s) => s.branchId === "b001").length;
  const lowStock = INVENTORY.filter((i) => i.quantity <= i.minThreshold).length;
  const openComplaints = COMPLAINTS.filter((c) => c.status === "open" || c.status === "in_progress").length;

  return (
    <div className="p-6 max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Bảng điều khiển</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Chi nhánh Quận 1 — Hệ thống đang hoạt động ổn định</p>
        </div>
        <Link href="/manager/shifts" className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity w-fit">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Phân công ca mới
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/manager/reports"><KpiCard title="Doanh thu hôm nay" value={formatCurrency(todayRevenue)} icon="monetization_on" badge="+12.5%" badgeColor="green" iconBg="bg-primary/10 text-primary" /></Link>
        <Link href="/manager/bookings"><KpiCard title="Lịch hẹn hôm nay" value={`${TODAY_APPOINTMENTS.length} lịch`} icon="calendar_today" badge={`${pendingAppts} chờ`} badgeColor="yellow" iconBg="bg-secondary-container/30 text-secondary" /></Link>
        <Link href="/manager/shifts"><KpiCard title="Nhân sự đang trực" value={`${activeStaff}/${STAFF_LIST.length} người`} icon="groups" badgeColor="default" iconBg="bg-tertiary-fixed/30 text-tertiary" /></Link>
        <Link href="/manager/inventory"><KpiCard title="Tồn kho cảnh báo" value={`${lowStock} mặt hàng`} icon="warning" badge={lowStock > 0 ? "Cần nhập" : "Ổn"} badgeColor={lowStock > 0 ? "red" : "green"} iconBg="bg-error-container/30 text-error" /></Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments list */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-outline-variant/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Lịch hẹn hôm nay</h3>
            <Link href="/manager/bookings" className="font-label-md text-label-md text-primary hover:underline">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {TODAY_APPOINTMENTS.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="w-14 text-center shrink-0">
                  <p className="font-label-md text-label-md text-primary font-bold">{a.time}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{a.duration}p</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold truncate">{a.customerName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{a.service} · KTV: {a.technicianName}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Complaints */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Khiếu nại</h3>
              {openComplaints > 0 && (
                <span className="bg-error text-on-error text-xs font-bold px-2 py-0.5 rounded-full">{openComplaints} mới</span>
              )}
            </div>
            {COMPLAINTS.filter((c) => c.branchId === "b001").slice(0, 3).map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-outline-variant/20 mb-2">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-label-md text-label-md text-on-surface font-bold text-sm">{c.customerName}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>{getStatusLabel(c.status)}</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2">{c.description}</p>
              </div>
            ))}
            <Link href="/manager/complaints" className="text-primary font-label-md text-label-md text-sm hover:underline block text-center mt-2">
              Xem tất cả
            </Link>
          </div>

          {/* Staff on duty */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/20">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Nhân sự đang trực</h3>
            <div className="space-y-2">
              {STAFF_LIST.filter((s) => s.branchId === "b001").map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                    {s.name.split(" ").pop()?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface text-sm font-bold truncate">{s.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">{s.specialization}</p>
                  </div>
                  <span className="text-xs font-bold text-green-600">⭐ {s.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Low stock alert */}
      {lowStock > 0 && (
        <div className="bg-error-container/20 border border-error-container rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-error" style={{ fontSize: 24 }}>warning</span>
            <h3 className="font-headline-sm text-headline-sm text-error">Cảnh báo tồn kho thấp</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INVENTORY.filter((i) => i.quantity <= i.minThreshold).map((i) => (
              <div key={i.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold text-sm">{i.name}</p>
                  <p className="text-xs text-on-surface-variant">{i.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-error text-sm">{i.quantity}/{i.maxStock} {i.unit}</p>
                  <Link href="/manager/inventory" className="text-xs text-primary hover:underline">Nhập hàng</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
