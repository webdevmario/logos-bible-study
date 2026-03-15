import { Icon, Sidebar, NoteModal } from "./components";
import { useApp } from "./context/AppContext";
import {
  ReaderPage,
  SearchPage,
  TopicsPage,
  GreekStudyPage,
  TranslationsPage,
  NotesPage,
  BookmarksPage,
  ResourcesPage,
  ReadingPlansPage,
  AIStudyPage,
} from "./pages";

const NAV_ITEMS = [
  { id: "read", icon: "book", label: "Read" },
  { id: "search", icon: "search", label: "Search" },
  { id: "topics", icon: "compass", label: "Topics" },
  { id: "plans", icon: "calendar", label: "Plans" },
  { id: "ai-study", icon: "sparkle", label: "AI Study" },
  { id: "greek", icon: "globe", label: "Greek" },
  { id: "translations", icon: "layers", label: "Versions" },
  { id: "notes", icon: "edit", label: "Notes" },
  { id: "bookmarks", icon: "bookmark", label: "Saved" },
  { id: "resources", icon: "link", label: "Resources" },
];

const VIEWS = {
  read: ReaderPage,
  search: SearchPage,
  topics: TopicsPage,
  plans: ReadingPlansPage,
  "ai-study": AIStudyPage,
  greek: GreekStudyPage,
  translations: TranslationsPage,
  notes: NotesPage,
  bookmarks: BookmarksPage,
  resources: ResourcesPage,
};

export default function App() {
  const { activeView, setActiveView, setSidebarOpen, noteModal } = useApp();
  const ActivePage = VIEWS[activeView] || ReaderPage;

  return (
    <div className="app-root">
      <header className="top-bar">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" size={20} />
        </button>
        <span className="app-title">
          <span className="app-title-accent">Logos</span> Bible Study
        </span>
        <nav className="top-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
              onClick={() => setActiveView(item.id)}
              aria-label={item.label}
            >
              <Icon name={item.icon} size={16} />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="main-layout">
        <Sidebar />
        <main className="content-area">
          <ActivePage />
        </main>
      </div>

      {noteModal && <NoteModal />}
    </div>
  );
}
