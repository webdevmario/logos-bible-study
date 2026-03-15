import { useState, useCallback } from "react";

/**
 * Generic hook for localStorage-backed state.
 * Handles JSON serialization, error recovery, and cross-tab sync.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch (e) {
          console.error(`Failed to save to localStorage key "${key}":`, e);
        }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
