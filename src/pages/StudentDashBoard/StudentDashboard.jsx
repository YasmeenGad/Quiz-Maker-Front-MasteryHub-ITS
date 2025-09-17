import React, { useEffect, useState } from "react";
import { getUser, getStudentQuizzes, logoutUser } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/student_dashboard.css";
import { FiLogOut, FiClipboard } from "react-icons/fi";

const isQuizAvailable = (start, duration) => {
  const startTime = new Date(start);
  const endTime = new Date(startTime.getTime() + duration * 60000);
  const now = new Date();
  return now >= startTime && now <= endTime;
};

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndQuizzes = async () => {
      try {
        const userData = await getUser();
        setUser(userData.data);

        const quizzesData = await getStudentQuizzes();
        setQuizzes(quizzesData);

        const filtered = quizzesData.filter(
          (q) => q.year === userData.data.year
        );
        setFilteredQuizzes(filtered);
      } catch (err) {
        console.error("Error fetching user or quizzes:", err);
      }
    };

    fetchUserAndQuizzes();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h2>
          <FiClipboard style={{ marginRight: "10px" }} />
          Student Dashboard
        </h2>
        <div className="logout-container">
          <button className="btn logout-btn" onClick={handleLogout}>
            <FiLogOut style={{ marginRight: "6px" }} /> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="student-quizzes">
          <h3>
            <FiClipboard style={{ marginRight: "8px" }} />
            Available Quizzes
          </h3>
          {filteredQuizzes.length > 0 ? (
            <div className="quiz-list">
              {filteredQuizzes.map((quiz) => {
                const available = isQuizAvailable(quiz.start, quiz.duration);
                return (
                  <div key={quiz.id} className="quiz-card">
                    <h4>{quiz.name}</h4>
                    <p>
                      Start: {new Date(quiz.start).toLocaleString()} <br />
                      Duration: {quiz.duration} mins
                    </p>
                    {available ? (
                      <Link to={`/student/quiz/${quiz.id}`} className="btn">
                        Take Quiz
                      </Link>
                    ) : (
                      <p className="quiz-locked">Not available now</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No quizzes available for your year.</p>
          )}
        </div>
      </main>
    </div>
  );
}
