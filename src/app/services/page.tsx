"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SERVICES } from "@/lib/mock-data";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const [filter, setFilter] = useState("all");
  const categories = useMemo(() => Array.from(new Set(SERVICES.map((service) => service.category))), []);
  const filteredServices = useMemo(
    () => (filter === "all" ? SERVICES : SERVICES.filter((service) => service.category === filter)),
    [filter]
  );

  return (
    <>
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen pb-24">
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Danh mục dịch vụ</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Dịch vụ AuraSpa dành cho bạn</h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            Chọn liệu trình spa sang trọng, phù hợp với nhu cầu thư giãn và tái tạo năng lượng của bạn.
          </p>
        </div>
      </section>

      <section className="px-gutter max-w-container-max mx-auto space-y-10">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-5 py-3 text-label-md text-label-md transition ${filter === "all" ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}
          >
            Tất cả
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-5 py-3 text-label-md text-label-md transition ${filter === category ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <article key={service.id} className="rounded-[32px] border border-outline-variant/40 bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
                  <span>{service.category}</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">{service.name}</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{service.description}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-on-surface-variant">{service.duration} phút</p>
                  <p className="font-bold text-primary mt-1">{service.price.toLocaleString("vi-VN")}đ</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/services/${service.id}`} className="rounded-full border border-primary px-4 py-3 text-primary text-center text-sm hover:bg-primary/10 transition-colors">
                    Xem chi tiết
                  </Link>
                  <Link href={`/book?serviceId=${service.id}`} className="rounded-full bg-primary px-4 py-3 text-on-primary text-center text-sm hover:opacity-90 transition-opacity">
                    Đặt ngay
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
