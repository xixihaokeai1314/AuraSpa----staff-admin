"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateName, validatePhone } from "@/lib/auth";

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [tab, setTab] = useState<"profile" | "password">("profile");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  // Password change
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleSaveProfile = () => {
    const e: Record<string, string> = {};
    const nameErr = validateName(name);
    if (nameErr) e.name = nameErr;
    if (phone) {
      const phoneErr = validatePhone(phone);
      if (phoneErr) e.phone = phoneErr;
    }
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    updateProfile({ name });
    showToast("✓ Hồ sơ đã được cập nhật");
  };

  const handleChangePassword = () => {
    const e: Record<string, string> = {};
    if (!currentPw) e.currentPw = "Vui lòng nhập mật khẩu hiện tại.";
    if (!newPw || newPw.length < 8) e.newPw = "Mật khẩu phải có ít nhất 8 ký tự.";
    else if (!/[A-Z]/.test(newPw)) e.newPw = "Mật khẩu phải có ít nhất 1 chữ hoa.";
    else if (!/[0-9]/.test(newPw)) e.newPw = "Mật khẩu phải có ít nhất 1 chữ số.";
    if (newPw !== confirmPw) e.confirmPw = "Mật khẩu xác nhận không khớp.";
    setPwErrors(e);
    if (Object.keys(e).length > 0) return;
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    showToast("✓ Mật khẩu đã được cập nhật thành công");
  };

  const roleLabel: Record<string, string> = {
    customer: "Khách hàng", staff: "Nhân viên", manager: "Quản lý chi nhánh", admin: "Chủ sở hữu",
  };

  const initials = user?.name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase() ?? "?";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-6">Quản lý tài khoản (UC-04)</h1>

      {/* Avatar + role */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xl">
          {initials}
        </div>
        <div>
          <p className="font-headline-sm text-headline-sm text-on-surface">{user?.name}</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{user?.email}</p>
          <span className="mt-1 inline-block bg-primary text-on-primary text-xs font-bold px-3 py-0.5 rounded-full">
            {roleLabel[user?.role ?? "customer"]}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/30 mb-6">
        {(["profile", "password"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 font-label-md text-label-md transition-all border-b-2 ${tab === t ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}>
            {t === "profile" ? "Thông tin cá nhân" : "Đổi mật khẩu"}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-5">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Họ và tên</label>
            <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.name ? "border-error" : "border-outline-variant"}`}
              value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Email (không thể thay đổi)</label>
            <input className="w-full border border-outline-variant/40 rounded-lg px-3 py-2 text-sm bg-surface-container text-on-surface-variant cursor-not-allowed" value={user?.email ?? ""} disabled />
            <p className="text-xs text-on-surface-variant mt-1">Email là định danh chính và không thể thay đổi.</p>
          </div>
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Số điện thoại</label>
            <input className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors.phone ? "border-error" : "border-outline-variant"}`}
              placeholder="0912345678" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} />
            {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
          </div>
          <button onClick={handleSaveProfile} className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">
            Lưu thay đổi
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-5">
          {[
            { label: "Mật khẩu hiện tại", key: "currentPw", value: currentPw, setter: setCurrentPw, errKey: "currentPw" },
            { label: "Mật khẩu mới", key: "newPw", value: newPw, setter: setNewPw, errKey: "newPw" },
            { label: "Xác nhận mật khẩu mới", key: "confirmPw", value: confirmPw, setter: setConfirmPw, errKey: "confirmPw" },
          ].map(({ label, key, value, setter, errKey }) => (
            <div key={key}>
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">{label}</label>
              <input type="password" className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${pwErrors[errKey] ? "border-error" : "border-outline-variant"}`}
                placeholder="••••••••" value={value}
                onChange={(e) => { setter(e.target.value); setPwErrors((p) => ({ ...p, [errKey]: "" })); }} />
              {pwErrors[errKey] && <p className="text-error text-xs mt-1">{pwErrors[errKey]}</p>}
            </div>
          ))}
          <p className="text-xs text-on-surface-variant">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và chữ số.</p>
          <button onClick={handleChangePassword} className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">
            Cập nhật mật khẩu
          </button>
          <hr className="border-outline-variant/20" />
          <button onClick={logout} className="w-full border-2 border-error text-error py-3 rounded-full font-label-md text-label-md hover:bg-error-container/20 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>Đăng xuất khỏi tài khoản
          </button>
        </div>
      )}
    </div>
  );
}
