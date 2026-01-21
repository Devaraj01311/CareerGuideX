import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../server/api";
import { Check, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import PasswordInput from "../Components/PasswordInput";
import usePasswordRules from "../hook/usePasswordRule";
import { toast } from "react-hot-toast";
import NavBarLogReg from "../context/NavLogReg";
import AbstractBackground from "../Components/AbstractBackground";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const rules = usePasswordRules(form.password, form.confirm);
  const allValid = Object.values(rules).every(Boolean);

  const handleRegister = async () => {
    if (!allValid) return;

    try {
      setLoading(true);

      const res = await api.post("/user/register", {
        name: form.username,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Registration successful! Check your email.");
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/user/${provider}`;
  };

  return (
    <>
      <NavBarLogReg />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 text-black">
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6">

            <div className="flex items-center gap-2 text-blue-900 font-semibold mt-7">
              <div className="w-6 h-6 rounded bg-blue-900 flex items-center justify-center text-white">CX</div>
              CareerguideX
            </div>

            <h1 className="text-2xl font-semibold text-black">Sign up details</h1>

            <button
              className="w-full flex items-center justify-center gap-3 py-2 rounded bg-linear-to-r from-[#1A0B3B] to-indigo-900  hover:bg-blue-400 text-white transition"
              onClick={() => handleOAuth("google")}
              disabled={loading}
            >
              <FcGoogle size={20} />
              Signup with Google
            </button>

            <button
              className="w-full flex items-center justify-center gap-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100 text-black transition"
              onClick={() => handleOAuth("github")}
              disabled={loading}
            >
              <FaGithub size={20} />
              Signup with GitHub
            </button>

            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <div className="flex-1 h-px bg-gray-300" />
              or
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full mt-1 px-4 py-2 rounded border border-gray-300 focus:border-[#665de7] outline-none bg-white text-black"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-4 py-2 rounded border border-gray-300 focus:border-[#665de7] outline-none bg-white text-black"
              />
            </div>

            <PasswordInput
              label="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              showStrength
              lightMode
            />
            <PasswordInput
              label="Confirm password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              lightMode
            />
            <ul className="text-sm space-y-1">
              <Rule ok={rules.length} text="Minimum of 8 characters long" />
              <Rule ok={rules.upperLower} text="Mix of uppercase & lowercase letters" />
              <Rule ok={rules.number} text="At least one digit" />
              <Rule ok={rules.special} text="At least one special character" />
              <Rule ok={rules.match} text="Passwords match" />
            </ul>

            <label className="flex gap-2 text-xs bg-white text-black">
              <input type="checkbox" />
              By pressing the button you agree to our
              <span className="text-blue-900"> Terms of Service </span>
              and
              <span className="text-blue-900"> Privacy Policy </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 py-2 rounded border border-blue-900 bg-white hover:bg-blue-900 hover:text-white transition font-sans"
              >
                Back to login
              </button>

              <button
                disabled={!allValid || loading}
                onClick={handleRegister}
                className={`flex-1 py-2 rounded ${
                  allValid ? "bg-linear-to-r from-[#1A0B3B] to-indigo-900  text-white" : "bg-linear-to-r from-[#1A0B3B] to-indigo-900  text-white font-sans cursor-not-allowed"
                }`}
              >
                {loading ? "Sending OTP..." : "Next"}
              </button>
            </div>

            <p className="text-xs text-black text-center mb-3 -mt-2">
              Having trouble? <span className="text-blue-900">Contact support</span>
            </p>

          </div>
        </div>

        <div className="hidden lg:block relative w-full min-h-screen overflow-hidden pr-12">
          <AbstractBackground />
        </div>

      </div>
    </>
  );
}

function Rule({ ok, text }) {
  return (
    <li className="flex items-center gap-2">
      {ok ? <Check className="text-green-500" size={16} /> : <X className="text-red-500" size={16} />}
      <span className={ok ? "text-green-700" : "text-red-600"}>{text}</span>
    </li>
  );
}
