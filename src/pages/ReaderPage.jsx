import { useState, useEffect, useRef } from "react";
import { fetchChapter } from "../api";
import { Icon, LoadingSpinner, VerseDisplay } from "../components";
import { useApp } from "../context/AppContext";

function BookInfoPanel({ book }) {
  if (!book) return null;
  return (
    <div className="book-info-card">
      <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>About {book.name}</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Author</span>
          <span className="info-value">{book.author}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Date written</span>
          <span className="info-value">{book.date}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Genre</span>
          <span className="info-value">{book.genre}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Chapters</span>
          <span className="info-value">{book.chapters}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Testament</span>
          <span className="info-value">
            {book.testament === "OT" ? "Old Testament" : "New Testament"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ReaderPage() {
  const { book, chapter, setChapter, translation, addToHistory, returnTo, returnToPrevious } =
    useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if (!book) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchChapter(book.name, chapter, translation.id, { signal: controller.signal })
      .then((d) => {
        setData(d);
        addToHistory(book.id, chapter);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [book, chapter, translation, addToHistory]);

  useEffect(() => {
    if (readerRef.current) readerRef.current.scrollTop = 0;
  }, [book, chapter]);

  if (!book) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.15 }}>
          <Icon name="book" size={64} />
        </div>
        <h2 style={{ margin: "0 0 8px", fontWeight: 500, fontSize: 20 }}>
          Select a book to begin
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 320, lineHeight: 1.6 }}>
          Choose from the Old or New Testament in the sidebar, or explore topics that speak to your
          day.
        </p>
      </div>
    );
  }

  const canPrev = chapter > 1;
  const canNext = chapter < book.chapters;

  return (
    <>
      {returnTo && (
        <button className="return-banner" onClick={returnToPrevious}>
          <Icon name="chevronLeft" size={14} />
          Back to topic: {returnTo.label}
        </button>
      )}
      <div className="reader-panel" ref={readerRef}>
        <div className="reader-header">
          <div>
            <h1 className="reader-title">
              {book.name} {chapter}
            </h1>
            <span className="reader-meta">
              {translation.abbr} — {book.genre}
            </span>
          </div>
          <div className="chapter-nav">
            <button
              onClick={() => setChapter(Math.max(1, chapter - 1))}
              disabled={!canPrev}
              className="nav-btn"
              aria-label="Previous chapter"
            >
              <Icon name="chevronLeft" size={18} />
            </button>
            <select
              value={chapter}
              onChange={(e) => setChapter(Number(e.target.value))}
              className="chapter-select"
              aria-label="Select chapter"
            >
              {Array.from({ length: book.chapters }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Ch. {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => setChapter(Math.min(book.chapters, chapter + 1))}
              disabled={!canNext}
              className="nav-btn"
              aria-label="Next chapter"
            >
              <Icon name="chevronRight" size={18} />
            </button>
          </div>
        </div>
        <div className="reader-body">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="error-msg">
              Could not load chapter. Check your connection and try again.
            </div>
          )}
          {data &&
            data.verses &&
            data.verses.map((v, i) => <VerseDisplay key={i} verse={v} />)}
        </div>
      </div>
      <BookInfoPanel book={book} />
    </>
  );
}
