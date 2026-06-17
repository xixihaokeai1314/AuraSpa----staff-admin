"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRANCHES, SERVICES, STAFF_LIST, formatCurrency } from "@/lib/mock-data";
import { validateBookingForm } from "@/lib/validators";
import Footer from "@/components/Footer";

// Generate a rolling 7-day window from today
function generateDays() {
  const days: { label: string; dateStr: string; day: number }[] = [];
  const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: dayLabels[d.getDay()],
      dateStr: d.toISOString().split("T")[0],
      day: d.getDate(),
    });
  }
  return days;
}

const DAYS = generateDays();
const TIME_SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

// Step labels for progress bar
const STEPS = [
  "Chọn dịch vụ",
  "Chọn chi nhánh",
  "Chọn thời gian",
  "Chọn chuyên gia",
];

export default function BookPage() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0]?.id ?? "");
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0]?.id ?? "");
  const [selectedDate, setSelectedDate] = useState(DAYS[0].dateStr);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [selectedTherapistId, setSelectedTherapistId] = useState(STAFF_LIST[1]?.id ?? "");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const serviceId = params.get("serviceId");
    const branchId = params.get("branchId");
    if (serviceId && SERVICES.some((s) => s.id === serviceId)) setSelectedServiceId(serviceId);
    if (branchId && BRANCHES.some((b) => b.id === branchId)) setSelectedBranchId(branchId);
  }, [params]);

  const activeServices = SERVICES.filter((s) => s.status === "active");
  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) ?? activeServices[0];
  const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) ?? BRANCHES[0];
  const availableTherapists = useMemo(
    () => STAFF_LIST.filter((s) => s.role === "technician" && s.branchId === selectedBranch.id),
    [selectedBranch.id]
  );
  const selectedTherapist =
    availableTherapists.find((t) => t.id === selectedTherapistId) ?? availableTherapists[0];

  const progressPct = (step / STEPS.length) * 100;

  const handleConfirm = () => {
    const validationErrors = validateBookingForm({
      serviceId: selectedServiceId,
      branchId: selectedBranchId,
      date: selectedDate,
      timeSlot: selectedSlot,
      therapistId: selectedTherapistId,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setSuccess(
        `✓ Đặt lịch ${selectedService.name} tại ${selectedBranch.name} lúc ${selectedSlot} thành công! Chúng tôi sẽ gửi xác nhận qua email.`
      );
      setIsSubmitting(false);
    }, 600);
  };

  if (success) {
    return (
      <>
        <main className="bg-background min-h-screen flex items-center justify-center px-gutter">
          <div className="max-w-md w-full text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-green-600" style={{ fontSize: 40, fontVariationSettings: "'FILL' 1" }}>
                event_available
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-3">Đặt lịch thành công!</h2>
            <p className="font-body-md text-on-surface-variant mb-2">{selectedService.name}</p>
            <p className="font-body-md text-on-surface-variant mb-6">
              {selectedBranch.name} · {selectedDate} · {selectedSlot}
            </p>
            <div className="bg-surface-container-low rounded-xl p-5 mb-8 text-left space-y-3">
              {[
                { icon: "spa", label: "Dịch vụ", value: selectedService.name },
                { icon: "badge", label: "Chuyên gia", value: selectedTherapist?.name ?? "—" },
                { icon: "schedule", label: "Thời gian", value: `${selectedSlot} — ${selectedDate}` },
                { icon: "storefront", label: "Chi nhánh", value: selectedBranch.name },
                { icon: "payments", label: "Tổng tiền", value: formatCurrency(selectedService.price) },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>{icon}</span>
                  <span className="text-on-surface-variant w-24 shrink-0">{label}</span>
                  <span className="font-bold text-on-surface">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/customer/bookings" className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md text-center hover:opacity-90 transition-opacity">
                Xem lịch hẹn
              </Link>
              <button
                onClick={() => { setSuccess(""); setStep(1); }}
                className="flex-1 border border-primary text-primary py-3 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors"
              >
                Đặt lịch khác
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="bg-background text-on-surface font-body-md min-h-screen pb-48">
        {/* Top bar */}
        <header className="sticky top-0 z-50 flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-headline-sm text-headline-sm text-primary tracking-wide">AuraSpa</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/customer" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
              Quay lại
            </Link>
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
              KH
            </div>
          </div>
        </header>

        {/* Progress stepper */}
        <section className="px-gutter pt-6 pb-2 max-w-container-max mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-label-md text-label-md text-primary tracking-widest uppercase">
              Bước {step}: {STEPS[step - 1]}
            </h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{step}/{STEPS.length}</span>
          </div>
          <div className="w-full h-[2px] bg-outline-variant/30 overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`flex flex-col items-center gap-1 group ${i + 1 < step ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 <= step ? "bg-primary" : "bg-outline-variant/30"
                }`} />
                <span className={`hidden md:block font-label-sm text-label-sm ${
                  i + 1 === step ? "text-primary font-bold" : "text-on-surface-variant"
                }`} style={{ fontSize: 10 }}>{s}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="px-gutter max-w-container-max mx-auto mt-6 space-y-8">
          {/* ── STEP 1: Service ── */}
          {step === 1 && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Dịch vụ nổi bật</h3>
                  <p className="font-body-md text-on-surface-variant">Khám phá trải nghiệm thư giãn tinh túy</p>
                </div>
              </div>
              {errors.serviceId && <p className="text-error text-sm mb-4">{errors.serviceId}</p>}
              <div className="space-y-4">
                {activeServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => {
                      setSelectedServiceId(svc.id);
                      setErrors((p) => { const e = { ...p }; delete e.serviceId; return e; });
                    }}
                    className={`group relative overflow-hidden bg-surface-container-low p-6 rounded-xl transition-all cursor-pointer border-2 ${
                      selectedServiceId === svc.id
                        ? "border-primary shadow-md"
                        : "border-transparent hover:border-primary/20 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-headline-sm text-headline-sm mb-1">{svc.name}</h4>
                        <div className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface-variant mb-3">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                            {svc.duration} Phút
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>category</span>
                            {svc.category}
                          </span>
                        </div>
                        <p className="font-body-md text-on-surface-variant text-sm line-clamp-2">{svc.description}</p>
                        <p className="font-body-md font-bold text-primary mt-3 text-lg">{formatCurrency(svc.price)}</p>
                      </div>
                      <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: 36, fontVariationSettings: "'FILL' 0, 'wght' 100" }}>spa</span>
                      </div>
                    </div>
                    {selectedServiceId === svc.id && (
                      <div className="absolute top-3 right-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── STEP 2: Branch ── */}
          {step === 2 && (
            <section>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Chọn Chi Nhánh</h3>
              <p className="font-body-md text-on-surface-variant mb-6">{BRANCHES.length} chi nhánh trên toàn quốc</p>
              {errors.branchId && <p className="text-error text-sm mb-4">{errors.branchId}</p>}
              <div className="grid grid-cols-1 gap-4">
                {BRANCHES.filter((b) => b.status === "active").map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => {
                      setSelectedBranchId(branch.id);
                      setErrors((p) => { const e = { ...p }; delete e.branchId; return e; });
                    }}
                    className={`flex items-center justify-between p-5 rounded-xl text-left transition-all border-2 ${
                      selectedBranchId === branch.id
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/30 bg-surface hover:border-primary"
                    }`}
                  >
                    <div>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-bold">{branch.name}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{branch.address}</p>
                      <p className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span>
                        {branch.openHours}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedBranchId === branch.id && (
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" style={{ fontSize: 20 }}>location_on</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ── STEP 3: Date & Time ── */}
          {step === 3 && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Thời Gian</h3>
                <span className="font-label-md text-label-md text-primary">
                  {new Date(selectedDate).toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
                </span>
              </div>
              {errors.date && <p className="text-error text-sm mb-3">{errors.date}</p>}

              {/* Calendar strip */}
              <div ref={scrollRef} className="flex overflow-x-auto gap-3 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {DAYS.map((d) => (
                  <button
                    key={d.dateStr}
                    onClick={() => {
                      setSelectedDate(d.dateStr);
                      setErrors((p) => { const e = { ...p }; delete e.date; return e; });
                    }}
                    className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
                      selectedDate === d.dateStr
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant/30 bg-surface hover:border-primary"
                    }`}
                  >
                    <span className={`font-label-sm text-label-sm ${selectedDate === d.dateStr ? "opacity-80" : "text-on-surface-variant"}`}>
                      {d.label}
                    </span>
                    <span className="font-body-lg font-bold mt-1">{d.day}</span>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {errors.timeSlot && <p className="text-error text-sm mt-2 mb-2">{errors.timeSlot}</p>}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setErrors((p) => { const e = { ...p }; delete e.timeSlot; return e; });
                    }}
                    className={`py-3 rounded-xl font-label-md text-label-md border-2 transition-all ${
                      selectedSlot === slot
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant/30 bg-surface hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ── STEP 4: Therapist ── */}
          {step === 4 && (
            <section>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Chuyên Gia</h3>
              <p className="font-body-md text-on-surface-variant mb-6">
                {availableTherapists.length} chuyên gia tại {selectedBranch.name}
              </p>
              {errors.therapistId && <p className="text-error text-sm mb-4">{errors.therapistId}</p>}
              {availableTherapists.length === 0 ? (
                <div className="bg-surface-container rounded-xl p-8 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl block mb-2">person_off</span>
                  <p className="font-label-md text-label-md">Không có chuyên gia tại chi nhánh đã chọn</p>
                </div>
              ) : (
                <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
                  {availableTherapists.map((therapist) => {
                    const isSelected = selectedTherapistId === therapist.id ||
                      (!selectedTherapistId && therapist.id === availableTherapists[0]?.id);
                    return (
                      <div
                        key={therapist.id}
                        onClick={() => {
                          setSelectedTherapistId(therapist.id);
                          setErrors((p) => { const e = { ...p }; delete e.therapistId; return e; });
                        }}
                        className={`flex-shrink-0 w-36 text-center group cursor-pointer ${
                          isSelected ? "ring-2 ring-primary ring-offset-4 ring-offset-background rounded-xl" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`relative w-36 h-44 mb-3 overflow-hidden rounded-xl border-2 ${
                          isSelected ? "border-primary" : "border-outline-variant/20"
                        }`}>
                          <div className={`w-full h-full bg-surface-container-high flex items-center justify-center transition-all ${
                            isSelected ? "" : "grayscale group-hover:grayscale-0"
                          }`}>
                            <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-2xl font-bold">
                              {therapist.name.split(" ").pop()?.[0] ?? "?"}
                            </div>
                          </div>
                          {/* Rating badge */}
                          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-secondary" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-xs font-bold">{therapist.rating}</span>
                          </div>
                        </div>
                        <p className="font-label-md text-label-md font-bold text-on-surface">{therapist.name}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">{therapist.specialization}</p>
                        <p className="font-label-sm text-label-sm text-secondary mt-0.5">{therapist.servicesCompleted} buổi</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Sticky bottom: summary + action */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20 px-gutter py-4 z-40 shadow-[0px_-10px_30px_rgba(45,41,38,0.08)]">
        <div className="max-w-container-max mx-auto flex flex-col gap-3">
          {/* Summary row */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Tổng thanh toán</p>
              <p className="font-headline-sm text-headline-sm text-primary">{formatCurrency(selectedService.price)}</p>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-label-sm text-on-surface-variant">Thời gian dự kiến</p>
              <p className="font-label-md text-label-md font-bold">{selectedService.duration} Phút</p>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-6 py-3 border-2 border-outline-variant rounded-full font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              >
                Quay lại
              </button>
            )}
            {step < STEPS.length ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Tiếp theo — {STEPS[step]}
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Đang xác nhận..." : "Xác nhận đặt lịch"}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
