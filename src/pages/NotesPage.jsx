import { Icon } from "../components";
import { useApp } from "../context/AppContext";

export default function NotesPage() {
  const { notes, deleteNote } = useApp();
  const entries = Object.entries(notes).sort(
    (a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0),
  );

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="edit" size={48} />
        <h2 style={{ margin: "16px 0 8px", fontWeight: 500, fontSize: 18 }}>No notes yet</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Click the pencil icon on any verse to add a note.
        </p>
      </div>
    );
  }

  return (
    <div className="notes-panel">
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 500 }}>Your notes</h2>
      {entries.map(([ref, data]) => (
        <div key={ref} className="note-card">
          <div className="note-header">
            <span className="note-ref">{ref}</span>
            <button
              onClick={() => deleteNote(ref)}
              className="icon-btn"
              title="Delete note"
              aria-label="Delete note"
            >
              <Icon name="trash" size={14} />
            </button>
          </div>
          <p className="note-text">{data.text}</p>
          <span className="note-date">{new Date(data.updatedAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}
