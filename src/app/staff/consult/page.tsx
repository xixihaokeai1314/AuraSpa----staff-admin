"use client";
import { useState, useRef, useEffect } from "react";
import { SERVICES } from "@/lib/mock-data";

interface Message {
  id: string;
  from: "customer" | "staff";
  text: string;
  time: string;
  isSystem?: boolean;
}

interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  time: string;
  status: "waiting" | "active" | "closed";
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: "inq001", customerName: "Nguyễn Thị Lan", customerEmail: "lan@email.com", subject: "Hỏi về dịch vụ Massage Đá Nóng", message: "Xin chào, tôi muốn hỏi thêm về liệu trình massage đá nóng. Liệu tôi có thể đặt cho 2 người không?", time: "09:15", status: "waiting" },
  { id: "inq002", customerName: "Trần Minh Hoàng", customerEmail: "hoang@email.com", subject: "Giá gói Couples Spa", message: "Cho tôi hỏi gói Song Hành có bao gồm những gì và giá cụ thể?", time: "09:32", status: "active" },
  { id: "inq003", customerName: "Lê Thu Hà", customerEmail: "ha@email.com", subject: "Đặt lịch nhóm 5 người", message: "Công ty tôi muốn book spa cho 5 nhân viên, có gói nào phù hợp không?", time: "09:58", status: "waiting" },
];

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

export default function StaffConsult() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    inq002: [
      { id: "m1", from: "customer", text: "Cho tôi hỏi gói Song Hành có bao gồm những gì và giá cụ thể?", time: "09:32" },
      { id: "m2", from: "staff", text: "Xin chào anh Hoàng! Gói Song Hành bao gồm: Phòng VIP với bồn tắm hoa hồng, Massage Thụy Điển 75 phút cho 2 người, và Tiệc trà nhẹ cao cấp. Giá 5.800.000đ/cặp.", time: "09:34" },
      { id: "m3", from: "customer", text: "Có thể đặt cho ngày mai không ạ?", time: "09:35" },
    ],
  });
  const [inputText, setInputText] = useState("");
  const [toast, setToast] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const activeInquiry = inquiries.find((i) => i.id === activeId);
  const activeMessages = messages[activeId ?? ""] ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const openChat = (id: string) => {
    setActiveId(id);
    setInquiries((p) => p.map((i) => i.id === id ? { ...i, status: "active" } : i));
    if (!messages[id]) {
      const inq = inquiries.find((x) => x.id === id)!;
      setMessages((p) => ({
        ...p,
        [id]: [{ id: `m-init-${id}`, from: "customer", text: inq.message, time: inq.time }],
      }));
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeId) return;
    const msg: Message = { id: `m${Date.now()}`, from: "staff", text: inputText.trim(), time: getTime() };
    setMessages((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), msg] }));
    setInputText("");
  };

  const closeChat = (id: string) => {
    setInquiries((p) => p.map((i) => i.id === id ? { ...i, status: "closed" } : i));
    if (activeId === id) setActiveId(null);
    showToast("✓ Phiên tư vấn đã kết thúc và được lưu lại");
  };

  const insertSuggestion = (text: string) => setInputText(text);

  const SUGGESTIONS = [
    "Xin chào! Tôi có thể giúp gì cho bạn?",
    "Dịch vụ này rất được yêu thích tại AuraSpa. Bạn có muốn đặt lịch không?",
    "Chúng tôi hiện có ưu đãi 20% cho lần đặt lịch đầu tiên với mã AURA20.",
    "Bạn có thể đặt lịch trực tiếp tại website hoặc gọi 1900 8888.",
  ];

  return (
    <div className="h-full flex overflow-hidden">
      {toast && <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-lg font-label-md text-label-md">{toast}</div>}

      {/* Inquiry list */}
      <aside className="w-72 bg-surface border-r border-outline-variant/30 flex flex-col shrink-0">
        <div className="p-4 border-b border-outline-variant/20">
          <h2 className="font-headline-sm text-headline-sm text-primary">Tư vấn trực tuyến</h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">(UC-23)</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {inquiries.map((inq) => (
            <div key={inq.id} onClick={() => openChat(inq.id)}
              className={`p-3 rounded-xl mb-1 cursor-pointer transition-all ${activeId === inq.id ? "bg-primary/10 border border-primary/30" : "hover:bg-surface-container"}`}>
              <div className="flex justify-between items-start mb-1">
                <p className="font-label-md text-label-md text-on-surface font-bold text-sm">{inq.customerName}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${inq.status === "waiting" ? "bg-error animate-pulse" : inq.status === "active" ? "bg-green-500" : "bg-outline"}`} />
                  <span className={`text-xs font-bold ${inq.status === "waiting" ? "text-error" : inq.status === "active" ? "text-green-600" : "text-on-surface-variant"}`}>
                    {inq.status === "waiting" ? "Chờ" : inq.status === "active" ? "Đang chat" : "Đã đóng"}
                  </span>
                </div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant text-xs truncate">{inq.subject}</p>
              <p className="text-xs text-outline mt-0.5">{inq.time}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeInquiry ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-outline-variant/20 bg-surface flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                  {activeInquiry.customerName.split(" ").pop()?.[0]}
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">{activeInquiry.customerName}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{activeInquiry.customerEmail}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 border border-outline-variant px-3 py-1.5 rounded-full text-on-surface-variant text-sm hover:bg-surface-container">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>transfer_within_a_station</span>Chuyển
                </button>
                <button onClick={() => closeChat(activeInquiry.id)} className="flex items-center gap-1 border border-error text-error px-3 py-1.5 rounded-full text-sm hover:bg-error-container/20">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>Kết thúc
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-surface-container-lowest">
              <div className="text-center mb-4">
                <span className="bg-surface-container text-on-surface-variant text-xs px-3 py-1 rounded-full">{activeInquiry.subject}</span>
              </div>
              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "staff" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${msg.from === "staff" ? "bg-primary text-on-primary rounded-br-none" : "bg-white border border-outline-variant/20 text-on-surface rounded-bl-none"}`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "staff" ? "text-on-primary/70 text-right" : "text-on-surface-variant"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 bg-surface border-t border-outline-variant/10 flex gap-2 overflow-x-auto shrink-0">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => insertSuggestion(s)}
                  className="shrink-0 text-xs bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary hover:text-primary transition-all">
                  {s.slice(0, 30)}...
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-surface border-t border-outline-variant/20 flex gap-3 shrink-0">
              <input
                className="flex-1 border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="Nhập tin nhắn tư vấn..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              />
              <button onClick={sendMessage} disabled={!inputText.trim()}
                className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 text-outline">chat</span>
            <p className="font-headline-sm text-headline-sm text-on-surface mb-2">Tư vấn khách hàng</p>
            <p className="font-body-md text-body-md">Chọn một yêu cầu từ danh sách bên trái để bắt đầu tư vấn</p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" /><span>{inquiries.filter((i) => i.status === "waiting").length} yêu cầu đang chờ</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
