import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizDetails, submitQuiz } from "../../services/api";

export default function QuizTaking() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizDetails(id);
        console.log("Fetched quiz:", data);
        setQuiz(data);
      } catch (err) {
        console.error("Error fetching quiz details:", err);
      }
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) return <h3>Loading quiz...</h3>;

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitQuiz(
        id,
        Object.entries(answers).map(([qid, answer]) => ({
          questionId: qid,
          answer,
        }))
      );
      alert("Quiz submitted successfully!");
      navigate("/student");
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz!");
    }
  };

  return (
    <div className="quiz-taking-root">
      <header className="quiz-taking-header">
        <h2>{quiz.name}</h2>
        <p>
          Start: {new Date(quiz.start).toLocaleString()} | Duration:{" "}
          {quiz.duration} mins
        </p>
      </header>

      <form className="quiz-form" onSubmit={handleSubmit}>
        {quiz.questions && quiz.questions.length > 0 ? (
          quiz.questions.map((q) => (
            <div key={q.id} className="question-block">
              <p className="question-text">{q.text}</p>

              {q.type === "mcq" ? (
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
          ))
        ) : (
          <p>No questions available for this quiz.</p>
        )}

        <button type="submit" className="btn">
          Submit Quiz
        </button>
      </form>
    </div>
  );
}
