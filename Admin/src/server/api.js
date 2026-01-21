import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL, 
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

export default api;