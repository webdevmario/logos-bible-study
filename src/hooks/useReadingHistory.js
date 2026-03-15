import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const MAX_HISTORY = 50;

export function useReadingHistory() {
  const [history, setHistory] = useLocalStorage("logos_history", []);

  const addToHistory = useCallback(
    (bookId, chapter) => {
      setHistory((prev) => {
        const entry = { book: bookId, chapter, timestamp: Date.now() };
        const filtered = prev.filter((h) => !(h.book === bookId && h.chapter === chapter));
        return [entry, ...filtered].slice(0, MAX_HISTORY);
      });
    },
    [setHistory],
  );

  return { history, addToHistory };
}
