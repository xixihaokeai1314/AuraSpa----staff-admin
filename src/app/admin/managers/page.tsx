"use client";
import { useState } from "react";
import { BRANCH_MANAGERS, BRANCHES } from "@/lib/mock-data";

type MgrForm = { name: string; email: string; phone: string; branchId: string };
const emptyForm: MgrForm = { name: "", email: "", phone: "", branchId: "" };

export default function AdminManagers() {
  const [managers, setManagers] = useState(BRANCH_MANAGERS);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<MgrForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<MgrForm>>({});
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const validate = () => {
    const e: Partial<MgrForm> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không hợp lệ.";
    if (!editId && managers.find((m) => m.email === form.email)) e.email = "Email đã được sử dụng.";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại.";
    if (!form.branchId) e.branchId = "Vui lòng chọn chi nhánh.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const branch = BRANCHES.find((b) => b.id === form.branchId);
    if (editId) {
      setManagers((p) => p.map((m) => m.id === editId ? { ...m, ...form, branchName: branch?.name ?? "" } : m));
      showToast("✓ Đã cập nhật Branch Manager");
    } else {
      setManagers((p) => [...p, { id: `m${Date.now()}`, ...form, branchName: branch?.name ?? "", status: "active", joinDate: new Date().toISOString().split("T")[0] }]);
      showToast("✓ Đã thêm Branch Manager mới — Thông tin đăng nhập đã gửi qua email");
    }
    setShowModal(false); setEditId(null); setForm(emptyForm); setErrors({});
  };

  const handleToggle = (id: string) => {
    setManagers((p) => p.map((m) => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m));
    showToast("✓ Đã cập nhật trạng thái");
  };

  const openEdit = (id: string) => {
    const m = managers.find((x) => x.id === id);
    if (!m) return;
    setForm({ name: m.name, email: m.email, phone: m.phone, branchId: m.branchId });
    setEditId(id); setShowModal(true); setErrors({});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Branch Manager (UC-33)</h1>
        <button onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); setErrors({}); }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>Thêm Manager
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>{["Quản lý", "Email / SĐT", "Chi nhánh", "Ngày vào", "Trạng thái", ""].map((h) => (
              <th key={h} className="px-5 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {managers.map((m) => (
              <tr key={m.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                      {m.name.split(" ").pop()?.[0]}
                    </div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">{m.name}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm"><p>{m.email}</p><p className="text-on-surface-variant">{m.phone}</p></td>
                <td className="px-5 py-4 font-label-md text-label-md text-on-surface">{m.branchName}</td>
                <td className="px-5 py-4 font-label-sm text-label-sm text-on-surface-variant">{m.joinDate}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${m.status === "active" ? "bg-green-50 text-green-700" : "bg-surface-container text-on-surface-variant"}`}>
                    {m.status === "active" ? "Hoạt động" : "Tạm khóa"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(m.id)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span></button>
                    <button onClick={() => handleToggle(m.id)} className={`p-1.5 transition-colors ${m.status === "active" ? "text-on-surface-variant hover:text-error" : "text-on-surface-variant hover:text-green-600"}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{m.status === "active" ? "block" : "check_circle"}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{editId ? "Chỉnh sửa Manager" : "Thêm Branch Manager"}</h2>
              <button onClick={() => { setShowModal(false); setErrors({}); }}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Họ và tên", key: "name", type: "text", placeholder: "Nguyễn Văn A" },
                { label: "Email", key: "email", type: "email", placeholder: "manager@auraspa.vn" },
                { label: "Số điện thoại", key: "phone", type: "tel", placeholder: "0912345678" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
                  <input type={type} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors[key as keyof MgrForm] ? "border-error" : "border-outline-variant"}`}
                    placeholder={placeholder} value={form[key as keyof MgrForm]}
                    onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }} />
                  {errors[key as keyof MgrForm] && <p className="text-error text-xs mt-1">{errors[key as keyof MgrForm]}</p>}
                </div>
              ))}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Chi nhánh phụ trách *</label>
                <select className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.branchId ? "border-error" : "border-outline-variant"}`}
                  value={form.branchId} onChange={(e) => { setForm((p) => ({ ...p, branchId: e.target.value })); setErrors((p) => ({ ...p, branchId: "" })); }}>
                  <option value="">-- Chọn chi nhánh --</option>
                  {BRANCHES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                {errors.branchId && <p className="text-error text-xs mt-1">{errors.branchId}</p>}
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
