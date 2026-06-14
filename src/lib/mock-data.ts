// ─── Shared mock data for Staff / Manager / Admin dashboards ─────────────────

export type AppointmentStatus =
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled";
export type StaffRole = "receptionist" | "technician";
export type ComplaintStatus = "open" | "in_progress" | "resolved" | "escalated";
export type ShiftStatus = "pending" | "approved" | "rejected";

// ── Branches ──────────────────────────────────────────────────────────────────
export const BRANCHES = [
  { id: "b001", name: "AuraSpa Quận 1", address: "12 Lê Thánh Tôn, Bến Nghé, Q.1", phone: "028 3822 1111", email: "q1@auraspa.vn", openHours: "08:00 - 21:00", status: "active", capacity: 85, revenue: 640000000, managerName: "Thanh Hằng" },
  { id: "b002", name: "AuraSpa Thảo Điền", address: "45 Xuân Thủy, Thảo Điền, Q.2", phone: "028 3512 2222", email: "thaodien@auraspa.vn", openHours: "08:00 - 21:00", status: "active", capacity: 60, revenue: 480000000, managerName: "Hoàng Nam" },
  { id: "b003", name: "AuraSpa Đà Lạt", address: "18 Trần Phú, P.4, Đà Lạt", phone: "0263 382 3333", email: "dalat@auraspa.vn", openHours: "08:00 - 20:00", status: "maintenance", capacity: 0, revenue: 0, managerName: "Minh Tuấn" },
];

// ── Services ──────────────────────────────────────────────────────────────────
export const SERVICES = [
  { id: "sv001", name: "Massage Đá Nóng Núi Lửa", category: "Massage", duration: 90, price: 1500000, status: "active", bookings: 245, description: "Giải tỏa căng thẳng cơ bắp bằng nhiệt lượng đá núi lửa và tinh dầu đặc trị." },
  { id: "sv002", name: "Chăm Sóc Da Mặt Chuyên Sâu", category: "Skincare", duration: 60, price: 1100000, status: "active", bookings: 189, description: "Tái tạo làn da với serum tế bào gốc và kỹ thuật massage nâng cơ." },
  { id: "sv003", name: "Massage Thụy Điển Cổ Điển", category: "Massage", duration: 60, price: 1200000, status: "active", bookings: 312, description: "Kết hợp xoa bóp nhẹ nhàng và tinh dầu thiên nhiên giảm căng thẳng." },
  { id: "sv004", name: "Ngâm Khoáng Nóng", category: "Body", duration: 60, price: 1200000, status: "active", bookings: 156, description: "Hòa mình vào làn nước khoáng thiên nhiên giàu dưỡng chất." },
  { id: "sv005", name: "Gói Tâm An (Serenity)", category: "Package", duration: 180, price: 3200000, status: "active", bookings: 87, description: "Massage Đá Nóng 90' + Chăm sóc da Radiance 60' + Quà tinh dầu Aura 10ml." },
  { id: "sv006", name: "Trị Liệu Cổ Vai Gáy", category: "Massage", duration: 45, price: 950000, status: "active", bookings: 203, description: "Giải pháp cho nhân viên văn phòng, tập trung giải tỏa vùng thượng lưng." },
  { id: "sv007", name: "Nâng Cơ V-Line 360", category: "Skincare", duration: 75, price: 1950000, status: "inactive", bookings: 34, description: "RF kết hợp massage bấm huyệt Nhật Bản giúp thon gọn gương mặt tự nhiên." },
  { id: "sv008", name: "Gói Song Hành (Couples)", category: "Package", duration: 180, price: 5800000, status: "active", bookings: 52, description: "Phòng VIP bồn tắm hoa hồng + Massage Thụy Điển 75' (2 người) + Tiệc trà." },
];

// ── Staff members ─────────────────────────────────────────────────────────────
export const STAFF_LIST = [
  { id: "s001", name: "Minh Anh", email: "staff@auraspa.vn", phone: "0901111111", role: "technician" as StaffRole, branchId: "b001", status: "active", rating: 4.9, servicesCompleted: 312, joinDate: "2022-03-15", specialization: "Massage & Đá Nóng" },
  { id: "s002", name: "Hương Ly", email: "huongly@auraspa.vn", phone: "0902222222", role: "technician" as StaffRole, branchId: "b001", status: "active", rating: 4.8, servicesCompleted: 278, joinDate: "2022-06-01", specialization: "Skincare & Facial" },
  { id: "s003", name: "Tuấn Kiệt", email: "tuankiet@auraspa.vn", phone: "0903333333", role: "technician" as StaffRole, branchId: "b001", status: "active", rating: 4.7, servicesCompleted: 245, joinDate: "2023-01-10", specialization: "Massage Toàn Thân" },
  { id: "s004", name: "Thanh Hằng", email: "manager@auraspa.vn", phone: "0904444444", role: "receptionist" as StaffRole, branchId: "b001", status: "active", rating: 4.9, servicesCompleted: 0, joinDate: "2021-11-20", specialization: "Lễ Tân & Tư Vấn" },
  { id: "s005", name: "Quỳnh Nga", email: "quynhnga@auraspa.vn", phone: "0905555555", role: "technician" as StaffRole, branchId: "b002", status: "active", rating: 4.6, servicesCompleted: 198, joinDate: "2023-04-05", specialization: "Body Treatment" },
];

// ── Rooms ─────────────────────────────────────────────────────────────────────
export const ROOMS = [
  { id: "r001", name: "VIP 01", type: "VIP", status: "available", currentCustomer: null },
  { id: "r002", name: "VIP 02", type: "VIP", status: "occupied", currentCustomer: "Chị Nguyễn Lan" },
  { id: "r003", name: "Deluxe 03", type: "Deluxe", status: "cleaning", currentCustomer: null },
  { id: "r004", name: "Deluxe 04", type: "Deluxe", status: "maintenance", currentCustomer: null },
  { id: "r005", name: "Standard 01", type: "Standard", status: "available", currentCustomer: null },
  { id: "r006", name: "Standard 02", type: "Standard", status: "available", currentCustomer: null },
];

// ── Today's appointments ──────────────────────────────────────────────────────
export const TODAY_APPOINTMENTS = [
  { id: "ap001", customerId: "c001", customerName: "Nguyễn Anh Đào", customerPhone: "0912345678", service: "Massage Đá Nóng Núi Lửa", serviceId: "sv001", technicianId: "s001", technicianName: "Minh Anh", date: "2024-10-24", time: "08:00", duration: 90, room: "VIP 01", status: "completed" as AppointmentStatus, price: 1500000, discountCode: null, branchId: "b001" },
  { id: "ap002", customerId: "c002", customerName: "Chị Nguyễn Lan", customerPhone: "0923456789", service: "Gói Tâm An (Serenity)", serviceId: "sv005", technicianId: "s001", technicianName: "Minh Anh", date: "2024-10-24", time: "09:00", duration: 180, room: "VIP 02", status: "checked_in" as AppointmentStatus, price: 3200000, discountCode: null, branchId: "b001" },
  { id: "ap003", customerId: "c003", customerName: "Chị Hoàng Mai", customerPhone: "0934567890", service: "Chăm Sóc Da Mặt Chuyên Sâu", serviceId: "sv002", technicianId: "s002", technicianName: "Hương Ly", date: "2024-10-24", time: "10:30", duration: 60, room: "Deluxe 03", status: "confirmed" as AppointmentStatus, price: 1100000, discountCode: null, branchId: "b001" },
  { id: "ap004", customerId: "c004", customerName: "Anh Trần Quân", customerPhone: "0945678901", service: "Trị Liệu Cổ Vai Gáy", serviceId: "sv006", technicianId: "s003", technicianName: "Tuấn Kiệt", date: "2024-10-24", time: "11:00", duration: 45, room: "Standard 01", status: "confirmed" as AppointmentStatus, price: 950000, discountCode: null, branchId: "b001" },
  { id: "ap005", customerId: "c005", customerName: "Chị Lê Thu Hà", customerPhone: "0956789012", service: "Massage Đá Nóng Núi Lửa", serviceId: "sv001", technicianId: "s002", technicianName: "Hương Ly", date: "2024-10-24", time: "14:00", duration: 90, room: "VIP 01", status: "confirmed" as AppointmentStatus, price: 1500000, discountCode: "AURA20", branchId: "b001" },
  { id: "ap006", customerId: "c006", customerName: "Anh Hoàng Minh", customerPhone: "0967890123", service: "Ngâm Khoáng Nóng", serviceId: "sv004", technicianId: "s003", technicianName: "Tuấn Kiệt", date: "2024-10-24", time: "15:30", duration: 60, room: "Standard 02", status: "confirmed" as AppointmentStatus, price: 1200000, discountCode: null, branchId: "b001" },
  { id: "ap007", customerId: "c007", customerName: "Nguyễn Anh", customerPhone: "0978901234", service: "Chăm Sóc Da Aura Gold", serviceId: "sv002", technicianId: "s002", technicianName: "Hương Ly", date: "2024-10-24", time: "17:00", duration: 60, room: "VIP 02", status: "confirmed" as AppointmentStatus, price: 1100000, discountCode: null, branchId: "b001" },
];

// ── Customer health records ───────────────────────────────────────────────────
export const CUSTOMER_HEALTH_RECORDS = [
  { customerId: "c001", skinType: "Da dầu hỗn hợp", allergies: "Không", medicalNotes: "Tiểu đường nhẹ - lưu ý nhiệt độ", preferences: "Ưa nhiệt độ phòng 24°C, nhạc nhẹ", lastUpdated: "2024-10-10", updatedBy: "Minh Anh" },
  { customerId: "c003", skinType: "Da khô nhạy cảm", allergies: "Dị ứng tinh dầu hạt. Chỉ dùng tinh dầu thảo mộc.", medicalNotes: "Huyết áp cao - tránh massage áp lực mạnh", preferences: "Nhiệt độ phòng 25°C. KTV ưu tiên: Minh Anh, Tuyết", lastUpdated: "2024-09-28", updatedBy: "s004" },
];

// ── Inventory ─────────────────────────────────────────────────────────────────
export const INVENTORY = [
  { id: "inv001", name: "Tinh Dầu Sả Chanh", category: "Tinh dầu", unit: "Chai", quantity: 12, minThreshold: 20, maxStock: 100, branchId: "b001", lastRestocked: "2024-09-15" },
  { id: "inv002", name: "Dầu Massage Lavender", category: "Tinh dầu", unit: "Chai", quantity: 45, minThreshold: 20, maxStock: 100, branchId: "b001", lastRestocked: "2024-10-01" },
  { id: "inv003", name: "Đá Bazan Massage", category: "Dụng cụ", unit: "Bộ", quantity: 8, minThreshold: 5, maxStock: 20, branchId: "b001", lastRestocked: "2024-08-20" },
  { id: "inv004", name: "Khăn Tắm Cao Cấp", category: "Vật tư", unit: "Cái", quantity: 85, minThreshold: 30, maxStock: 150, branchId: "b001", lastRestocked: "2024-10-05" },
  { id: "inv005", name: "Muối Khoáng Ngâm", category: "Nguyên liệu", unit: "Kg", quantity: 6, minThreshold: 10, maxStock: 50, branchId: "b001", lastRestocked: "2024-09-28" },
  { id: "inv006", name: "Serum Tế Bào Gốc", category: "Skincare", unit: "Lọ", quantity: 18, minThreshold: 10, maxStock: 40, branchId: "b001", lastRestocked: "2024-10-08" },
];

// ── Shift schedules ────────────────────────────────────────────────────────────
export const SHIFTS = [
  { id: "sh001", staffId: "s001", staffName: "Minh Anh", date: "2024-10-24", shift: "Sáng (08:00-14:00)", status: "approved" as ShiftStatus, branchId: "b001" },
  { id: "sh002", staffId: "s002", staffName: "Hương Ly", date: "2024-10-24", shift: "Chiều (14:00-20:00)", status: "approved" as ShiftStatus, branchId: "b001" },
  { id: "sh003", staffId: "s003", staffName: "Tuấn Kiệt", date: "2024-10-24", shift: "Cả ngày (08:00-20:00)", status: "approved" as ShiftStatus, branchId: "b001" },
  { id: "sh004", staffId: "s001", staffName: "Minh Anh", date: "2024-10-25", shift: "Sáng (08:00-14:00)", status: "pending" as ShiftStatus, branchId: "b001" },
  { id: "sh005", staffId: "s002", staffName: "Hương Ly", date: "2024-10-25", shift: "Nghỉ phép", status: "pending" as ShiftStatus, branchId: "b001" },
];

// ── Complaints ─────────────────────────────────────────────────────────────────
export const COMPLAINTS = [
  { id: "cp001", customerId: "c001", customerName: "Nguyễn Anh Đào", branchId: "b001", service: "Massage Đá Nóng", date: "2024-10-20", description: "Nhiệt độ đá quá nóng, gây khó chịu trong buổi trị liệu.", status: "open" as ComplaintStatus, resolution: null },
  { id: "cp002", customerId: "c004", customerName: "Anh Trần Quân", branchId: "b001", service: "Trị Liệu Cổ Vai Gáy", date: "2024-10-18", description: "Kỹ thuật viên đến trễ 20 phút so với lịch hẹn.", status: "resolved" as ComplaintStatus, resolution: "Đã xin lỗi khách và tặng voucher giảm 20% cho lần tiếp theo." },
  { id: "cp003", customerId: "c005", customerName: "Chị Lê Thu Hà", branchId: "b002", service: "Chăm Sóc Da Mặt", date: "2024-10-22", description: "Dị ứng nhẹ sau khi dùng sản phẩm, chưa được thông báo thành phần.", status: "in_progress" as ComplaintStatus, resolution: null },
];

// ── Promotions ─────────────────────────────────────────────────────────────────
export const PROMOTIONS = [
  { id: "pr001", name: "Chào Hè 2024", code: "AURA20", discountType: "percent", discountValue: 20, applicableServices: ["sv001", "sv002", "sv003"], branches: "all", startDate: "2024-06-01", endDate: "2024-12-31", usageLimit: 0, usageCount: 142, status: "active" },
  { id: "pr002", name: "Khách Hàng Mới", code: "NEWMEMBER", discountType: "percent", discountValue: 15, applicableServices: [], branches: "all", startDate: "2024-01-01", endDate: "2024-12-31", usageLimit: 1, usageCount: 87, status: "active" },
  { id: "pr003", name: "Black Friday", code: "BF2024", discountType: "fixed", discountValue: 300000, applicableServices: ["sv005", "sv008"], branches: "all", startDate: "2024-11-29", endDate: "2024-12-01", usageLimit: 50, usageCount: 0, status: "active" },
];

// ── Revenue data (monthly) ─────────────────────────────────────────────────────
export const MONTHLY_REVENUE = [
  { month: "T1", revenue: 820000000, cost: 480000000, profit: 340000000, appointments: 1240 },
  { month: "T2", revenue: 950000000, cost: 520000000, profit: 430000000, appointments: 1380 },
  { month: "T3", revenue: 1050000000, cost: 540000000, profit: 510000000, appointments: 1520 },
  { month: "T4", revenue: 1100000000, cost: 555000000, profit: 545000000, appointments: 1610 },
  { month: "T5", revenue: 1350000000, cost: 600000000, profit: 750000000, appointments: 1890 },
  { month: "T6", revenue: 1420000000, cost: 640000000, profit: 780000000, appointments: 2050 },
];

// ── Branch managers ────────────────────────────────────────────────────────────
export const BRANCH_MANAGERS = [
  { id: "m001", name: "Thanh Hằng", email: "manager@auraspa.vn", phone: "0904444444", branchId: "b001", branchName: "AuraSpa Quận 1", status: "active", joinDate: "2021-11-20" },
  { id: "m002", name: "Hoàng Nam", email: "hnam@auraspa.vn", phone: "0911222333", branchId: "b002", branchName: "AuraSpa Thảo Điền", status: "active", joinDate: "2022-02-15" },
  { id: "m003", name: "Minh Tuấn", email: "mtuan@auraspa.vn", phone: "0922333444", branchId: "b003", branchName: "AuraSpa Đà Lạt", status: "active", joinDate: "2023-05-01" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

export const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    confirmed: "bg-blue-50 text-blue-700",
    checked_in: "bg-primary/10 text-primary",
    completed: "bg-green-50 text-green-700",
    cancelled: "bg-error-container text-on-error-container",
    pending: "bg-secondary-container text-on-secondary-container",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-error-container text-on-error-container",
    open: "bg-error-container/50 text-error",
    in_progress: "bg-secondary-container text-on-secondary-container",
    resolved: "bg-green-50 text-green-700",
    escalated: "bg-tertiary-fixed text-on-tertiary-fixed",
    active: "bg-green-50 text-green-700",
    inactive: "bg-surface-container-high text-on-surface-variant",
    maintenance: "bg-secondary-container text-on-secondary-container",
  };
  return map[status] ?? "bg-surface-container text-on-surface-variant";
};

export const getStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    confirmed: "Đã xác nhận",
    checked_in: "Đã tiếp nhận",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    open: "Mới",
    in_progress: "Đang xử lý",
    resolved: "Đã giải quyết",
    escalated: "Đã leo thang",
    active: "Hoạt động",
    inactive: "Không hoạt động",
    maintenance: "Bảo trì",
    available: "Trống",
    occupied: "Đang dùng",
    cleaning: "Đang dọn",
  };
  return map[status] ?? status;
};
