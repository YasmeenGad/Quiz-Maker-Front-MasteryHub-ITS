import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../services/api";

export default function Login({ switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
  e.preventDefault();
  if (!form.email || !form.password) return alert("Please fill email and password");

  setLoading(true);
  try {
    const res = await loginUser(form);
    if (!res.success) return alert(res.message);

    const { access_token, user } = res.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("role", user.role);
    if (user.role === "student") navigate("/student");
    else navigate("/teacher");
  } catch (err) {
    alert(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="form" onSubmit={onSubmit}>
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={onChange} />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
