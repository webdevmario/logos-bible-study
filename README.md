# Logos Bible Study

A clean, readable web-based Bible study application built with React + Vite. Designed for personal deep study with tools for annotation, Greek word analysis, cross-references, AI-assisted study, reading plans, topical search, and translation comparison.

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Production build to `dist/` (includes PWA service worker) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on `src/` |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format all source files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once (CI mode) |

## Project structure

```
src/
├── main.jsx                     Entry point (React + Router + Context)
├── App.jsx                      App shell, top nav, view routing
├── api/
│   └── bibleApi.js              Fetch layer with memory cache, abort support, prefetch
├── components/
│   ├── Icon.jsx                 SVG icon system (25+ icons)
│   ├── LoadingSpinner.jsx
│   ├── NoteModal.jsx            Modal for adding/editing verse notes
│   ├── Sidebar.jsx              Book navigation (OT/NT)
│   └── VerseDisplay.jsx         Verse rendering with bookmark, notes, cross-refs
├── constants/
│   ├── books.js                 66 books with author, date, genre metadata
│   ├── crossReferences.js       50+ curated cross-reference mappings + lookup utility
│   ├── greekStudies.js          8 word families with Strong's numbers
│   ├── readingPlans.js          7 structured plans with progress persistence
│   ├── resources.js             Study tools + YouTube channels
│   ├── topics.js                Topical verse collections by emotion/situation
│   └── translations.js          Available Bible translations
├── context/
│   └── AppContext.jsx           Centralized app state (navigation, notes, bookmarks)
├── hooks/
│   ├── useBookmarks.js
│   ├── useCustomResources.js    User-added study links
│   ├── useLocalStorage.js       Generic localStorage-backed state
│   ├── useNotes.js
│   └── useReadingHistory.js
├── pages/
│   ├── AIStudyPage.jsx          Anthropic API integration for passage study
│   ├── BookmarksPage.jsx
│   ├── GreekStudyPage.jsx       Original language word studies
│   ├── NotesPage.jsx
│   ├── ReadingPlansPage.jsx     7 plans with daily tracking + offline prefetch
│   ├── ReaderPage.jsx           Chapter reader with verse actions
│   ├── ResourcesPage.jsx       Study tools, YouTube, custom resources
│   ├── SearchPage.jsx           Full-text Bible search
│   ├── TopicsPage.jsx           "What does the Bible say about..." with navigate-to-verse
│   └── TranslationsPage.jsx
├── styles/
│   └── global.css               Design system with light/dark mode
└── __tests__/
    ├── hooks.test.js            10 tests (localStorage, bookmarks, notes)
    └── crossReferences.test.js  5 tests (lookup, ranges, edge cases)
```

## Features

### Core reading
- Chapter-by-chapter Bible reader with clean serif typography (Cormorant Garamond)
- Chapter navigation with prev/next and dropdown select
- Book metadata panel (author, date, genre, testament)
- Automatic dark mode based on system preference

### Study tools
- **Cross-references** — clickable cross-reference links on 50+ key verses, expanding inline
- **AI-assisted study** — 6 preset study prompts (explain, historical context, original language, connections, application, difficult questions) plus freeform questions via Anthropic API
- **Greek word studies** — 8 word families (love, faith, sin, grace, peace, spirit, truth, salvation) with Strong's numbers, transliterations, and usage notes
- **Topical search** — curated verses organized by emotions and life situations with "read in context" navigation and return-to-topic flow
- **Full-text search** with keyword highlighting
- **Translation comparison** — WEB, KJV, BBE, OEB with translation philosophy notes

### Reading plans
- 7 plans: Gospel of John (21 days), Psalms (30), Proverbs (31), Romans (16), Genesis (50), Life of Jesus (28), New Testament (90)
- Day-by-day progress tracking persisted in localStorage
- "Cache for offline" button prefetches all chapters for a plan
- Click any day to navigate directly to the reader

### Personal tools
- Verse bookmarking with dedicated bookmarks view
- Note-taking on any verse with edit/delete
- Reading history (last 50 chapters)
- Custom resource links (add your own study sites, YouTube channels, etc.)

### Offline & performance
- **PWA** — installable, works offline after first visit
- **Service worker** — Bible API responses cached for 30 days via workbox CacheFirst strategy
- **In-memory cache** — avoids redundant API calls within a session
- **AbortController** — cancels in-flight requests on navigation to prevent stale state

## Architecture decisions

**Context over prop drilling** — `AppContext` holds navigation state, notes, bookmarks, and history. All pages consume via `useApp()` hook. This keeps the component tree clean and makes it easy to add new pages without threading props through the shell.

**Constants as data layer** — cross-references, reading plans, and Greek studies are stored as plain JS objects in `src/constants/`. This keeps the app self-contained with zero backend. For production scale, these would migrate to a JSON API or database, but the code structure (barrel exports, lookup functions) stays the same.

**Hooks as persistence layer** — every hook that touches localStorage builds on `useLocalStorage`, which handles JSON serialization, error recovery, and provides a consistent API. Swapping to IndexedDB or a cloud backend means reimplementing one file.

**Memory cache + service worker** — two layers of caching. The in-memory `Map` in `bibleApi.js` prevents duplicate network requests within a session. The workbox service worker in `vite.config.js` provides persistent offline caching. Bible API responses are cached CacheFirst with 30-day expiry, so previously read chapters load instantly even offline.

## Tooling

| Tool | Purpose |
|------|---------|
| Vite 8 | Dev server, build, HMR |
| vite-plugin-pwa | Service worker generation, manifest |
| ESLint (flat config) | Linting with recommended rules |
| Prettier | Code formatting |
| Vitest + Testing Library | Unit tests in jsdom |
| GitHub Actions | CI pipeline (lint → test → build) |

## API

The app uses [bible-api.com](https://bible-api.com) — free, no API key required, public domain translations. Rate limits are reasonable for personal use.

The AI Study feature uses the Anthropic API. It works out of the box in Claude.ai artifacts. For standalone use, you'd need to proxy requests through a backend to add your API key (never expose keys client-side).

### Upgrade paths for Bible data
- Self-host [bible-api source](https://github.com/seven1m/bible_api)
- [HelloAO Free Use Bible API](https://bible.helloao.org/) — 1000+ translations, no limits
- [API.Bible](https://scripture.api.bible/) — 2500+ translations, free key
- [ESV API](https://api.esv.org/) — ESV text, non-commercial

## Roadmap

- [ ] URL-based routing with react-router (deep-linkable views)
- [ ] Hebrew word studies (Old Testament original language)
- [ ] Commentary integration (Matthew Henry — public domain)
- [ ] Verse-by-verse translation comparison side-by-side
- [ ] Expand cross-reference database (Treasury of Scripture Knowledge has 300k+ entries)
- [ ] Timeline view — chronological placement of books and events
- [ ] Multi-user support with cloud sync
- [ ] Interlinear text display (Greek/Hebrew inline with English)
- [ ] Audio Bible integration
- [ ] Export notes to Markdown / PDF

## License

MIT — application code is open source. Bible text copyright varies by translation (all translations via the API are public domain).
