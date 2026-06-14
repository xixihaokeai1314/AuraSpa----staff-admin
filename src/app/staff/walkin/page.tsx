"use client";
import { useState } from "react";
import { SERVICES, STAFF_LIST, formatCurrency } from "@/lib/mock-data";

const ROOMS = ["VIP 01", "VIP 02", "Deluxe 03", "Standard 01", "Standard 02"];
const TIME_SLOTS = ["08:00","09:00","10:00","10:30","11:00","13:00","14:00","14:30","15:00","16:00","17:00","18:00","19:00"];

interface WalkInForm {
  customerName: string;
  customerPhone: string;
  serviceId: string;
  technicianId: string;
  time: string;
  room: string;
}

export default function StaffWalkIn() {
  const [form, setForm] = useState<WalkInForm>({ customerName: "", customerPhone: "", serviceId: "", technicianId: "", time: "", room: "" });
  const [errors, setErrors] = useState<Partial<WalkInForm>>({});
  const [created, setCreated] = useState<WalkInForm & { id: string; price: number; serviceName: string } | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const activeServices = SERVICES.filter((s) => s.status === "active");
  const technicians = STAFF_LIST.filter((s) => s.role === "technician" && s.status === "active");
  const selectedService = activeServices.find((s) => s.id === form.serviceId);

  const validate = () => {
    const e: Partial<WalkInForm> = {};
    if (!form.customerName.trim()) e.customerName = "Vui lòng nhập tên khách hàng.";
    if (!form.customerPhone.trim()) e.customerPhone = "Vui lòng nhập số điện thoại.";
    else if (!/^(0|\+84)[0-9]{9}$/.test(form.customerPhone.replace(/\s/g, ""))) e.customerPhone = "Số điện thoại không hợp lệ.";
    if (!form.serviceId) e.serviceId = "Vui lòng chọn dịch vụ.";
    if (!form.technicianId) e.technicianId = "Vui lòng chọn kỹ thuật viên.";
    if (!form.time) e.time = "Vui lòng chọn giờ.";
    if (!form.room) e.room = "Vui lòng chọn phòng.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;
    const svc = activeServices.find((s) => s.id === form.serviceId)!;
    setCreated({ ...form, id: `WI${Date.now()}`, price: svc.price, serviceName: svc.name });
    showToast("✓ Lịch hẹn vãng lai đã được tạo thành công");
  };

  const reset = () => { setForm({ customerName: "", customerPhone: "", serviceId: "", technicianId: "", time: "", room: "" }); setErrors({}); setCreated(null); };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-2">Tạo lịch hẹn vãng lai (UC-19)</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Dành cho khách hàng đến trực tiếp mà chưa có đặt lịch trước.</p>

      {created ? (
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-green-600" style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}>event_available</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Lịch hẹn đã được tạo</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Mã: #{created.id}</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-5 space-y-3 mb-6 text-sm">
            {[
              { icon: "person", label: "Khách hàng", value: created.customerName },
              { icon: "phone", label: "SĐT", value: created.customerPhone },
              { icon: "spa", label: "Dịch vụ", value: created.serviceName },
              { icon: "schedule", label: "Giờ", value: created.time },
              { icon: "meeting_room", label: "Phòng", value: created.room },
              { icon: "badge", label: "KTV", value: STAFF_LIST.find((s) => s.id === created.technicianId)?.name ?? "" },
              { icon: "payments", label: "Giá", value: formatCurrency(created.price) },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>{icon}</span>
                <span className="text-on-surface-variant w-24 shrink-0">{label}</span>
                <span className="font-bold text-on-surface">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={reset} className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">Tạo lịch hẹn mới</button>
            <button className="flex-1 border border-primary text-primary py-3 rounded-full font-label-md text-label-md hover:bg-primary/5">In phiếu</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-5">
          {/* Customer info */}
          <div className="pb-4 border-b border-outline-variant/10">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Họ và tên *</label>
                <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.customerName ? "border-error" : "border-outline-variant"}`}
                  placeholder="Nguyễn Văn A" value={form.customerName}
                  onChange={(e) => { setForm((p) => ({ ...p, customerName: e.target.value })); setErrors((p) => ({ ...p, customerName: "" })); }} />
                {errors.customerName && <p className="text-error text-xs mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Số điện thoại *</label>
                <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.customerPhone ? "border-error" : "border-outline-variant"}`}
                  placeholder="0912345678" type="tel" value={form.customerPhone}
                  onChange={(e) => { setForm((p) => ({ ...p, customerPhone: e.target.value })); setErrors((p) => ({ ...p, customerPhone: "" })); }} />
                {errors.customerPhone && <p className="text-error text-xs mt-1">{errors.customerPhone}</p>}
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="pb-4 border-b border-outline-variant/10">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Dịch vụ *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {activeServices.map((s) => (
                <label key={s.id} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.serviceId === s.id ? "border-primary bg-primary/5" : "border-outline-variant/30 hover:border-outline-variant"}`}>
                  <input type="radio" className="sr-only" checked={form.serviceId === s.id} onChange={() => { setForm((p) => ({ ...p, serviceId: s.id })); setErrors((p) => ({ ...p, serviceId: "" })); }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-bold text-sm leading-tight">{s.name}</p>
                    <p className="text-xs text-on-surface-variant">{s.duration} phút · {s.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                  {form.serviceId === s.id && <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                </label>
              ))}
            </div>
            {errors.serviceId && <p className="text-error text-xs mt-1">{errors.serviceId}</p>}
            {selectedService && (
              <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-bold text-primary">{selectedService.name}</p>
                <p className="text-xs text-on-surface-variant">{selectedService.description}</p>
                <p className="text-sm font-bold text-primary mt-1">{formatCurrency(selectedService.price)}</p>
              </div>
            )}
          </div>

          {/* Technician, Time, Room */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Kỹ thuật viên *</label>
              <select className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.technicianId ? "border-error" : "border-outline-variant"}`}
                value={form.technicianId} onChange={(e) => { setForm((p) => ({ ...p, technicianId: e.target.value })); setErrors((p) => ({ ...p, technicianId: "" })); }}>
                <option value="">-- Chọn KTV --</option>
                {technicians.map((t) => <option key={t.id} value={t.id}>{t.name} ⭐{t.rating}</option>)}
              </select>
              {errors.technicianId && <p className="text-error text-xs mt-1">{errors.technicianId}</p>}
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Giờ bắt đầu *</label>
              <select className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.time ? "border-error" : "border-outline-variant"}`}
                value={form.time} onChange={(e) => { setForm((p) => ({ ...p, time: e.target.value })); setErrors((p) => ({ ...p, time: "" })); }}>
                <option value="">-- Chọn giờ --</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.time && <p className="text-error text-xs mt-1">{errors.time}</p>}
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Phòng *</label>
              <select className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.room ? "border-error" : "border-outline-variant"}`}
                value={form.room} onChange={(e) => { setForm((p) => ({ ...p, room: e.target.value })); setErrors((p) => ({ ...p, room: "" })); }}>
                <option value="">-- Chọn phòng --</option>
                {ROOMS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.room && <p className="text-error text-xs mt-1">{errors.room}</p>}
            </div>
          </div>

          {/* Summary */}
          {form.serviceId && form.time && form.room && (
            <div className="bg-surface-container-low rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-bold">{selectedService?.name}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{form.time} · {form.room} · {selectedService?.duration} phút</p>
              </div>
              <p className="font-headline-sm text-headline-sm text-primary font-bold">{formatCurrency(selectedService?.price ?? 0)}</p>
            </div>
          )}

          <button onClick={handleCreate} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-[0.98] transition-all">
            Tạo lịch hẹn & Check-in ngay
          </button>
        </div>
      )}
    </div>
  );
}
