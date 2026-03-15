import { createContext, useContext, useState, useCallback } from "react";
import { TRANSLATIONS } from "../constants";
import { useNotes, useBookmarks, useReadingHistory } from "../hooks";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation state
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(1);
  const [translation, setTranslation] = useState(TRANSLATIONS[0]);
  const [activeView, setActiveView] = useState("read");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(null);
  const [returnTo, setReturnTo] = useState(null);

  // Persistent state
  const { notes, saveNote, deleteNote } = useNotes();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { history, addToHistory } = useReadingHistory();

  // Navigation actions
  const navigate = useCallback(
    (bookData, ch) => {
      setBook(bookData);
      setChapter(ch);
      setReturnTo(null);
      setActiveView("read");
    },
    [],
  );

  const navigateWithReturn = useCallback(
    (bookData, ch, returnLabel) => {
      setBook(bookData);
      setChapter(ch);
      setReturnTo({ view: "topics", label: returnLabel });
      setActiveView("read");
    },
    [],
  );

  const returnToPrevious = useCallback(() => {
    if (returnTo) {
      setActiveView(returnTo.view);
      setReturnTo(null);
    }
  }, [returnTo]);

  const openNoteModal = useCallback(
    (ref, verseText) => {
      setNoteModal({ ref, verseText, existing: notes[ref]?.text || "" });
    },
    [notes],
  );

  const closeNoteModal = useCallback(() => setNoteModal(null), []);

  const value = {
    // Navigation
    book,
    setBook,
    chapter,
    setChapter,
    translation,
    setTranslation,
    activeView,
    setActiveView,
    sidebarOpen,
    setSidebarOpen,
    returnTo,
    navigate,
    navigateWithReturn,
    returnToPrevious,

    // Notes & bookmarks
    notes,
    saveNote,
    deleteNote,
    noteModal,
    openNoteModal,
    closeNoteModal,
    bookmarks,
    toggleBookmark,
    isBookmarked,

    // History
    history,
    addToHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
