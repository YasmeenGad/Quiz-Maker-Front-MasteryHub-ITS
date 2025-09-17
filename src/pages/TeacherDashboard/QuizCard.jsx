import React from "react";

export default function QuizCard({ quiz, onDelete }) {
  return (
    <div className="quiz-card">
      <h4>{quiz.name}</h4>
      <p>Duration: {quiz.duration} mins</p>
      <p>Start: {new Date(quiz.start).toLocaleString()}</p>
      <button className="btn-danger" onClick={() => onDelete(quiz.id)}>
        Delete
      </button>
    </div>
  );
}
