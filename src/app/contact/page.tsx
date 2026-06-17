"use client";

import { useState } from "react";
import { BRANCHES } from "@/lib/mock-data";
import { validateContactForm } from "@/lib/validators";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validationErrors = validateContactForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Simulate submission
    setTimeout(() => {
      setStatus("✓ Đã gửi yêu cầu. Chúng tôi sẽ liên hệ bạn sớm nhất!");
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <>
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Liên hệ</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Chúng tôi luôn sẵn sàng lắng nghe</h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            Gửi câu hỏi, đặt lịch riêng hoặc yêu cầu tư vấn. AuraSpa sẽ chủ động phản hồi trong thời gian nhanh nhất.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-[32px] border border-outline-variant/40 bg-white p-8 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Gửi yêu cầu</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Họ và tên <span className="text-error">*</span></span>
                    <input
                      value={formState.name}
                      onChange={handleChange}
                      name="name"
                      className={`mt-2 w-full rounded-3xl border bg-surface px-4 py-3 focus:outline-none focus:ring-2 transition ${
                        errors.name
                          ? "border-error focus:ring-error"
                          : "border-outline-variant/40 focus:ring-primary"
                      }`}
                      placeholder="Nguyễn Thị Ánh"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-error text-xs mt-2">{errors.name}</p>}
                  </label>
                  <label className="block">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Email <span className="text-error">*</span></span>
                    <input
                      value={formState.email}
                      onChange={handleChange}
                      name="email"
                      className={`mt-2 w-full rounded-3xl border bg-surface px-4 py-3 focus:outline-none focus:ring-2 transition ${
                        errors.email
                          ? "border-error focus:ring-error"
                          : "border-outline-variant/40 focus:ring-primary"
                      }`}
                      placeholder="email@example.com"
                      type="email"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-error text-xs mt-2">{errors.email}</p>}
                  </label>
                </div>
                <label className="block">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Nội dung <span className="text-error">*</span></span>
                  <textarea
                    value={formState.message}
                    onChange={handleChange}
                    name="message"
                    className={`mt-2 min-h-[180px] w-full rounded-[32px] border bg-surface px-4 py-4 focus:outline-none focus:ring-2 transition resize-none ${
                      errors.message
                        ? "border-error focus:ring-error"
                        : "border-outline-variant/40 focus:ring-primary"
                    }`}
                    placeholder="Chúng tôi có thể giúp bạn gì hôm nay? (Tối thiểu 10 ký tự)"
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-error text-xs mt-2">{errors.message}</p>}
                </label>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-primary px-8 py-4 text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi liên hệ"}
                  </button>
                  {status && <p className="text-secondary font-semibold self-center">{status}</p>}
                </div>
              </form>
            </div>
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-[32px] border border-outline-variant/40 bg-surface-container-low p-8 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Thông tin chi nhánh</h2>
              <div className="space-y-5">
                {BRANCHES.map((branch) => (
                  <div key={branch.id} className="rounded-3xl border border-outline-variant/40 bg-white p-5">
                    <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-2">{branch.name}</p>
                    <p className="text-body-md text-on-surface">{branch.address}</p>
                    <p className="text-sm text-on-surface-variant mt-2">🕐 {branch.openHours}</p>
                    <p className="text-sm text-on-surface-variant">📞 <a href={`tel:${branch.phone}`} className="text-primary hover:underline">{branch.phone}</a></p>
                    <p className="text-sm text-on-surface-variant">✉️ <a href={`mailto:${branch.email}`} className="text-primary hover:underline">{branch.email}</a></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-outline-variant/40 bg-white p-8 shadow-sm">
              <h3 className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-3">Lưu ý</h3>
              <p className="text-body-md text-on-surface-variant">
                Nếu bạn cần tư vấn về liệu trình hay giá dịch vụ, hãy ghi rõ trong nội dung. AuraSpa sẽ trả lời sớm nhất với đề xuất phù hợp nhất.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
