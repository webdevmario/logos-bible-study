import { useState, useEffect, useCallback } from "react";
import { fetchVerse } from "../api";
import { Icon } from "../components";
import { TOPIC_CATEGORIES, ALL_BOOKS } from "../constants";
import { useApp } from "../context/AppContext";

function parseVerseRef(ref) {
  const match = ref.match(/^(.+?)\s+(\d+):(.+)$/);
  if (!match) return null;
  const bookData = ALL_BOOKS.find((b) => b.name === match[1]);
  if (!bookData) return null;
  return { book: bookData, chapter: parseInt(match[2]) };
}

export default function TopicsPage() {
  const { translation, navigateWithReturn } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [verseData, setVerseData] = useState({});

  const loadVerse = useCallback(
    async (ref) => {
      if (verseData[ref]) return;
      try {
        const data = await fetchVerse(ref, translation.id);
        setVerseData((prev) => ({ ...prev, [ref]: data }));
      } catch {
        // silently fail — verse will show without text
      }
    },
    [translation, verseData],
  );

  useEffect(() => {
    if (selectedTopic) {
      selectedTopic.verses.forEach((ref) => loadVerse(ref));
    }
  }, [selectedTopic, loadVerse]);

  if (selectedTopic) {
    return (
      <div className="topics-detail">
        <button onClick={() => setSelectedTopic(null)} className="back-link">
          <Icon name="chevronLeft" size={16} /> Back to topics
        </button>
        <h2 className="topic-title">{selectedTopic.label}</h2>
        <div className="topic-verses">
          {selectedTopic.verses.map((ref) => {
            const parsed = parseVerseRef(ref);
            return (
              <div key={ref} className="topic-verse-card">
                <div className="topic-verse-header">
                  <h4 className="topic-verse-ref">{ref}</h4>
                  {parsed && (
                    <button
                      className="read-context-btn"
                      onClick={() =>
                        navigateWithReturn(parsed.book, parsed.chapter, selectedTopic.label)
                      }
                      title="Read in full chapter context"
                    >
                      Read in context <Icon name="chevronRight" size={13} />
                    </button>
                  )}
                </div>
                {verseData[ref] ? (
                  <p className="topic-verse-text">{verseData[ref].text}</p>
                ) : (
                  <div style={{ color: "var(--text-tertiary)", fontSize: 13 }}>Loading...</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="topics-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500, color: "var(--text-primary)" }}>
        What does the Bible say?
      </h2>
      <p style={{ margin: "0 0 24px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Find relevant scripture for whatever you&apos;re experiencing today.
      </p>
      {TOPIC_CATEGORIES.map((cat) => (
        <div key={cat.name} className="topic-category">
          <h3 className="topic-cat-name">{cat.name}</h3>
          <div className="topic-grid">
            {cat.topics.map((topic) => (
              <button
                key={topic.label}
                className="topic-chip"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
