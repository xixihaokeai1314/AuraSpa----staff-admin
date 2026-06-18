"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <main className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <img
            alt="About Hero"
            className="w-full h-full object-cover opacity-30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBfEcMgyBZnD0MUmrtv3-X67Z7DqXTHs3MefWBBkOV_9-A6lsjw3SA6dTGSiL9tW6rIdwdlei3FqSG4cCTkHW31EepcFQjCI6WkvAwmp3RnE9jWKiJ8Z74zbm22RZjbDMxkYE6DQqefnKcsRk4BBi-jJWm_oRsrXzpz32U3Leew3NC6Kj3MElZV0K2VEMG5jYlAimGu5iENlB9XJPoFrLtfdCIY9nBpWkE2gDguIF06f_9JjGGozpEs455_HPhnJgN3fddi_-EA60"
          />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Câu Chuyện AuraSpa</h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Từ một tầm nhìn về sự cân bằng đến một điểm đến cho sự phục hồi toàn diện.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-section-padding-desktop bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Sứ Mệnh Của Chúng Tôi</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                AuraSpa được thành lập từ niềm tin rằng <span className="font-semibold text-on-surface">sự thư giãn thực sự là một nhu cầu cơ bản</span> trong cuộc sống hiện đại, không phải là một mặt hàng xa xỉ.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                Chúng tôi cam kết mang lại những trải nghiệm spa chất lượng cao, sử dụng nguyên liệu thiên nhiên tinh khiết và kỹ thuật massage truyền thống kết hợp công nghệ hiện đại.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Mỗi liệu pháp tại AuraSpa được thiết kế để <span className="font-semibold text-on-surface">tái cân bằng cơ thể, tĩnh lặng tâm trí và nâng cao tinh thần</span>.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-lg">
              <img
                alt="AuraSpa Mission"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNd8v_GiBFlVWuvvxfKN4t21Ayz2E3ahrERyEdGIruQK0jXh7dsm3tQcZDpOhZDP8Ww3Z3tlvSenQAGcbAXJEhPbAEv8VqVW4Tcmqo1RFSB21pljpwfalvpUWo7xioWsdq5nn-uicXkBkLoUIRa2kfQKQzv-L3F_eTi2axN9n7taEk7a6g5KCvMD3QNONfQUzWPDdtGoyjTgict--kWnNKf5DbhCxJIWXMHfcWO8F0Q6Ta0FZOzqWjnmfOBJywgkdGcDDC8hQq5qg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Giá Trị Cốt Lõi</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Ba nguyên tắc hướng dẫn mọi quyết định của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[32px] bg-white p-8 border border-outline-variant/40 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">leaf</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Tự Nhiên & Sạch</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Chúng tôi chỉ sử dụng nguyên liệu hữu cơ 100%, không hóa chất độc hại, được nguồn từ các nhà cung cấp tin cậy.
              </p>
            </div>

            <div className="rounded-[32px] bg-white p-8 border border-outline-variant/40 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Chăm Sóc Tận Tâm</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Mỗi khách hàng là duy nhất. Đội ngũ chuyên gia của chúng tôi lắng nghe và tùy chỉnh từng liệu pháp theo nhu cầu cá nhân.
              </p>
            </div>

            <div className="rounded-[32px] bg-white p-8 border border-outline-variant/40 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">spa</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Cân Bằng Toàn Diện</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Chúng tôi tin rằng sự khỏe mạnh thực sự đến từ sự cân bằng giữa cơ thể, tâm trí và tinh thần.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-section-padding-desktop bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-16 text-center">Hành Trình Của Chúng Tôi</h2>
          <div className="space-y-8">
            {[
              {
                year: "2009",
                title: "Khởi Đầu",
                description: "AuraSpa được thành lập với một cơ sở duy nhất tại Thảo Điền, với tầm nhìn mang lại sự yên bình cho cộng đồng.",
              },
              {
                year: "2013",
                title: "Mở Rộng",
                description: "Mở rộng sang 3 chi nhánh tại các khu vực trung tâm của TPHCM, phục vụ hơn 10,000 khách hàng hàng năm.",
              },
              {
                year: "2017",
                title: "Sứ Mệnh Bền Vững",
                description: "Triển khai chương trình bền vững, cam kết giảm 50% chất thải nhựa và sử dụng 100% năng lượng tái tạo.",
              },
              {
                year: "2021",
                title: "Công Nghệ & Đổi Mới",
                description: "Tích hợp công nghệ đặt lịch trực tuyến, nâng cao trải nghiệm khách hàng và mở rộng đội ngũ chuyên gia.",
              },
              {
                year: "2024",
                title: "Hiện Tại & Tương Lai",
                description: "Phục vụ hơn 50,000 khách hàng/năm với 5 chi nhánh, và tiếp tục phát triển dịch vụ chăm sóc sức khỏe tổng thể.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm flex-shrink-0">
                    {item.year.slice(-2)}
                  </div>
                  {idx < 4 && <div className="w-1 h-16 bg-primary/30"></div>}
                </div>
                <div className="pt-2 pb-8">
                  <p className="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em] mb-2">{item.year}</p>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Đội Ngũ Chuyên Gia</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Hơn 100 chuyên gia massage, chăm sóc da và wellness được đào tạo quốc tế
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Minh Anh", title: "Chuyên Gia Massage", exp: "15 năm" },
              { name: "Thanh Hằng", title: "Trị Liệu Viên Da", exp: "12 năm" },
              { name: "Quỳnh Chi", title: "Yoga & Wellness", exp: "10 năm" },
              { name: "Kim Anh", title: "Hương Liệu Pháp", exp: "8 năm" },
            ].map((member, idx) => (
              <div key={idx} className="rounded-[32px] bg-white p-6 border border-outline-variant/40 shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-5xl">person</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{member.title}</p>
                <p className="text-xs text-on-surface-variant">{member.exp} kinh nghiệm</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding-desktop bg-primary">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6">Sẵn Sàng Trải Nghiệm Sự Yên Bình?</h2>
          <p className="font-body-md text-body-md text-on-primary/90 max-w-2xl mx-auto mb-8">
            Hãy đặt lịch tại AuraSpa hôm nay và khám phá hành trình phục hồi thân-tâm-trí của bạn.
          </p>
          <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-on-primary text-primary px-10 py-4 font-label-md text-label-md hover:opacity-90 transition-opacity">
            Đặt Lịch Ngay
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
