import React, { useState } from "react";
import QuizCard from "./QuizCard";

const MOCK = [
  { id: 1, name: "Math Quiz", duration: 30, start: "2025-09-20 10:00" },
  { id: 2, name: "Physics Quiz", duration: 20, start: "2025-09-22 14:00" },
];

export default function QuizList() {
  const [quizzes, setQuizzes] = useState(MOCK);

  const deleteQuiz = (id) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onDelete={deleteQuiz} />
      ))}
    </div>
  );
}
