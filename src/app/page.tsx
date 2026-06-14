"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add("py-2");
        nav.classList.remove("py-4");
        nav.classList.add("shadow-md");
      } else {
        nav.classList.add("py-4");
        nav.classList.remove("py-2");
        nav.classList.remove("shadow-md");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-background text-on-surface selection:bg-primary-fixed selection:text-primary">

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-outline-variant shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <a className="font-headline-md text-headline-md font-medium tracking-tight text-primary" href="#">AuraSpa</a>
            <div className="hidden md:flex gap-8 items-center">
              <a className="font-label-md text-label-md text-primary font-semibold border-b-2 border-primary pb-1" href="#">Trang chủ</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Dịch vụ</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Câu chuyện thương hiệu</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Liên hệ</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="group relative">
              <button className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">language</span>
                VI
              </button>
              <div className="absolute top-full right-0 mt-2 w-32 bg-surface shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 border border-outline-variant py-2">
                <a className="block px-4 py-2 font-label-sm text-label-sm hover:bg-surface-container-low" href="#">English (EN)</a>
                <a className="block px-4 py-2 font-label-sm text-label-sm hover:bg-surface-container-low" href="#">简体中文 (ZH)</a>
                <a className="block px-4 py-2 font-label-sm text-label-sm hover:bg-surface-container-low" href="#">Français (FR)</a>
                <a className="block px-4 py-2 font-label-sm text-label-sm hover:bg-surface-container-low" href="#">한국어 (KO)</a>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity" href="/login">Đăng nhập</a>
              <a className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all duration-200" href="/login">Đăng ký</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Spa Hero"
            className="w-full h-full object-cover scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBfEcMgyBZnD0MUmrtv3-X67Z7DqXTHs3MefWBBkOV_9-A6lsjw3SA6dTGSiL9tW6rIdwdlei3FqSG4cCTkHW31EepcFQjCI6WkvAwmp3RnE9jWKiJ8Z74zbm22RZjbDMxkYE6DQqefnKcsRk4BBi-jJWm_oRsrXzpz32U3Leew3NC6Kj3MElZV0K2VEMG5jYlAimGu5iENlB9XJPoFrLtfdCIY9nBpWkE2gDguIF06f_9JjGGozpEs455_HPhnJgN3fddi_-EA60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
          <div className="max-w-2xl">
            <span className="font-label-md text-label-md text-secondary tracking-[0.2em] mb-4 block">ĐÁNH THỨC GIÁC QUAN</span>
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Nơi Tĩnh Lặng Gặp Gỡ Sự Sang Trọng</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              Trải nghiệm hành trình phục hồi thân-tâm-trí tại AuraSpa, nơi mỗi liệu trình được thiết kế riêng biệt để mang lại sự cân bằng hoàn hảo cho bạn.
            </p>
            <div className="flex gap-6">
              <button className="bg-primary text-on-primary px-10 py-4 font-label-md text-label-md hover:opacity-90 transition-all shadow-md active:scale-95">Đặt Lịch Ngay</button>
              <button className="border border-primary text-primary px-10 py-4 font-label-md text-label-md hover:bg-primary/5 transition-all active:scale-95">Xem Dịch Vụ</button>
            </div>
          </div>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  alt="Philosophy"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNd8v_GiBFlVWuvvxfKN4t21Ayz2E3ahrERyEdGIruQK0jXh7dsm3tQcZDpOhZDP8Ww3Z3tlvSenQAGcbAXJEhPbAEv8VqVW4Tcmqo1RFSB21pljpwfalvpUWo7xioWsdq5nn-uicXkBkLoUIRa2kfQKQzv-L3F_eTi2axN9n7taEk7a6g5KCvMD3QNONfQUzWPDdtGoyjTgict--kWnNKf5DbhCxJIWXMHfcWO8F0Q6Ta0FZOzqWjnmfOBJywgkdGcDDC8hQq5qg"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-surface-container p-6 flex flex-col justify-center border border-outline-variant">
                <span className="font-display-lg text-headline-lg text-primary block">15+</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Năm kinh nghiệm trong ngành Wellness</span>
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">Triết lý của sự tĩnh lặng và tái tạo</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic">&quot;Chúng tôi tin rằng sự sang trọng thực sự nằm ở cảm giác bình yên trong tâm hồn.&quot;</p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Tại AuraSpa, chúng tôi không chỉ cung cấp dịch vụ spa thông thường. Chúng tôi kiến tạo một không gian thoát ly khỏi sự xô bồ của cuộc sống, nơi bạn có thể tìm lại chính mình qua những liệu pháp kết hợp giữa thảo mộc truyền thống và công nghệ hiện đại.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-body-md text-body-md font-medium">Nguyên liệu hữu cơ 100% tinh khiết</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-body-md text-body-md font-medium">Chuyên gia trị liệu giàu kinh nghiệm</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-body-md text-body-md font-medium">Không gian riêng tư tuyệt đối</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Dịch vụ nổi bật</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Khám phá các gói trị liệu được yêu thích nhất, được thiết kế để mang lại hiệu quả tối ưu cho sức khỏe và sắc đẹp của bạn.</p>
            </div>
            <a className="font-label-md text-label-md text-primary flex items-center gap-2 group" href="#">
              Xem tất cả dịch vụ
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group cursor-pointer overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden mb-6">
                <img
                  alt="Hot Stone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_zPH-F-s1gVE4Emg8BQhsyBeZ4_pHl50q9Ie9QQmv5L4Ag69ddJEyXqo93qnzCkkf8DEWu836fCvzHoy_RoXzrzCY2RsIPbNfULagY-DU5tHYXqe5n3KEzI8T4nwC2aVCjfKW2MOmiFTQuU_ZPgGK_BOJRH5U7aoX0qUr5yXX4e5N8ORrwJIZIWm_3FOUM0cI20BP59k1_1sCWEKrDMJXQYEAgAeJzbGJVB-NglqY3fhSXjULNiRdHqpAqHvUaPlqdmzgYY0gfaI"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-primary/90 text-on-primary px-4 py-1 font-label-sm text-label-sm mb-2 inline-block">Bán chạy nhất</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Trị liệu Đá nóng Núi lửa</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Giải tỏa mọi căng thẳng cơ bắp bằng nhiệt lượng từ đá núi lửa tự nhiên kết hợp tinh dầu đặc trị.</p>
            </div>
            <div className="md:col-span-4 group cursor-pointer">
              <div className="aspect-square overflow-hidden mb-6">
                <img
                  alt="Facial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPYwEuWNaGySQ2GdOInnlDfn1h66kxnhVyetx_Jc6sk2HFEva53xUaGXBoSTjRQGZ8l3Cd-pPlnRQjNl1DgxIYI4PWysdUdyH2OQZe-fp0bG3G02L4-aBy6XtYXkbojYVUldPE0qzUq9n03TTygaTcCiQTgsv1glLLiEiSIEQgxPnKqQs9nGDVISX2n4tcfMJRk_F4J-eIscv21fP2fYQ9LLwHfCYbm-s58tnI0rEb6n52GOZIfJsBYFHMhF_csWWj-OHFxbjxzj8"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Chăm sóc Da mặt Chuyên sâu</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Tái tạo làn da tươi trẻ với công nghệ serum tế bào gốc và kỹ thuật massage nâng cơ.</p>
            </div>
            <div className="md:col-span-4 group cursor-pointer">
              <div className="aspect-square overflow-hidden mb-6">
                <img
                  alt="Aromatherapy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSy3zOeLWBePy2MWGEwd-vkEa3-xfD8z4-XZgsOjQlSCfruOPxh6Mvft1YcmQstklaLTzsaCqAluYbiRiU1lnG08B6WlnNzUBbSMApgHnq8QR5D0s6RGSR1k6P2Tg9_jq1Qh8-Rps8R2J9whAhSkr0TTd0ZycR6PvCJiXqoRCzssdGHUbEeJkQ6pRrow1V6roGPj9xjx9O_pEMK5P0X3yd1W5P4iucx2RczIP3RTpv8ahNSLMBx8DRS-wAB2YFCqOWs5zOUP-RHWk"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Liệu pháp Tinh dầu Aura</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Sử dụng hỗn hợp tinh dầu độc quyền giúp cân bằng cảm xúc và cải thiện chất lượng giấc ngủ.</p>
            </div>
            <div className="md:col-span-8 group cursor-pointer">
              <div className="relative aspect-[16/9] overflow-hidden mb-6">
                <img
                  alt="Full Body"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0YAA5z7HI4CheQCx_I8ayP2rXoBWtx9uIQO9xZFDCWrKFAkcRmPC3i6Vkg9FJxNTWdJER-SIBOsQhQVu4LHFKLDdp04RPsMJjXIp6g2gpAUcxVjSsHB6gdqp9XQgYAXivMQKNRutPXv2_kdR40L-1GUCHotCTAmgLZSS998r3qpwEyFCiHgw31h24IN53fqribjD61RzrIy7AgTGBh3bNSVIV9Wn-yfiHrcDCRGLey6S5ZpdtXZC9r58bnRRWNWgcAe5sN1WIESk"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Tắm khoáng &amp; Xông hơi Thảo mộc</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Thanh lọc cơ thể trong không gian xông hơi truyền thống với các loại lá thảo mộc quý hiếm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-section-padding-desktop bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Cảm nhận từ khách hàng</h2>
          <div className="w-24 h-px bg-primary mx-auto"></div>
        </div>
        <div className="flex gap-8 px-gutter overflow-x-auto whitespace-nowrap">
          {[
            {
              name: "Minh Anh", role: "Doanh nhân",
              text: "Một trải nghiệm thực sự khác biệt. Không gian tại AuraSpa làm tôi cảm thấy như đang ở một resort cao cấp tại Bali.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_NiAXNek_0ZbD8dQ5JSzY2y5txn2M-02-vRxmVDtYFDD0NbBGxfCUx-NvRdCqHqJzUSX6ifr6hi9ilqJ1MEG_SM622wqRRa3liGv28MCHs-tt6aZjh6gu4lWnKg6J9oRDDkSB34PqYktjtv4Eowt-2qXlQFgxPZqRwuA0DigiJlq4mvTALrFF9sBWJlvgh7KKCkbg__grZCKz9gqSiBuyxT8RRM102wBi0JcPZVV_qMAYK9LNWJiV6QXlLsEc5xXbXXhRtZPpadw"
            },
            {
              name: "Hoàng Nam", role: "Giám đốc sáng tạo",
              text: "Liệu pháp đá nóng ở đây là tốt nhất tôi từng thử. Các chuyên gia rất hiểu về huyệt đạo và nhu cầu của khách hàng.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5TCV8IDnBjCPRmNIqf247fUTPCUGCgtt5dkzbUxiIxvqdJBM8ajojhYrHH-b5mEHI_IDRRgSNzEqS8HfEHUG32ontDhCGxezzhDCgaMRymYAHDlsH-T_39fYFHVgK0rSDX6Q_DgI02NKKOLm13tqGPLUZ0eyj-o8cOjNOfswZW_fxZLfJE0SWtssLrUTF-E7S8_9Mm1c9t-fNhrQXuRVuk5DheGPHvhBsmCCW1_y4JOrL69_5dhF8cKSomG_S7H7bpS8QvOmau8"
            },
            {
              name: "Thanh Thảo", role: "Người mẫu",
              text: "Sự phục vụ chu đáo từ khi bước vào cửa đến khi ra về. Trà thảo mộc sau liệu trình rất ngon và thanh mát.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAPC5lTWYgAbLUIz3TKS6xGTXH5abu0r2ApCSXQsBU0qBXr-nIaGM3bbTew_ihZ0e6JtpOUM1YmEGPctlX9nZ3hWKD-LT_d2OnOvCfDiLFr89obONBZ_GrrzKJPuUdLWWO10YZYJ0_Wgk5h6LqXNpLiwBMNk254P8AG0Dg7VraluHl0-k4VEDkA1tae9ZJ7Swu7UgyabfR1j3zJ-zS13fXX_t87KbhO-o3TrsIkseDyQ3gJCObNF8JYrbKK86n19vfGlBh9q2070"
            },
          ].map((review) => (
            <div key={review.name} className="inline-block w-[400px] bg-surface p-10 shadow-sm border border-outline-variant whitespace-normal flex-shrink-0">
              <div className="flex gap-1 text-secondary mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 italic">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img alt={review.name} src={review.img} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <span className="font-label-md text-label-md block">{review.name}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-section-padding-desktop">
        <div className="absolute inset-0 z-0">
          <img
            alt="CTA Background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiOQjJF2Pbu0IbOgmDNc0uxY2VLoVU9iG7tNQbvKXuWBZMSRMY-8jU0-icVomEcexD3ZWacoXwFCDRnVJ_ny6yt5bmS9zZrw45jxCTohd8zHhl7T9VWaf3_MmPw_tUb7Nn2WYKP0FmuQY5x_MCfeuc_mBNhu4QU2aU2ZbbPQl4gyyx5CAphMp1DENqE3Bs9O8cBQ5D8zhW1IowIBV3y7h0Tm4dDhwHPXdDr7Urxta2fxQhLj_6j8PTpzqgLCbyrV6AYHa3ABDV5T0"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-gutter">
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6">Sẵn sàng cho hành trình tái tạo?</h2>
          <p className="font-body-lg text-body-lg text-on-primary/90 mb-10">Hãy để chúng tôi chăm sóc bạn. Đặt lịch ngay hôm nay để nhận ưu đãi 20% cho lần trải nghiệm đầu tiên.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-surface text-primary px-12 py-5 font-label-md text-label-md hover:bg-surface-bright transition-all shadow-xl">ĐẶT LỊCH NGAY</button>
            <button className="border-2 border-surface text-surface px-12 py-5 font-label-md text-label-md hover:bg-surface/10 transition-all">GỌI TƯ VẤN: 1900 8888</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-4">
              <a className="font-headline-sm text-headline-sm font-medium text-primary mb-6 block" href="#">AuraSpa</a>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 pr-12">Nâng tầm trải nghiệm Wellness tại Việt Nam với tiêu chuẩn quốc tế và triết lý phục vụ từ tâm.</p>
              <div className="flex gap-4">
                {["public", "share", "mail"].map((icon) => (
                  <a key={icon} className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-label-md text-label-md text-primary mb-6 uppercase tracking-widest">Khám phá</h4>
              <ul className="space-y-4">
                {["Dịch vụ", "Bảng giá", "Khuyến mãi", "Thành viên"].map((item) => (
                  <li key={item}><a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-label-md text-label-md text-primary mb-6 uppercase tracking-widest">Thông tin</h4>
              <ul className="space-y-4">
                {["Về chúng tôi", "Chính sách bảo mật", "Điều khoản dịch vụ", "Liên hệ"].map((item) => (
                  <li key={item}><a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-label-md text-label-md text-primary mb-6 uppercase tracking-widest">Đăng ký bản tin</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">Nhận những bí quyết chăm sóc sức khỏe và ưu đãi sớm nhất.</p>
              <div className="flex border-b border-outline">
                <input className="bg-transparent border-none py-3 focus:ring-0 text-sm w-full" placeholder="Email của bạn" type="email" />
                <button className="text-primary p-2">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 AuraSpa Wellness Retreat. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Designed for Serenity</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Widget (Floating) */}
      <div className="fixed bottom-8 right-8 z-40 group">
        <button className="bg-tertiary text-on-tertiary w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border border-secondary group-hover:scale-110 transition-transform duration-300">
          <span className="material-symbols-outlined">calendar_month</span>
        </button>
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-surface border border-outline-variant p-4 w-48 shadow-xl text-center">
            <p className="font-label-sm text-label-sm text-primary">Đặt lịch nhanh</p>
          </div>
        </div>
      </div>

    </main>
  );
}