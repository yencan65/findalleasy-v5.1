import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ onSearch }) {
  const { t, i18n } = useTranslation();
  const [q, setQ] = useState("");
  const [listening, setListening] = useState(false);
  const rtl = i18n.language === "ar";

  const handleVoice = async () => {
    try {
      const rec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!rec) return alert("Tarayıcı sesli arama desteklemiyor.");
      const recog = new rec();
      recog.lang =
        i18n.language.startsWith("tr") ? "tr-TR" :
        i18n.language.startsWith("ar") ? "ar-AE" :
        i18n.language.startsWith("zh") ? "zh-CN" : "en-US";
      setListening(true);
      recog.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setQ(text);
        onSearch?.(text);
        setListening(false);
      };
      recog.onerror = () => setListening(false);
      recog.onend = () => setListening(false);
      recog.start();
    } catch (e) {
      setListening(false);
    }
  };

  const handleImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const guess = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      setQ(guess);
      onSearch?.(guess);
    };
    input.click();
  };

  return (
    <div className={`search-bar ${rtl ? "rtl" : ""}`}>
      <input
        dir={rtl ? "rtl" : "ltr"}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("search_placeholder")}
      />
      <div className="search-icons">
        <button onClick={handleVoice} title="Sesli Arama 🎤" className={listening ? "listening" : ""}>🎤</button>
        <button onClick={handleImage} title="Görsel Arama 📷">📷</button>
        <button className="search-btn" onClick={() => onSearch?.(q)}>{t("search")}</button>
      </div>
    </div>
  );
}
