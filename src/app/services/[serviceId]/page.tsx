import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, formatCurrency } from "@/lib/mock-data";

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const service = SERVICES.find((item) => item.id === params.serviceId);
  if (!service) {
    notFound();
  }

  return (
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen pb-24">
      <section className="bg-surface-container-lowest pt-24 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-4 block">Chi tiết dịch vụ</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">{service.name}</h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-full bg-primary/10 px-5 py-3 text-primary font-semibold">{service.category}</div>
            <div className="rounded-full bg-surface border border-outline-variant px-5 py-3 text-on-surface-variant">{service.duration} phút</div>
            <div className="rounded-full bg-surface border border-outline-variant px-5 py-3 text-on-surface-variant">{formatCurrency(service.price)}</div>
          </div>
        </div>
      </section>

      <section className="px-gutter max-w-container-max mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-[32px] border border-outline-variant/40 bg-white p-10 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Mô tả chi tiết</h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">{service.description}</p>
            <div className="mt-10 space-y-4">
              <div className="rounded-3xl bg-surface p-6">
                <h3 className="font-label-md text-label-md text-primary mb-3">Lợi ích chính</h3>
                <ul className="space-y-2 text-body-md text-on-surface-variant">
                  <li>- Cân bằng năng lượng và giảm căng thẳng</li>
                  <li>- Tái tạo làn da và nâng cao sức khỏe tổng thể</li>
                  <li>- Trải nghiệm spa sang trọng với dịch vụ cá nhân hóa</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-surface p-6">
                <h3 className="font-label-md text-label-md text-primary mb-3">Sự kiện phù hợp</h3>
                <p className="text-body-md text-on-surface-variant">Dịch vụ lý tưởng cho khách muốn thư giãn sâu, làm mới cơ thể sau tuần làm việc căng thẳng hoặc chuẩn bị cho sự kiện quan trọng.</p>
              </div>
            </div>
          </div>
          <aside className="rounded-[32px] border border-outline-variant/40 bg-surface-container-low p-8 shadow-sm space-y-6">
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary mb-3">Thông tin nhanh</p>
              <div className="space-y-3 text-body-md text-on-surface-variant">
                <p><span className="font-semibold text-on-surface">Thời lượng:</span> {service.duration} phút</p>
                <p><span className="font-semibold text-on-surface">Giá:</span> {formatCurrency(service.price)}</p>
                <p><span className="font-semibold text-on-surface">Danh mục:</span> {service.category}</p>
                <p><span className="font-semibold text-on-surface">Lượt đặt:</span> {service.bookings}</p>
              </div>
            </div>
            <Link href={`/book?serviceId=${service.id}`} className="block rounded-full bg-primary px-6 py-4 text-center text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity">
              Đặt lịch ngay
            </Link>
          </aside>
        </div>
        <div className="rounded-[32px] border border-outline-variant/40 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-sm text-headline-sm text-primary">Dịch vụ liên quan</h2>
            <Link href="/services" className="text-primary font-label-md text-label-md hover:underline">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.filter((item) => item.category === service.category && item.id !== service.id).slice(0, 3).map((item) => (
              <Link key={item.id} href={`/services/${item.id}`} className="rounded-3xl border border-outline-variant/30 p-6 transition hover:shadow-lg">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{item.name}</h3>
                <p className="text-body-md text-on-surface-variant line-clamp-3">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
