import { useState, useEffect } from "react";
import SubjectForm from "./components/SubjectForm";
import SubjectCard from "./components/SubjectCard";
import "./App.css";

const API = "http://localhost:3000/api/subjects";

export default function App() {
  const [subjects, setSubjects] = useState([]);

  const loadSubjects = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setSubjects(data);
    } catch {
      setSubjects([]);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const addSubject = async (formData) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    loadSubjects();
  };

  const deleteSubject = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadSubjects();
  };

  const toggleTopic = async (id, topic, checked) => {
    const subject = subjects.find((s) => s.id === id);
    if (!subject) return;
    const completed = checked
      ? [...new Set([...subject.completed, topic])]
      : subject.completed.filter((t) => t !== topic);
    await fetch(`${API}/${id}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    loadSubjects();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-dot"></span>
          StudyBuddy
        </div>
        <div className="nav-links">
          <a href="#subjects">My Subjects</a>
          <a href="#add-form">Add Subject</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">your personal exam planner</p>
          <h1>Study smart.<br />Stress less.</h1>
          <p className="hero-sub">Add your subjects and exam dates — StudyBuddy keeps you on track.</p>
          <a href="#add-form" className="btn-primary">Add your first subject</a>
        </div>
        <div className="hero-visual">
          <div className="hero-card pink">
            <span className="card-label">Maths</span>
            <span className="card-days">12 days left</span>
            <div className="mini-bar"><div className="mini-fill"></div></div>
          </div>
          <div className="hero-card mint">
            <span className="card-label">Physics</span>
            <span className="card-days">5 days left</span>
            <div className="mini-bar"><div className="mini-fill" style={{width:"30%"}}></div></div>
          </div>
          <div className="hero-card lavender">
            <span className="card-label">English</span>
            <span className="card-days">20 days left</span>
            <div className="mini-bar"><div className="mini-fill" style={{width:"80%"}}></div></div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section id="add-form" className="form-section">
          <h2 className="section-title">Add a subject</h2>
          <SubjectForm onAdd={addSubject} />
        </section>

        <section id="subjects" className="subjects-section">
          <h2 className="section-title">My subjects</h2>
          {subjects.length === 0 ? (
            <div className="empty-state">
              <p>No subjects yet — add one above to get started!</p>
            </div>
          ) : (
            <div className="subject-grid">
              {subjects.map((subject, index) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={index}
                  onDelete={deleteSubject}
                  onToggle={toggleTopic}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Made with StudyBuddy — good luck on your exams!</p>
      </footer>
    </div>
  );
}