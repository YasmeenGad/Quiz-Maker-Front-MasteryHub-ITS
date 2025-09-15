import axios from "axios";

const API_URL = "http://localhost:3000/auth";  

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch user";
  }
};
