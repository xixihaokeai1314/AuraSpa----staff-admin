"use client";
import { useState } from "react";

interface Notification {
  id: string;
  type: "booking_confirmed" | "booking_cancelled" | "booking_rescheduled" | "checkin" | "schedule_change" | "low_inventory" | "review" | "complaint";
  recipient: string;
  recipientType: "customer" | "staff" | "manager";
  message: string;
  time: string;
  status: "sent" | "failed" | "pending";
  channel: "email" | "sms" | "both";
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n001", type: "booking_confirmed", recipient: "Nguyễn Anh Đào", recipientType: "customer", message: "Lịch hẹn của bạn đã được xác nhận: Massage Đá Nóng, 09:00 ngày 24/10 tại AuraSpa Quận 1.", time: "08:00", status: "sent", channel: "both" },
  { id: "n002", type: "checkin", recipient: "Minh Anh", recipientType: "staff", message: "Khách hàng Chị Nguyễn Lan đã check-in. Buổi trị liệu bắt đầu lúc 09:00 tại VIP 02.", time: "09:02", status: "sent", channel: "sms" },
  { id: "n003", type: "low_inventory", recipient: "Thanh Hằng (Manager)", recipientType: "manager", message: "Cảnh báo: Tinh Dầu Sả Chanh còn 12/100 đơn vị. Vui lòng nhập hàng sớm.", time: "09:15", status: "sent", channel: "email" },
  { id: "n004", type: "booking_cancelled", recipient: "Anh Trần Quân", recipientType: "customer", message: "Lịch hẹn của bạn đã được hủy thành công. Phí hủy: Không (hủy trước 24h).", time: "09:30", status: "sent", channel: "both" },
  { id: "n005", type: "review", recipient: "Minh Anh", recipientType: "staff", message: "Bạn vừa nhận được đánh giá 5 sao từ khách hàng Nguyễn Anh Đào!", time: "10:00", status: "sent", channel: "email" },
  { id: "n006", type: "complaint", recipient: "Thanh Hằng (Manager)", recipientType: "manager", message: "Khiếu nại mới từ khách hàng Chị Lê Thu Hà về dịch vụ Chăm Sóc Da Mặt. Vui lòng xem xét.", time: "10:15", status: "sent", channel: "email" },
  { id: "n007", type: "booking_confirmed", recipient: "Chị Lê Thu Hà", recipientType: "customer", message: "Nhắc lịch: Bạn có lịch hẹn Massage Đá Nóng lúc 14:00 hôm nay. Vui lòng đến đúng giờ.", time: "12:00", status: "failed", channel: "sms" },
  { id: "n008", type: "schedule_change", recipient: "Hương Ly", recipientType: "staff", message: "Lịch trực của bạn đã được cập nhật. Chiều (14:00-20:00) ngày 25/10 đã được phê duyệt.", time: "11:00", status: "pending", channel: "both" },
];

const TYPE_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  booking_confirmed: { icon: "event_available", color: "text-green-600 bg-green-50", label: "Xác nhận lịch hẹn" },
  booking_cancelled: { icon: "event_busy", color: "text-error bg-error-container/50", label: "Hủy lịch hẹn" },
  booking_rescheduled: { icon: "event_repeat", color: "text-blue-600 bg-blue-50", label: "Đổi lịch hẹn" },
  checkin: { icon: "login", color: "text-primary bg-primary/10", label: "Check-in" },
  schedule_change: { icon: "calendar_month", color: "text-secondary bg-secondary-container/30", label: "Thay đổi lịch" },
  low_inventory: { icon: "warning", color: "text-error bg-error-container/50", label: "Tồn kho thấp" },
  review: { icon: "star", color: "text-secondary bg-secondary-container/30", label: "Đánh giá mới" },
  complaint: { icon: "report", color: "text-error bg-error-container/50", label: "Khiếu nại" },
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");

  const filtered = notifications.filter((n) => {
    const matchType = filter === "all" || n.type === filter || n.status === filter;
    const matchChannel = channelFilter === "all" || n.channel === channelFilter;
    return matchType && matchChannel;
  });

  const handleRetry = (id: string) => {
    setNotifications((p) => p.map((n) => n.id === id ? { ...n, status: "sent" } : n));
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    failed: notifications.filter((n) => n.status === "failed").length,
    pending: notifications.filter((n) => n.status === "pending").length,
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Nhật ký thông báo (UC-38)</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Theo dõi tất cả thông báo tự động gửi đi từ hệ thống</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Tổng", value: stats.total, color: "text-on-surface" },
          { label: "Đã gửi", value: stats.sent, color: "text-green-600" },
          { label: "Thất bại", value: stats.failed, color: "text-error" },
          { label: "Đang chờ", value: stats.pending, color: "text-secondary" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-outline-variant/20 text-center">
            <p className={`font-headline-sm text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "all", label: "Tất cả" },
            { key: "sent", label: "✓ Đã gửi" },
            { key: "failed", label: "✗ Thất bại" },
            { key: "pending", label: "⏳ Chờ gửi" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm text-sm transition-all ${filter === f.key ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["all", "email", "sms", "both"].map((c) => (
            <button key={c} onClick={() => setChannelFilter(c)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm text-sm transition-all ${channelFilter === c ? "bg-secondary text-on-secondary" : "border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"}`}>
              {c === "all" ? "Tất cả kênh" : c === "email" ? "📧 Email" : c === "sms" ? "📱 SMS" : "📧+📱 Cả hai"}
            </button>
          ))}
        </div>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map((n) => {
          const cfg = TYPE_CONFIG[n.type];
          return (
            <div key={n.id} className={`bg-white rounded-xl p-4 border ${n.status === "failed" ? "border-error/30" : "border-outline-variant/20"}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cfg.color}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{cfg.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${n.recipientType === "customer" ? "bg-primary/10 text-primary" : n.recipientType === "staff" ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>
                        {n.recipientType === "customer" ? "Khách hàng" : n.recipientType === "staff" ? "Nhân viên" : "Quản lý"}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {n.channel === "email" ? "📧" : n.channel === "sms" ? "📱" : "📧+📱"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${n.status === "sent" ? "bg-green-50 text-green-700" : n.status === "failed" ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"}`}>
                        {n.status === "sent" ? "Đã gửi" : n.status === "failed" ? "Thất bại" : "Chờ gửi"}
                      </span>
                      <span className="text-xs text-on-surface-variant">{n.time}</span>
                    </div>
                  </div>
                  <p className="font-label-md text-label-md text-on-surface font-bold text-sm mb-0.5">→ {n.recipient}</p>
                  <p className="text-sm text-on-surface-variant">{n.message}</p>
                  {n.status === "failed" && (
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs text-error">Gửi thất bại. Hệ thống sẽ thử lại 3 lần.</p>
                      <button onClick={() => handleRetry(n.id)} className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>refresh</span>Thử lại ngay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-10 border border-outline-variant/20 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl block mb-2 text-outline">notifications_off</span>
            <p className="font-label-md text-label-md">Không có thông báo nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
