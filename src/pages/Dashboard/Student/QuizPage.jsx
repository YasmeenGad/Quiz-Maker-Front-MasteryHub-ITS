import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizDetails, submitQuiz } from "../api/studentApi";

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{ questionId: string; answer: any }[]>(
    []
  );

  useEffect(() => {
    fetchQuizDetails(id).then((res) => {
      if (res.success) setQuiz(res.data);
    });
  }, [id]);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer: value } : a
        );
      }
      return [...prev, { questionId, answer: value }];
    });
  };

  const handleSubmit = async () => {
    const res = await submitQuiz(id, answers);
    if (res.success) {
      alert("Quiz submitted successfully!");
      navigate("/student");
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="quiz-page">
      <h2>{quiz.name}</h2>
      {quiz.questions.map((q: any) => (
        <div key={q.id} className="question">
          <p>{q.text}</p>
          {q.type === "mcq" ? (
            <ul>
              {q.options.map((opt: string) => (
                <li key={opt}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                  />
                  {opt}
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              onChange={(e) => handleAnswer(q.id, e.target.value)}
            ></textarea>
          )}
        </div>
      ))}

      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
}
