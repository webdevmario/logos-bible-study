const BASE_URL = "https://bible-api.com";

/**
 * In-memory cache to avoid redundant network requests within the same session.
 * The service worker handles offline/persistent caching via workbox.
 */
const memoryCache = new Map();

function cacheKey(url) {
  return url;
}

/**
 * Fetch with in-memory caching and abort support.
 */
async function cachedFetch(url, { signal } = {}) {
  const key = cacheKey(url);
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  memoryCache.set(key, data);
  return data;
}

/**
 * Fetch a single chapter of a book.
 * @param {string} bookName - e.g. "Genesis"
 * @param {number} chapter - chapter number
 * @param {string} translation - translation id, e.g. "web"
 * @param {object} options - { signal: AbortSignal }
 */
export async function fetchChapter(bookName, chapter, translation = "web", options = {}) {
  const ref = `${bookName} ${chapter}`;
  const url = `${BASE_URL}/${encodeURIComponent(ref)}?translation=${translation}`;
  return cachedFetch(url, options);
}

/**
 * Fetch a specific verse or verse range.
 * @param {string} reference - e.g. "John 3:16" or "Romans 8:28-30"
 * @param {string} translation
 * @param {object} options
 */
export async function fetchVerse(reference, translation = "web", options = {}) {
  const url = `${BASE_URL}/${encodeURIComponent(reference)}?translation=${translation}`;
  return cachedFetch(url, options);
}

/**
 * Search the Bible for a query string.
 * @param {string} query
 * @param {string} translation
 * @param {object} options
 */
export async function searchBible(query, translation = "web", options = {}) {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&translation=${translation}`;
  // Don't cache search results (they may differ by query timing)
  const res = await fetch(url, { signal: options.signal });
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Prefetch chapters into memory cache. Useful for reading plans
 * to pre-warm the cache so navigation feels instant.
 * @param {Array<{book: string, chapter: number}>} passages
 * @param {string} translation
 */
export async function prefetchChapters(passages, translation = "web") {
  const results = await Promise.allSettled(
    passages.map(({ book, chapter }) => fetchChapter(book, chapter, translation)),
  );
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  return { total: passages.length, cached: succeeded };
}

/**
 * Clear the in-memory cache. Does not affect the service worker cache.
 */
export function clearMemoryCache() {
  memoryCache.clear();
}
