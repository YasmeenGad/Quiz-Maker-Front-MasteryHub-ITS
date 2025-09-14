import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthLayout() {
  const [mode, setMode] = useState("login");

  return (
    <div id="auth-root" className="auth-root">
      <div id="auth-card" className="auth-card">
        <aside id="auth-left" className="auth-left" aria-hidden>
          <div id="brand" className="brand">
            <h1 id="brand-title">QuizMaker</h1>
            <p id="brand-sub">
              Create & take quizzes — student & teacher ready.
            </p>
            <ul id="brand-features" className="brand-features">
              <li>Role-aware registration (Student / Teacher)</li>
              <li>Year selection per role</li>
              <li>Responsive and accessible forms</li>
            </ul>
          </div>
        </aside>

        <main id="auth-right" className="auth-right">
          <div id="auth-header" className="auth-header">
            <h2 id="auth-title">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <div id="auth-toggle" className="auth-toggle">
              {mode === "login" ? (
                <span id="toggle-register">
                  New here?{" "}
                  <button
                    id="btn-switch-register"
                    onClick={() => setMode("register")}
                    className="link"
                  >
                    Register
                  </button>
                </span>
              ) : (
                <span id="toggle-login">
                  Already have an account?{" "}
                  <button
                    id="btn-switch-login"
                    onClick={() => setMode("login")}
                    className="link"
                  >
                    Login
                  </button>
                </span>
              )}
            </div>
          </div>

          <section id="auth-form-area" className="auth-form-area">
            {mode === "login" ? (
              <Login switchToRegister={() => setMode("register")} />
            ) : (
              <Register switchToLogin={() => setMode("login")} />
            )}
          </section>

          <footer id="auth-footer" className="auth-footer">
            By continuing you agree to our <a className="link">Terms</a> &{" "}
            <a className="link">Privacy</a>.
          </footer>
        </main>
      </div>
    </div>
  );
}
