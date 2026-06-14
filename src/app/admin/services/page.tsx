"use client";
import { useState } from "react";
import { SERVICES } from "@/lib/mock-data";

type SvcForm = { name: string; category: string; duration: string; price: string; description: string; status: string };
const emptyForm: SvcForm = { name: "", category: "Massage", duration: "", price: "", description: "", status: "active" };
const CATEGORIES = ["Massage", "Skincare", "Body", "Package"];

export default function AdminServices() {
  const [services, setServices] = useState(SERVICES);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<SvcForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<SvcForm>>({});
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const validate = () => {
    const e: Partial<SvcForm> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập tên dịch vụ.";
    if (!form.duration || isNaN(+form.duration) || +form.duration < 15) e.duration = "Thời lượng phải ≥ 15 phút.";
    if (!form.price || isNaN(+form.price) || +form.price < 1) e.price = "Giá không hợp lệ.";
    if (!form.description.trim()) e.description = "Vui lòng nhập mô tả.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editId) {
      setServices((p) => p.map((s) => s.id === editId ? { ...s, name: form.name, category: form.category, duration: +form.duration, price: +form.price, description: form.description, status: form.status } : s));
      showToast("✓ Đã cập nhật dịch vụ");
    } else {
      setServices((p) => [...p, { id: `sv${Date.now()}`, name: form.name, category: form.category, duration: +form.duration, price: +form.price, description: form.description, status: form.status, bookings: 0 }]);
      showToast("✓ Đã thêm dịch vụ mới");
    }
    setShowModal(false); setEditId(null); setForm(emptyForm); setErrors({});
  };

  const toggleStatus = (id: string) => {
    const svc = services.find((s) => s.id === id);
    if (svc?.status === "active" && services.filter((s) => s.status === "active").length <= 1) { alert("Phải có ít nhất 1 dịch vụ đang hoạt động."); return; }
    setServices((p) => p.map((s) => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s));
    showToast("✓ Đã cập nhật trạng thái");
  };

  const openEdit = (id: string) => {
    const s = services.find((x) => x.id === id);
    if (!s) return;
    setForm({ name: s.name, category: s.category, duration: String(s.duration), price: String(s.price), description: s.description, status: s.status });
    setEditId(id); setShowModal(true); setErrors({});
  };

  const filtered = filter === "all" ? services : services.filter((s) => s.category === filter || s.status === filter);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Danh mục dịch vụ (UC-34)</h1>
        <button onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); setErrors({}); }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>Thêm dịch vụ
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[{ key: "all", label: "Tất cả" }, ...CATEGORIES.map((c) => ({ key: c, label: c })), { key: "inactive", label: "Không hoạt động" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full font-label-md text-label-md text-sm transition-all ${filter === f.key ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className={`bg-white rounded-2xl p-5 border-2 transition-all ${s.status === "inactive" ? "border-outline-variant/20 opacity-60" : "border-outline-variant/30"}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface font-bold">{s.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{s.category}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.status === "active" ? "bg-green-50 text-green-700" : "bg-surface-container text-on-surface-variant"}`}>
                    {s.status === "active" ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">{s.description}</p>
            <div className="flex items-center gap-4 text-sm mb-3">
              <span className="flex items-center gap-1 text-on-surface-variant"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>{s.duration} phút</span>
              <span className="font-bold text-primary">{s.price.toLocaleString("vi-VN")}đ</span>
              <span className="text-on-surface-variant">{s.bookings} lượt đặt</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(s.id)} className="flex-1 border border-primary text-primary py-2 rounded-lg font-label-md text-label-md text-sm hover:bg-primary/5">Chỉnh sửa</button>
              <button onClick={() => toggleStatus(s.id)} className={`flex-1 py-2 rounded-lg font-label-md text-label-md text-sm border ${s.status === "active" ? "border-error text-error hover:bg-error-container/20" : "border-green-600 text-green-600 hover:bg-green-50"}`}>
                {s.status === "active" ? "Tạm dừng" : "Kích hoạt"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editId ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}</h2>
              <button onClick={() => { setShowModal(false); setErrors({}); }}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Tên dịch vụ</label>
                <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.name ? "border-error" : "border-outline-variant"}`}
                  placeholder="VD: Massage Đá Nóng" value={form.name}
                  onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }} />
                {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Danh mục</label>
                  <select className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Thời lượng (phút)</label>
                  <input type="number" min={15} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.duration ? "border-error" : "border-outline-variant"}`}
                    placeholder="60" value={form.duration}
                    onChange={(e) => { setForm((p) => ({ ...p, duration: e.target.value })); setErrors((p) => ({ ...p, duration: "" })); }} />
                  {errors.duration && <p className="text-error text-xs mt-1">{errors.duration}</p>}
                </div>
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Giá (VNĐ)</label>
                <input type="number" min={1} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.price ? "border-error" : "border-outline-variant"}`}
                  placeholder="1200000" value={form.price}
                  onChange={(e) => { setForm((p) => ({ ...p, price: e.target.value })); setErrors((p) => ({ ...p, price: "" })); }} />
                {errors.price && <p className="text-error text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Mô tả</label>
                <textarea rows={3} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${errors.description ? "border-error" : "border-outline-variant"}`}
                  placeholder="Mô tả chi tiết về dịch vụ..." value={form.description}
                  onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setErrors((p) => ({ ...p, description: "" })); }} />
                {errors.description && <p className="text-error text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">Lưu</button>
              <button onClick={() => { setShowModal(false); setErrors({}); }} className="flex-1 border border-outline-variant py-3 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
