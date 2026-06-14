"use client";
import { useState } from "react";
import { BRANCHES, BRANCH_MANAGERS } from "@/lib/mock-data";

type BranchForm = { name: string; address: string; phone: string; email: string; openHours: string; managerId: string };
const emptyForm: BranchForm = { name: "", address: "", phone: "", email: "", openHours: "08:00 - 21:00", managerId: "" };

export default function AdminBranches() {
  const [branches, setBranches] = useState(BRANCHES);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<BranchForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<BranchForm>>({});
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const validate = () => {
    const e: Partial<BranchForm> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập tên chi nhánh.";
    else if (!editId && branches.find((b) => b.name === form.name.trim())) e.name = "Tên chi nhánh đã tồn tại.";
    if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ.";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không hợp lệ.";
    if (!form.managerId) e.managerId = "Vui lòng chọn quản lý.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const mgr = BRANCH_MANAGERS.find((m) => m.id === form.managerId);
    if (editId) {
      setBranches((p) => p.map((b) => b.id === editId ? { ...b, ...form, managerName: mgr?.name ?? "" } : b));
      showToast("✓ Đã cập nhật thông tin chi nhánh");
    } else {
      setBranches((p) => [...p, { id: `b${Date.now()}`, ...form, status: "active", capacity: 0, revenue: 0, managerName: mgr?.name ?? "" }]);
      showToast("✓ Đã thêm chi nhánh mới");
    }
    setShowModal(false); setEditId(null); setForm(emptyForm); setErrors({});
  };

  const handleToggleStatus = (id: string) => {
    setBranches((p) => p.map((b) => b.id === id ? { ...b, status: b.status === "active" ? "maintenance" : "active" } : b));
    showToast("✓ Đã cập nhật trạng thái chi nhánh");
  };

  const openEdit = (id: string) => {
    const b = branches.find((x) => x.id === id);
    if (!b) return;
    const mgr = BRANCH_MANAGERS.find((m) => m.branchName === b.name);
    setForm({ name: b.name, address: b.address, phone: b.phone, email: b.email, openHours: b.openHours, managerId: mgr?.id ?? "" });
    setEditId(id); setShowModal(true); setErrors({});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Quản lý chi nhánh (UC-32)</h1>
        <button onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); setErrors({}); }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>Thêm chi nhánh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {branches.map((b) => (
          <div key={b.id} className={`bg-white rounded-2xl border-2 p-6 transition-all ${b.status === "active" ? "border-outline-variant/30" : "border-secondary-container opacity-75"}`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-headline-sm text-headline-sm text-primary">{b.name}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${b.status === "active" ? "bg-green-50 text-green-700" : "bg-secondary-container text-on-secondary-container"}`}>
                {b.status === "active" ? "Hoạt động" : "Bảo trì"}
              </span>
            </div>
            <div className="space-y-1.5 text-sm text-on-surface-variant mb-4">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>{b.address}</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>phone</span>{b.phone}</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>{b.openHours}</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>QL: {b.managerName}</p>
            </div>
            {b.status === "active" && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Công suất</span>
                  <span className="font-bold">{b.capacity}%</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${b.capacity}%` }} />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => openEdit(b.id)} className="flex-1 border border-primary text-primary py-2 rounded-lg font-label-md text-label-md text-sm hover:bg-primary/5">
                Chỉnh sửa
              </button>
              <button onClick={() => handleToggleStatus(b.id)} className={`flex-1 py-2 rounded-lg font-label-md text-label-md text-sm border ${b.status === "active" ? "border-error text-error hover:bg-error-container/20" : "border-green-600 text-green-600 hover:bg-green-50"}`}>
                {b.status === "active" ? "Đóng cửa" : "Mở lại"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editId ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh mới"}</h2>
              <button onClick={() => { setShowModal(false); setErrors({}); }}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Tên chi nhánh", key: "name", placeholder: "VD: AuraSpa Bình Thạnh" },
                { label: "Địa chỉ", key: "address", placeholder: "Số nhà, Đường, Quận, TP" },
                { label: "Số điện thoại", key: "phone", placeholder: "028 xxxx xxxx" },
                { label: "Email", key: "email", placeholder: "branch@auraspa.vn" },
                { label: "Giờ mở cửa", key: "openHours", placeholder: "08:00 - 21:00" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
                  <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors[key as keyof BranchForm] ? "border-error" : "border-outline-variant"}`}
                    placeholder={placeholder} value={form[key as keyof BranchForm]}
                    onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }} />
                  {errors[key as keyof BranchForm] && <p className="text-error text-xs mt-1">{errors[key as keyof BranchForm]}</p>}
                </div>
              ))}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Quản lý chi nhánh *</label>
                <select className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.managerId ? "border-error" : "border-outline-variant"}`}
                  value={form.managerId} onChange={(e) => { setForm((p) => ({ ...p, managerId: e.target.value })); setErrors((p) => ({ ...p, managerId: "" })); }}>
                  <option value="">-- Chọn quản lý --</option>
                  {BRANCH_MANAGERS.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.email})</option>)}
                </select>
                {errors.managerId && <p className="text-error text-xs mt-1">{errors.managerId}</p>}
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
