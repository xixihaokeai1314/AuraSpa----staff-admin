"use client";
import { useState } from "react";
import { TODAY_APPOINTMENTS, STAFF_LIST, getStatusColor, getStatusLabel } from "@/lib/mock-data";

export default function ManagerReassign() {
  const [appts, setAppts] = useState(TODAY_APPOINTMENTS.filter((a) => a.status === "confirmed" || a.status === "checked_in"));
  const [selected, setSelected] = useState<string | null>(null);
  const [newTech, setNewTech] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{ tech?: string; reason?: string }>({});
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const selectedAppt = appts.find((a) => a.id === selected);
  const availableTechs = STAFF_LIST.filter((s) => s.branchId === "b001" && s.role === "technician" && s.id !== selectedAppt?.technicianId);

  const handleReassign = () => {
    const e: { tech?: string; reason?: string } = {};
    if (!newTech) e.tech = "Vui lòng chọn kỹ thuật viên mới.";
    if (!reason.trim()) e.reason = "Vui lòng nhập lý do phân công lại.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const tech = STAFF_LIST.find((s) => s.id === newTech);
    setAppts((p) => p.map((a) => a.id === selected ? { ...a, technicianId: newTech, technicianName: tech?.name ?? "" } : a));
    showToast(`✓ Đã phân công lại cho ${tech?.name}. Khách hàng đã được thông báo.`);
    setSelected(null); setNewTech(""); setReason(""); setErrors({});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-2">Phân công lại kỹ thuật viên (UC-28)</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Sử dụng khi kỹ thuật viên vắng mặt hoặc cần điều phối khẩn cấp.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment list */}
        <div>
          <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Lịch hẹn cần xử lý</h2>
          <div className="space-y-2">
            {appts.map((a) => (
              <div
                key={a.id}
                onClick={() => { setSelected(a.id); setNewTech(""); setReason(""); setErrors({}); }}
                className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${selected === a.id ? "border-primary" : "border-outline-variant/30 hover:border-outline-variant"}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-label-md text-label-md text-on-surface font-bold">{a.customerName}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{a.time} · {a.service} · {a.duration}p</p>
                <p className="font-label-sm text-label-sm text-primary font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>person</span>
                  KTV hiện tại: {a.technicianName}
                </p>
              </div>
            ))}
            {appts.length === 0 && (
              <div className="bg-white rounded-xl p-8 border border-outline-variant/20 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl block mb-2">event_available</span>
                <p className="font-label-md text-label-md">Không có lịch hẹn cần phân công lại</p>
              </div>
            )}
          </div>
        </div>

        {/* Reassign panel */}
        <div>
          {selectedAppt ? (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-5">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">Phân công lại</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{selectedAppt.customerName} · {selectedAppt.time} · {selectedAppt.service}</p>
              </div>

              {/* Current technician */}
              <div className="bg-error-container/10 border border-error-container/30 rounded-xl p-3">
                <p className="font-label-sm text-label-sm text-error font-bold mb-1">KTV hiện tại (sẽ được thay thế)</p>
                <p className="font-label-md text-label-md text-on-surface">{selectedAppt.technicianName}</p>
              </div>

              {/* Select new technician */}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Kỹ thuật viên thay thế *</label>
                {availableTechs.length === 0 ? (
                  <div className="p-3 bg-error-container/10 border border-error-container/30 rounded-xl">
                    <p className="text-error text-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                      Không có KTV nào khả dụng trong khung giờ này.
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">Hãy xem xét dời lịch hẹn sang thời điểm khác.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availableTechs.map((t) => (
                      <label
                        key={t.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${newTech === t.id ? "border-primary bg-primary/5" : "border-outline-variant/30 hover:border-outline-variant"}`}
                      >
                        <input type="radio" name="tech" className="sr-only" value={t.id} checked={newTech === t.id} onChange={() => { setNewTech(t.id); setErrors((p) => ({ ...p, tech: "" })); }} />
                        <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                          {t.name.split(" ").pop()?.[0]}
                        </div>
                        <div className="flex-1">
                          <p className="font-label-md text-label-md text-on-surface font-bold">{t.name}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{t.specialization}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-secondary flex items-center gap-0.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>star</span>
                            {t.rating}
                          </p>
                          <p className="text-xs text-green-600 font-bold">Khả dụng</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                {errors.tech && <p className="text-error text-xs mt-1">{errors.tech}</p>}
              </div>

              {/* Reason */}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Lý do phân công lại *</label>
                <textarea rows={3} className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${errors.reason ? "border-error" : "border-outline-variant"}`}
                  placeholder="VD: KTV Minh Anh vắng mặt đột xuất do bệnh..."
                  value={reason} onChange={(e) => { setReason(e.target.value); setErrors((p) => ({ ...p, reason: "" })); }} />
                {errors.reason && <p className="text-error text-xs mt-1">{errors.reason}</p>}
              </div>

              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
                Khách hàng sẽ nhận thông báo thay đổi trong vòng 1 giờ.
              </p>

              <button
                onClick={handleReassign}
                disabled={availableTechs.length === 0}
                className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Xác nhận phân công lại
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-2 text-outline">swap_horiz</span>
              <p className="font-label-md text-label-md">Chọn lịch hẹn để phân công lại KTV</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
