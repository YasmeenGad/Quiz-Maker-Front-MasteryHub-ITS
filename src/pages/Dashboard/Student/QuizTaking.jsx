import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/quiz_taking.css";

// Mock quiz data
const QUIZZES = {
  1: {
    id: 1,
    name: "Math Quiz",
    duration: 30,
    start: "2025-09-20 10:00",
    questions: [
      { id: 1, type: "MCQ", text: "2 + 2 = ?", options: ["3", "4", "5"] },
      { id: 2, type: "TEXT", text: "What is the square root of 9?" },
    ],
  },
  2: {
    id: 2,
    name: "Physics Quiz",
    duration: 20,
    start: "2025-09-22 14:00",
    questions: [
      {
        id: 1,
        type: "MCQ",
        text: "What is the unit of Force?",
        options: ["Newton", "Joule", "Watt"],
      },
      { id: 2, type: "TEXT", text: "State Newton’s 3rd Law of Motion." },
    ],
  },
};

export default function QuizTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = QUIZZES[id];
  const [answers, setAnswers] = useState({});

  if (!quiz) return <h3>Quiz not found</h3>;

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
    alert("Quiz submitted successfully!");
    navigate("/student"); // go back to student dashboard
  };

  return (
    <div className="quiz-taking-root">
      <header className="quiz-taking-header">
        <h2>{quiz.name}</h2>
        <p>Duration: {quiz.duration} mins</p>
      </header>

      <form className="quiz-form" onSubmit={handleSubmit}>
        {quiz.questions.map((q) => (
          <div key={q.id} className="question-block">
            <p className="question-text">
              {q.id}. {q.text}
            </p>

            {q.type === "MCQ" ? (
              <div className="options">
                {q.options.map((opt, i) => (
                  <label key={i} className="option">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                className="input"
                placeholder="Your answer"
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
          </div>
        ))}

        <button type="submit" className="btn">
          Submit Quiz
        </button>
      </form>
    </div>
  );
}
