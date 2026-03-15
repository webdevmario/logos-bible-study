import { useState } from "react";
import Icon from "./Icon";
import { getCrossReferences } from "../constants";
import { useApp } from "../context/AppContext";

export default function VerseDisplay({ verse, highlightTerm }) {
  const { bookmarks, toggleBookmark, notes, openNoteModal } = useApp();
  const [showXRefs, setShowXRefs] = useState(false);

  const ref = verse.book_name
    ? `${verse.book_name} ${verse.chapter}:${verse.verse}`
    : verse.reference;
  const isBookmarked = bookmarks.includes(ref);
  const hasNote = notes[ref];
  const crossRefs = getCrossReferences(ref);

  let textContent = verse.text;
  if (highlightTerm && typeof textContent === "string") {
    const regex = new RegExp(
      `(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = textContent.split(regex);
    textContent = parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="highlight">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  }

  return (
    <div className="verse-row">
      <span className="verse-num">{verse.verse}</span>
      <div className="verse-content">
        <span className="verse-text">{textContent}</span>
        {showXRefs && crossRefs.length > 0 && (
          <div className="cross-refs">
            <span className="cross-refs-label">Cross-references:</span>
            {crossRefs.map((xref) => (
              <button key={xref} className="cross-ref-link" title={`Go to ${xref}`}>
                {xref}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="verse-actions">
        {crossRefs.length > 0 && (
          <button
            onClick={() => setShowXRefs(!showXRefs)}
            className={`icon-btn ${showXRefs ? "active" : ""}`}
            title="Cross-references"
            aria-label="Show cross-references"
          >
            <Icon name="crosshair" size={15} />
          </button>
        )}
        <button
          onClick={() => toggleBookmark(ref)}
          className="icon-btn"
          title={isBookmarked ? "Remove bookmark" : "Bookmark"}
          aria-label="Bookmark verse"
        >
          <Icon name={isBookmarked ? "bookmarkFilled" : "bookmark"} size={15} />
        </button>
        <button
          onClick={() => openNoteModal(ref, verse.text)}
          className="icon-btn"
          title="Add note"
          style={hasNote ? { color: "var(--accent)" } : undefined}
          aria-label="Add note"
        >
          <Icon name="edit" size={15} />
        </button>
      </span>
    </div>
  );
}
