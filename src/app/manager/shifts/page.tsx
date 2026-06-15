"use client";
import { useState } from "react";
import { SHIFTS, STAFF_LIST } from "@/lib/mock-data";

type ShiftStatus = "pending" | "approved" | "rejected";

export default function ManagerShifts() {
  const [shifts, setShifts] = useState(SHIFTS.filter((s) => s.branchId === "b001"));
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const pending = shifts.filter((s) => s.status === "pending");

  const handleApprove = (id: string) => {
    setShifts((p) => p.map((s) => s.id === id ? { ...s, status: "approved" as ShiftStatus } : s));
    showToast("✓ Đã phê duyệt ca làm việc");
  };
  const handleReject = (id: string) => {
    setShifts((p) => p.map((s) => s.id === id ? { ...s, status: "rejected" as ShiftStatus } : s));
    showToast("✓ Đã từ chối ca làm việc");
  };

  const staffById = STAFF_LIST.reduce<Record<string, typeof STAFF_LIST[0]>>((acc, s) => { acc[s.id] = s; return acc; }, {});

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Phân công ca làm việc (UC-26)</h1>
        {pending.length > 0 && (
          <span className="bg-error text-on-error text-sm font-bold px-3 py-1 rounded-full">{pending.length} yêu cầu chờ</span>
        )}
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Yêu cầu chờ phê duyệt</h2>
          <div className="space-y-3">
            {pending.map((sh) => {
              const staff = staffById[sh.staffId];
              return (
                <div key={sh.id} className="bg-white rounded-2xl p-5 border-2 border-secondary-container flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                    {sh.staffName.split(" ").pop()?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-bold">{sh.staffName}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {new Date(sh.date).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" })} — {sh.shift}
                    </p>
                    {sh.shift === "Nghỉ phép" && staff && (
                      <p className="text-xs text-on-surface-variant mt-1">
                        ⚠️ Duyệt nghỉ sẽ giảm nhân sự. Hiện có {STAFF_LIST.filter((s) => s.branchId === "b001" && s.status === "active").length} nhân viên trực.
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(sh.id)}
                      className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md text-sm hover:opacity-90"
                    >
                      Duyệt
                    </button>
                    <button
                      onClick={() => handleReject(sh.id)}
                      className="border border-error text-error px-4 py-2 rounded-full font-label-md text-label-md text-sm hover:bg-error-container/30"
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Approved schedule */}
      <div>
        <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Lịch đã phê duyệt</h2>
        <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr>
                {["Nhân viên", "Ngày", "Ca làm việc", "Trạng thái"].map((h) => (
                  <th key={h} className="px-5 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {shifts.filter((s) => s.status !== "pending").map((sh) => (
                <tr key={sh.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                        {sh.staffName.split(" ").pop()?.[0]}
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">{sh.staffName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-label-sm text-label-sm text-on-surface">
                    {new Date(sh.date).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4 font-label-sm text-label-sm text-on-surface">{sh.shift}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${sh.status === "approved" ? "bg-green-50 text-green-700" : "bg-error-container text-on-error-container"}`}>
                      {sh.status === "approved" ? "Đã duyệt" : "Từ chối"}
                    </span>
                  </td>
                </tr>
              ))}
              {shifts.filter((s) => s.status !== "pending").length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-on-surface-variant font-label-md text-label-md">Chưa có lịch được phê duyệt</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
