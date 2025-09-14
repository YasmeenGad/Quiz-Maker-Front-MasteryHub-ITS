import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/users";

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};
