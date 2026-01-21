import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);


let activeRequests = 0;

export const setGlobalLoading = (setLoading) => {
  api.interceptors.request.use((config) => {
    activeRequests++;
    setLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      activeRequests--;
      if (activeRequests === 0) setLoading(false);
      return response;
    },
    (error) => {
      activeRequests--;
      if (activeRequests === 0) setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default api;
