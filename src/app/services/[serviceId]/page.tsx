import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, formatCurrency } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Next.js 16: params is a Promise — must be awaited
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = SERVICES.find((item) => item.id === serviceId);
  if (!service) notFound();

  const related = SERVICES.filter(
    (item) => item.category === service.category && item.id !== service.id
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-background text-on-surface font-body-md min-h-screen pb-24">
        <section className="bg-surface-container-lowest pt-24 pb-16">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-4">
              <Link href="/services" className="hover:text-primary transition-colors">Dịch vụ</Link>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              <span className="text-primary">{service.name}</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-4">{service.name}</h1>
            <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">{service.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary/10 px-5 py-2 text-primary font-label-md text-label-md">{service.category}</span>
              <span className="rounded-full border border-outline-variant px-5 py-2 text-on-surface-variant font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
                {service.duration} phút
              </span>
              <span className="rounded-full border border-outline-variant px-5 py-2 text-on-surface-variant font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>payments</span>
                {formatCurrency(service.price)}
              </span>
            </div>
          </div>
        </section>

        <section className="px-gutter max-w-container-max mx-auto space-y-10 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-outline-variant/40 bg-white p-8 shadow-sm">
                <h2 className="font-headline-sm text-headline-sm text-primary mb-5">Mô tả chi tiết</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{service.description}</p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-xl bg-surface-container-low p-5">
                    <h3 className="font-label-md text-label-md text-primary mb-3">Lợi ích chính</h3>
                    <ul className="space-y-2 text-body-md text-on-surface-variant">
                      {[
                        "Cân bằng năng lượng và giảm căng thẳng hiệu quả",
                        "Tái tạo làn da và nâng cao sức khỏe tổng thể",
                        "Trải nghiệm spa sang trọng với dịch vụ cá nhân hóa",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-surface-container-low p-5">
                    <h3 className="font-label-md text-label-md text-primary mb-3">Phù hợp cho</h3>
                    <p className="text-body-md text-on-surface-variant">
                      Dịch vụ lý tưởng cho khách muốn thư giãn sâu, làm mới cơ thể sau tuần làm việc căng thẳng hoặc chuẩn bị cho sự kiện quan trọng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-6 shadow-sm">
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-4">Thông tin nhanh</p>
                <div className="space-y-3 text-body-md text-on-surface-variant">
                  {[
                    { label: "Thời lượng", value: `${service.duration} phút` },
                    { label: "Danh mục", value: service.category },
                    { label: "Lượt đặt", value: `${service.bookings} lần` },
                    { label: "Trạng thái", value: service.status === "active" ? "Đang hoạt động" : "Tạm ngưng" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="font-label-md text-label-md text-on-surface">{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-outline-variant/40 bg-white p-6 shadow-sm">
                <p className="font-headline-sm text-headline-sm text-primary mb-1">{formatCurrency(service.price)}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">{service.duration} phút · {service.category}</p>
                <Link
                  href={`/book?serviceId=${service.id}`}
                  className="block rounded-full bg-primary px-6 py-3 text-center text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity mb-3"
                >
                  Đặt lịch ngay
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-full border border-primary px-6 py-3 text-center text-primary font-label-md text-label-md hover:bg-primary/5 transition-colors"
                >
                  Tư vấn miễn phí
                </Link>
              </div>
            </aside>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="rounded-2xl border border-outline-variant/40 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm text-primary">Dịch vụ liên quan</h2>
                <Link href="/services" className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
                  Xem tất cả
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services/${item.id}`}
                    className="rounded-xl border border-outline-variant/30 p-5 hover:border-primary hover:shadow-md transition-all group"
                  >
                    <span className="inline-block bg-primary/10 text-primary font-label-sm text-label-sm px-3 py-1 rounded-full mb-3">
                      {item.category}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-body-md text-on-surface-variant line-clamp-2 text-sm mb-3">{item.description}</p>
                    <p className="font-label-md text-label-md text-primary font-bold">{formatCurrency(item.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
