import axios from "axios";

const api = axios.create({
 baseURL: "https://expense-tracker-6o0x.onrender.com/api",
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
