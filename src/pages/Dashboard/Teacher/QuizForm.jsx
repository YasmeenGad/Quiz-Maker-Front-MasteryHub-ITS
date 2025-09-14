import React, { useState } from "react";

export default function QuizForm() {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    start: "",
    type: "MCQ",
  });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("NEW QUIZ", form);
    alert("Quiz created (demo)!");
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

      <select name="type" value={form.type} onChange={onChange}>
        <option value="MCQ">Multiple Choice</option>
        <option value="TEXT">Text</option>
      </select>

      <button className="btn">Create Quiz</button>
    </form>
  );
}
