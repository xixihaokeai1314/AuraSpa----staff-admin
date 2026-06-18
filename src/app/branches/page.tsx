"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BRANCHES } from "@/lib/mock-data";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const filteredBranches = useMemo(
    () =>
      BRANCHES.filter((branch) =>
        branch.name.toLowerCase().includes(query.toLowerCase()) ||
        branch.address.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <>
    <Navbar />
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="max-w-3xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Chi nhánh</span>
            <h1 className="font-display-lg text-display-lg text-primary mb-4">Khám phá các trải nghiệm AuraSpa gần bạn</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Chọn chi nhánh phù hợp với lịch trình và phong cách sống của bạn. Mỗi cơ sở được chăm chút để mang đến không gian thư giãn sang trọng.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-full px-5 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tìm chi nhánh hoặc địa chỉ..."
              />
              <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">
                Đặt lịch ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {filteredBranches.length === 0 ? (
                <div className="rounded-3xl border border-outline-variant/50 bg-surface p-8 text-center text-on-surface-variant">
                  Không tìm thấy chi nhánh phù hợp.
                </div>
              ) : (
                filteredBranches.map((branch) => (
                  <div key={branch.id} className="rounded-[32px] border border-outline-variant/40 bg-white p-8 shadow-sm transition hover:shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {branch.status === "active" ? "Hoạt động" : "Bảo trì"}
                          </span>
                          <span className="text-sm text-on-surface-variant">Quy mô {branch.capacity} phòng</span>
                        </div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">{branch.name}</h2>
                        <p className="text-body-md text-on-surface-variant">{branch.address}</p>
                        <p className="text-sm text-on-surface-variant">Giờ mở cửa: {branch.openHours}</p>
                      </div>
                      <div className="flex flex-col gap-3 text-right md:text-right">
                        <div>
                          <p className="text-sm text-on-surface-variant">Người quản lý</p>
                          <p className="font-bold text-on-surface">{branch.managerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-on-surface-variant">Liên hệ</p>
                          <p className="font-medium text-on-surface">{branch.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm text-on-surface-variant">Email: {branch.email}</p>
                      </div>
                      <Link href={`/book?branchId=${branch.id}`} className="rounded-full bg-primary px-6 py-3 text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">
                        Đặt lịch tại đây
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            <aside className="lg:col-span-4 rounded-[32px] border border-outline-variant/40 bg-surface-container-low p-8 space-y-6">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4">Gợi ý nhanh</p>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-white p-5 border border-outline-variant/30">
                    <p className="text-sm text-on-surface-variant">Chi nhánh được khách yêu thích nhất</p>
                    <p className="font-semibold text-on-surface">AuraSpa Thảo Điền</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 border border-outline-variant/30">
                    <p className="text-sm text-on-surface-variant">Dịch vụ hot</p>
                    <p className="font-semibold text-on-surface">Massage Đá Nóng Núi Lửa</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 border border-outline-variant/30">
                <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-3">Hỗ trợ</p>
                <p className="text-sm text-on-surface-variant">Cần hỗ trợ?</p>
                <p className="font-semibold text-on-surface">hotline 1900 8888</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
