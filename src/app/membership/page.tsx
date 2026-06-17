"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  return (    <>    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Chương Trình Thành Viên</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">AuraClub - Ưu Đãi Vô Hạn</h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            Tham gia chương trình thành viên độc quyền của AuraSpa và tận hưởng những lợi ích đặc biệt, ưu đãi giảm giá, và trải nghiệm VIP.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="px-gutter max-w-container-max mx-auto space-y-16">
        <div className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Ba Cấp Độ Thành Viên</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Chọn cấp độ phù hợp với nhu cầu thư giãn của bạn</p>
          </div>

          {/* Tier Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver */}
            <div className="rounded-[32px] border-2 border-outline-variant/40 bg-white p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-surface/60 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">card_membership</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">AURA Silver</h3>
              </div>

              <div className="mb-8">
                <p className="text-sm text-on-surface-variant mb-3">Miễn phí khi đạt</p>
                <p className="text-on-surface-variant text-sm mb-4">
                  <span className="font-bold text-primary">100 điểm</span> tích lũy hoặc thanh toán <span className="font-bold">500,000đ</span>
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Giảm 5% tất cả dịch vụ</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Tích lũy 5% điểm cho mỗi giao dịch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Ưu tiên đặt lịch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Sinh nhật: 20% giảm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Hỗ trợ khách hàng 24/7</span>
                </div>
              </div>

              <button className="w-full rounded-full border border-primary text-primary px-6 py-3 font-label-md text-label-md hover:bg-primary/5 transition">
                Nâng Cấp Ngay
              </button>
            </div>

            {/* Gold */}
            <div className="rounded-[32px] border-2 border-primary bg-primary/5 p-8 shadow-md relative hover:shadow-lg transition">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold">
                YÊU THÍCH
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">card_membership</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">AURA Gold</h3>
              </div>

              <div className="mb-8">
                <p className="text-sm text-on-surface-variant mb-3">Miễn phí khi đạt</p>
                <p className="text-on-surface-variant text-sm mb-4">
                  <span className="font-bold text-primary">500 điểm</span> tích lũy hoặc thanh toán <span className="font-bold">2,000,000đ</span>
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">Giảm 10% tất cả dịch vụ</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">Tích lũy 10% điểm cho mỗi giao dịch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">1 dịch vụ MIỄN PHÍ/năm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">Sinh nhật: 30% giảm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">Accès VIP lounge</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-sm font-semibold">Personal therapist booking</span>
                </div>
              </div>

              <button className="w-full rounded-full bg-primary text-on-primary px-6 py-3 font-label-md text-label-md hover:opacity-90 transition">
                Nâng Cấp Ngay
              </button>
            </div>

            {/* Platinum */}
            <div className="rounded-[32px] border-2 border-outline-variant/40 bg-white p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-surface/80 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">card_membership</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">AURA Platinum</h3>
              </div>

              <div className="mb-8">
                <p className="text-sm text-on-surface-variant mb-3">Miễn phí khi đạt</p>
                <p className="text-on-surface-variant text-sm mb-4">
                  <span className="font-bold text-primary">2,000 điểm</span> tích lũy hoặc thanh toán <span className="font-bold">5,000,000đ</span>
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Giảm 15% tất cả dịch vụ</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Tích lũy 15% điểm cho mỗi giao dịch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">2 dịch vụ MIỄN PHÍ/năm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Sinh nhật: 50% giảm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">VIP lounge unlimited access</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">check</span>
                  <span className="text-body-sm">Concierge service, spa packages</span>
                </div>
              </div>

              <button className="w-full rounded-full border border-primary text-primary px-6 py-3 font-label-md text-label-md hover:bg-primary/5 transition">
                Nâng Cấp Ngay
              </button>
            </div>
          </div>
        </div>

        {/* How Points Work */}
        <div className="rounded-[32px] border border-outline-variant/40 bg-surface-container-low p-12 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">Cách Thức Tích Điểm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-headline-md text-primary font-bold mb-2">1 điểm</div>
              <p className="text-sm text-on-surface-variant">= 1,000đ chi tiêu tại AuraSpa</p>
            </div>
            <div>
              <div className="text-headline-md text-primary font-bold mb-2">Tham Gia</div>
              <p className="text-sm text-on-surface-variant">Tự động tích điểm mỗi khi book dịch vụ</p>
            </div>
            <div>
              <div className="text-headline-md text-primary font-bold mb-2">Tiêu</div>
              <p className="text-sm text-on-surface-variant">100 điểm = 200,000đ giảm giá</p>
            </div>
            <div>
              <div className="text-headline-md text-primary font-bold mb-2">Không Hết Hạn</div>
              <p className="text-sm text-on-surface-variant">Điểm luôn có giá trị, không bao giờ hết</p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-8">Ưu Đãi Đặc Biệt Thành Viên</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[32px] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-8">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">🎉 Sinh Nhật Đặc Biệt</h3>
              <p className="text-body-md text-on-surface-variant mb-4">Nhận voucher sinh nhật với mức giảm giá cao, áp dụng cả tháng sinh nhật</p>
              <p className="text-sm font-semibold text-primary">Silver: 20% | Gold: 30% | Platinum: 50%</p>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 p-8">
              <h3 className="font-headline-sm text-headline-sm text-secondary mb-3">💝 Giới Thiệu Bạn</h3>
              <p className="text-body-md text-on-surface-variant mb-4">Mỗi bạn mới được giới thiệu: nhận 50 điểm + bạn nhận 50 điểm</p>
              <p className="text-sm font-semibold text-secondary">Không giới hạn số người giới thiệu</p>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-tertiary/10 to-primary/10 border border-tertiary/20 p-8">
              <h3 className="font-headline-sm text-headline-sm text-tertiary mb-3">📅 Ưu Đãi Mùa Hè</h3>
              <p className="text-body-md text-on-surface-variant mb-4">Gói combo spa mùa hè với giá đặc biệt cho thành viên, tăng lên 25% giá trị dịch vụ</p>
              <p className="text-sm font-semibold text-tertiary">Chỉ từ tháng 5-7</p>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-primary/10 to-tertiary/10 border border-primary/20 p-8">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">🎁 Chương Trình Hoán Đổi</h3>
              <p className="text-body-md text-on-surface-variant mb-4">Tích lũy điểm để nhận các phần quà độc quyền, sản phẩm spa và gói dịch vụ miễn phí</p>
              <p className="text-sm font-semibold text-primary">Thay đổi hàng tháng</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-8">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            {[
              {
                q: "Có phí khi tham gia chương trình thành viên không?",
                a: "Không, AURA Silver là miễn phí khi bạn tích lũy 100 điểm hoặc chi tiêu 500,000đ. Các cấp cao hơn có chi phí tương ứng nhưng sẽ hoàn lại qua ưu đãi.",
              },
              {
                q: "Điểm của tôi sẽ hết hạn khi nào?",
                a: "Điểm không bao giờ hết hạn! Bạn có thể tích lũy và sử dụng bất cứ lúc nào, không có giới hạn thời gian.",
              },
              {
                q: "Tôi có thể nâng cấp thành viên bất cứ lúc nào không?",
                a: "Có, bạn có thể nâng cấp bất cứ lúc nào thông qua ứng dụng hoặc liên hệ chi nhánh gần nhất.",
              },
              {
                q: "Ưu đãi thành viên có áp dụng cho tất cả dịch vụ không?",
                a: "Có, ưu đãi áp dụng cho tất cả dịch vụ spa, massage, trị liệu, không có ngoại lệ.",
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-outline-variant/40 p-6 hover:border-primary/40 transition">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">{item.q}</h3>
                <p className="text-body-md text-on-surface-variant">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-[32px] bg-primary p-12 text-center">
          <h2 className="font-headline-md text-headline-md text-on-primary mb-4">Bắt Đầu Hành Trình Của Bạn Ngay Hôm Nay</h2>
          <p className="text-on-primary/90 mb-8 max-w-2xl mx-auto">Tham gia AURA Club và nhận 50 điểm khởi động, cộng thêm 20% ưu đãi lần đầu</p>
          <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-on-primary text-primary px-10 py-4 font-label-md text-label-md hover:opacity-90 transition-opacity">
            Đặt Lịch & Tham Gia Ngay
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
