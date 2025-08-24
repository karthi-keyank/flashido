import React, { useEffect, useMemo, useState } from "react";
import { FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../styles/components/set_list_horizontal.css"; 
// 🔥 reuse same CSS as sets, not set_list_horizontal.css
import { fetchPublicSetsPage, fetchPublicSetsNext } from "../../utils/fetch_public_sets";

function toMillis(ts) {
  if (!ts) return 0;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts instanceof Date) return ts.getTime();
  if (typeof ts === "number") return ts;
  return 0;
}

export default function HomePublicSetList() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data, lastDoc: l } = await fetchPublicSetsPage({ pageSize: 20 });
        if (!mounted) return;
        setSets(data);
        setLastDoc(l);
      } catch (e) {
        console.error("fetchPublicSets error:", e);
        setError(e.message || "Failed to load public sets");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function handleLoadMore() {
    if (!lastDoc) return;
    try {
      setLoadingMore(true);
      const { data, lastDoc: l } = await fetchPublicSetsNext({ lastDoc, pageSize: 20 });
      setSets((prev) => [...prev, ...data]);
      setLastDoc(l);
    } catch (e) {
      console.error("load more error:", e);
      setError(e.message || "Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  }

  const normalized = useMemo(() => {
    return sets.map((set) => ({
      id: set.id,
      title: set.title ?? "Untitled Set",
      description: set.description?.trim() || "No description",
      cardCount: Array.isArray(set.cards) ? set.cards.length : (set.cardCount ?? 0),
      updatedAtMillis: toMillis(set.updatedAt),
      __snap: set._meta?.__snap ?? null,
    }));
  }, [sets]);

  if (loading) {
    return (
      <div aria-busy="true" className="set-row set-row--loading">
        <output aria-live="polite" className="set-row__status">
          Loading public sets…
        </output>
        <div className="set-card skeleton" />
        <div className="set-card skeleton" />
        <div className="set-card skeleton" />
      </div>
    );
  }

  if (error) {
    return <div className="set-row__error">Error: {error}</div>;
  }

  if (!normalized.length) {
    return <p className="set-row__empty">No public sets found.</p>;
  }

  return (
    <div className="home-set-section">
      <h3 className="set-row__heading">Public Sets</h3>
      <ul className="set-row" aria-label="Public sets">
        {normalized.map((set) => (
          <li
            key={set.id}
            className="set-card"
            title={set.title}
            onClick={() => navigate(`/flashcard/${set.id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === "Enter") navigate(`/flashcard/${set.id}`); }}
          >
            <div className="set-card__icon"><FiLayers /></div>
            <div className="set-card__meta">
              <div className="set-card__title">{set.title}</div>
              <div className="set-card__desc">{set.description}</div>
              <div className="set-card__stats">{set.cardCount} cards</div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        {lastDoc ? (
          <button className="btn btn-secondary" onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        ) : (
          <small className="muted">No more sets</small>
        )}
      </div>
    </div>
  );
}
