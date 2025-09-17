import React from "react";
import { Link } from "react-router-dom";

const QUIZZES = [
  { id: 1, name: "Math Quiz", start: "2025-09-20 10:00", duration: 30 },
  { id: 2, name: "Physics Quiz", start: "2025-09-22 14:00", duration: 20 },
];

const isQuizAvailable = (start, duration) => {
  const startTime = new Date(start);
  const endTime = new Date(startTime.getTime() + duration * 60000);
  const now = new Date();
  return now >= startTime && now <= endTime;
};

export default function QuizList() {
  return (
    <div className="quiz-list">
      {QUIZZES.map((q) => {
        const available = isQuizAvailable(q.start, q.duration);
        return (
          <div key={q.id} className="quiz-card">
            <h4>{q.name}</h4>
            <p>
              {q.start} — {q.duration} mins
            </p>
            {available ? (
              <Link to={`/student/quiz/${q.id}`} className="btn">
                Take Quiz
              </Link>
            ) : (
              <p className="quiz-locked">Not available now</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
