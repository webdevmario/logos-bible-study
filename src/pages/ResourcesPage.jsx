import { useState, useCallback } from "react";
import { Icon } from "../components";
import { STUDY_RESOURCES, YOUTUBE_RESOURCES } from "../constants";
import { useCustomResources } from "../hooks";

export default function ResourcesPage() {
  const { resources: customResources, addResource, removeResource } = useCustomResources();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = useCallback(() => {
    if (!newName.trim() || !newUrl.trim()) return;
    addResource({ name: newName, url: newUrl, desc: newDesc });
    setNewName("");
    setNewUrl("");
    setNewDesc("");
    setShowAddForm(false);
  }, [newName, newUrl, newDesc, addResource]);

  return (
    <div className="resources-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Study resources</h2>
      <p style={{ margin: "0 0 24px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        External tools and references for deeper research — interlinear texts, commentaries,
        original manuscripts, and scholarly tools.
      </p>

      <h3 className="resource-section-title">Study tools</h3>
      <div className="resource-list">
        {STUDY_RESOURCES.map((r) => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card">
            <div className="resource-name">{r.name} <Icon name="link" size={13} /></div>
            <div className="resource-desc">{r.desc}</div>
          </a>
        ))}
      </div>

      <h3 className="resource-section-title" style={{ marginTop: 32 }}>YouTube channels</h3>
      <div className="resource-list">
        {YOUTUBE_RESOURCES.map((r) => (
          <a key={r.name} href={r.channelUrl} target="_blank" rel="noopener noreferrer" className="resource-card youtube-card">
            <div className="resource-name">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {r.name}
            </div>
            <div className="resource-desc">{r.desc}</div>
          </a>
        ))}
      </div>

      <h3 className="resource-section-title" style={{ marginTop: 32 }}>
        <span>Your resources</span>
        <button className="add-resource-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "+ Add resource"}
        </button>
      </h3>

      {showAddForm && (
        <div className="add-resource-form">
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Resource name" className="form-input" />
          <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL (e.g. https://example.com)" className="form-input" />
          <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Short description (optional)" className="form-input" />
          <button onClick={handleAdd} disabled={!newName.trim() || !newUrl.trim()} className="btn-primary" style={{ alignSelf: "flex-start" }}>
            Save resource
          </button>
        </div>
      )}

      {customResources.length > 0 ? (
        <div className="resource-list">
          {customResources.map((r) => (
            <div key={r.id} className="resource-card custom-resource-card">
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }}>
                <div className="resource-name">{r.name} <Icon name="link" size={13} /></div>
                <div className="resource-desc">{r.desc}</div>
              </a>
              <button onClick={() => removeResource(r.id)} className="icon-btn" title="Remove resource" style={{ flexShrink: 0 }}>
                <Icon name="trash" size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !showAddForm && (
          <p style={{ color: "var(--text-tertiary)", fontSize: 13, marginTop: 8 }}>
            No custom resources yet. Add your favorite study sites, podcasts, or YouTube channels.
          </p>
        )
      )}
    </div>
  );
}
