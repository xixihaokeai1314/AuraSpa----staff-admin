"use client";
import { useState } from "react";
import { COMPLAINTS, getStatusColor, getStatusLabel } from "@/lib/mock-data";

type ComplaintStatus = "open" | "in_progress" | "resolved" | "escalated";

export default function ManagerComplaints() {
  const [complaints, setComplaints] = useState(COMPLAINTS.filter((c) => c.branchId === "b001"));
  const [selected, setSelected] = useState<string | null>(null);
  const [resolution, setResolution] = useState("");
  const [resError, setResError] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const selectedItem = complaints.find((c) => c.id === selected);

  const handleResolve = () => {
    if (!resolution.trim()) { setResError("Vui lòng nhập ghi chú giải quyết."); return; }
    setComplaints((p) => p.map((c) => c.id === selected ? { ...c, status: "resolved" as ComplaintStatus, resolution } : c));
    setResError(""); setSelected(null); setResolution("");
    showToast("✓ Khiếu nại đã được giải quyết");
  };

  const handleEscalate = () => {
    setComplaints((p) => p.map((c) => c.id === selected ? { ...c, status: "escalated" as ComplaintStatus } : c));
    setSelected(null);
    showToast("✓ Đã chuyển lên Owner để xử lý");
  };

  const handleSetInProgress = (id: string) => {
    setComplaints((p) => p.map((c) => c.id === id ? { ...c, status: "in_progress" as ComplaintStatus } : c));
    showToast("✓ Đã cập nhật trạng thái");
  };

  const filtered = filter === "all" ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      <h1 className="font-headline-md text-headline-md text-primary mb-6">Giải quyết khiếu nại (UC-29)</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "Tất cả" },
          { key: "open", label: "Mới" },
          { key: "in_progress", label: "Đang xử lý" },
          { key: "resolved", label: "Đã giải quyết" },
          { key: "escalated", label: "Leo thang" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full font-label-md text-label-md text-sm transition-all ${
              filter === f.key ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
            {f.key !== "all" && (
              <span className="ml-1.5 text-xs">({complaints.filter((c) => c.status === f.key).length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => { setSelected(c.id); setResolution(""); setResError(""); }}
              className={`bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all ${
                selected === c.id ? "border-primary" : "border-outline-variant/30 hover:border-outline-variant"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-label-md text-label-md text-on-surface font-bold">{c.customerName}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                  {getStatusLabel(c.status)}
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{c.service} · {c.date}</p>
              <p className="text-sm text-on-surface line-clamp-2">{c.description}</p>
              {c.status === "open" && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleSetInProgress(c.id); }}
                  className="mt-3 text-xs text-primary font-bold hover:underline"
                >
                  Bắt đầu xử lý →
                </button>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl p-10 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl block mb-2">check_circle</span>
              <p className="font-label-md text-label-md">Không có khiếu nại nào</p>
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          {selectedItem ? (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-4 sticky top-6">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{selectedItem.customerName}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(selectedItem.status)}`}>
                    {getStatusLabel(selectedItem.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div><p className="text-on-surface-variant text-xs font-bold uppercase mb-0.5">Dịch vụ</p><p>{selectedItem.service}</p></div>
                  <div><p className="text-on-surface-variant text-xs font-bold uppercase mb-0.5">Ngày gửi</p><p>{selectedItem.date}</p></div>
                </div>
                <div className="bg-surface-container-low rounded-xl p-3">
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Nội dung khiếu nại</p>
                  <p className="text-sm text-on-surface">{selectedItem.description}</p>
                </div>
              </div>

              {selectedItem.resolution && (
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-green-700 uppercase mb-1">Kết quả giải quyết</p>
                  <p className="text-sm text-green-800">{selectedItem.resolution}</p>
                </div>
              )}

              {(selectedItem.status === "open" || selectedItem.status === "in_progress") && (
                <div className="space-y-3">
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                      Ghi chú giải quyết *
                    </label>
                    <textarea
                      rows={3}
                      className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${resError ? "border-error" : "border-outline-variant"}`}
                      placeholder="Mô tả hành động giải quyết (hoàn tiền, dịch vụ lại, xin lỗi...)"
                      value={resolution}
                      onChange={(e) => { setResolution(e.target.value); setResError(""); }}
                    />
                    {resError && <p className="text-error text-xs mt-1">{resError}</p>}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleResolve}
                      className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md hover:opacity-90"
                    >
                      Đánh dấu đã giải quyết
                    </button>
                    <button
                      onClick={handleEscalate}
                      className="flex-1 border-2 border-error text-error py-3 rounded-full font-label-md text-label-md hover:bg-error-container/20"
                    >
                      Leo thang lên Owner
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-outline-variant/20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-2 text-outline">forum</span>
              <p className="font-label-md text-label-md">Chọn khiếu nại để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
