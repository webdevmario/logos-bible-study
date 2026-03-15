import { useState, useCallback } from "react";
import { searchBible } from "../api";
import { Icon, LoadingSpinner, VerseDisplay } from "../components";
import { ALL_BOOKS } from "../constants";
import { useApp } from "../context/AppContext";

export default function SearchPage() {
  const { translation, navigate } = useApp();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchBible(query.trim(), translation.id);
      setResults(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [query, translation]);

  return (
    <div className="search-panel">
      <div className="search-bar">
        <Icon name="search" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={`Search the Bible (${translation.abbr})...`}
          className="search-input"
          autoFocus
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className="search-btn"
        >
          Search
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <div className="error-msg">Search failed. Please try again.</div>}
      {results && (
        <div className="search-results">
          <p className="results-count">
            {results.verses?.length || 0} results for &ldquo;{query}&rdquo;
          </p>
          {results.verses?.map((v, i) => (
            <div
              key={i}
              className="search-result-item"
              onClick={() => {
                const bookData = ALL_BOOKS.find((b) => b.name === v.book_name);
                if (bookData) navigate(bookData, v.chapter);
              }}
            >
              <span className="result-ref">
                {v.book_name} {v.chapter}:{v.verse}
              </span>
              <VerseDisplay verse={v} highlightTerm={query} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
