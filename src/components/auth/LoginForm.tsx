"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateEmail } from "@/lib/validators";

interface Props {
  onSwitchTab: () => void;
}

type ForgotStep = "idle" | "forgot" | "otp" | "newpw" | "success";

export default function LoginForm({ onSwitchTab }: Props) {
  const { login } = useAuth();

  // ── Form state ──
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  // ── Forgot password flow ──
  const [forgotStep, setForgotStep] = useState<ForgotStep>("idle");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotEmailErr, setForgotEmailErr] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmNewPw, setConfirmNewPw] = useState("");
  const [newPwError, setNewPwError] = useState("");
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);

  // ── Validate on blur ──
  const validateField = (name: "email" | "password", value: string) => {
    if (name === "email") {
      setFieldErrors((p) => ({ ...p, email: validateEmail(value) ?? "" }));
    } else {
      setFieldErrors((p) => ({
        ...p,
        password: value ? "" : "Vui lòng nhập mật khẩu.",
      }));
    }
  };

  // ── Submit ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation before calling auth
    const emailErr = validateEmail(email);
    if (emailErr) {
      setFieldErrors((p) => ({ ...p, email: emailErr }));
      return;
    }
    if (!password) {
      setFieldErrors((p) => ({ ...p, password: "Vui lòng nhập mật khẩu." }));
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Đăng nhập thất bại.");
    }
  };

  // ── OTP countdown ──
  const startTimer = () => {
    setCountdown(59);
    setCanResend(false);
    let t = 59;
    const iv = setInterval(() => {
      t--;
      setCountdown(t);
      if (t <= 0) {
        clearInterval(iv);
        setCanResend(true);
      }
    }, 1000);
  };

  // ── OTP input handling ──
  const handleOtpChange = (val: string, i: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      document.querySelectorAll<HTMLInputElement>(".otp-box")[i + 1]?.focus();
    }
  };
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      document.querySelectorAll<HTMLInputElement>(".otp-box")[i - 1]?.focus();
    }
  };

  // ── Verify OTP (mock: any 6-digit code is valid) ──
  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Vui lòng nhập đủ 6 chữ số.");
      return;
    }
    // Mock: accept "123456", reject others
    if (code !== "123456") {
      const attempts = otpAttempts + 1;
      setOtpAttempts(attempts);
      if (attempts >= 3) {
        setOtpError("Đã nhập sai OTP 3 lần. Đăng ký tạm thời bị khóa 15 phút.");
        return;
      }
      setOtpError(`OTP không đúng. Còn ${3 - attempts} lần thử.`);
      return;
    }
    setOtpError("");
    setForgotStep("newpw");
  };

  // ── Save new password ──
  const handleSaveNewPw = () => {
    if (newPw.length < 8) {
      setNewPwError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (!/[A-Z]/.test(newPw)) {
      setNewPwError("Mật khẩu phải có ít nhất 1 chữ hoa.");
      return;
    }
    if (!/[0-9]/.test(newPw)) {
      setNewPwError("Mật khẩu phải có ít nhất 1 chữ số.");
      return;
    }
    if (newPw !== confirmNewPw) {
      setNewPwError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setNewPwError("");
    setForgotStep("success");
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Forgot password steps
  // ──────────────────────────────────────────────────────────────────────────
  if (forgotStep === "forgot") {
    return (
      <div className="stagger-up">
        <p className="label-sm text-on-surface-variant uppercase tracking-wider mb-1">Quên mật khẩu</p>
        <h3 className="text-primary font-display mb-6" style={{ fontSize: 22 }}>Khôi phục tài khoản</h3>
        <p className="text-on-surface-variant mb-6" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Nhập email đã đăng ký. Chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu.
        </p>
        <div className="mb-6">
          <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Email</label>
          <input
            className="custom-input w-full"
            type="email"
            placeholder="example@auraspa.vn"
            value={forgotEmail}
            onChange={(e) => { setForgotEmail(e.target.value); setForgotEmailErr(""); }}
          />
          {forgotEmailErr && <p className="text-error text-xs mt-1">{forgotEmailErr}</p>}
        </div>
        <button
          className="btn-primary w-full mb-3"
          onClick={() => {
            const err = validateEmail(forgotEmail);
            if (err) { setForgotEmailErr(err); return; }
            setForgotStep("otp");
            setOtp(["", "", "", "", "", ""]);
            setOtpAttempts(0);
            startTimer();
          }}
        >
          GỬI MÃ OTP →
        </button>
        <button className="btn-ghost w-full" onClick={() => setForgotStep("idle")}>
          ← Quay lại đăng nhập
        </button>
        <p className="text-center mt-4" style={{ fontSize: 12, color: "#86736e" }}>
          (Demo: dùng OTP <strong>123456</strong>)
        </p>
      </div>
    );
  }

  if (forgotStep === "otp") {
    return (
      <div className="stagger-up">
        <p className="label-sm text-on-surface-variant uppercase tracking-wider mb-1">Xác minh OTP</p>
        <h3 className="text-primary font-display mb-3" style={{ fontSize: 22 }}>Nhập mã xác minh</h3>
        <p className="text-on-surface-variant mb-6" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Mã đã được gửi đến<br />
          <strong className="text-on-surface">{forgotEmail}</strong>
        </p>
        <div className="flex gap-2 mb-4">
          {otp.map((val, i) => (
            <input
              key={i}
              className="otp-box"
              maxLength={1}
              type="text"
              inputMode="numeric"
              value={val}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              onKeyDown={(e) => handleOtpKeyDown(e, i)}
            />
          ))}
        </div>
        {otpError && <p className="text-error text-xs mb-3">{otpError}</p>}
        <div className="flex justify-between items-center mb-6" style={{ fontSize: 12, color: "#53433f" }}>
          {!canResend ? (
            <span>Gửi lại sau <strong>{countdown}s</strong></span>
          ) : (
            <button
              className="text-primary font-semibold"
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}
              onClick={() => { setOtp(["", "", "", "", "", ""]); setOtpError(""); setOtpAttempts(0); startTimer(); }}
            >
              Gửi lại OTP
            </button>
          )}
        </div>
        <button className="btn-primary w-full mb-3" onClick={handleVerifyOtp}>XÁC NHẬN →</button>
        <button className="btn-ghost w-full" onClick={() => setForgotStep("forgot")}>← Quay lại</button>
      </div>
    );
  }

  if (forgotStep === "newpw") {
    return (
      <div className="stagger-up">
        <p className="label-sm text-on-surface-variant uppercase tracking-wider mb-1">Đặt lại mật khẩu</p>
        <h3 className="text-primary font-display mb-6" style={{ fontSize: 22 }}>Mật khẩu mới</h3>
        <div className="space-y-5 mb-6">
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Mật khẩu mới</label>
            <input
              className="custom-input w-full"
              type="password"
              placeholder="Tối thiểu 8 ký tự, có chữ hoa và số"
              value={newPw}
              onChange={(e) => { setNewPw(e.target.value); setNewPwError(""); }}
            />
          </div>
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Xác nhận mật khẩu</label>
            <input
              className="custom-input w-full"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmNewPw}
              onChange={(e) => { setConfirmNewPw(e.target.value); setNewPwError(""); }}
            />
          </div>
          {newPwError && <p className="text-error text-xs">{newPwError}</p>}
        </div>
        <button className="btn-primary w-full" onClick={handleSaveNewPw}>LƯU MẬT KHẨU →</button>
      </div>
    );
  }

  if (forgotStep === "success") {
    return (
      <div className="stagger-up text-center py-4">
        <div className="check-circle mx-auto mb-5">
          <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#2d6a4f" }}>check</span>
        </div>
        <h3 className="text-primary font-display mb-2" style={{ fontSize: 22 }}>Đổi mật khẩu thành công</h3>
        <p className="text-on-surface-variant mb-8" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Mật khẩu đã được cập nhật.<br />Vui lòng đăng nhập lại.
        </p>
        <button
          className="btn-primary w-full"
          onClick={() => { setForgotStep("idle"); setNewPw(""); setConfirmNewPw(""); setPassword(""); }}
        >
          VỀ TRANG ĐĂNG NHẬP
        </button>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Main login form
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <form className="stagger-up" onSubmit={handleLogin} noValidate>
      {/* Global error */}
      {error && (
        <div
          className="flex items-start gap-2 rounded-lg px-4 py-3 mb-5"
          style={{ background: "#ffdad6", fontSize: 13, color: "#93000a" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, flexShrink: 0 }}>error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6 mb-6">
        {/* Email */}
        <div className="group">
          <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1 group-focus-within:text-primary transition-colors">
            Email
          </label>
          <input
            className="custom-input w-full"
            type="email"
            placeholder="example@auraspa.vn"
            value={email}
            autoComplete="email"
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: "" })); setError(""); }}
            onBlur={() => validateField("email", email)}
          />
          {fieldErrors.email && (
            <p style={{ fontSize: 12, color: "#ba1a1a", marginTop: 4 }}>{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="group">
          <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1 group-focus-within:text-primary transition-colors">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              className="custom-input w-full"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              style={{ paddingRight: 36 }}
              value={password}
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: "" })); setError(""); }}
              onBlur={() => validateField("password", password)}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              style={{ position: "absolute", right: 0, bottom: 12, background: "none", border: "none", cursor: "pointer", color: "#86736e" }}
              tabIndex={-1}
              aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {showPw ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {fieldErrors.password && (
            <p style={{ fontSize: 12, color: "#ba1a1a", marginTop: 4 }}>{fieldErrors.password}</p>
          )}
        </div>
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded"
            style={{ accentColor: "#713323" }}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-on-surface-variant" style={{ fontSize: 12 }}>Ghi nhớ tôi</span>
        </label>
        <button
          type="button"
          onClick={() => { setForgotStep("forgot"); setForgotEmail(email); }}
          className="text-primary"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 4 }}
        >
          Quên mật khẩu?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary w-full mb-6"
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP NGAY"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div style={{ height: 1, flex: 1, background: "rgba(217,193,188,0.5)" }} />
        <span style={{ fontSize: 12, color: "#86736e" }}>Hoặc tiếp tục với</span>
        <div style={{ height: 1, flex: 1, background: "rgba(217,193,188,0.5)" }} />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button type="button" className="btn-social">
          <GoogleIcon />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Google</span>
        </button>
        <button type="button" className="btn-social">
          <FacebookIcon />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Facebook</span>
        </button>
      </div>

      {/* Switch to register */}
      <p className="text-center text-on-surface-variant" style={{ fontSize: 14 }}>
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="text-primary font-semibold"
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
        >
          Đăng ký ngay
        </button>
      </p>

      {/* Demo hint */}
      <div className="mt-6 p-4 rounded-lg" style={{ background: "#fbf2ed", border: "1px solid rgba(217,193,188,0.5)" }}>
        <p className="text-on-surface-variant text-center" style={{ fontSize: 11 }}>
          <strong>Demo accounts:</strong><br />
          customer@auraspa.vn / Customer1<br />
          staff@auraspa.vn / Staff123<br />
          manager@auraspa.vn / Manager1<br />
          admin@auraspa.vn / Owner123
        </p>
      </div>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
