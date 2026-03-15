import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useBookmarks } from "../hooks/useBookmarks";
import { useNotes } from "../hooks/useNotes";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe("useLocalStorage", () => {
  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("persists values to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    act(() => result.current[1]("new-value"));
    expect(result.current[0]).toBe("new-value");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("test-key", '"new-value"');
  });

  it("supports function updater", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });

  it("handles removeValue", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    act(() => result.current[1]("something"));
    act(() => result.current[2]()); // removeValue
    expect(result.current[0]).toBe("default");
  });
});

describe("useBookmarks", () => {
  it("starts with empty bookmarks", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it("toggles a bookmark on", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => result.current.toggleBookmark("John 3:16"));
    expect(result.current.bookmarks).toContain("John 3:16");
    expect(result.current.isBookmarked("John 3:16")).toBe(true);
  });

  it("toggles a bookmark off", () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => result.current.toggleBookmark("John 3:16"));
    act(() => result.current.toggleBookmark("John 3:16"));
    expect(result.current.bookmarks).not.toContain("John 3:16");
  });
});

describe("useNotes", () => {
  it("starts with empty notes", () => {
    const { result } = renderHook(() => useNotes());
    expect(result.current.notes).toEqual({});
  });

  it("saves a note", () => {
    const { result } = renderHook(() => useNotes());
    act(() => result.current.saveNote("Romans 8:28", "God works all things together"));
    expect(result.current.notes["Romans 8:28"].text).toBe("God works all things together");
    expect(result.current.notes["Romans 8:28"].updatedAt).toBeDefined();
  });

  it("deletes a note", () => {
    const { result } = renderHook(() => useNotes());
    act(() => result.current.saveNote("Romans 8:28", "test"));
    act(() => result.current.deleteNote("Romans 8:28"));
    expect(result.current.notes["Romans 8:28"]).toBeUndefined();
  });
});
