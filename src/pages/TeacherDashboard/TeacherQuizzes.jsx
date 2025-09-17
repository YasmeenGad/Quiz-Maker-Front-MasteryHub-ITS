import React from "react";
import QuizCard from "./QuizCard";

export default function QuizList({ quizzes, onDelete }) {
  return (
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onDelete={onDelete} />
      ))}
    </div>
  );
}
