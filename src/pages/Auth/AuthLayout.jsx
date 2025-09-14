import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../../styles/auth.css";

export default function AuthLayout() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-root">
      <div className="auth-card">
        <main className="auth-main">
          <div className="auth-header">
            <h2 id="auth-title">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <div className="auth-toggle">
              {mode === "login" ? (
                <span>
                  New here?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="link"
                  >
                    Register
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="link"
                  >
                    Login
                  </button>
                </span>
              )}
            </div>
          </div>

          <section className="auth-form-area">
            {mode === "login" ? (
              <Login switchToRegister={() => setMode("register")} />
            ) : (
              <Register switchToLogin={() => setMode("login")} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
