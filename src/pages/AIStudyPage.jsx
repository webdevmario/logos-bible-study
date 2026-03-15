import { useState, useCallback } from "react";
import { Icon, LoadingSpinner } from "../components";
import { useApp } from "../context/AppContext";

const STUDY_PROMPTS = [
  { label: "Explain this passage", prompt: (ref) => `Explain the meaning and context of ${ref} in a way that's accessible but scholarly. Include historical context, who wrote it, who the audience was, and what the key takeaways are for readers today.` },
  { label: "Historical context", prompt: (ref) => `What is the historical and cultural context of ${ref}? When was it written, what was happening politically and socially, and how does that context affect how we should understand this passage?` },
  { label: "Original language insights", prompt: (ref) => `What are the key Greek or Hebrew words in ${ref} and how do their original meanings add depth to this passage? Include transliterations and Strong's numbers where possible.` },
  { label: "How does this connect?", prompt: (ref) => `What are the major cross-references and thematic connections for ${ref}? How does this passage connect to the broader narrative of the Bible? Include Old Testament connections if it's a New Testament passage and vice versa.` },
  { label: "Practical application", prompt: (ref) => `How can the teaching in ${ref} be applied practically in daily life today? What did it mean for the original audience and what does it mean for modern readers?` },
  { label: "Difficult questions", prompt: (ref) => `What are the common questions, difficulties, or apparent contradictions people encounter with ${ref}? Address these honestly with scholarly perspectives.` },
];

export default function AIStudyPage() {
  const { book, chapter, translation } = useApp();
  const [customQuery, setCustomQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);

  const currentRef = book ? `${book.name} ${chapter}` : null;

  const askAI = useCallback(
    async (promptText) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: `You are a knowledgeable Bible study assistant. You provide accurate, scholarly, and accessible explanations of Bible passages. You draw on historical context, original language analysis (Greek/Hebrew), textual criticism, and theological perspectives. You are respectful of the text while being honest about scholarly debates. Always cite specific verses and cross-references. The user is currently reading the ${translation.name} (${translation.abbr}).`,
            messages: [{ role: "user", content: promptText }],
          }),
        });

        if (!res.ok) {
          throw new Error(`AI request failed: ${res.status}`);
        }

        const data = await res.json();
        const text = data.content?.map((c) => c.text || "").join("\n") || "No response received.";
        setResponse(text);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [translation],
  );

  const handleStudyPrompt = useCallback(
    (sp) => {
      if (!currentRef) return;
      setActivePrompt(sp.label);
      askAI(sp.prompt(currentRef));
    },
    [currentRef, askAI],
  );

  const handleCustomQuery = useCallback(() => {
    if (!customQuery.trim()) return;
    const ref = currentRef || "the Bible";
    setActivePrompt("Custom question");
    askAI(`Regarding ${ref}: ${customQuery}`);
  }, [customQuery, currentRef, askAI]);

  return (
    <div className="ai-study-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Icon name="sparkle" size={20} />
          AI-assisted study
        </span>
      </h2>
      <p style={{ margin: "0 0 20px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Ask questions about any passage and get scholarly context, historical background, and
        original language insights.
      </p>

      {currentRef ? (
        <div className="ai-context-badge">
          Currently reading: <strong>{currentRef}</strong> ({translation.abbr})
        </div>
      ) : (
        <div className="ai-context-badge" style={{ borderColor: "var(--text-tertiary)" }}>
          Select a book and chapter in the reader to get passage-specific study help, or ask a
          general question below.
        </div>
      )}

      <div className="ai-prompt-grid">
        {STUDY_PROMPTS.map((sp) => (
          <button
            key={sp.label}
            className={`topic-chip ${activePrompt === sp.label ? "active" : ""}`}
            onClick={() => handleStudyPrompt(sp)}
            disabled={!currentRef || loading}
          >
            {sp.label}
          </button>
        ))}
      </div>

      <div className="search-bar" style={{ marginTop: 16 }}>
        <Icon name="search" size={18} />
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCustomQuery()}
          placeholder="Ask your own question..."
          className="search-input"
        />
        <button
          onClick={handleCustomQuery}
          disabled={!customQuery.trim() || loading}
          className="search-btn"
        >
          Ask
        </button>
      </div>

      {loading && <LoadingSpinner message="Studying the passage..." />}
      {error && (
        <div className="error-msg" style={{ marginTop: 16 }}>
          {error.includes("401") || error.includes("403")
            ? "AI study requires an API connection. This feature works when the app is connected to the Anthropic API."
            : `Something went wrong: ${error}`}
        </div>
      )}
      {response && (
        <div className="ai-response">
          {response.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="ai-paragraph">
                {paragraph}
              </p>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
