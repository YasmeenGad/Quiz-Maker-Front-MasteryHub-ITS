import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../services/api";

export default function Login({ switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Please fill email and password");

    setLoading(true);
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "STUDENT") navigate("/student");
      else navigate("/teacher");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
      <div className="pwd-wrap">
        <Input
          label="Password"
          name="password"
          type={showPwd ? "text" : "password"}
          value={form.password}
          onChange={onChange}
        />
        <button type="button" onClick={() => setShowPwd((s) => !s)}>
          {showPwd ? "Hide" : "Show"}
        </button>
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
    </form>
  );
}
