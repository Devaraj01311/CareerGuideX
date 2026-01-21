import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../server/api"; 
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import NavLogReg from "../context/NavLogReg";
import AbstractBackground from "../Components/AbstractBackground";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      setUser(res.data.user);
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error(err.response.data.message || "Email not verified!");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Invalid credentials!");
      } else {
        toast.error("Login failed. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/user/${provider}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
           .then((res) => {
      setUser(res.data);
      localStorage.setItem("userId", res.data._id); 
    })
        
        .catch((err) => console.error(err))
        .finally(() => navigate("/home"));
      toast.success("Logged in successfully via OAuth!");
      window.history.replaceState({}, document.title, "/login");
    }
  }, []);

  return (
    <>
      <NavLogReg />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 text-black relative">
        <div className="flex flex-col justify-center px-10 lg:px-20">
          <div className="flex items-center gap-2 text-blue-900 font-semibold mt-7 mb-2">
            <div className="w-6 h-6 rounded bg-blue-900 flex items-center justify-center text-white">CX</div>
            CareerguideX
          </div>
          <h2 className="text-3xl font-semibold mb-6">Log in to your account</h2>

          <div className="gap-3 mb-6">
            <button
              className="w-full flex items-center justify-center gap-3 py-2 rounded bg-linear-to-r from-[#1A0B3B] to-indigo-900  hover:bg-blue-400 transition font-sans text-white mb-3"
              onClick={() => handleOAuth("google")}
              disabled={loading}
            >
              <FcGoogle size={20} /> Login with Google
            </button>

            <button
              className="w-full flex items-center justify-center gap-3 py-2 rounded border font-sans bg-white border-gray-300 hover:bg-gray-100 transition text-black"
              onClick={() => handleOAuth("github")}
              disabled={loading}
            >
              <FaGithub size={20} /> Login with GitHub
            </button>
          </div>

          <div className="flex items-center my-6 -mt-3 text-gray-400">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-3 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-[#665de7] text-black"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-[#665de7] text-black"
                required
              />
            </div>

            <Link to="/forgot-password" className="text-right text-sm text-blue-900 hover:underline cursor-pointer">
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md ${loading ? "bg-gray-200 cursor-not-allowed text-black" : "bg-linear-to-r from-[#1A0B3B] to-indigo-900  hover:bg-blue-600 text-white"}`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-900 hover:underline">Sign Up</Link>
          </p>

          <p className="text-sm text-gray-600 mt-2 mb-4">
            Having trouble? <span className="text-blue-900 cursor-pointer">Contact support</span>
          </p>
        </div>

        <div className="hidden lg:block relative w-full min-h-screen overflow-hidden pr-12">
          <AbstractBackground />
        </div>
      </div>
    </>
  );
}
