import React, { useEffect, useState } from "react";
import { fetchStudentQuizzes } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentQuizzes().then((res) => {
      if (res.success) setQuizzes(res.data);
    });
  }, []);

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h2>Student Dashboard</h2>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="btn"
        >
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        {quizzes.length === 0 ? (
          <p>No quizzes available</p>
        ) : (
          <ul>
            {quizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="quiz-card"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                <h3>{quiz.name}</h3>
                <p>
                  {quiz.start} | Duration: {quiz.duration} mins
                </p>
                <p>Teacher: {quiz.teacher?.name}</p>
                <p>Status: {quiz.isOpen ? "Open" : "Closed"}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
