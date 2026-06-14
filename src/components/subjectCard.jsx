const pastelAccents = ['#f4b8d4','#8adcbb','#c4b5f5','#ffcba0','#96d0f8','#f0c890'];

const daysLeft = (examDate) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const exam = new Date(examDate);
  return Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
};

const countdownClass = (days) => {
  if (days <= 5)  return "days-crit";
  if (days <= 14) return "days-warn";
  return "days-ok";
};

const countdownText = (days) => {
  if (days < 0)   return "Exam passed";
  if (days === 0) return "Exam today!";
  return `${days} day${days === 1 ? "" : "s"} left`;
};

export default function SubjectCard({ subject, index, onDelete, onToggle }) {
  const days   = daysLeft(subject.examDate);
  const topics = subject.topics || [];
  const done   = subject.completed || [];
  const pct    = topics.length ? Math.round((done.length / topics.length) * 100) : 0;
  const accent = pastelAccents[index % pastelAccents.length];

  return (
    <div className="subject-card">
      <div className="card-header">
        <div>
          <div className="card-subject-name">{subject.name}</div>
          <span className={`card-countdown ${countdownClass(days)}`}>
            {countdownText(days)}
          </span>
        </div>
        <div className="card-accent" style={{ background: accent }}></div>
      </div>

      {topics.length > 0 && (
        <>
          <div className="progress-wrap">
            <div className="progress-label">
              <span>Progress</span><span>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }}></div>
            </div>
          </div>
          <div className="topics-list">
            {topics.map(t => (
              <label key={t} className={`topic-item ${done.includes(t) ? "done" : ""}`}>
                <input
                  type="checkbox"
                  checked={done.includes(t)}
                  onChange={e => onToggle(subject.id, t, e.target.checked)}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </>
      )}

      <div className="card-footer">
        <button className="btn-delete" onClick={() => onDelete(subject.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}