import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import { getTeacherQuizzes, deleteQuiz } from "../../../services/api";

export default function QuizList() {
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
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
      ))}
    </div>
  );
}
