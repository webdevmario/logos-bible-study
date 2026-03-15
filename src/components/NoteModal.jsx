import { useState } from "react";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";

export default function NoteModal() {
  const { noteModal, saveNote, closeNoteModal } = useApp();
  const [text, setText] = useState(noteModal?.existing || "");

  if (!noteModal) return null;

  const handleSave = () => {
    saveNote(noteModal.ref, text);
    closeNoteModal();
  };

  return (
    <div className="modal-overlay" onClick={closeNoteModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>
            Note — {noteModal.ref}
          </h3>
          <button onClick={closeNoteModal} className="icon-btn">
            <Icon name="x" size={18} />
          </button>
        </div>
        {noteModal.verseText && (
          <p className="modal-verse-preview">
            {noteModal.verseText.slice(0, 200)}
            {noteModal.verseText.length > 200 ? "..." : ""}
          </p>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts, reflections, or study notes here..."
          className="note-textarea"
          autoFocus
          rows={6}
        />
        <div className="modal-actions">
          <button onClick={closeNoteModal} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary" disabled={!text.trim()}>
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}
