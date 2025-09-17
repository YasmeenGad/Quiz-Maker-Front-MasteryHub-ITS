import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});



export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, { headers: { "Content-Type": "application/json" } });
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, { headers: { "Content-Type": "application/json" } });
  return res.data;
};

export const getUser = async () => {
  const res = await axios.get(`${BASE_URL}/auth/me`, { headers: getAuthHeaders() });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${BASE_URL}/auth/logout`, {}, { headers: getAuthHeaders() });
  return res.data;
};

export const createQuiz = async (data) => {
  const res = await axios.post(`${BASE_URL}/quiz`, data, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" }
  });
  return res.data.data;
};

export const getTeacherQuizzes = async () => {
  const res = await axios.get(`${BASE_URL}/quiz/teacher`, { headers: getAuthHeaders() });
  return res.data.data;
};

export const deleteQuiz = async (id) => {
  const res = await axios.delete(`${BASE_URL}/quiz/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

export const getStudentQuizzes = async () => {
  const res = await axios.get(`${BASE_URL}/quiz/student`, {
    headers: getAuthHeaders(),
  });
  return res.data.data;
};

export const submitQuiz = async (quizId, answers) => {
  const res = await axios.post(
    `${BASE_URL}/quiz/${quizId}/submit`,
    { answers },
    {
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    }
  );
  return res.data;
};

export const getQuizDetails = async (quizId) => {
  const res = await axios.get(`${BASE_URL}/quiz/${quizId}`, {
    headers: getAuthHeaders(),
  });
  return res.data.data;
};