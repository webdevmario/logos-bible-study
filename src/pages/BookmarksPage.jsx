import { Icon } from "../components";
import { ALL_BOOKS } from "../constants";
import { useApp } from "../context/AppContext";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, navigate } = useApp();

  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="bookmark" size={48} />
        <h2 style={{ margin: "16px 0 8px", fontWeight: 500, fontSize: 18 }}>No bookmarks yet</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Bookmark verses you want to revisit.
        </p>
      </div>
    );
  }

  return (
    <div className="bookmarks-list">
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 500 }}>Bookmarks</h2>
      {bookmarks.map((ref) => (
        <div key={ref} className="bookmark-item">
          <span
            className="bookmark-ref"
            onClick={() => {
              const match = ref.match(/^(.+?)\s+(\d+):(\d+)$/);
              if (match) {
                const bookData = ALL_BOOKS.find((b) => b.name === match[1]);
                if (bookData) navigate(bookData, parseInt(match[2]));
              }
            }}
          >
            {ref}
          </span>
          <button onClick={() => toggleBookmark(ref)} className="icon-btn" title="Remove">
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
