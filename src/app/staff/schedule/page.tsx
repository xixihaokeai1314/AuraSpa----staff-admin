"use client";
import { useState } from "react";

const SHIFTS_OPTIONS = ["Sáng (08:00-14:00)", "Chiều (14:00-20:00)", "Cả ngày (08:00-20:00)", "Nghỉ phép"];

function getDaysOfWeek(offset = 0) {
  const days = [];
  const today = new Date();
  today.setDate(today.getDate() + offset * 7);
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function StaffSchedule() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const days = getDaysOfWeek(weekOffset);

  const dateKey = (d: Date) => d.toISOString().split("T")[0];

  const toggle = (key: string, shift: string) => {
    setSelections((p) => ({ ...p, [key]: p[key] === shift ? "" : shift }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const newErr: Record<string, string> = {};
    days.forEach((d) => {
      const key = dateKey(d);
      const sel = selections[key];
      if (sel === "Nghỉ phép" && !reasons[key]?.trim()) {
        newErr[key] = "Vui lòng nhập lý do nghỉ phép.";
      }
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const hasAny = days.some((d) => selections[dateKey(d)]);
    if (!hasAny) { alert("Vui lòng chọn ít nhất 1 ca làm việc."); return; }
    setSubmitted(true);
  };

  const weekLabel = () => {
    const first = days[0], last = days[6];
    return `${first.getDate()}/${first.getMonth() + 1} — ${last.getDate()}/${last.getMonth() + 1}/${last.getFullYear()}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Đăng ký lịch làm việc</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => { setWeekOffset((p) => p - 1); setSubmitted(false); }} className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span>
          </button>
          <span className="font-label-md text-label-md text-on-surface px-3">{weekLabel()}</span>
          <button onClick={() => { setWeekOffset((p) => p + 1); setSubmitted(false); }} className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
          </button>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl p-10 border border-outline-variant/20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600" style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Đã gửi lịch đăng ký</h2>
          <p className="text-on-surface-variant font-body-md text-body-md mb-6">
            Yêu cầu của bạn đang chờ Quản lý phê duyệt. Bạn sẽ nhận thông báo khi được duyệt.
          </p>
          <button onClick={() => setSubmitted(false)} className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-90">
            Chỉnh sửa lại
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden mb-6">
            <div className="grid grid-cols-7 border-b border-outline-variant/20">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
                <div key={i} className="p-3 text-center border-r border-outline-variant/10 last:border-r-0">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{d}</p>
                  <p className={`font-label-md text-label-md font-bold mt-0.5 ${
                    dateKey(days[i]) === dateKey(new Date()) ? "text-primary" : "text-on-surface"
                  }`}>{days[i].getDate()}</p>
                </div>
              ))}
            </div>

            {SHIFTS_OPTIONS.map((shift) => (
              <div key={shift} className={`grid grid-cols-7 border-t border-outline-variant/10 ${shift === "Nghỉ phép" ? "bg-error-container/5" : ""}`}>
                {days.map((day, i) => {
                  const key = dateKey(day);
                  const isSelected = selections[key] === shift;
                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                  return (
                    <div key={i} className="p-2 border-r border-outline-variant/10 last:border-r-0 flex justify-center">
                      <button
                        disabled={isPast}
                        onClick={() => toggle(key, shift)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all text-xs font-bold ${
                          isPast ? "opacity-30 cursor-not-allowed border-outline-variant/20" :
                          isSelected
                            ? shift === "Nghỉ phép"
                              ? "border-error bg-error text-on-error"
                              : "border-primary bg-primary text-on-primary"
                            : "border-outline-variant/40 hover:border-primary hover:text-primary"
                        }`}
                        title={shift}
                      >
                        {isSelected ? "✓" : ""}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Shift legend */}
            <div className="p-4 border-t border-outline-variant/10 flex flex-wrap gap-4">
              {SHIFTS_OPTIONS.map((s) => (
                <span key={s} className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className={`w-3 h-3 rounded ${s === "Nghỉ phép" ? "bg-error" : "bg-primary"}`} />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Reason fields for days-off */}
          {days.filter((d) => selections[dateKey(d)] === "Nghỉ phép").length > 0 && (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-5 mb-6 space-y-3">
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Lý do nghỉ phép</h3>
              {days.filter((d) => selections[dateKey(d)] === "Nghỉ phép").map((d) => {
                const key = dateKey(d);
                return (
                  <div key={key}>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                      {d.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" })}
                    </label>
                    <input
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${errors[key] ? "border-error" : "border-outline-variant"}`}
                      placeholder="Nhập lý do nghỉ..."
                      value={reasons[key] ?? ""}
                      onChange={(e) => { setReasons((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => ({ ...p, [key]: "" })); }}
                    />
                    {errors[key] && <p className="text-error text-xs mt-1">{errors[key]}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary */}
          <div className="bg-surface-container-low rounded-xl p-4 mb-6">
            <p className="font-label-md text-label-md text-on-surface font-bold mb-2">Tóm tắt đăng ký</p>
            {days.filter((d) => selections[dateKey(d)]).length === 0 ? (
              <p className="text-on-surface-variant font-label-sm text-label-sm">Chưa chọn ca nào</p>
            ) : (
              <div className="space-y-1">
                {days.filter((d) => selections[dateKey(d)]).map((d) => {
                  const key = dateKey(d);
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface">
                        {d.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" })}
                      </span>
                      <span className={`font-label-sm text-label-sm font-bold ${selections[key] === "Nghỉ phép" ? "text-error" : "text-primary"}`}>
                        {selections[key]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Gửi đăng ký lịch làm
          </button>
        </>
      )}
    </div>
  );
}
