"use client";

import Link from "next/link";
import { PROMOTIONS, SERVICES, formatCurrency } from "@/lib/mock-data";
import Footer from "@/components/Footer";

function getServiceSummary(serviceIds: string[]) {
  if (!serviceIds.length) return "Tất cả dịch vụ";
  return serviceIds.map((id) => SERVICES.find((service) => service.id === id)?.name ?? "").filter(Boolean).join(", ");
}

export default function PromotionsPage() {
  return (
    <>
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Ưu đãi đặc quyền</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Chọn mã ưu đãi dành riêng cho bạn</h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            Khám phá các chương trình giảm giá của AuraSpa và tận hưởng liệu trình thư giãn với giá trị vượt trội.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROMOTIONS.map((promotion) => (
            <div key={promotion.id} className="rounded-[32px] border border-outline-variant/40 bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary">{promotion.name}</p>
                  <p className="text-on-surface-variant text-sm">Mã ưu đãi</p>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-semibold">{promotion.code}</span>
              </div>
              <div className="space-y-4 mb-6">
                <p className="text-headline-sm text-headline-sm text-on-surface">{promotion.discountType === "percent" ? `${promotion.discountValue}% Giảm` : `${formatCurrency(promotion.discountValue)} Giảm`}</p>
                <p className="text-body-md text-on-surface-variant">Áp dụng: {getServiceSummary(promotion.applicableServices)}</p>
                <p className="text-sm text-on-surface-variant">Thời gian: {promotion.startDate} — {promotion.endDate}</p>
                <p className="text-sm text-on-surface-variant">Đã sử dụng: {promotion.usageCount} lần</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={`/book?promotion=${promotion.code}`} className="rounded-full bg-primary px-5 py-3 text-on-primary text-center font-label-md text-label-md hover:opacity-90 transition-opacity">
                  Áp dụng ngay
                </Link>
                <Link href="/services" className="rounded-full border border-outline-variant px-5 py-3 text-center font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                  Xem dịch vụ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
