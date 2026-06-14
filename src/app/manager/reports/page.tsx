"use client";
import { TODAY_APPOINTMENTS, STAFF_LIST, MONTHLY_REVENUE, formatCurrency } from "@/lib/mock-data";

export default function ManagerReports() {
  const totalRevenue = MONTHLY_REVENUE.reduce((s, m) => s + m.revenue, 0);
  const totalProfit = MONTHLY_REVENUE.reduce((s, m) => s + m.profit, 0);
  const totalAppts = MONTHLY_REVENUE.reduce((s, m) => s + m.appointments, 0);
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-md text-headline-md text-primary">Báo cáo hiệu suất (UC-31)</h1>
        <button className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full font-label-md text-label-md hover:bg-primary/5 text-sm">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>Xuất báo cáo
        </button>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng doanh thu H1/2024", value: formatCurrency(totalRevenue), icon: "monetization_on", color: "text-primary" },
          { label: "Tổng lợi nhuận H1/2024", value: formatCurrency(totalProfit), icon: "trending_up", color: "text-green-600" },
          { label: "Tổng lịch hẹn", value: `${totalAppts.toLocaleString()}`, icon: "calendar_month", color: "text-secondary" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-6 border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-3">
              <span className={`material-symbols-outlined ${k.color}`} style={{ fontSize: 24 }}>{k.icon}</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{k.label}</p>
            </div>
            <p className={`font-headline-md text-headline-md font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl p-6 border border-outline-variant/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Doanh thu theo tháng</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Chi nhánh Quận 1 · H1/2024</p>
        </div>
        <div className="flex items-end gap-4 h-48 px-2">
          {MONTHLY_REVENUE.map((m) => {
            const heightPct = Math.round((m.revenue / maxRevenue) * 100);
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="font-label-sm text-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                  {formatCurrency(m.revenue)}
                </span>
                <div
                  className="w-full rounded-t-lg bg-primary/30 hover:bg-primary transition-colors cursor-pointer"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff performance table */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Hiệu suất nhân viên</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>{["Nhân viên", "Chuyên môn", "Số buổi", "Đánh giá TB", "Xếp hạng"].map((h) => (
              <th key={h} className="px-5 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {[...STAFF_LIST.filter((s) => s.branchId === "b001")].sort((a, b) => b.servicesCompleted - a.servicesCompleted).map((s, idx) => (
              <tr key={s.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant"}`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-bold">{s.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-label-sm text-label-sm text-on-surface-variant">{s.specialization}</td>
                <td className="px-5 py-4 font-label-md text-label-md text-on-surface font-bold">{s.servicesCompleted}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">{s.rating > 0 ? s.rating : "—"}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {idx === 0 && <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-1 rounded-full">🏆 Top</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
