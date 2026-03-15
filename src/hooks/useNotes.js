import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage("logos_notes", {});

  const saveNote = useCallback(
    (ref, text) => {
      setNotes((prev) => ({
        ...prev,
        [ref]: { text, updatedAt: Date.now() },
      }));
    },
    [setNotes],
  );

  const deleteNote = useCallback(
    (ref) => {
      setNotes((prev) => {
        const next = { ...prev };
        delete next[ref];
        return next;
      });
    },
    [setNotes],
  );

  return { notes, saveNote, deleteNote };
}
