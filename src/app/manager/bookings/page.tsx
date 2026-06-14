"use client";
import { useState } from "react";
import { TODAY_APPOINTMENTS, STAFF_LIST, formatCurrency, getStatusColor, getStatusLabel, AppointmentStatus } from "@/lib/mock-data";

export default function ManagerBookings() {
  const [appts, setAppts] = useState(TODAY_APPOINTMENTS);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const filtered = appts.filter((a) => {
    const matchFilter = filter === "all" || a.status === filter;
    const matchSearch = !search || a.customerName.toLowerCase().includes(search.toLowerCase()) || a.customerPhone.includes(search) || a.id.includes(search);
    return matchFilter && matchSearch;
  });

  const selectedAppt = appts.find((a) => a.id === selected);

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    setAppts((p) => p.map((a) => a.id === id ? { ...a, status } : a));
    showToast(`✓ Đã cập nhật trạng thái lịch hẹn`);
  };

  const stats = {
    all: appts.length,
    confirmed: appts.filter((a) => a.status === "confirmed").length,
    checked_in: appts.filter((a) => a.status === "checked_in").length,
    completed: appts.filter((a) => a.status === "completed").length,
    cancelled: appts.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-6">Quản lý lịch hẹn hôm nay</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { key: "all", label: "Tất cả", color: "text-on-surface" },
          { key: "confirmed", label: "Đã xác nhận", color: "text-blue-600" },
          { key: "checked_in", label: "Đang thực hiện", color: "text-primary" },
          { key: "completed", label: "Hoàn thành", color: "text-green-600" },
          { key: "cancelled", label: "Đã hủy", color: "text-error" },
        ].map((s) => (
          <button key={s.key} onClick={() => setFilter(s.key)}
            className={`p-3 rounded-xl border-2 text-center transition-all ${filter === s.key ? "border-primary bg-primary/5" : "border-outline-variant/30 bg-white hover:border-outline-variant"}`}>
            <p className={`font-headline-sm text-2xl font-bold ${s.color}`}>{stats[s.key as keyof typeof stats]}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>search</span>
        <input className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Tìm theo tên khách, SĐT hoặc mã lịch hẹn..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((a) => (
            <div key={a.id} onClick={() => setSelected(a.id)}
              className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${selected === a.id ? "border-primary" : "border-outline-variant/30 hover:border-outline-variant"}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">{a.customerName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{a.customerPhone}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>{a.time} ({a.duration}p)</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>spa</span>{a.service}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>person</span>{a.technicianName}</span>
              </div>
              {a.discountCode && (
                <div className="mt-2 flex items-center gap-1">
                  <code className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-0.5 rounded">{a.discountCode}</code>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-10 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl block mb-2 text-outline">calendar_month</span>
              <p className="font-label-md text-label-md">Không tìm thấy lịch hẹn</p>
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          {selectedAppt ? (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-4 sticky top-6">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Chi tiết lịch hẹn</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(selectedAppt.status)}`}>{getStatusLabel(selectedAppt.status)}</span>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { icon: "person", label: "Khách hàng", value: selectedAppt.customerName },
                  { icon: "phone", label: "SĐT", value: selectedAppt.customerPhone },
                  { icon: "spa", label: "Dịch vụ", value: selectedAppt.service },
                  { icon: "schedule", label: "Thời gian", value: `${selectedAppt.time} · ${selectedAppt.duration} phút` },
                  { icon: "meeting_room", label: "Phòng", value: selectedAppt.room },
                  { icon: "badge", label: "KTV", value: selectedAppt.technicianName },
                  { icon: "payments", label: "Giá", value: formatCurrency(selectedAppt.price) },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-outline-variant/10">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>{icon}</span>
                    <span className="text-on-surface-variant w-24 shrink-0">{label}</span>
                    <span className="font-bold text-on-surface">{value}</span>
                  </div>
                ))}
                {selectedAppt.discountCode && (
                  <div className="flex items-center gap-3 py-2 border-b border-outline-variant/10">
                    <span className="material-symbols-outlined text-secondary" style={{ fontSize: 16 }}>sell</span>
                    <span className="text-on-surface-variant w-24 shrink-0">Mã giảm giá</span>
                    <code className="font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-xs">{selectedAppt.discountCode}</code>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {selectedAppt.status === "confirmed" && (
                  <button onClick={() => handleStatusChange(selectedAppt.id, "cancelled")}
                    className="w-full border-2 border-error text-error py-3 rounded-full font-label-md text-label-md hover:bg-error-container/20 text-sm">
                    Hủy lịch hẹn
                  </button>
                )}
                {selectedAppt.status === "checked_in" && (
                  <button onClick={() => handleStatusChange(selectedAppt.id, "completed")}
                    className="w-full bg-green-600 text-white py-3 rounded-full font-label-md text-label-md hover:opacity-90 text-sm">
                    Đánh dấu hoàn thành
                  </button>
                )}
                {selectedAppt.status === "confirmed" && (
                  <button onClick={() => handleStatusChange(selectedAppt.id, "checked_in")}
                    className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90 text-sm">
                    Check-in ngay
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-2 text-outline">event_note</span>
              <p className="font-label-md text-label-md">Chọn lịch hẹn để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
