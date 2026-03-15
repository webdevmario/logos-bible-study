import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage("logos_bookmarks", []);

  const toggleBookmark = useCallback(
    (ref) => {
      setBookmarks((prev) =>
        prev.includes(ref) ? prev.filter((b) => b !== ref) : [...prev, ref],
      );
    },
    [setBookmarks],
  );

  const isBookmarked = useCallback((ref) => bookmarks.includes(ref), [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
}
