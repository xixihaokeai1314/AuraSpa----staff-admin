"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateProfileForm } from "@/lib/validators";

export default function CustomerAccountPage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState((user as any)?.phone ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    const validationErrors = validateProfileForm({ name, phone });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      updateProfile({ name, ...(phone ? { phone } : {}) });
      setMessage("✓ Đã lưu thông tin.");
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }, 300);
  };

  const handleCancel = () => {
    setName(user?.name ?? "");
    setPhone((user as any)?.phone ?? "");
    setErrors({});
    setMessage("");
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") {
      setName(value);
    } else if (field === "phone") {
      setPhone(value);
    }
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-headline-md text-headline-md text-primary mb-6">Tài khoản của tôi</h1>
      <div className="bg-white rounded-[32px] border border-outline-variant/40 p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
              Họ và tên <span className="text-error">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isSubmitting}
              className={`w-full border rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 transition ${
                errors.name
                  ? "border-error focus:ring-error bg-error/5"
                  : "border-outline-variant/40 focus:ring-primary"
              }`}
              placeholder="Nguyễn Thị Ánh"
            />
            {errors.name && <p className="text-error text-xs mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
              Số điện thoại
            </label>
            <input
              value={phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={isSubmitting}
              className={`w-full border rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 transition ${
                errors.phone
                  ? "border-error focus:ring-error bg-error/5"
                  : "border-outline-variant/40 focus:ring-primary"
              }`}
              placeholder="0912345678"
            />
            {errors.phone && <p className="text-error text-xs mt-2">{errors.phone}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="border border-outline-variant px-8 py-3 rounded-full font-label-md text-label-md hover:bg-surface transition disabled:opacity-50"
            >
              Hủy
            </button>
          </div>

          {message && (
            <div className={`p-3 rounded-2xl text-sm ${message.includes("✓") ? "bg-secondary/10 text-secondary" : "bg-error/10 text-error"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
