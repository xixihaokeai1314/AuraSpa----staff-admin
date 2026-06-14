"use client";
import { useState } from "react";
import { STAFF_LIST, SERVICES, BRANCHES, formatCurrency } from "@/lib/mock-data";

export default function AdminRankings() {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");

  const topStaff = [...STAFF_LIST].filter((s) => s.servicesCompleted >= 10).sort((a, b) => b.servicesCompleted - a.servicesCompleted);
  const topServices = [...SERVICES].filter((s) => s.bookings >= 10).sort((a, b) => b.bookings - a.bookings);
  const topBranches = [...BRANCHES].filter((b) => b.revenue > 0).sort((a, b) => b.revenue - a.revenue);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="p-6 max-w-container-max mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-md text-headline-md text-primary">Xếp hạng hiệu suất (UC-37)</h1>
        <div className="flex bg-surface-container rounded-full p-1 border border-outline-variant/20">
          {(["month", "quarter", "year"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md text-sm transition-all ${period === p ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-primary"}`}>
              {p === "month" ? "Tháng" : p === "quarter" ? "Quý" : "Năm"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Staff */}
        <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              Nhân viên xuất sắc
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {topStaff.length >= 10 ? (
              topStaff.map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? "bg-secondary-container/20 border border-secondary-container" : "hover:bg-surface-container-low"}`}>
                  <span className="text-xl w-8 text-center">{medals[i] ?? `#${i + 1}`}</span>
                  <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                    {s.name.split(" ").pop()?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-bold truncate">{s.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">{s.specialization}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-label-md text-label-md text-primary font-bold">{s.servicesCompleted}</p>
                    <p className="flex items-center gap-0.5 text-xs text-secondary justify-end">
                      <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>star</span>
                      {s.rating}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-on-surface-variant font-label-md text-label-md">Cần ít nhất 10 lượt hoàn thành để xếp hạng</p>
            )}
            {topStaff.length > 0 && topStaff.length < 10 && topStaff.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? "bg-secondary-container/20 border border-secondary-container" : "hover:bg-surface-container-low"}`}>
                <span className="text-xl w-8 text-center">{medals[i] ?? `#${i + 1}`}</span>
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                  {s.name.split(" ").pop()?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold truncate">{s.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">{s.specialization}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-md text-label-md text-primary font-bold">{s.servicesCompleted}</p>
                  <p className="flex items-center gap-0.5 text-xs text-secondary justify-end">
                    <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>star</span>
                    {s.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>spa</span>
              Dịch vụ phổ biến nhất
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {topServices.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? "bg-primary/5 border border-primary/20" : "hover:bg-surface-container-low"}`}>
                <span className="text-xl w-8 text-center">{medals[i] ?? `#${i + 1}`}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold text-sm leading-tight">{s.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">{s.category} · {s.duration} phút</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-md text-label-md text-primary font-bold">{s.bookings}</p>
                  <p className="text-xs text-on-surface-variant">lượt</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Branches */}
        <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>storefront</span>
              Chi nhánh dẫn đầu
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {topBranches.map((b, i) => (
              <div key={b.id} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? "bg-surface-container-high border border-outline-variant" : "hover:bg-surface-container-low"}`}>
                <span className="text-xl w-8 text-center">{medals[i] ?? `#${i + 1}`}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold text-sm">{b.name}</p>
                  <div className="mt-1 h-1.5 bg-surface-container rounded-full overflow-hidden w-full">
                    <div className="bg-primary h-full" style={{ width: `${b.capacity}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">Công suất: {b.capacity}%</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-md text-label-md text-primary font-bold text-sm">{(b.revenue / 1000000).toFixed(0)}M</p>
                  <p className="text-xs text-on-surface-variant">VNĐ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
        * Xếp hạng dựa trên dữ liệu lịch hẹn đã hoàn thành và đánh giá của khách hàng. Cần tối thiểu 10 điểm dữ liệu để tạo xếp hạng.
      </p>
    </div>
  );
}
