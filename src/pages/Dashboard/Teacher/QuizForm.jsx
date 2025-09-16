import React, { useState } from "react";
import { createQuiz } from "../../../services/api";

export default function QuizForm({ onQuizCreated }) {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    start: "",
    questions: [],
  });

  const [currentQ, setCurrentQ] = useState({
    text: "",
    type: "mcq",
    options: "",
    correctAnswer: "",
  });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onQuestionChange = (e) =>
    setCurrentQ((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addQuestion = () => {
    const newQ = {
      ...currentQ,
      options: currentQ.options
        ? currentQ.options.split(",").map((o) => o.trim())
        : [],
    };
    setForm((prev) => ({ ...prev, questions: [...prev.questions, newQ] }));
    setCurrentQ({ text: "", type: "mcq", options: "", correctAnswer: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        start: new Date(form.start).toISOString(),
      };

      const newQuiz = await createQuiz(payload);
      alert("Quiz created successfully!");
      onQuizCreated(newQuiz);
      setForm({ name: "", duration: "", start: "", questions: [] });
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to create quiz");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        name="name"
        placeholder="Quiz Name"
        value={form.name}
        onChange={onChange}
      />
      <input
        name="duration"
        placeholder="Duration (mins)"
        type="number"
        value={form.duration}
        onChange={onChange}
      />
      <input
        name="start"
        placeholder="Start Time"
        type="datetime-local"
        value={form.start}
        onChange={onChange}
      />

      <h4>Add Question</h4>
      <input
        name="text"
        placeholder="Question text"
        value={currentQ.text}
        onChange={onQuestionChange}
      />
      <select name="type" value={currentQ.type} onChange={onQuestionChange}>
        <option value="mcq">Multiple Choice</option>
        <option value="text">Text</option>
      </select>
      {currentQ.type === "mcq" && (
        <>
          <input
            name="options"
            placeholder="Options (comma separated)"
            value={currentQ.options}
            onChange={onQuestionChange}
          />
          <input
            name="correctAnswer"
            placeholder="Correct Answer"
            value={currentQ.correctAnswer}
            onChange={onQuestionChange}
          />
        </>
      )}
      <button type="button" className="btn-add" onClick={addQuestion}>
        Add Question
      </button>

      <button className="btn">Create Quiz</button>
    </form>
  );
}
