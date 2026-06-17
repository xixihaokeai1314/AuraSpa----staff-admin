// Form validators for FE only
// All validations return error message (string) or null if valid

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Vui lòng nhập email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email không hợp lệ.";
  if (email.length > 100) return "Email không được vượt quá 100 ký tự.";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return "Vui lòng nhập số điện thoại.";
  const cleaned = phone.replace(/[\s\-\+]/g, "");
  if (!/^(0|\d{2})[0-9]{9,}$/.test(cleaned))
    return "Số điện thoại không hợp lệ. VD: 0912345678";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Vui lòng nhập họ và tên.";
  if (name.trim().length < 2) return "Họ và tên phải có ít nhất 2 ký tự.";
  if (name.length > 100) return "Họ và tên không được vượt quá 100 ký tự.";
  if (!/^[a-zA-ZÀ-ỿ\s]+$/.test(name))
    return "Họ và tên chỉ được chứa chữ cái và dấu cách.";
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) return "Vui lòng nhập nội dung tin nhắn.";
  if (message.trim().length < 10)
    return "Nội dung tin nhắn phải có ít nhất 10 ký tự.";
  if (message.length > 5000) return "Nội dung tin nhắn không được vượt quá 5000 ký tự.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa.";
  if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường.";
  if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ số.";
  return null;
}

export function validatePromotionCode(code: string): string | null {
  if (!code.trim()) return null; // Promo is optional
  if (!/^[A-Z0-9]{3,20}$/.test(code.toUpperCase()))
    return "Mã ưu đãi không hợp lệ. Vui lòng kiểm tra lại.";
  return null;
}

export function validateDate(dateStr: string): string | null {
  if (!dateStr) return "Vui lòng chọn ngày.";
  const selected = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return "Vui lòng chọn ngày trong tương lai.";
  if (selected > new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000))
    return "Chỉ có thể đặt lịch trong vòng 90 ngày.";
  return null;
}

export function validateTimeSlot(timeSlot: string): string | null {
  if (!timeSlot) return "Vui lòng chọn giờ.";
  if (!/^\d{2}:\d{2}$/.test(timeSlot)) return "Giờ không hợp lệ.";
  return null;
}

export function validateServiceSelection(serviceId: string): string | null {
  if (!serviceId) return "Vui lòng chọn dịch vụ.";
  return null;
}

export function validateBranchSelection(branchId: string): string | null {
  if (!branchId) return "Vui lòng chọn chi nhánh.";
  return null;
}

export function validateTherapistSelection(therapistId: string): string | null {
  if (!therapistId) return "Vui lòng chọn chuyên gia.";
  return null;
}

// Combine multiple validations
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const msgErr = validateMessage(data.message);
  if (msgErr) errors.message = msgErr;

  return errors;
}

export function validateBookingForm(data: {
  serviceId: string;
  branchId: string;
  date: string;
  timeSlot: string;
  therapistId: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const svcErr = validateServiceSelection(data.serviceId);
  if (svcErr) errors.serviceId = svcErr;

  const branchErr = validateBranchSelection(data.branchId);
  if (branchErr) errors.branchId = branchErr;

  const dateErr = validateDate(data.date);
  if (dateErr) errors.date = dateErr;

  const timeErr = validateTimeSlot(data.timeSlot);
  if (timeErr) errors.timeSlot = timeErr;

  const therapistErr = validateTherapistSelection(data.therapistId);
  if (therapistErr) errors.therapistId = therapistErr;

  return errors;
}

export function validateProfileForm(data: {
  name: string;
  phone?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;

  if (data.phone) {
    const phoneErr = validatePhone(data.phone);
    if (phoneErr) errors.phone = phoneErr;
  }

  return errors;
}
