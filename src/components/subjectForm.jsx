import { useState } from "react";

export default function SubjectForm({ onAdd }) {
  const [name, setName]       = useState("");
  const [examDate, setDate]   = useState("");
  const [topics, setTopics]   = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !examDate) return;
    const topicList = topics.split(",").map(t => t.trim()).filter(Boolean);
    onAdd({ name, examDate, topics: topicList });
    setName(""); setDate(""); setTopics("");
  };

  return (
    <form className="subject-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Subject name</label>
          <input
            type="text"
            placeholder="e.g. Mathematics"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Exam date</label>
          <input
            type="date"
            value={examDate}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Topics to cover <span className="hint">(comma separated)</span></label>
        <input
          type="text"
          placeholder="e.g. Algebra, Calculus, Statistics"
          value={topics}
          onChange={e => setTopics(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary">Add subject</button>
    </form>
  );
}