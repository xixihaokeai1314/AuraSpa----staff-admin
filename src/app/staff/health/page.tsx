"use client";
import { useState } from "react";
import { TODAY_APPOINTMENTS, CUSTOMER_HEALTH_RECORDS } from "@/lib/mock-data";

export default function StaffHealth() {
  const [records, setRecords] = useState(CUSTOMER_HEALTH_RECORDS);
  const [selected, setSelected] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ skinType: "", allergies: "", medicalNotes: "", preferences: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const customers = TODAY_APPOINTMENTS.reduce<typeof TODAY_APPOINTMENTS>((acc, a) => {
    if (!acc.find((x) => x.customerId === a.customerId)) acc.push(a);
    return acc;
  }, []).filter((a) => !search || a.customerName.toLowerCase().includes(search.toLowerCase()) || a.customerPhone.includes(search));

  const rec = records.find((r) => r.customerId === selected);

  const startEdit = () => {
    setForm({ skinType: rec?.skinType ?? "", allergies: rec?.allergies ?? "", medicalNotes: rec?.medicalNotes ?? "", preferences: rec?.preferences ?? "" });
    setErrors({});
    setEditMode(true);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.skinType.trim()) e.skinType = "Vui lòng nhập loại da.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setRecords((prev) => {
      const exists = prev.find((r) => r.customerId === selected);
      const updated = { customerId: selected!, ...form, lastUpdated: new Date().toISOString().split("T")[0], updatedBy: "Nhân viên" };
      return exists ? prev.map((r) => r.customerId === selected ? updated : r) : [...prev, updated];
    });
    setEditMode(false);
    showToast("✓ Hồ sơ sức khỏe đã được cập nhật thành công");
  };

  const selectedCustomer = TODAY_APPOINTMENTS.find((a) => a.customerId === selected);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-2">Hồ sơ sức khỏe khách hàng (UC-20)</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Xem và cập nhật thông tin sức khỏe để đảm bảo an toàn điều trị.</p>

      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>search</span>
        <input className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Tìm khách hàng theo tên hoặc SĐT..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer list */}
        <div className="space-y-2">
          <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Danh sách hôm nay</h2>
          {customers.map((a) => {
            const hasRecord = records.some((r) => r.customerId === a.customerId);
            return (
              <div key={a.customerId} onClick={() => { setSelected(a.customerId); setEditMode(false); }}
                className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${selected === a.customerId ? "border-primary bg-primary/5" : "border-outline-variant/30 hover:border-outline-variant"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                    {a.customerName.split(" ").pop()?.[0] ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-bold truncate">{a.customerName}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{a.customerPhone}</p>
                  </div>
                  {hasRecord ? (
                    <span className="material-symbols-outlined text-green-600 shrink-0" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant shrink-0" style={{ fontSize: 18 }}>add_circle</span>
                  )}
                </div>
              </div>
            );
          })}
          {customers.length === 0 && (
            <p className="text-center text-on-surface-variant py-8 font-label-md text-label-md">Không tìm thấy khách hàng</p>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected && selectedCustomer ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="bg-white rounded-2xl p-5 border border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
                    {selectedCustomer.customerName.split(" ").pop()?.[0] ?? "?"}
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{selectedCustomer.customerName}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{selectedCustomer.customerPhone} · {selectedCustomer.service}</p>
                  </div>
                </div>
                {!editMode && (
                  <button onClick={startEdit} className="flex items-center gap-1 bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md text-sm hover:opacity-90">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                    {rec ? "Chỉnh sửa" : "Tạo hồ sơ"}
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="bg-white rounded-2xl p-6 border border-outline-variant/20 space-y-5">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Cập nhật hồ sơ sức khỏe</h3>
                  {[
                    { label: "Loại da *", key: "skinType", placeholder: "VD: Da dầu hỗn hợp, da khô nhạy cảm..." },
                    { label: "Dị ứng & chất kỵ", key: "allergies", placeholder: "VD: Dị ứng tinh dầu hạt, không dùng paraben..." },
                    { label: "Ghi chú y tế", key: "medicalNotes", placeholder: "VD: Huyết áp cao - tránh massage áp lực mạnh..." },
                    { label: "Sở thích & ưu tiên", key: "preferences", placeholder: "VD: Nhiệt độ phòng 25°C, nhạc nhẹ, KTV ưu tiên..." },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
                      <textarea rows={2} className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${errors[key] ? "border-error" : "border-outline-variant"}`}
                        placeholder={placeholder} value={form[key as keyof typeof form]}
                        onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }} />
                      {errors[key] && <p className="text-error text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">Lưu hồ sơ</button>
                    <button onClick={() => setEditMode(false)} className="flex-1 border border-outline-variant py-3 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container">Hủy</button>
                  </div>
                </div>
              ) : rec ? (
                <div className="bg-white rounded-2xl p-6 border border-outline-variant/20 space-y-4">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Hồ sơ sức khỏe</h3>
                  {[
                    { label: "Loại da", value: rec.skinType, warn: false },
                    { label: "Dị ứng & chất kỵ", value: rec.allergies, warn: true },
                    { label: "Ghi chú y tế", value: rec.medicalNotes, warn: rec.medicalNotes !== "Không" },
                    { label: "Sở thích & ưu tiên", value: rec.preferences, warn: false },
                  ].map(({ label, value, warn }) => (
                    <div key={label} className={`p-4 rounded-xl ${warn ? "bg-error-container/10 border border-error-container/40" : "bg-surface-container-low"}`}>
                      <p className={`font-label-sm text-label-sm uppercase tracking-wider mb-1 font-bold flex items-center gap-1 ${warn ? "text-error" : "text-on-surface-variant"}`}>
                        {warn && <span className="material-symbols-outlined" style={{ fontSize: 14 }}>warning</span>}
                        {label}
                      </p>
                      <p className="text-sm text-on-surface">{value}</p>
                    </div>
                  ))}
                  <p className="text-xs text-on-surface-variant border-t border-outline-variant/20 pt-3">
                    Cập nhật lần cuối: {rec.lastUpdated} · bởi {rec.updatedBy}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-outline-variant text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl block mb-3 text-outline">medical_information</span>
                  <p className="font-label-md text-label-md font-bold mb-1">Chưa có hồ sơ sức khỏe</p>
                  <p className="font-label-sm text-label-sm mb-4">Tạo hồ sơ để đảm bảo an toàn điều trị cho khách hàng này.</p>
                  <button onClick={startEdit} className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:opacity-90 text-sm">
                    Tạo hồ sơ ngay
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-2 text-outline">health_and_safety</span>
              <p className="font-label-md text-label-md">Chọn khách hàng để xem hồ sơ sức khỏe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
