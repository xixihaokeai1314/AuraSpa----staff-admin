"use client";
import Link from "next/link";
import { BRANCHES, STAFF_LIST, MONTHLY_REVENUE, SERVICES, PROMOTIONS, formatCurrency } from "@/lib/mock-data";
import KpiCard from "@/components/dashboard/KpiCard";

export default function AdminDashboard() {
  const totalRevenue = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1].revenue;
  const totalProfit = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1].profit;
  const activeBranches = BRANCHES.filter((b) => b.status === "active").length;
  const totalStaff = STAFF_LIST.filter((s) => s.status === "active").length;
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

  return (
    <div className="p-6 max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Báo cáo Chiến lược Toàn diện</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Dữ liệu cập nhật: {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} — Hôm nay
          </p>
        </div>
        <Link
          href="/admin/services"
          className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90 w-fit"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Khởi tạo chiến lược
        </Link>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Lợi nhuận tháng 6" value={formatCurrency(totalProfit)} icon="payments" badge="+18.2%" badgeColor="green" iconBg="bg-primary/10 text-primary" />
        <KpiCard title="Doanh thu tháng 6" value={formatCurrency(totalRevenue)} icon="account_balance" badge="+12%" badgeColor="green" iconBg="bg-secondary-container/30 text-secondary" />
        <KpiCard title="Chi nhánh hoạt động" value={`${activeBranches}/${BRANCHES.length}`} icon="storefront" badgeColor="default" iconBg="bg-tertiary-fixed/30 text-tertiary" />
        <KpiCard title="Chỉ số CSAT" value="94%" icon="star" badge="Rất tốt" badgeColor="green" iconBg="bg-secondary-container/30 text-secondary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-outline-variant/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Phân tích hiệu suất đa chi nhánh</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Doanh thu & Lợi nhuận H1/2024</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary" />Doanh thu</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-secondary-container" />Lợi nhuận</span>
            </div>
          </div>
          <div className="relative h-56 flex items-end gap-4 px-2 border-b border-outline-variant/20 pb-4 mb-4">
            {MONTHLY_REVENUE.map((m) => {
              const revH = Math.round((m.revenue / maxRevenue) * 100);
              const profH = Math.round((m.profit / maxRevenue) * 100);
              return (
                <div key={m.month} className="flex-1 flex items-end gap-1 group">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(m.revenue)}
                    </span>
                    <div className="w-full rounded-t bg-primary/30 hover:bg-primary transition-colors cursor-pointer" style={{ height: `${revH * 2}px` }} />
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs opacity-0" />
                    <div className="w-full rounded-t bg-secondary-container hover:opacity-80 transition-opacity cursor-pointer" style={{ height: `${profH * 2}px` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-2">
            {MONTHLY_REVENUE.map((m) => (
              <span key={m.month} className="font-label-sm text-label-sm text-on-surface-variant font-bold flex-1 text-center">{m.month}</span>
            ))}
          </div>

          {/* Bottom summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-outline-variant/10">
            {[
              { label: "Doanh thu T6", value: formatCurrency(MONTHLY_REVENUE[5].revenue), sub: "+5.2% vs T5" },
              { label: "Biên lợi nhuận", value: `${Math.round((totalProfit / totalRevenue) * 100)}%`, sub: "Hạng A toàn hệ thống" },
              { label: "Tổng lịch hẹn H1", value: MONTHLY_REVENUE.reduce((s, m) => s + m.appointments, 0).toLocaleString(), sub: "lịch hẹn" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{s.label}</p>
                <p className="font-headline-sm text-headline-sm text-primary font-bold">{s.value}</p>
                <p className="text-xs text-green-600 font-bold mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Chiến lược đề xuất</h3>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { title: "Tối ưu nhân sự giờ cao điểm", desc: "Dự báo nhu cầu tăng 25% vào tối Thứ 6 tại Q.1. Đề xuất điều phối 2 KTV từ chi nhánh Thảo Điền.", badge: "Quan trọng", color: "border-primary" },
              { title: "Retargeting Khách hàng VIP", desc: "142 khách VIP chưa quay lại 30 ngày. Đề xuất gửi ưu đãi giảm 15%.", badge: "Marketing", color: "border-secondary" },
              { title: "Mở rộng danh mục Detox", desc: "Tìm kiếm 'Detox Da' tăng 40%. Đề xuất gói Sauna & Facial Detox tháng 7.", badge: "Xu hướng", color: "border-outline" },
            ].map((i) => (
              <div key={i.title} className={`bg-white p-4 rounded-xl border-l-4 ${i.color} shadow-sm hover:translate-x-1 transition-transform cursor-pointer`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-label-md text-label-md text-on-surface font-bold text-sm">{i.title}</h4>
                  <span className="text-xs font-bold bg-surface-container px-2 py-0.5 rounded text-on-surface-variant uppercase shrink-0 ml-2">{i.badge}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-3 bg-on-surface text-white font-label-md text-label-md rounded-xl hover:opacity-90 transition-opacity text-sm">
            Xác nhận & Áp dụng
          </button>
        </div>
      </div>

      {/* Branches status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Hiện trạng chi nhánh</h3>
          <div className="space-y-4">
            {BRANCHES.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border border-outline-variant/20 hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{b.name}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status === "active" ? "bg-green-50 text-green-700" : "bg-secondary-container text-on-secondary-container"}`}>
                    {b.status === "active" ? "Online" : "Bảo trì"}
                  </span>
                </div>
                {b.status === "active" ? (
                  <>
                    <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                      <span>Công suất thực tế</span><span className="font-bold">{b.capacity}%</span>
                    </div>
                    <div className="h-1.5 bg-surface-container rounded-full overflow-hidden mb-2">
                      <div className="bg-primary h-full" style={{ width: `${b.capacity}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">{b.address}</span>
                      <span className="font-bold text-primary">{formatCurrency(b.revenue)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-on-surface-variant">Dự kiến mở lại: 15/08/2024 · {b.address}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          {[
            { label: "Quản lý chi nhánh", href: "/admin/branches", icon: "storefront", desc: "Thêm, sửa, đóng chi nhánh" },
            { label: "Danh mục dịch vụ", href: "/admin/services", icon: "spa", desc: `${SERVICES.filter((s) => s.status === "active").length} dịch vụ đang hoạt động` },
            { label: "Khuyến mãi", href: "/admin/promotions", icon: "sell", desc: `${PROMOTIONS.filter((p) => p.status === "active").length} chương trình đang chạy` },
          ].map((q) => (
            <Link key={q.href} href={q.href}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-outline-variant/20 hover:border-primary transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{q.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-bold">{q.label}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{q.desc}</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors group-hover:translate-x-1 transform">arrow_forward</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
