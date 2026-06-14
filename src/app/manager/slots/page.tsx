"use client";
import { useState } from "react";

const DEFAULT_SLOTS = [
  { time: "08:00", maxBookings: 3, duration: 60 },
  { time: "09:00", maxBookings: 3, duration: 60 },
  { time: "10:00", maxBookings: 3, duration: 60 },
  { time: "11:00", maxBookings: 2, duration: 60 },
  { time: "13:00", maxBookings: 3, duration: 60 },
  { time: "14:00", maxBookings: 3, duration: 60 },
  { time: "15:00", maxBookings: 3, duration: 60 },
  { time: "16:00", maxBookings: 2, duration: 60 },
  { time: "17:00", maxBookings: 2, duration: 60 },
  { time: "18:00", maxBookings: 2, duration: 60 },
  { time: "19:00", maxBookings: 1, duration: 60 },
];

export default function ManagerSlots() {
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const updateSlot = (time: string, field: "maxBookings" | "duration", value: number) => {
    setSaved(false);
    setSlots((p) => p.map((s) => s.time === time ? { ...s, [field]: value } : s));
  };

  const handleSave = () => {
    const invalid = slots.find((s) => s.maxBookings < 1 || s.duration < 30);
    if (invalid) { showToast("❌ Giới hạn tối thiểu là 1 lượt đặt / 30 phút."); return; }
    setSaved(true);
    showToast("✓ Cấu hình đã được lưu và áp dụng ngay cho đặt lịch trực tuyến.");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-2">
        <h1 className="font-headline-md text-headline-md text-primary">Cấu hình khung giờ (UC-27)</h1>
        <button onClick={handleSave} className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>Lưu cấu hình
        </button>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
        Cấu hình số lượng đặt lịch tối đa cho mỗi khung giờ để tránh quá tải. Thay đổi chỉ áp dụng cho đặt lịch mới.
      </p>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-green-700 text-sm font-bold">
          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Cấu hình đã được áp dụng thành công
        </div>
      )}

      <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
        <div className="grid grid-cols-4 bg-surface-container-low px-5 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          <span>Khung giờ</span><span>Tối đa đặt lịch</span><span>Thời lượng (phút)</span><span>Trực quan</span>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {slots.map((slot) => (
            <div key={slot.time} className="grid grid-cols-4 items-center px-5 py-4">
              <span className="font-label-md text-label-md text-primary font-bold">{slot.time}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => updateSlot(slot.time, "maxBookings", Math.max(1, slot.maxBookings - 1))}
                  className="w-7 h-7 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors text-sm font-bold">−</button>
                <span className="w-8 text-center font-label-md text-label-md text-on-surface font-bold">{slot.maxBookings}</span>
                <button onClick={() => updateSlot(slot.time, "maxBookings", slot.maxBookings + 1)}
                  className="w-7 h-7 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors text-sm font-bold">+</button>
              </div>
              <div>
                <select
                  value={slot.duration}
                  onChange={(e) => updateSlot(slot.time, "duration", +e.target.value)}
                  className="border border-outline-variant rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-primary"
                >
                  {[30, 45, 60, 75, 90, 120].map((d) => <option key={d} value={d}>{d} phút</option>)}
                </select>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: slot.maxBookings }).map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded bg-primary/20 border border-primary/30" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
        Thay đổi chỉ ảnh hưởng đến đặt lịch mới. Các lịch hẹn đã xác nhận trước đó sẽ không bị ảnh hưởng.
      </p>
    </div>
  );
}
