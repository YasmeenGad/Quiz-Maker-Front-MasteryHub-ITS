import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login({ switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();   

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("Please fill email and password");
    setLoading(true);
    try {
      console.log("LOGIN submit", form);
      await new Promise((r) => setTimeout(r, 600));

      navigate("/student"); 
    } catch (err) {
      console.error(err);
      alert(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="login-form" className="form" onSubmit={onSubmit}>
      <Input
        id="login-email"
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
      />

      <div className="form-group">
        <label className="label" htmlFor="login-password">
          Password
        </label>
        <div className="pwd-wrap">
          <input
            id="login-password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Your password"
            type={showPwd ? "text" : "password"}
            className="input"
            aria-required
          />
          <button
            id="login-showpwd"
            type="button"
            className="icon-btn"
            onClick={() => setShowPwd((s) => !s)}
            aria-label="Toggle password visibility"
          >
            {showPwd ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div id="login-extras" className="extras">
        <label className="checkbox">
          <input id="login-remember" type="checkbox" /> Remember me
        </label>
      </div>

      <Button id="btn-login" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
