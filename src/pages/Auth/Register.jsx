import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from "../../services/api";

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    year: 1,
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.password) return alert("Please fill all fields");

  setLoading(true);
  try {
    const res = await registerUser(form);
    if (!res.success) return alert(res.message);

    alert(res.message); // "User created successfully"
    switchToLogin();
  } catch (err) {
    alert(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="form" onSubmit={onSubmit}>
      <Input label="Name" name="name" value={form.name} onChange={onChange} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={onChange} />

      <div className="form-group">
        <label className="label">Role</label>
        <select name="role" value={form.role} onChange={onChange} className="select">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {form.role === "student" && (
        <div className="form-group">
          <label className="label">Year</label>
          <input type="number" min="1" max="4" name="year" value={form.year} onChange={onChange} className="input" />
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
}
