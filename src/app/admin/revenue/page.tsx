"use client";
import { useState } from "react";
import { MONTHLY_REVENUE, BRANCHES, formatCurrency } from "@/lib/mock-data";

export default function AdminRevenue() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));
  const totalRevenue = MONTHLY_REVENUE.reduce((s, m) => s + m.revenue, 0);
  const totalProfit = MONTHLY_REVENUE.reduce((s, m) => s + m.profit, 0);
  const totalCost = MONTHLY_REVENUE.reduce((s, m) => s + m.cost, 0);

  const financialTable = [
    { month: "06/2024", revenue: 1420000000, cost: 640000000, marketing: 205000000, profit: 458000000, status: "reconciled" },
    { month: "05/2024", revenue: 1350000000, cost: 592000000, marketing: 198000000, profit: 425000000, status: "reconciled" },
    { month: "04/2024", revenue: 1100000000, cost: 532000000, marketing: 178000000, profit: 280000000, status: "reconciled" },
    { month: "03/2024", revenue: 1050000000, cost: 510000000, marketing: 160000000, profit: 255000000, status: "reconciled" },
  ];

  return (
    <div className="p-6 max-w-container-max mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Bảng điều khiển doanh thu</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Dữ liệu toàn hệ thống · H1/2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container rounded-full p-1 border border-outline-variant/20">
            {(["week", "month", "year"] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-full font-label-md text-label-md text-sm transition-all ${period === p ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-primary"}`}>
                {p === "week" ? "Tuần" : p === "month" ? "Tháng" : "Năm"}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full font-label-md text-label-md text-sm hover:bg-primary/5">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>Xuất PDF
          </button>
        </div>
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng doanh thu", value: formatCurrency(totalRevenue), icon: "payments", trend: "+18.2%", color: "text-primary", bg: "bg-primary/10" },
          { label: "Tổng chi phí", value: formatCurrency(totalCost), icon: "account_balance", trend: "+5%", color: "text-error", bg: "bg-error-container/30" },
          { label: "Lợi nhuận ròng", value: formatCurrency(totalProfit), icon: "trending_up", trend: "+23.1%", color: "text-green-600", bg: "bg-green-50" },
          { label: "CSAT trung bình", value: "94%", icon: "star", trend: "↑ 2 điểm", color: "text-secondary", bg: "bg-secondary-container/30" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-6 border border-outline-variant/20">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bg}`}>
                <span className={`material-symbols-outlined ${k.color}`} style={{ fontSize: 20 }}>{k.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${k.color === "text-error" ? "bg-error-container/50 text-error" : "bg-green-50 text-green-700"}`}>{k.trend}</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">{k.label}</p>
            <p className={`font-headline-sm text-headline-sm font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Doanh thu & Lợi nhuận theo tháng</h3>
          </div>
          <div className="flex items-end gap-4 h-56 border-b border-outline-variant/20 pb-4 mb-4">
            {MONTHLY_REVENUE.map((m) => {
              const rH = Math.round((m.revenue / maxRevenue) * 100);
              const pH = Math.round((m.profit / maxRevenue) * 100);
              return (
                <div key={m.month} className="flex-1 flex items-end gap-1 group">
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">{(m.revenue / 1000000).toFixed(0)}M</span>
                    <div className="w-full rounded-t-sm bg-primary/30 group-hover:bg-primary transition-colors" style={{ height: `${rH * 2}px` }} />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-xs opacity-0 mb-1" />
                    <div className="w-full rounded-t-sm bg-secondary-container group-hover:opacity-80 transition-opacity" style={{ height: `${pH * 2}px` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-1">
            {MONTHLY_REVENUE.map((m) => (
              <span key={m.month} className="font-label-sm text-label-sm text-on-surface-variant flex-1 text-center">{m.month}</span>
            ))}
          </div>
          <div className="flex gap-6 mt-4">
            <span className="flex items-center gap-2 text-xs text-on-surface-variant"><span className="w-3 h-3 rounded bg-primary" />Doanh thu</span>
            <span className="flex items-center gap-2 text-xs text-on-surface-variant"><span className="w-3 h-3 rounded bg-secondary-container" />Lợi nhuận</span>
          </div>
        </div>

        {/* Branch breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-5">Doanh thu theo chi nhánh</h3>
          <div className="space-y-4">
            {BRANCHES.filter((b) => b.status === "active").map((b, i) => {
              const total = BRANCHES.filter((x) => x.status === "active").reduce((s, x) => s + x.revenue, 0);
              const pct = total > 0 ? Math.round((b.revenue / total) * 100) : 0;
              return (
                <div key={b.id}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-label-md text-label-md text-on-surface font-bold text-sm">{b.name}</p>
                    <span className="font-label-md text-label-md text-primary font-bold text-sm">{pct}%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-1">
                    <div className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-primary/50"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-variant">{formatCurrency(b.revenue)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-outline-variant/10">
            <div className="flex justify-between">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Tổng toàn hệ thống</p>
              <p className="font-label-md text-label-md text-primary font-bold">{formatCurrency(BRANCHES.reduce((s, b) => s + b.revenue, 0))}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial table */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Báo cáo tài chính chi tiết</h3>
          <button className="flex items-center gap-2 border border-outline text-on-surface-variant px-3 py-1.5 rounded-lg text-sm hover:bg-surface-container">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr>{["Tháng", "Doanh thu", "Chi phí vận hành", "Marketing", "Lợi nhuận ròng", "Trạng thái"].map((h) => (
                <th key={h} className="px-5 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {financialTable.map((row) => (
                <tr key={row.month} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-5 py-4 font-label-md text-label-md text-on-surface font-bold">{row.month}</td>
                  <td className="px-5 py-4 font-label-sm text-label-sm">{formatCurrency(row.revenue)}</td>
                  <td className="px-5 py-4 font-label-sm text-label-sm text-error">{formatCurrency(row.cost)}</td>
                  <td className="px-5 py-4 font-label-sm text-label-sm">{formatCurrency(row.marketing)}</td>
                  <td className="px-5 py-4 font-label-md text-label-md text-primary font-bold">{formatCurrency(row.profit)}</td>
                  <td className="px-5 py-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">ĐÃ ĐỐI SOÁT</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
