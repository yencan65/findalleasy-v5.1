import React, { useEffect } from "react";
import axios from "axios";
import "../styles/vitrin.css";

export default function Vitrin({ mood, vitrin, setVitrin }) {
  useEffect(() => {
    load();
    // mood değişince de içeriği tazeler
    // eslint-disable-next-line
  }, [mood]);

  const load = async () => {
    const { data } = await axios.get("/api/vitrin");
    setVitrin(data);
  };

  return (
    <section className={`vitrin-container mood-${mood}`}>
      {/* Sol tarafta minik selam (emoji + kısa selam) */}
      <div className="vitrin-greet">
        {mood === "enerjik" && <span>🌞 Günaydın!</span>}
        {mood === "dingin"  && <span>☀️ Güzel bir gün!</span>}
        {mood === "huzurlu" && <span>🌗 İyi akşamlar!</span>}
        {mood === "sakin"   && <span>🌙 İyi geceler.</span>}
      </div>

      {/* 4 kart — tek satır, scroll yok */}
      <div className="vitrin-row">
        {vitrin.map((item, i) => (
          <div className="vitrin-card" key={i}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price} {item.currency}</p>
            <span className="tag-ai">{item.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
