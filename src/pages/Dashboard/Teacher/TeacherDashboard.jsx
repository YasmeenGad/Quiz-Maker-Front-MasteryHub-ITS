import React, { useState, useEffect } from "react";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";
import "../../../styles/teacher_dashboard.css";
import { FiLogOut, FiPlusCircle, FiClipboard } from "react-icons/fi";
import { getTeacherQuizzes, deleteQuiz } from "../../../services/api";

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  
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
      console.error(err);
      alert("Failed to delete quiz");
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
          <button className="btn logout-btn">
            <FiLogOut style={{ marginRight: "6px" }} /> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="quizzes-section">
          <h3>
            <FiClipboard style={{ marginRight: "8px" }} />
            Your Quizzes
          </h3>
          <QuizList quizzes={quizzes} onDelete={handleDelete} />
        </section>

        <section className="create-section">
          <h3>
            <FiPlusCircle style={{ marginRight: "8px" }} />
            Create New Quiz
          </h3>
          <QuizForm onQuizCreated={handleQuizCreated} />
        </section>
      </main>
    </div>
  );
}
