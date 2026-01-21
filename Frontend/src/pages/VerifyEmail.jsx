import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../server/api";
import { ArrowLeft, Lock } from "lucide-react";
import toast from "react-hot-toast";
import NavLogReg from "../context/NavLogReg";
import PageLoader from "../Components/PageLoad";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef([]);
  const [pageLoad, setPageLoad] = useState(false); 
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const pasteArray = paste.split("");
    const newOtp = [...otp];
    pasteArray.forEach((char, i) => {
      if (i < OTP_LENGTH) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pasteArray.length, OTP_LENGTH - 1);
    inputsRef.current[nextIndex].focus();
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      await api.post("/user/verify-email", {
        email,
        code: otp.join(""),
      });
      toast.success("Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/user/resend-otp", { email });
      setResendTimer(30);
      toast.success("Verification code resent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-[#f9fafa] flex flex-col font-sans text-slate-900">
      <NavLogReg />
      {pageLoad && <PageLoader />}

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-120 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b998d]/5 rounded-full -mr-16 -mt-16"></div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-[#0b998d] transition-colors text-sm font-semibold mb-8 group"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Go back
          </button>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold leading-tight mb-3">Check your inbox</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              We've sent a 6-digit verification code to <br />
              <span className="text-slate-900 font-semibold italic">{email}</span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-10" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <div key={index} className="flex items-center">
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 sm:w-12 h-14 text-center bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#1A0B3B] focus:ring-0 text-2xl font-bold transition-all outline-none"
                />
              
                {index === 2 && (
                  <span className="mx-1 text-slate-800 text-xl font-light">—</span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <button
              disabled={otp.join("").length !== 6 || loading}
              onClick={handleVerify}
              className="w-full flex items-center justify-center rounded-lg h-14 bg-linear-to-r from-[#1A0B3B] to-indigo-900  hover:bg-[#087f75] text-white text-base font-bold transition-all shadow-lg shadow-[#0b998d]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>

            <div className="text-center">
              <p className="text-slate-500 text-sm">
                Didn't get the code?{" "}
                {resendTimer > 0 ? (
                  <span className="text-slate-400 font-medium ml-1">
                    Resend in {resendTimer}s
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-[#8a61e2] hover:underline font-bold ml-1 transition-all"
                  >
                    Resend
                  </button>
                )}
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
            <Lock size={12} />
            <span>Secure 256-bit encrypted verification</span>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-slate-400 text-xs">
          © 2026 CareerGuideX. All rights reserved.
        </p>
      </footer>
    </div>
  );
}