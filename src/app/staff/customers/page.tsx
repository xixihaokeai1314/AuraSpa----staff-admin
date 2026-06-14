"use client";
import { useState } from "react";
import { TODAY_APPOINTMENTS, CUSTOMER_HEALTH_RECORDS, getStatusColor, getStatusLabel, formatCurrency } from "@/lib/mock-data";

export default function StaffCustomers() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [records, setRecords] = useState(CUSTOMER_HEALTH_RECORDS);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const uniqueCustomers = TODAY_APPOINTMENTS.reduce<typeof TODAY_APPOINTMENTS>((acc, a) => {
    if (!acc.find((x) => x.customerId === a.customerId)) acc.push(a);
    return acc;
  }, []).filter((a) =>
    !search || a.customerName.toLowerCase().includes(search.toLowerCase()) || a.customerPhone.includes(search)
  );

  const selectedAppt = TODAY_APPOINTMENTS.find((a) => a.customerId === selected);
  const allAppts = TODAY_APPOINTMENTS.filter((a) => a.customerId === selected);
  const healthRec = records.find((r) => r.customerId === selected);

  const [form, setForm] = useState({ skinType: "", allergies: "", medicalNotes: "", preferences: "" });

  const startEdit = () => {
    setForm({
      skinType: healthRec?.skinType ?? "",
      allergies: healthRec?.allergies ?? "",
      medicalNotes: healthRec?.medicalNotes ?? "",
      preferences: healthRec?.preferences ?? "",
    });
    setEditMode(true);
  };

  const saveHealth = () => {
    if (!selected) return;
    setRecords((prev) => {
      const exists = prev.find((r) => r.customerId === selected);
      const updated = { customerId: selected, ...form, lastUpdated: new Date().toISOString().split("T")[0], updatedBy: "Nhân viên" };
      return exists ? prev.map((r) => r.customerId === selected ? updated : r) : [...prev, updated];
    });
    setEditMode(false);
    showToast("✓ Đã cập nhật hồ sơ sức khỏe");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">
          {toast}
        </div>
      )}

      <h1 className="font-headline-md text-headline-md text-primary mb-6">Khách hàng hôm nay</h1>

      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>search</span>
        <input
          className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer list */}
        <div className="lg:col-span-1 space-y-2">
          {uniqueCustomers.map((a) => (
            <div
              key={a.customerId}
              onClick={() => { setSelected(a.customerId); setEditMode(false); }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selected === a.customerId ? "border-primary bg-primary/5" : "border-outline-variant/30 bg-white hover:border-outline-variant"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shrink-0">
                  {a.customerName.split(" ").pop()?.[0] ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold truncate">{a.customerName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{a.customerPhone}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-on-surface-variant truncate">{a.service}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(a.status)}`}>
                  {getStatusLabel(a.status)}
                </span>
              </div>
            </div>
          ))}
          {uniqueCustomers.length === 0 && (
            <p className="text-center text-on-surface-variant py-8 font-label-md text-label-md">Không tìm thấy khách hàng</p>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected && selectedAppt ? (
            <div className="space-y-4">
              {/* Basic info */}
              <div className="bg-white rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{selectedAppt.customerName}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-on-surface-variant mb-1 font-bold uppercase text-xs">Điện thoại</p><p>{selectedAppt.customerPhone}</p></div>
                  <div><p className="text-on-surface-variant mb-1 font-bold uppercase text-xs">Số lịch hôm nay</p><p>{allAppts.length} lịch</p></div>
                </div>
                <div className="mt-4 space-y-2">
                  {allAppts.map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-bold">{a.time} — {a.service}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">KTV: {a.technicianName} · {a.room}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
                        <p className="font-label-sm text-label-sm text-primary font-bold mt-1">{formatCurrency(a.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health record (UC-20) */}
              <div className="bg-white rounded-2xl p-6 border border-outline-variant/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Hồ sơ sức khỏe</h3>
                  {!editMode && (
                    <button onClick={startEdit} className="flex items-center gap-1 text-primary font-label-md text-label-md hover:opacity-80">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                      {healthRec ? "Chỉnh sửa" : "Thêm mới"}
                    </button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    {[
                      { label: "Loại da", key: "skinType", placeholder: "Da dầu, da khô, da hỗn hợp..." },
                      { label: "Dị ứng", key: "allergies", placeholder: "Các thành phần dị ứng..." },
                      { label: "Ghi chú y tế", key: "medicalNotes", placeholder: "Bệnh lý, lưu ý sức khỏe..." },
                      { label: "Sở thích", key: "preferences", placeholder: "Nhiệt độ, âm nhạc, KTV ưu tiên..." },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
                        <textarea
                          className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                          rows={2}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                        />
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <button onClick={saveHealth} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:opacity-90">Lưu hồ sơ</button>
                      <button onClick={() => setEditMode(false)} className="border border-outline-variant px-6 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container">Hủy</button>
                    </div>
                  </div>
                ) : healthRec ? (
                  <div className="space-y-3">
                    {[
                      { label: "Loại da", value: healthRec.skinType },
                      { label: "Dị ứng", value: healthRec.allergies, highlight: true },
                      { label: "Ghi chú y tế", value: healthRec.medicalNotes },
                      { label: "Sở thích", value: healthRec.preferences },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className={`p-3 rounded-lg ${highlight ? "bg-error-container/10 border border-error-container/30" : "bg-surface-container-low"}`}>
                        <p className={`font-bold text-xs uppercase mb-1 ${highlight ? "text-error" : "text-on-surface-variant"}`}>{label}</p>
                        <p className="text-sm text-on-surface">{value}</p>
                      </div>
                    ))}
                    <p className="text-xs text-on-surface-variant">Cập nhật lần cuối: {healthRec.lastUpdated} bởi {healthRec.updatedBy}</p>
                  </div>
                ) : (
                  <p className="text-on-surface-variant text-center py-6 font-label-md text-label-md">Chưa có hồ sơ sức khỏe</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block text-outline">person_search</span>
              <p className="font-label-md text-label-md">Chọn khách hàng để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
