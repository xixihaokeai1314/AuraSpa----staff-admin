"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribeMessage("✓ Đã đăng ký nhận bản tin thành công!");
      setEmail("");
      setTimeout(() => setSubscribeMessage(""), 3000);
    }
  };

  return (
    <footer className="bg-surface-container-lowest text-on-surface font-body-md">
      {/* Newsletter Section */}
      <section className="border-t border-outline-variant/30 py-12">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4">Bản Tin Hàng Tuần</h3>
              <p className="text-body-md text-on-surface-variant mb-6">Nhận các mẹo spa, ưu đãi độc quyền và cập nhật liệu pháp mới.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email@example.com"
                className="flex-1 rounded-full border border-outline-variant/40 bg-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-primary text-on-primary px-8 py-3 font-label-md text-label-md hover:opacity-90 transition-opacity"
              >
                Đăng Ký
              </button>
            </form>
            {subscribeMessage && <p className="text-secondary text-sm mt-2">{subscribeMessage}</p>}
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="border-t border-outline-variant/30 py-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-6">Về AuraSpa</p>
              <div className="space-y-3">
                <p className="text-display-sm text-on-surface font-semibold">AuraSpa</p>
                <p className="text-body-sm text-on-surface-variant">Nâng tầm trải nghiệm wellness tại Việt Nam với tiêu chuẩn quốc tế và triết lý phục vụ tận tâm.</p>
                <div className="flex gap-3 pt-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition">
                    <span className="material-symbols-outlined text-primary text-lg">facebook</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition">
                    <span className="material-symbols-outlined text-primary text-lg">instagram</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition">
                    <span className="material-symbols-outlined text-primary text-lg">tiktok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-6">Khám Phá</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Dịch Vụ
                  </Link>
                </li>
                <li>
                  <Link href="/branches" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Chi Nhánh
                  </Link>
                </li>
                <li>
                  <Link href="/promotions" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Khuyến Mãi
                  </Link>
                </li>
                <li>
                  <Link href="/membership" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Chương Trình Thành Viên
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Câu Chuyện Thương Hiệu
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-6">Thông Tin</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Liên Hệ
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Chính Sách Bảo Mật
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Điều Khoản Dịch Vụ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Hỏi Đáp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Language */}
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-6">Ngôn Ngữ</p>
              <div className="space-y-2">
                <button
                  onClick={() => setLanguage("vi")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    language === "vi" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Tiếng Việt (VI)
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    language === "en" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => setLanguage("zh")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    language === "zh" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  简体中文 (ZH)
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-on-surface-variant">© 2024 AuraSpa Wellness Retreat. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                Designed for Serenity
              </a>
              <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
