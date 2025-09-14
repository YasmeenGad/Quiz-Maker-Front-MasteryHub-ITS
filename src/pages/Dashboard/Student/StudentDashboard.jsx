import React from "react";
import QuizList from "./QuizList";
import "../../../styles/student_dashboard.css";

export default function StudentDashboard() {
  return (
    <div className="dashboard-root">
      <header className="dashboard-header student">
        <h2>Student Dashboard</h2>
        <button className="btn">Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="student-quizzes">
          <h3>Available Quizzes</h3>
          <QuizList />
        </section>
      </main>
    </div>
  );
}
