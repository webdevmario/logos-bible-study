import { TRANSLATIONS } from "../constants";
import { useApp } from "../context/AppContext";

export default function TranslationsPage() {
  const { translation: current, setTranslation } = useApp();

  return (
    <div className="translations-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Bible translations</h2>
      <p style={{ margin: "0 0 8px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        No single translation is &ldquo;best&rdquo; — each serves a different purpose. Formal
        equivalence (word-for-word) preserves original structure; dynamic equivalence
        (thought-for-thought) prioritizes readability.
      </p>
      <p style={{ margin: "0 0 24px", color: "var(--text-tertiary)", fontSize: 13, lineHeight: 1.5 }}>
        Note: Only public domain / openly licensed translations are available through this free API.
        Major translations like NIV, ESV, and NASB require publisher licenses.
      </p>
      <div className="translation-list">
        {TRANSLATIONS.map((t) => (
          <button
            key={t.id}
            className={`translation-card ${current.id === t.id ? "active" : ""}`}
            onClick={() => setTranslation(t)}
          >
            <div className="translation-top">
              <span className="translation-abbr">{t.abbr}</span>
              <span className="translation-philosophy">{t.philosophy}</span>
            </div>
            <div className="translation-name">{t.name}</div>
            <div className="translation-desc">{t.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
