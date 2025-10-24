import React, { useState } from "react";
import axios from "axios";
import "../styles/AIAsistan.css";
import logo from "../assets/logo/snapping-ai.svg";

export default function AIAsistan({ setVitrin }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Fırsatları yenile 🫰");

  const refresh = async () => {
    setLoading(true);
    setMsg("Yeni fırsatlar hazırlanıyor 💫");
    const footer = document.querySelector(".footer");
    footer && footer.classList.add("footer-glow");

    try {
      const { data } = await axios.get("/api/vitrin");
      setVitrin(data);
      setMsg("Yeni fırsatlar burada 👇");
    } catch {
      setMsg("Bağlantı hatası 😔");
    } finally {
      setTimeout(() => {
        setLoading(false);
        footer && footer.classList.remove("footer-glow");
      }, 1800);
    }
  };

  return (
    <div className="ai-assistant" onClick={refresh} title="Şıklat ve yenile">
      <img
        src={logo}
        alt="AI Assistant"
        className={`logo-snapping-ai ${loading ? "active" : ""}`}
      />
      <p>{msg}</p>
    </div>
  );
}
