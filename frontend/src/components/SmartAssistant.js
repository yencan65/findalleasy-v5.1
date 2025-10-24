import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { useTranslation } from "react-i18next";

export default function SmartAssistant({ onAccept }) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/suggestions?lang=${i18n.language}`);
        const data = await res.json();
        setSuggestions(data?.items || []);
      } catch {}
    }, 8000);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const accept = () => {
    setOpen(false);
    onAccept?.(suggestions);
  };

  return (
    <>
      <button
        className={`assistant-fab ${open ? "active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Assistant"
        title="AI Assistant"
      >
        <span className="snap">🫰</span>
      </button>

      {open && (
        <div className="assistant-panel">
          <div className="assistant-header">FindAllEasy AI</div>
          <div className="assistant-body">
            <p>{t("assistant_hi")}</p>
            {!!suggestions.length && (
              <ul className="suggest-list">
                {suggestions.slice(0, 4).map((s, i) => (
                  <li key={i}>{s.title}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="assistant-actions">
            <button className="accept" onClick={accept}>{t("see_suggestions")}</button>
            <button className="cancel" onClick={() => setOpen(false)}>{t("cancel")}</button>
          </div>
        </div>
      )}
    </>
  );
}
