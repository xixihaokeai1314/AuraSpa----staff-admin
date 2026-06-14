"use client";
import { useState } from "react";
import { INVENTORY, formatCurrency } from "@/lib/mock-data";

export default function ManagerInventory() {
  const [items, setItems] = useState(INVENTORY.filter((i) => i.branchId === "b001"));
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", unit: "", quantity: "", minThreshold: "", maxStock: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const filtered = items.filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const lowStock = items.filter((i) => i.quantity <= i.minThreshold);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập tên.";
    if (!form.category.trim()) e.category = "Vui lòng nhập danh mục.";
    if (!form.unit.trim()) e.unit = "Vui lòng nhập đơn vị.";
    if (!form.quantity || isNaN(+form.quantity) || +form.quantity < 0) e.quantity = "Số lượng không hợp lệ.";
    if (!form.minThreshold || isNaN(+form.minThreshold) || +form.minThreshold < 1) e.minThreshold = "Ngưỡng tối thiểu không hợp lệ.";
    if (!form.maxStock || isNaN(+form.maxStock) || +form.maxStock < 1) e.maxStock = "Tồn kho tối đa không hợp lệ.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editId) {
      setItems((p) => p.map((i) => i.id === editId ? { ...i, name: form.name, category: form.category, unit: form.unit, quantity: +form.quantity, minThreshold: +form.minThreshold, maxStock: +form.maxStock } : i));
      showToast("✓ Đã cập nhật tồn kho");
    } else {
      setItems((p) => [...p, { id: `inv${Date.now()}`, name: form.name, category: form.category, unit: form.unit, quantity: +form.quantity, minThreshold: +form.minThreshold, maxStock: +form.maxStock, branchId: "b001", lastRestocked: new Date().toISOString().split("T")[0] }]);
      showToast("✓ Đã thêm mặt hàng mới");
    }
    setShowModal(false); setEditId(null); setForm({ name: "", category: "", unit: "", quantity: "", minThreshold: "", maxStock: "" }); setErrors({});
  };

  const openEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setForm({ name: item.name, category: item.category, unit: item.unit, quantity: String(item.quantity), minThreshold: String(item.minThreshold), maxStock: String(item.maxStock) });
    setEditId(id); setShowModal(true); setErrors({});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Quản lý tồn kho (UC-30)</h1>
        <button onClick={() => { setShowModal(true); setEditId(null); setForm({ name: "", category: "", unit: "", quantity: "", minThreshold: "", maxStock: "" }); setErrors({}); }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>Thêm hàng
        </button>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-error-container/20 border border-error/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-error" style={{ fontSize: 22 }}>warning</span>
          <p className="font-label-md text-label-md text-error font-bold">
            {lowStock.length} mặt hàng dưới ngưỡng tối thiểu: {lowStock.map((i) => i.name).join(", ")}
          </p>
        </div>
      )}

      <input className="w-full border border-outline-variant rounded-xl px-4 py-3 mb-5 focus:outline-none focus:border-primary bg-white" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>{["Tên hàng", "Danh mục", "Tồn kho", "Tiến độ", "Ngưỡng / Tối đa", "Nhập kho cuối", ""].map((h) => (
              <th key={h} className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {filtered.map((item) => {
              const pct = Math.round((item.quantity / item.maxStock) * 100);
              const isLow = item.quantity <= item.minThreshold;
              return (
                <tr key={item.id} className={`hover:bg-surface-container-lowest transition-colors ${isLow ? "bg-error-container/5" : ""}`}>
                  <td className="px-4 py-4">
                    <p className="font-label-md text-label-md text-on-surface font-bold">{item.name}</p>
                    {isLow && <span className="text-xs text-error font-bold flex items-center gap-0.5"><span className="material-symbols-outlined" style={{ fontSize: 12 }}>warning</span>Sắp hết hàng</span>}
                  </td>
                  <td className="px-4 py-4 font-label-sm text-label-sm text-on-surface-variant">{item.category}</td>
                  <td className="px-4 py-4">
                    <span className={`font-bold text-lg ${isLow ? "text-error" : "text-on-surface"}`}>{item.quantity}</span>
                    <span className="text-on-surface-variant text-sm"> {item.unit}</span>
                  </td>
                  <td className="px-4 py-4 w-32">
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isLow ? "bg-error" : pct > 60 ? "bg-primary" : "bg-secondary"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">{pct}%</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">{item.minThreshold} / {item.maxStock}</td>
                  <td className="px-4 py-4 font-label-sm text-label-sm text-on-surface-variant">{item.lastRestocked}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => openEdit(item.id)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editId ? "Cập nhật tồn kho" : "Thêm mặt hàng"}</h2>
              <button onClick={() => { setShowModal(false); setErrors({}); }}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Tên hàng", key: "name", placeholder: "VD: Tinh Dầu Sả Chanh" },
                { label: "Danh mục", key: "category", placeholder: "VD: Tinh dầu" },
                { label: "Đơn vị", key: "unit", placeholder: "VD: Chai, Kg, Cái" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
                  <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors[key] ? "border-error" : "border-outline-variant"}`}
                    placeholder={placeholder} value={form[key as keyof typeof form]}
                    onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }} />
                  {errors[key] && <p className="text-error text-xs mt-1">{errors[key]}</p>}
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Số lượng hiện tại", key: "quantity" },
                  { label: "Ngưỡng tối thiểu", key: "minThreshold" },
                  { label: "Tồn kho tối đa", key: "maxStock" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1 text-xs">{label}</label>
                    <input type="number" min={0} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors[key] ? "border-error" : "border-outline-variant"}`}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }} />
                    {errors[key] && <p className="text-error text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
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
