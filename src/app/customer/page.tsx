"use client";
import AccountDropdown from "@/components/auth/AccountDropdown";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CustomerHome() {
      const [userName, setUserName] = useState("Khách hàng");
  useEffect(() => {
    // Lấy tên từ localStorage
    const name = localStorage.getItem("userName") || "Khách hàng";
    setUserName(name);
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add("h-16", "shadow-md");
        nav.classList.remove("h-20", "shadow-sm");
      } else {
        nav.classList.add("h-20", "shadow-sm");
        nav.classList.remove("h-16", "shadow-md");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out h-20">
        <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">
          <div className="flex items-center gap-12">
            <Link className="font-headline-md text-headline-md text-primary tracking-tight" href="/">
              AuraSpa
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md" href="/customer">
                Trang chủ
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">
                Dịch vụ
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">
                Câu chuyện thương hiệu
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">
                Liên hệ
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
  <AccountDropdown />
</div>
        </div>
      </nav>

      <main className="pt-32 pb-section-padding-desktop max-w-container-max mx-auto px-gutter">

        {/* Welcome Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-lg text-primary">Chào buổi sáng, {userName}.</h1>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                Hôm nay là một ngày tuyệt vời để tìm lại sự cân bằng cho tâm hồn.
              </p>
            </div>
            {/* Membership Card */}
            <div className="bg-surface-container-high p-8 rounded-xl min-w-[320px] relative overflow-hidden group hover:shadow-xl transition-all duration-500 border border-outline-variant/20">
              <div className="relative z-10">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-2 block">
                  THÀNH VIÊN AURA GOLD
                </span>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-headline-md text-headline-md text-on-surface">1,250</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">Điểm tích lũy</span>
                </div>
                <button className="w-full py-3 px-6 bg-primary text-on-primary font-label-md text-label-md rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Đổi phần thưởng
                  <span className="material-symbols-outlined text-[18px]">redeem</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <Link
            className="group relative bg-surface-container-low p-10 rounded-xl flex flex-col justify-between h-[240px] hover:bg-surface-container transition-colors duration-500"
            href="/customer/bookings"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Lịch hẹn của tôi</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                Quản lý và cập nhật các buổi trị liệu sắp tới.
              </p>
            </div>
          </Link>

          <Link
            className="group relative bg-surface-container-low p-10 rounded-xl flex flex-col justify-between h-[240px] hover:bg-surface-container transition-colors duration-500"
            href="/customer/bookings?tab=ratings"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">star</span>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Đánh giá của tôi</h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                Chia sẻ trải nghiệm của bạn và nhận thêm điểm thưởng.
              </p>
            </div>
          </Link>
        </section>

        {/* Recommendations */}
        <section className="mb-section-padding-desktop">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-headline-md text-headline-md text-primary">Gợi ý dành riêng cho bạn</h2>
            <div className="h-px flex-1 bg-outline-variant/30 mx-8 hidden md:block"></div>
            <Link className="text-primary font-label-md text-label-md flex items-center gap-2 hover:underline" href="/services">
              Xem tất cả dịch vụ
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden rounded-lg mb-6 relative">
                <Image
                  alt="Liệu trình Collagen Tươi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9UX-maw1OgrmtCl2_vRzARYH3hEan7o84LngNEsUs_wrCDhZ_iS-XgXuXfe3mTAp3ysNk7YH7zReE2vZ8xM6uhKiQirfCCcoFfqDcQ78CIp3NoTnWzyrxhCSR5MbqzNQUnQsG8U29UpidSQ8m-p1PXzNnoGla4od3Fur7Jm386sZ95BNeXB95pDz1RdR__1wfSl9M2H6AT4ar8VGm31VvcNCR9g-QzVYBOaG_hNn-dEpMdEhr1a6aTsurMkagou_OIdFYgaq-VO4"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur px-3 py-1 rounded font-label-sm text-label-sm text-primary">
                  PHỔ BIẾN NHẤT
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Liệu trình Collagen Tươi</h3>
              <p className="text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-2">
                Công nghệ thẩm thấu sâu giúp tái tạo độ đàn hồi, mang lại làn da căng mọng và trẻ trung ngay sau buổi đầu tiên.
              </p>
              <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md text-primary">90 Phút</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span className="font-label-md text-label-md text-on-surface">2,500,000đ</span>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden rounded-lg mb-6 relative">
                <Image
                  alt="Ngâm khoáng nóng"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm4D6sVrmhi6b67InfuoZ3-OjmAyBjKyJOt7FKTTBkja79-R3sLJNIdsERaG98smwNuO7otEhUb2mlhdZTMjevapCMh5g7IDyQ_NfNLWBCvctI9OVg19xcMgzmjJ2oD2zxflWRsSTVedw1ehSNv5FtR8mLJQ52D8gUklgze59b_ivV8T-EnnmVQ3mF0wkQID69fFAqf9kZqDwSCYkEWiLvfrhL-NzW-OiegAXjPM_VJwTT1n2HGNhFtjH0N9vdQmu1yu6njs0nPgY"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur px-3 py-1 rounded font-label-sm text-label-sm text-primary">
                  KHUYÊN DÙNG
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Ngâm khoáng nóng</h3>
              <p className="text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-2">
                Hòa mình vào làn nước khoáng thiên nhiên giàu dưỡng chất, giúp xoa dịu cơ bắp và thanh lọc tâm trí tuyệt đối.
              </p>
              <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md text-primary">60 Phút</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span className="font-label-md text-label-md text-on-surface">1,200,000đ</span>
              </div>
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="bg-primary rounded-xl p-12 relative overflow-hidden text-on-primary">
          <div className="relative z-10 max-w-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest mb-4 block opacity-80">
              Trải nghiệm thượng lưu
            </span>
            <h2 className="font-display-lg text-display-lg mb-6 leading-tight">
              Dành cho riêng bạn, <br />tại AuraSpa.
            </h2>
            <p className="font-body-lg text-body-lg mb-8 opacity-90">
              Chúng tôi tin rằng sự thư giãn thực sự bắt đầu từ không gian riêng tư và những liệu trình được cá nhân hóa hoàn toàn cho cơ thể bạn.
            </p>
            <Link href="/customer/bookings">
              <button className="bg-surface text-primary py-4 px-10 rounded font-label-md text-label-md hover:shadow-xl transition-all">
                Đặt lịch ngay hôm nay
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high w-full py-section-padding-mobile md:py-section-padding-desktop border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="font-headline-sm text-headline-sm text-primary mb-4 block">AuraSpa</span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              Nơi hội tụ của tinh hoa thư giãn và nghệ thuật chăm sóc sức khỏe.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-6 uppercase tracking-wider">Thông tin</h4>
            <ul className="space-y-4">
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Chính sách bảo mật</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Điều khoản dịch vụ</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Quy tắc tại Spa</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Tuyển dụng</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-6 uppercase tracking-wider">Kết nối</h4>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all" href="#">
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              © 2024 AuraSpa Wellness. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Widget */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link href="/customer/bookings">
          <button className="bg-surface-container-high border border-secondary-fixed-dim/50 shadow-2xl p-4 md:p-6 rounded-full flex items-center gap-3 hover:scale-105 transition-all group">
            <div className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_add_on</span>
            </div>
            <div className="text-left pr-4 hidden md:block">
              <span className="block font-label-sm text-label-sm text-secondary uppercase tracking-tight">Đặt dịch vụ</span>
              <span className="block font-label-md text-label-md text-on-surface font-bold">Đặt chỗ nhanh</span>
            </div>
          </button>
        </Link>
      </div>

    </div>
  );
}