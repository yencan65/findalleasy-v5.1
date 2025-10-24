import React from "react";
import "../styles/header.css";
import logo from "../assets/logo/snapping-ai.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        {/* Sol üst: FindAllEasy  —  Hemen sağında parmak şıklatma logosu */}
        <h1 className="brand-text">FindAllEasy</h1>
        <img src={logo} alt="FindAllEasy Logo" className="logo-snapping-ai" />
      </div>

      <div className="header-right">
        {/* Bayraklı/dil seçici placeholder — ileride i18n ile bağlanacak */}
        <select className="language-selector" defaultValue="tr">
          <option value="tr">🌍 TR</option>
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="fr">FR</option>
          <option value="es">ES</option>
          <option value="ru">RU</option>
          <option value="ar">AR</option>
          <option value="zh">CN</option>
          <option value="ja">JP</option>
        </select>
      </div>
    </header>
  );
}
