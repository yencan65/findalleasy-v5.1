import React, { useState } from "react";
import "./index.css";
import "./i18n";
import Slogan from "./components/Slogan";
import SearchBar from "./components/SearchBar";
import Vitrin from "./components/Vitrin";
import SmartAssistant from "./components/SmartAssistant";
import Logo from "./components/Logo";
import { useTranslation } from "react-i18next";

export default function App() {
  const [query, setQuery] = useState("");
  const [forced, setForced] = useState(null);
  const { i18n, t } = useTranslation();

  const onSearch = (q) => setQuery(q || "");
  const onAssistantAccept = (list) => {
    if (list?.length) setForced(list);
  };

  return (
    <div className={`app ${i18n.language === "ar" ? "rtl" : ""}`}>
      <header className="topbar">
        <Logo />
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          value={i18n.language}
          className="lang-select"
        >
          <option value="tr">TR</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
          <option value="zh">中文</option>
        </select>
      </header>

      <main className="hero">
        <Slogan />
        <SearchBar onSearch={onSearch} />
        <Vitrin query={query} forced={forced} />
      </main>

      <SmartAssistant onAccept={onAssistantAccept} />

      <footer className="footer">
        {t("footer")}
      </footer>
    </div>
  );
}
