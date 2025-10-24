import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { useTranslation } from "react-i18next";

export default function Vitrin({ query, forced }) {
  const [items, setItems] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/vitrin?s=${encodeURIComponent(query || "")}&lang=${i18n.language}`
        );
        const data = await res.json();
        if (Array.isArray(data?.items)) setItems(data.items.slice(0, 4));
      } catch {}
    };
    run();
  }, [query, i18n.language]);

  useEffect(() => {
    if (forced && forced.length) setItems(forced);
  }, [forced]);

  if (!items.length) return null;

  return (
    <div className="vitrin-grid">
      {items.map((it, idx) => (
        <div className="card" key={idx}>
          <img src={it.image} alt={it.title} />
          <div className="card-body">
            <div className="title">{it.title}</div>
            <div className="price">{it.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
