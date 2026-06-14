"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  TODAY_APPOINTMENTS, ROOMS, CUSTOMER_HEALTH_RECORDS,
  getStatusColor, getStatusLabel, formatCurrency,
  AppointmentStatus,
} from "@/lib/mock-data";

export default function StaffDashboard() {
  const { user } = useAuth();
  const [selectedAppt, setSelectedAppt] = useState<string | null>("ap003");
  const [appts, setAppts] = useState(TODAY_APPOINTMENTS);
  const [checkInSearch, setCheckInSearch] = useState("");
  const [checkInError, setCheckInError] = useState("");
  const [toast, setToast] = useState("");

  const myAppts = appts.filter((a) => a.technicianId === user?.id || user?.role === "staff");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleCheckin = (id: string) => {
    setAppts((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: "checked_in" as AppointmentStatus } : a)
    );
    showToast("✓ Đã tiếp nhận khách hàng thành công");
  };

  const handleComplete = (id: string) => {
    setAppts((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: "completed" as AppointmentStatus } : a)
    );
    showToast("✓ Buổi trị liệu đã hoàn thành");
  };

  const handleSearchCheckin = () => {
    if (!checkInSearch.trim()) { setCheckInError("Vui lòng nhập tên, SĐT hoặc mã đặt lịch."); return; }
    const found = appts.find(
      (a) => a.customerName.toLowerCase().includes(checkInSearch.toLowerCase()) ||
             a.customerPhone.includes(checkInSearch) ||
             a.id.toLowerCase().includes(checkInSearch.toLowerCase())
    );
    if (!found) { setCheckInError("Không tìm thấy lịch hẹn hôm nay. Kiểm tra lại thông tin."); return; }
    if (found.status !== "confirmed") { setCheckInError(`Lịch hẹn này đang ở trạng thái: ${getStatusLabel(found.status)}`); return; }
    setCheckInError("");
    handleCheckin(found.id);
    setCheckInSearch("");
  };

  const selectedApptData = appts.find((a) => a.id === selectedAppt);
  const healthRecord = selectedApptData
    ? CUSTOMER_HEALTH_RECORDS.find((r) => r.customerId === selectedApptData.customerId)
    : null;

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const sortedAppts = [...myAppts].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  return (
    <div className="h-full flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Top status bar */}
      <div className="bg-surface border-b border-outline-variant/20 px-6 py-3 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-label-md text-label-md">Đang trực: Chi nhánh Quận 1</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
        </span>
        <span className="ml-auto font-label-md text-label-md text-primary font-bold">
          {myAppts.filter((a) => a.status === "completed").length}/{myAppts.length} buổi hoàn thành
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ── Left: Schedule ── */}
        <section className="w-3/5 flex flex-col border-r border-outline-variant/30 bg-white overflow-hidden">
          {/* Check-in panel */}
          <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface-container-low shrink-0">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Tiếp nhận khách (UC-18)</p>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-outline-variant rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Nhập tên, SĐT hoặc mã đặt lịch..."
                value={checkInSearch}
                onChange={(e) => { setCheckInSearch(e.target.value); setCheckInError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSearchCheckin()}
              />
              <button
                onClick={handleSearchCheckin}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity"
              >
                Tìm & Check-in
              </button>
            </div>
            {checkInError && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>error</span>
                {checkInError}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Lịch biểu hôm nay</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {sortedAppts.length} lịch hẹn
              </span>
            </div>

            <div className="space-y-3">
              {sortedAppts.map((appt) => (
                <div
                  key={appt.id}
                  onClick={() => setSelectedAppt(appt.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAppt === appt.id
                      ? "border-primary shadow-md"
                      : "border-outline-variant/30 hover:border-outline-variant"
                  } ${appt.status === "completed" ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Time */}
                    <div className="w-16 text-center shrink-0">
                      <p className="font-label-md text-label-md text-primary font-bold">{appt.time}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{appt.duration}p</p>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-label-md text-label-md text-on-surface font-bold truncate">{appt.customerName}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${getStatusColor(appt.status)}`}>
                          {getStatusLabel(appt.status)}
                        </span>
                      </div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{appt.service}</p>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>meeting_room</span>
                          {appt.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>person</span>
                          {appt.technicianName}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      {appt.status === "confirmed" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCheckin(appt.id); }}
                          className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity text-xs"
                        >
                          Check-in
                        </button>
                      )}
                      {appt.status === "checked_in" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleComplete(appt.id); }}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity text-xs"
                        >
                          Hoàn tất
                        </button>
                      )}
                      {appt.status === "completed" && (
                        <span className="material-symbols-outlined text-green-600" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for checked-in */}
                  {appt.status === "checked_in" && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-1/2 transition-all" />
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-bold text-xs">Đang thực hiện</span>
                    </div>
                  )}
                </div>
              ))}

              {sortedAppts.length === 0 && (
                <div className="text-center py-12 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 block">event_available</span>
                  <p className="font-label-md text-label-md">Không có lịch hẹn hôm nay</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Right: Room status + Client detail ── */}
        <section className="w-2/5 bg-surface-container-low flex flex-col overflow-y-auto">
          <div className="p-5 space-y-5">
            {/* Room Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Trạng thái Phòng</h3>
                <span className="font-label-sm text-label-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {ROOMS.filter((r) => r.status === "available").length}/{ROOMS.length} Trống
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ROOMS.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-xl border flex flex-col gap-1 ${
                      room.status === "occupied"
                        ? "bg-primary/5 border-primary/30"
                        : room.status === "cleaning"
                        ? "bg-secondary-container/20 border-secondary-container/50"
                        : room.status === "maintenance"
                        ? "opacity-50 border-outline-variant/30"
                        : "bg-white border-outline-variant/30"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md text-on-surface font-bold text-xs">{room.name}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        room.status === "available" ? "bg-green-500" :
                        room.status === "occupied" ? "bg-primary" :
                        room.status === "cleaning" ? "bg-yellow-400" : "bg-red-400"
                      }`} />
                    </div>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                        {room.status === "available" ? "cleaning_services" :
                         room.status === "occupied" ? "person" :
                         room.status === "cleaning" ? "history" : "block"}
                      </span>
                      {room.status === "occupied" && room.currentCustomer
                        ? room.currentCustomer
                        : getStatusLabel(room.status)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected client detail */}
            {selectedApptData && (
              <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
                <div className="bg-secondary-container/20 p-4 border-b border-secondary-container/30">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
                    Chi tiết khách hàng
                  </p>
                  <p className="font-headline-sm text-[18px] text-on-surface font-bold">{selectedApptData.customerName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{selectedApptData.customerPhone}</p>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-on-surface-variant uppercase font-bold mb-1">Dịch vụ</p>
                      <p className="font-label-md text-label-md text-on-surface">{selectedApptData.service}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant uppercase font-bold mb-1">Giờ hẹn</p>
                      <p className="font-label-md text-label-md text-on-surface">{selectedApptData.time} ({selectedApptData.duration}p)</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant uppercase font-bold mb-1">Phòng</p>
                      <p className="font-label-md text-label-md text-on-surface">{selectedApptData.room}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant uppercase font-bold mb-1">Giá</p>
                      <p className="font-label-md text-label-md text-primary font-bold">{formatCurrency(selectedApptData.price)}</p>
                    </div>
                  </div>

                  {healthRecord ? (
                    <div className="p-3 rounded-xl bg-error-container/10 border border-error-container/30">
                      <p className="font-label-md text-label-md text-error mb-1 flex items-center gap-1 font-bold">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>warning</span>
                        Lưu ý sức khỏe
                      </p>
                      <p className="text-xs text-on-surface-variant italic mb-1">{healthRecord.allergies}</p>
                      <p className="text-xs text-on-surface-variant">{healthRecord.medicalNotes}</p>
                      <p className="text-xs text-primary mt-1 font-bold">{healthRecord.preferences}</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-surface-container text-center">
                      <p className="text-xs text-on-surface-variant">Chưa có hồ sơ sức khỏe</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Chờ check-in", value: myAppts.filter((a) => a.status === "confirmed").length, color: "text-primary" },
                { label: "Đang thực hiện", value: myAppts.filter((a) => a.status === "checked_in").length, color: "text-secondary" },
                { label: "Hoàn thành", value: myAppts.filter((a) => a.status === "completed").length, color: "text-green-600" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-3 border border-outline-variant/20 text-center">
                  <p className={`font-headline-sm text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
