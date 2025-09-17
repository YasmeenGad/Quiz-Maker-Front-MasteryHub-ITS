import React, { useState, useEffect } from "react";
import QuizList from "./TeacherQuizzes";
import QuizForm from "./QuizForm";
import "../../styles/teacher_dashboard.css";
import { FiLogOut, FiPlusCircle, FiClipboard } from "react-icons/fi";
import { getTeacherQuizzes, deleteQuiz, logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await getTeacherQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load quizzes");
    }
  };

  const handleQuizCreated = (quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert("Failed to delete quiz");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("token"); 
      navigate("/login"); 
    }
  };

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h2>
          <FiClipboard style={{ marginRight: "10px" }} />
          Teacher Dashboard
        </h2>
        <div className="logout-container">
          <button className="btn logout-btn" onClick={handleLogout}>
            <FiLogOut style={{ marginRight: "6px" }} /> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="create-section">
          <QuizForm onQuizCreated={handleQuizCreated} />
        </section>

        <section className="quizzes-section">
          <h3>
            <FiClipboard style={{ marginRight: "8px" }} />
            Your Quizzes
          </h3>
          <QuizList quizzes={quizzes} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
