import { useState, useCallback } from "react";
import { Icon } from "../components";
import {
  READING_PLANS,
  ALL_BOOKS,
  getReadingPlanProgress,
  saveReadingPlanProgress,
} from "../constants";
import { prefetchChapters } from "../api";
import { useApp } from "../context/AppContext";

function PlanCard({ plan, onSelect, progress }) {
  const completed = progress ? progress.completedDays.size : 0;
  const pct = Math.round((completed / plan.duration) * 100);

  return (
    <button className="plan-card" onClick={() => onSelect(plan)}>
      <div className="plan-card-top">
        <span className="plan-category">{plan.category}</span>
        <span className="plan-duration">{plan.duration} days</span>
      </div>
      <h3 className="plan-title">{plan.title}</h3>
      <p className="plan-desc">{plan.description}</p>
      {progress && (
        <div className="plan-progress">
          <div className="plan-progress-bar">
            <div className="plan-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="plan-progress-label">
            {completed}/{plan.duration} days ({pct}%)
          </span>
        </div>
      )}
    </button>
  );
}

function PlanDetail({ plan, onBack }) {
  const { translation, navigate } = useApp();
  const [progress, setProgress] = useState(
    () => getReadingPlanProgress(plan.id) || { planId: plan.id, startDate: Date.now(), completedDays: new Set() },
  );
  const [caching, setCaching] = useState(false);

  const toggleDay = useCallback(
    (dayNum) => {
      setProgress((prev) => {
        const next = { ...prev, completedDays: new Set(prev.completedDays) };
        if (next.completedDays.has(dayNum)) {
          next.completedDays.delete(dayNum);
        } else {
          next.completedDays.add(dayNum);
        }
        saveReadingPlanProgress(plan.id, next);
        return next;
      });
    },
    [plan.id],
  );

  const handlePrefetch = useCallback(async () => {
    setCaching(true);
    const allPassages = plan.readings.flatMap((r) => r.passages);
    await prefetchChapters(allPassages, translation.id);
    setCaching(false);
  }, [plan, translation]);

  const handleReadDay = useCallback(
    (reading) => {
      const first = reading.passages[0];
      if (!first) return;
      const bookData = ALL_BOOKS.find((b) => b.name === first.book);
      if (bookData) navigate(bookData, first.chapter);
    },
    [navigate],
  );

  const completed = progress.completedDays.size;
  const pct = Math.round((completed / plan.duration) * 100);

  return (
    <div className="plan-detail">
      <button onClick={onBack} className="back-link">
        <Icon name="chevronLeft" size={16} /> All plans
      </button>
      <h2 className="topic-title">{plan.title}</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5, margin: "0 0 16px" }}>
        {plan.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div className="plan-progress" style={{ flex: 1, minWidth: 200 }}>
          <div className="plan-progress-bar">
            <div className="plan-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="plan-progress-label">
            {completed}/{plan.duration} days ({pct}%)
          </span>
        </div>
        <button className="btn-secondary" onClick={handlePrefetch} disabled={caching} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="play" size={13} />
          {caching ? "Loading..." : "Preload chapters"}
        </button>
      </div>

      <div className="plan-readings">
        {plan.readings.map((reading) => {
          const isDone = progress.completedDays.has(reading.day);
          return (
            <div key={reading.day} className={`plan-reading-row ${isDone ? "completed" : ""}`}>
              <button
                className={`plan-check ${isDone ? "checked" : ""}`}
                onClick={() => toggleDay(reading.day)}
                aria-label={isDone ? "Mark incomplete" : "Mark complete"}
              >
                {isDone && <Icon name="check" size={14} />}
              </button>
              <div className="plan-reading-info">
                <span className="plan-day-num">Day {reading.day}</span>
                <span className="plan-day-label">{reading.label}</span>
              </div>
              <button className="read-context-btn" onClick={() => handleReadDay(reading)}>
                Read <Icon name="chevronRight" size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ReadingPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (selectedPlan) {
    return <PlanDetail plan={selectedPlan} onBack={() => setSelectedPlan(null)} />;
  }

  return (
    <div className="plans-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Reading plans</h2>
      <p style={{ margin: "0 0 24px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Structured daily reading to guide you through the Bible. Track your progress, read at your
        pace, and cache chapters for offline access.
      </p>
      <div className="plans-grid">
        {READING_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={setSelectedPlan}
            progress={getReadingPlanProgress(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
