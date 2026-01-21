import { createContext, useContext, useEffect, useState } from "react";
import api from "../server/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return; 
    }

    try {
      const res = await api.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Fetch user failed:", err);
      localStorage.removeItem("token"); 
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
    } catch (_) {}
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
