import React from "react";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";
import "../../../styles/teacher_dashboard.css";

export default function TeacherDashboard() {
  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h2>Teacher Dashboard</h2>
        <button className="btn">Logout</button>
      </header>

      <main className="dashboard-main">
        <section>
          <h3>Your Quizzes</h3>
          <QuizList />
        </section>

        <section>
          <h3>Create New Quiz</h3>
          <QuizForm />
        </section>
      </main>
    </div>
  );
}
