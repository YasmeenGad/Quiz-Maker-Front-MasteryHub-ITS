import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout";
import TeacherDashboard from "./pages/Dashboard/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/Dashboard/Student/StudentDashboard";
import QuizTaking from "./pages/Dashboard/Student/QuizTaking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/quiz" element={<QuizTaking />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
