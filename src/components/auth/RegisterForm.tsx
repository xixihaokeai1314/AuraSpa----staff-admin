"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  getPasswordStrength,
} from "@/lib/auth";

interface Props {
  onSwitchTab: () => void;
}

type Step = 1 | 2 | 3;

export default function RegisterForm({ onSwitchTab }: Props) {
  const { register } = useAuth();
  const router = useRouter();

  // ── Step state ──
  const [step, setStep] = useState<Step>(1);

  // ── Step 1 fields ──
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // ── Step 1 errors ──
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Step 2 OTP ──
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);

  // ── Step 3 ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const pwStrength = getPasswordStrength(password);

  // ─── Validate step 1 ─────────────────────────────────────────────────────
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    const lastNameErr = validateName(lastName);
    if (lastNameErr) newErrors.lastName = lastNameErr;

    const firstNameErr = validateName(firstName);
    if (firstNameErr) newErrors.firstName = firstNameErr;

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) newErrors.phone = phoneErr;

    if (!dob) newErrors.dob = "Vui lòng chọn ngày sinh.";

    const pwErr = validatePassword(password);
    if (pwErr) newErrors.password = pwErr;

    if (!confirmPw) {
      newErrors.confirmPw = "Vui lòng xác nhận mật khẩu.";
    } else if (password !== confirmPw) {
      newErrors.confirmPw = "Mật khẩu xác nhận không khớp.";
    }

    if (!agreeTerms) newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── OTP timer ────────────────────────────────────────────────────────────
  const startTimer = () => {
    setCountdown(59);
    setCanResend(false);
    let t = 59;
    const iv = setInterval(() => {
      t--;
      setCountdown(t);
      if (t <= 0) { clearInterval(iv); setCanResend(true); }
    }, 1000);
  };

  // ─── OTP input ────────────────────────────────────────────────────────────
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

  // ─── Proceed to step 2 ────────────────────────────────────────────────────
  const goStep2 = () => {
    if (!validateStep1()) return;
    setStep(2);
    setOtp(["", "", "", "", "", ""]);
    setOtpAttempts(0);
    startTimer();
  };

  // ─── Verify OTP → step 3 ──────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Vui lòng nhập đủ 6 chữ số.");
      return;
    }
    // Mock: accept "123456"
    if (code !== "123456") {
      const attempts = otpAttempts + 1;
      setOtpAttempts(attempts);
      if (attempts >= 3) {
        setOtpError("Đã nhập sai OTP 3 lần. Vui lòng thử lại sau 15 phút.");
        return;
      }
      setOtpError(`OTP không đúng. Còn ${3 - attempts} lần thử.`);
      return;
    }

    // Register the account
    setIsSubmitting(true);
    const result = await register({ firstName, lastName, email, phone, dob, password });
    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error ?? "Đăng ký thất bại.");
      setStep(1);
      return;
    }

    setStep(3);
  };

  // ─── Progress bar ─────────────────────────────────────────────────────────
  const ProgressBar = () => (
    <div className="flex gap-2 mb-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 3,
            flex: 1,
            borderRadius: 2,
            background: i <= step ? "#713323" : "#d9c1bc",
            transition: "background 0.4s",
          }}
        />
      ))}
    </div>
  );

  const pwColors = ["#ba1a1a", "#EF9F27", "#1D9E75", "#713323"];

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 1: Personal Info
  // ──────────────────────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="stagger-up">
        <ProgressBar />
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-primary font-display" style={{ fontSize: 20 }}>Thông tin cá nhân</h3>
          <span className="text-on-surface-variant" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>BƯỚC 1 / 3</span>
        </div>

        {submitError && (
          <div className="flex items-start gap-2 rounded-lg px-4 py-3 mb-4" style={{ background: "#ffdad6", fontSize: 13, color: "#93000a" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>
            <span>{submitError}</span>
          </div>
        )}

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Họ</label>
            <input
              className="custom-input w-full"
              placeholder="Nguyễn"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
            />
            {errors.lastName && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.lastName}</p>}
          </div>
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Tên</label>
            <input
              className="custom-input w-full"
              placeholder="Anh Đào"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
            />
            {errors.firstName && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.firstName}</p>}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Email */}
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Email</label>
            <input
              className="custom-input w-full"
              type="email"
              placeholder="example@email.com"
              value={email}
              autoComplete="email"
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
            />
            {errors.email && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Số điện thoại</label>
            <input
              className="custom-input w-full"
              type="tel"
              placeholder="0912 345 678"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
            />
            {errors.phone && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.phone}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Ngày sinh</label>
            <input
              className="custom-input w-full"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={(e) => { setDob(e.target.value); setErrors((p) => ({ ...p, dob: "" })); }}
            />
            {errors.dob && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.dob}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                className="custom-input w-full"
                type={showPw ? "text" : "password"}
                placeholder="Tối thiểu 8 ký tự"
                style={{ paddingRight: 36 }}
                value={password}
                autoComplete="new-password"
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{ position: "absolute", right: 0, bottom: 12, background: "none", border: "none", cursor: "pointer", color: "#86736e" }}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showPw ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {/* Strength bar */}
            {password && (
              <>
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1, height: 2, borderRadius: 1,
                        background: i < pwStrength.score ? pwColors[pwStrength.score - 1] : "#d9c1bc",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 11, marginTop: 4, color: pwColors[pwStrength.score - 1] }}>
                  {pwStrength.label}
                </p>
              </>
            )}
            {errors.password && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label className="label-sm text-on-surface-variant uppercase tracking-wider block mb-1">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                className="custom-input w-full"
                type={showConfirmPw ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                style={{ paddingRight: 36 }}
                value={confirmPw}
                autoComplete="new-password"
                onChange={(e) => { setConfirmPw(e.target.value); setErrors((p) => ({ ...p, confirmPw: "" })); }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw((v) => !v)}
                style={{ position: "absolute", right: 0, bottom: 12, background: "none", border: "none", cursor: "pointer", color: "#86736e" }}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showConfirmPw ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {errors.confirmPw && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.confirmPw}</p>}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4"
                style={{ accentColor: "#713323" }}
                checked={agreeTerms}
                onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, terms: "" })); }}
              />
              <span style={{ fontSize: 12, color: "#53433f", lineHeight: 1.6 }}>
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <a href="#" className="text-primary underline">Điều khoản dịch vụ</a>{" "}
                và{" "}
                <a href="#" className="text-primary underline">Chính sách bảo mật</a>.
              </span>
            </label>
            {errors.terms && <p style={{ fontSize: 11, color: "#ba1a1a", marginTop: 3 }}>{errors.terms}</p>}
          </div>
        </div>

        <button
          className="btn-primary w-full mb-4 flex items-center justify-center gap-2"
          onClick={goStep2}
        >
          TIẾP THEO
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div style={{ height: 1, flex: 1, background: "rgba(217,193,188,0.5)" }} />
          <span style={{ fontSize: 12, color: "#86736e" }}>hoặc đăng ký bằng</span>
          <div style={{ height: 1, flex: 1, background: "rgba(217,193,188,0.5)" }} />
        </div>
        <button type="button" className="btn-social w-full mb-4 flex items-center justify-center gap-3">
          <GoogleIcon />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Tiếp tục với Google</span>
        </button>

        <p className="text-center text-on-surface-variant" style={{ fontSize: 13 }}>
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={onSwitchTab}
            className="text-primary font-semibold"
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Đăng nhập
          </button>
        </p>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 2: OTP Verification
  // ──────────────────────────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="stagger-up">
        <ProgressBar />
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-primary font-display" style={{ fontSize: 20 }}>Xác minh email</h3>
          <span className="text-on-surface-variant" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>BƯỚC 2 / 3</span>
        </div>
        <p className="text-on-surface-variant mb-6" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Mã OTP 6 chữ số đã gửi đến<br />
          <strong className="text-on-surface">{email}</strong>
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
              type="button"
              className="text-primary font-semibold"
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}
              onClick={() => { setOtp(["", "", "", "", "", ""]); setOtpError(""); setOtpAttempts(0); startTimer(); }}
            >
              Gửi lại OTP
            </button>
          )}
        </div>

        <button
          className="btn-primary w-full mb-3 flex items-center justify-center gap-2"
          onClick={handleVerifyOtp}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? "ĐANG XỬ LÝ..." : "XÁC MINH"}
        </button>
        <button className="btn-ghost w-full" onClick={() => setStep(1)}>← Quay lại</button>

        <p className="text-center mt-4" style={{ fontSize: 12, color: "#86736e" }}>
          (Demo: dùng OTP <strong>123456</strong>)
        </p>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 3: Success
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="stagger-up text-center pt-2">
      <ProgressBar />
      <div className="flex items-center justify-end mb-4">
        <span className="text-on-surface-variant" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>BƯỚC 3 / 3</span>
      </div>
      <div className="check-circle mx-auto mb-5">
        <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#2d6a4f" }}>check</span>
      </div>
      <h3 className="text-primary font-display mb-3" style={{ fontSize: 22 }}>Chào mừng đến AuraSpa</h3>
      <p className="text-on-surface-variant mb-6 px-4" style={{ fontSize: 14, lineHeight: 1.7 }}>
        Tài khoản đã được tạo thành công.<br />Hãy bắt đầu hành trình chăm sóc bản thân.
      </p>
      <div className="rounded-xl p-5 mb-6 text-left" style={{ background: "#fbf2ed", border: "1px solid rgba(217,193,188,0.5)" }}>
        <p className="text-on-surface-variant uppercase tracking-widest mb-2" style={{ fontSize: 11, fontWeight: 600 }}>Tài khoản của bạn</p>
        <p className="font-semibold text-on-surface" style={{ fontSize: 15 }}>{lastName} {firstName}</p>
        <p className="text-on-surface-variant" style={{ fontSize: 13 }}>{email}</p>
      </div>
      <button
        className="btn-primary w-full mb-3"
        onClick={() => router.push("/customer")}
      >
        KHÁM PHÁ DỊCH VỤ →
      </button>
    </div>
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
