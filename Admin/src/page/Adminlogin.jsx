import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../server/api";
import toast from "react-hot-toast";
import NavLogReg from "../components/NavLoging";
import AbstractBackground from "../components/AbstractBg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid admin credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavLogReg />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 text-black relative">
        <div className="flex flex-col justify-center px-10 lg:px-20">
          <div className="flex items-center gap-2 text-cyan-700 font-semibold mt-7 mb-2">
            <div className="w-6 h-6 rounded bg-[#1A0B3B] flex items-center justify-center text-white">
              A
            </div>
            Admin Panel
          </div>

          <h2 className="text-3xl font-semibold mb-6">
            Log in to Admin Dashboard
          </h2>

          <form className="space-y-4" onSubmit={handleAdminLogin}>
            <div>
              <label className="text-sm text-gray-700">
                Admin Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full mt-1 px-3 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-cyan-700"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 px-3 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-cyan-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md ${
                loading
                  ? "bg-gray-200 cursor-not-allowed text-black"
                  : "bg-linear-to-r from-[#1A0B3B] to-indigo-900 hover:bg-red-600 text-white"
              }`}
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Restricted access. Authorized personnel only.
          </p>
        </div>
        <div className="hidden lg:block relative w-full min-h-screen overflow-hidden pr-12">
          <AbstractBackground />
        </div>
      </div>
    </>
  );
}
