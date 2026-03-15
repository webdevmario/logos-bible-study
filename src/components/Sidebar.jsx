import { useState } from "react";
import Icon from "./Icon";
import { BOOKS } from "../constants";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { book, setBook, setChapter, setActiveView, sidebarOpen, setSidebarOpen } = useApp();
  const [expandedTestament, setExpandedTestament] = useState(null);

  const handleBookSelect = (b) => {
    setBook(b);
    setChapter(1);
    setActiveView("read");
    setSidebarOpen(false);
  };

  const testaments = [
    { label: "Old Testament", key: "old", books: BOOKS.old },
    { label: "New Testament", key: "new", books: BOOKS.new },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Books</h2>
        </div>
        <div className="sidebar-scroll">
          {testaments.map(({ label, key, books: bookList }) => (
            <div key={key}>
              <button
                className="testament-toggle"
                onClick={() =>
                  setExpandedTestament(expandedTestament === key ? null : key)
                }
              >
                <span>{label}</span>
                <Icon
                  name={expandedTestament === key ? "chevronLeft" : "chevronRight"}
                  size={14}
                />
              </button>
              {expandedTestament === key && (
                <div className="book-list">
                  {bookList.map((b) => (
                    <button
                      key={b.id}
                      className={`book-item ${book?.id === b.id ? "active" : ""}`}
                      onClick={() => handleBookSelect(b)}
                    >
                      <span className="book-name">{b.name}</span>
                      <span className="book-chapters-count">{b.chapters}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
