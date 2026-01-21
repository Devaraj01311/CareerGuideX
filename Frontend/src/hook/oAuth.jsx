import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../server/api"; 

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(console.error)
        .finally(() => navigate("/"));
    } else {
      navigate("/login");
    }

    window.history.replaceState({}, document.title, "/");
  }, []);

  return <div>Logging in...</div>;
}
