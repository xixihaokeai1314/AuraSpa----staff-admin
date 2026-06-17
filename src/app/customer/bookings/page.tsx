"use client";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TODAY_APPOINTMENTS, formatCurrency, getStatusLabel, getStatusColor } from "@/lib/mock-data";

export default function CustomerBookingsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(TODAY_APPOINTMENTS);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "confirmed" | "cancelled">("all");

  const myAppts = useMemo(() => {
    const list = user?.role === "customer" ? appointments.filter((a) => a.customerId === user.id) : appointments;
    if (filter === "all") return list;
    if (filter === "upcoming") return list.filter((a) => a.status === "confirmed" || a.status === "checked_in");
    if (filter === "past") return list.filter((a) => a.status === "completed");
    return list.filter((a) => a.status === filter);
  }, [appointments, user, filter]);

  const handleCancel = (id: string) => {
    // simple client-side rule: cannot cancel completed
    setAppointments((p) => p.map((x) => (x.id === id && x.status !== "completed" ? { ...x, status: "cancelled" } : x)));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Lịch hẹn của tôi</h1>
        <div className="flex gap-2">
          {[
            { key: "all", label: "Tất cả" },
            { key: "upcoming", label: "Sắp tới" },
            { key: "past", label: "Hoàn thành" },
            { key: "cancelled", label: "Đã hủy" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key as any)}
              className={`px-3 py-1.5 rounded-full text-sm ${filter === f.key ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {myAppts.length === 0 && <div className="bg-white rounded-xl p-8 text-center text-on-surface-variant">Không có lịch hẹn</div>}
        {myAppts.map((a) => (
          <div key={a.id} className="bg-white rounded-xl p-4 border border-outline-variant/20">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-bold">{a.service}</p>
                <p className="text-xs text-on-surface-variant">{a.date} · {a.time} · {a.room}</p>
              </div>
              <div className="text-right">
                <p className="font-label-md text-primary font-bold">{formatCurrency(a.price)}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${getStatusColor(a.status)}`}>{getStatusLabel(a.status)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-on-surface-variant">KTV: {a.technicianName}</div>
              <div className="flex items-center gap-2">
                {a.status !== "completed" && a.status !== "cancelled" && (
                  <button onClick={() => handleCancel(a.id)} className="text-sm border border-error text-error px-3 py-1 rounded-lg">Hủy</button>
                )}
                <button className="text-sm border border-outline-variant px-3 py-1 rounded-lg">Chi tiết</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
