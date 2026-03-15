import { useState } from "react";
import { GREEK_WORD_STUDIES } from "../constants";

export default function GreekStudyPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const words = Object.keys(GREEK_WORD_STUDIES);

  return (
    <div className="greek-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Greek word studies</h2>
      <p style={{ margin: "0 0 20px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Explore original Greek meanings to deepen your understanding. The New Testament was written
        in Koine Greek — nuances often lost in English translation reveal richer theology.
      </p>
      <div className="greek-word-grid">
        {words.map((w) => (
          <button
            key={w}
            className={`greek-word-btn ${selectedWord === w ? "active" : ""}`}
            onClick={() => setSelectedWord(selectedWord === w ? null : w)}
          >
            {w}
          </button>
        ))}
      </div>
      {selectedWord && (
        <div className="greek-entries">
          {GREEK_WORD_STUDIES[selectedWord].map((entry, i) => (
            <div key={i} className="greek-entry">
              <div className="greek-header">
                <span className="greek-char">{entry.greek}</span>
                <span className="greek-translit">{entry.transliteration}</span>
                {entry.strongs !== "N/A" && (
                  <span className="greek-strongs">{entry.strongs}</span>
                )}
              </div>
              <p className="greek-meaning">{entry.meaning}</p>
              <p className="greek-usage">{entry.usage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
