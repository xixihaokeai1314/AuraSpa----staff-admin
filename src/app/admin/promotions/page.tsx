"use client";
import { useState } from "react";
import { PROMOTIONS } from "@/lib/mock-data";

const TODAY = new Date().toISOString().split("T")[0];

type PromoForm = {
  name: string; code: string; discountType: string; discountValue: string;
  startDate: string; endDate: string; usageLimit: string; status: string;
};
const emptyForm: PromoForm = {
  name: "", code: "", discountType: "percent", discountValue: "",
  startDate: "", endDate: "", usageLimit: "0", status: "active",
};

export default function AdminPromotions() {
  const [promos, setPromos] = useState(PROMOTIONS);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PromoForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<PromoForm>>({});
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const validate = () => {
    const e: Partial<PromoForm> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập tên chương trình.";
    if (!form.code.trim()) e.code = "Vui lòng nhập mã giảm giá.";
    else if (!/^[A-Z0-9]{4,20}$/.test(form.code.toUpperCase())) e.code = "Mã chỉ gồm chữ hoa và số, 4-20 ký tự.";
    if (!editId && promos.find((p) => p.code.toUpperCase() === form.code.toUpperCase())) e.code = "Mã giảm giá đã tồn tại.";
    if (!form.discountValue || isNaN(+form.discountValue) || +form.discountValue <= 0) e.discountValue = "Giá trị không hợp lệ.";
    if (form.discountType === "percent" && +form.discountValue > 100) e.discountValue = "Phần trăm không được vượt 100%.";
    if (!form.startDate) e.startDate = "Vui lòng chọn ngày bắt đầu.";
    if (!form.endDate) e.endDate = "Vui lòng chọn ngày kết thúc.";
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = "Ngày kết thúc phải sau ngày bắt đầu.";
    if (form.startDate && form.endDate && form.endDate === form.startDate) e.endDate = "Ngày kết thúc phải khác ngày bắt đầu.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editId) {
      setPromos((p) => p.map((x) => x.id === editId ? { ...x, name: form.name, code: form.code.toUpperCase(), discountType: form.discountType, discountValue: +form.discountValue, startDate: form.startDate, endDate: form.endDate, usageLimit: +form.usageLimit, status: form.status } : x));
      showToast("✓ Đã cập nhật chương trình khuyến mãi");
    } else {
      setPromos((p) => [...p, { id: `pr${Date.now()}`, name: form.name, code: form.code.toUpperCase(), discountType: form.discountType, discountValue: +form.discountValue, applicableServices: [], branches: "all", startDate: form.startDate, endDate: form.endDate, usageLimit: +form.usageLimit, usageCount: 0, status: form.status }]);
      showToast("✓ Đã tạo chương trình khuyến mãi mới");
    }
    setShowModal(false); setEditId(null); setForm(emptyForm); setErrors({});
  };

  const openEdit = (id: string) => {
    const p = promos.find((x) => x.id === id);
    if (!p) return;
    setForm({ name: p.name, code: p.code, discountType: p.discountType, discountValue: String(p.discountValue), startDate: p.startDate, endDate: p.endDate, usageLimit: String(p.usageLimit), status: p.status });
    setEditId(id); setShowModal(true); setErrors({});
  };

  const toggleStatus = (id: string) => {
    setPromos((p) => p.map((x) => x.id === id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x));
    showToast("✓ Đã cập nhật trạng thái");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Quản lý khuyến mãi (UC-35)</h1>
        <button onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); setErrors({}); }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>Tạo khuyến mãi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((p) => {
          const isExpired = new Date(p.endDate) < new Date();
          return (
            <div key={p.id} className={`bg-white rounded-2xl p-5 border-2 transition-all ${p.status === "active" && !isExpired ? "border-outline-variant/30" : "border-outline-variant/20 opacity-60"}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">{p.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded font-mono">{p.code}</code>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "active" && !isExpired ? "bg-green-50 text-green-700" : "bg-surface-container text-on-surface-variant"}`}>
                      {isExpired ? "Hết hạn" : p.status === "active" ? "Đang chạy" : "Tạm dừng"}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-headline-sm text-2xl font-bold text-primary">
                    {p.discountType === "percent" ? `${p.discountValue}%` : `${p.discountValue.toLocaleString()}đ`}
                  </p>
                  <p className="text-xs text-on-surface-variant">{p.discountType === "percent" ? "Giảm %" : "Giảm tiền"}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-on-surface-variant mb-3">
                <p className="flex items-center gap-1.5"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>calendar_today</span>{p.startDate} → {p.endDate}</p>
                <p className="flex items-center gap-1.5"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>people</span>Đã dùng: {p.usageCount} {p.usageLimit > 0 ? `/ ${p.usageLimit}` : "(không giới hạn)"}</p>
                <p className="flex items-center gap-1.5"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>storefront</span>Áp dụng: {p.branches === "all" ? "Tất cả chi nhánh" : "Chi nhánh cụ thể"}</p>
              </div>

              {/* Usage progress */}
              {p.usageLimit > 0 && (
                <div className="mb-3">
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${Math.min(100, Math.round((p.usageCount / p.usageLimit) * 100))}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{Math.round((p.usageCount / p.usageLimit) * 100)}% đã sử dụng</p>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => openEdit(p.id)} className="flex-1 border border-primary text-primary py-2 rounded-lg font-label-md text-label-md text-sm hover:bg-primary/5">Chỉnh sửa</button>
                <button onClick={() => toggleStatus(p.id)} className={`flex-1 py-2 rounded-lg font-label-md text-label-md text-sm border ${p.status === "active" ? "border-error text-error hover:bg-error-container/20" : "border-green-600 text-green-600 hover:bg-green-50"}`}>
                  {p.status === "active" ? "Tạm dừng" : "Kích hoạt"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editId ? "Chỉnh sửa khuyến mãi" : "Tạo chương trình mới"}</h2>
              <button onClick={() => { setShowModal(false); setErrors({}); }}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Tên chương trình</label>
                <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary ${errors.name ? "border-error" : "border-outline-variant"}`}
                  placeholder="VD: Chào Hè 2024" value={form.name}
                  onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }} />
                {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Mã giảm giá</label>
                <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary font-mono uppercase ${errors.code ? "border-error" : "border-outline-variant"}`}
                  placeholder="VD: SUMMER2024" value={form.code}
                  onChange={(e) => { setForm((p) => ({ ...p, code: e.target.value.toUpperCase() })); setErrors((p) => ({ ...p, code: "" })); }} />
                {errors.code && <p className="text-error text-xs mt-1">{errors.code}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Loại giảm giá</label>
                  <select className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    value={form.discountType} onChange={(e) => setForm((p) => ({ ...p, discountType: e.target.value }))}>
                    <option value="percent">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    Giá trị {form.discountType === "percent" ? "(%)" : "(VNĐ)"}
                  </label>
                  <input type="number" min={1} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary ${errors.discountValue ? "border-error" : "border-outline-variant"}`}
                    placeholder={form.discountType === "percent" ? "20" : "300000"} value={form.discountValue}
                    onChange={(e) => { setForm((p) => ({ ...p, discountValue: e.target.value })); setErrors((p) => ({ ...p, discountValue: "" })); }} />
                  {errors.discountValue && <p className="text-error text-xs mt-1">{errors.discountValue}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Ngày bắt đầu</label>
                  <input type="date" min={TODAY} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary ${errors.startDate ? "border-error" : "border-outline-variant"}`}
                    value={form.startDate} onChange={(e) => { setForm((p) => ({ ...p, startDate: e.target.value })); setErrors((p) => ({ ...p, startDate: "" })); }} />
                  {errors.startDate && <p className="text-error text-xs mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Ngày kết thúc</label>
                  <input type="date" className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary ${errors.endDate ? "border-error" : "border-outline-variant"}`}
                    value={form.endDate} min={form.startDate || TODAY} onChange={(e) => { setForm((p) => ({ ...p, endDate: e.target.value })); setErrors((p) => ({ ...p, endDate: "" })); }} />
                  {errors.endDate && <p className="text-error text-xs mt-1">{errors.endDate}</p>}
                </div>
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Giới hạn sử dụng (0 = không giới hạn)</label>
                <input type="number" min={0} className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={form.usageLimit} onChange={(e) => setForm((p) => ({ ...p, usageLimit: e.target.value }))} />
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
