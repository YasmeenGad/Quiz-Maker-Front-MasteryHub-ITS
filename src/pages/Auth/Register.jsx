import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    year: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password)
      return alert("Please fill all required fields");
    if (form.role === "STUDENT" && !form.year)
      return alert("Please select your year");

    setLoading(true);
    try {
      console.log("REGISTER submit", form);
      await new Promise((r) => setTimeout(r, 700));
      alert("Demo: register submitted");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <Input
        id="reg-username"
        label="User Name"
        name="username"
        value={form.username}
        onChange={onChange}
      />

      <Input
        id="reg-email"
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
      />

      <Input
        id="reg-password"
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
      />

      <div className="form-group">
        <label className="label">Role</label>
        <div className="role-row">
          <label
            className={`role-btn ${form.role === "STUDENT" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="role"
              value="STUDENT"
              checked={form.role === "STUDENT"}
              onChange={onChange}
              className="visually-hidden"
            />
            <div className="role-title">Student</div>
          </label>

          <label
            className={`role-btn ${form.role === "TEACHER" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="role"
              value="TEACHER"
              checked={form.role === "TEACHER"}
              onChange={onChange}
              className="visually-hidden"
            />
            <div className="role-title">Teacher</div>
          </label>
        </div>
      </div>

      {(form.role === "STUDENT" || form.role === "TEACHER") && (
        <div className="form-group">
          <label className="label">Year</label>
          <select
            name="year"
            value={form.year}
            onChange={onChange}
            className="select"
          >
            <option value="">Select year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
}
