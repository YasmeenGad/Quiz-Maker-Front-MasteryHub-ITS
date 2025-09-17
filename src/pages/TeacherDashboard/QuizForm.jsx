import React, { useState } from "react";
import { createQuiz } from "../../services/api";

export default function QuizForm({ onQuizCreated }) {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    start: "",
    year: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    type: "mcq",
    options: [],
  });

  const handleAddOption = () => {
    if (currentQuestion.options.length < 4) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, ""],
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...currentQuestion.options];
    updated[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updated });
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text) {
      alert("Question text is required!");
      return;
    }

    const formattedQuestion = {
      ...currentQuestion,
      options: currentQuestion.options.map((opt) =>
        typeof opt === "string" ? opt : opt.text
      ),
    };

    setForm({
      ...form,
      questions: [...form.questions, formattedQuestion],
    });
    setCurrentQuestion({ text: "", type: "mcq", options: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      duration: Number(form.duration),
      start: new Date(form.start).toISOString(),
      year: Number(form.year),
      questions: form.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer || null,
      })),
    };

    try {
      const createdQuiz = await createQuiz(payload);
      alert("Quiz created successfully");
      setForm({ name: "", duration: "", start: "", year: "", questions: [] });
      onQuizCreated(createdQuiz);
    } catch (err) {
      alert("Error creating quiz");
    }
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <h3>Create Quiz</h3>

      <input
        type="text"
        placeholder="Quiz Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Duration (mins)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
        required
      />

      <input
        type="datetime-local"
        value={form.start}
        onChange={(e) => setForm({ ...form, start: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        required
      />

      <div className="question-section">
        <h4>Add Question</h4>
        <input
          type="text"
          placeholder="Question text"
          value={currentQuestion.text}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, text: e.target.value })
          }
        />

        <select
          value={currentQuestion.type}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, type: e.target.value })
          }
        >
          <option value="mcq">MCQ</option>
          <option value="text">Text</option>
        </select>

        {currentQuestion.type === "mcq" && (
          <div className="options">
            {currentQuestion.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
            ))}
            {currentQuestion.options.length < 4 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="btn small"
              >
                Add Option
              </button>
            )}
          </div>
        )}

        <button type="button" onClick={handleAddQuestion} className="btn small">
          Add Question
        </button>
      </div>

      <button type="submit" className="btn">
        Create Quiz
      </button>
    </form>
  );
}
