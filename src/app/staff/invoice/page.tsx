"use client";
import { useState } from "react";
import { TODAY_APPOINTMENTS, SERVICES, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/mock-data";

type PayMethod = "cash" | "card" | "transfer";

export default function StaffInvoice() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [discountError, setDiscountError] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("cash");
  const [paid, setPaid] = useState(false);
  const [manualDiscount, setManualDiscount] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const eligibleAppts = TODAY_APPOINTMENTS.filter((a) => a.status === "checked_in" || a.status === "completed");
  const selected = eligibleAppts.find((a) => a.id === selectedId);
  const basePrice = selected?.price ?? 0;
  const finalPrice = Math.max(0, basePrice - discountApplied - (Number(manualDiscount) || 0));

  const VALID_CODES: Record<string, number> = { "AURA20": 0.2, "NEWMEMBER": 0.15, "BF2024": 300000 };

  const applyCode = () => {
    if (!discountCode.trim()) { setDiscountError("Vui lòng nhập mã giảm giá."); return; }
    const code = discountCode.trim().toUpperCase();
    if (!VALID_CODES[code]) { setDiscountError("Mã không hợp lệ hoặc đã hết hạn."); return; }
    const val = VALID_CODES[code];
    setDiscountApplied(val < 1 ? basePrice * val : val);
    setDiscountError("");
    showToast(`✓ Đã áp dụng mã ${code}`);
  };

  const handlePay = () => {
    if (!selected) return;
    setPaid(true);
    showToast("✓ Thanh toán thành công! Hóa đơn đã được tạo.");
  };

  const reset = () => {
    setSelectedId(null);
    setDiscountCode("");
    setDiscountApplied(0);
    setDiscountError("");
    setManualDiscount("");
    setPaid(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">
          {toast}
        </div>
      )}

      <h1 className="font-headline-md text-headline-md text-primary mb-6">Tạo hóa đơn (UC-24)</h1>

      {paid && selected ? (
        /* ── Receipt ── */
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-green-600" style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Hóa đơn #{selected.id.toUpperCase()}</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div className="space-y-3 border-t border-b border-outline-variant/20 py-4 mb-4">
            <div className="flex justify-between"><span className="text-on-surface-variant text-sm">Khách hàng</span><span className="font-bold text-sm">{selected.customerName}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant text-sm">Dịch vụ</span><span className="font-bold text-sm text-right max-w-[200px]">{selected.service}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant text-sm">KTV</span><span className="font-bold text-sm">{selected.technicianName}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant text-sm">Thời lượng</span><span className="font-bold text-sm">{selected.duration} phút</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant text-sm">Giá gốc</span><span className="text-sm">{formatCurrency(basePrice)}</span></div>
            {discountApplied > 0 && <div className="flex justify-between text-green-600"><span className="text-sm">Giảm giá</span><span className="font-bold text-sm">-{formatCurrency(discountApplied)}</span></div>}
            {Number(manualDiscount) > 0 && <div className="flex justify-between text-green-600"><span className="text-sm">Giảm thủ công</span><span className="font-bold text-sm">-{formatCurrency(Number(manualDiscount))}</span></div>}
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline-sm text-headline-sm text-on-surface">TỔNG CỘNG</span>
            <span className="font-headline-sm text-headline-sm text-primary">{formatCurrency(finalPrice)}</span>
          </div>
          <div className="text-center mb-4">
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${payMethod === "cash" ? "bg-green-50 text-green-700" : "bg-primary/10 text-primary"}`}>
              {payMethod === "cash" ? "Tiền mặt" : payMethod === "card" ? "Thẻ ngân hàng" : "Chuyển khoản"} — ĐÃ THANH TOÁN
            </span>
          </div>
          <button onClick={reset} className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90">
            Tạo hóa đơn mới
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Select appointment */}
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-3">Chọn lịch hẹn</h3>
            {eligibleAppts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 border border-outline-variant/20 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl block mb-2 text-outline">event_busy</span>
                <p className="font-label-md text-label-md">Không có lịch hẹn nào cần thanh toán</p>
              </div>
            ) : (
              <div className="space-y-2">
                {eligibleAppts.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => { setSelectedId(a.id); setDiscountApplied(0); setDiscountCode(""); setPaid(false); }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedId === a.id ? "border-primary bg-primary/5" : "border-outline-variant/30 bg-white hover:border-outline-variant"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-bold">{a.customerName}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">{a.time} · {a.service}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">KTV: {a.technicianName}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
                        <p className="font-label-md text-label-md text-primary font-bold mt-1">{formatCurrency(a.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Invoice builder */}
          <div>
            {selected ? (
              <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-5">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Chi tiết hóa đơn</h3>

                {/* Price summary */}
                <div className="bg-surface-container-low rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Giá gốc</span><span>{formatCurrency(basePrice)}</span></div>
                  {discountApplied > 0 && <div className="flex justify-between text-sm text-green-600"><span>Mã giảm giá</span><span>-{formatCurrency(discountApplied)}</span></div>}
                  {Number(manualDiscount) > 0 && <div className="flex justify-between text-sm text-green-600"><span>Giảm thủ công</span><span>-{formatCurrency(Number(manualDiscount))}</span></div>}
                  <div className="flex justify-between font-bold text-primary border-t border-outline-variant/20 pt-2">
                    <span>Tổng thanh toán</span><span className="text-lg">{formatCurrency(finalPrice)}</span>
                  </div>
                </div>

                {/* Discount code */}
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary uppercase transition-colors ${discountError ? "border-error" : "border-outline-variant"}`}
                      placeholder="Nhập mã giảm giá..."
                      value={discountCode}
                      onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError(""); }}
                    />
                    <button onClick={applyCode} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 text-sm">
                      Áp dụng
                    </button>
                  </div>
                  {discountError && <p className="text-error text-xs mt-1">{discountError}</p>}
                </div>

                {/* Manual discount */}
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Giảm giá thủ công (VNĐ)</label>
                  <input
                    type="number"
                    className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="0"
                    min={0}
                    max={basePrice}
                    value={manualDiscount}
                    onChange={(e) => setManualDiscount(e.target.value)}
                  />
                  <p className="text-xs text-on-surface-variant mt-1">* Giảm &gt; 20% cần phê duyệt của Quản lý</p>
                </div>

                {/* Payment method */}
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">Phương thức thanh toán</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["cash", "card", "transfer"] as PayMethod[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setPayMethod(m)}
                        className={`py-3 rounded-lg border-2 font-label-md text-label-md text-sm transition-all ${
                          payMethod === m ? "border-primary bg-primary/10 text-primary font-bold" : "border-outline-variant/40 text-on-surface-variant hover:border-outline-variant"
                        }`}
                      >
                        {m === "cash" ? "💵 Tiền mặt" : m === "card" ? "💳 Thẻ" : "📲 Chuyển khoản"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Xác nhận thanh toán {formatCurrency(finalPrice)}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl block mb-2 text-outline">receipt</span>
                <p className="font-label-md text-label-md">Chọn lịch hẹn để tạo hóa đơn</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
