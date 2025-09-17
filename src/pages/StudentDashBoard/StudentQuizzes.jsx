import React, { useEffect, useState } from "react";
import { getStudentQuizzes } from "../api";
import { Link } from "react-router-dom";

const isQuizAvailable = (start, duration) => {
  const startTime = new Date(start);
  const endTime = new Date(startTime.getTime() + duration * 60000);
  const now = new Date();
  return now >= startTime && now <= endTime;
};

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getStudentQuizzes().then((res) => {
      if (res) setQuizzes(res);
    });
  }, []);

  return (
    <div className="quiz-list">
      {quizzes.map((q) => {
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
