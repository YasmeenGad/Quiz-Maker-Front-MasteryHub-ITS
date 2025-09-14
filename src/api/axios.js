// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("quizUser");
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user.accessToken) config.headers.Authorization = `Bearer ${user.accessToken}`;
    } catch {}
  }
  return config;
}, (err) => Promise.reject(err));

export default api;
