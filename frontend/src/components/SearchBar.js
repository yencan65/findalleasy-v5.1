import React, { useEffect, useState } from "react";

const placeholders = {
  enerjik: [
    "Bugün ne keşfetmek istersin?",
    "Erken fırsatları yakala",
    "Otel bul, şehri seç ☀️"
  ],
  dingin: [
    "Günün fırsatlarına bakalım",
    "Aradığını birlikte bulalım",
    "Moda & Elektronik trendleri"
  ],
  huzurlu: [
    "Akşam için öneriler",
    "Seni mutlu edecek bir şey bulalım",
    "Bugünün öne çıkanları"
  ],
  sakin: [
    "Rahatla, biz senin yerine buluruz",
    "Gece alışverişi keyfi",
    "Yarın için hazırlan 🌙"
  ]
};

export default function SearchBar({ mood }) {
  const [ph, setPh] = useState("Ara…");

  useEffect(() => {
    let i = 0;
    const arr = placeholders[mood] || ["Ara…"];
    setPh(arr[0]);
    const t = setInterval(() => {
      i = (i + 1) % arr.length;
      setPh(arr[i]);
    }, 5000);
    return () => clearInterval(t);
  }, [mood]);

  return (
    <div className="search-wrap">
      <input className="search-input" placeholder={ph} />
      <button className="search-btn">Ara</button>
    </div>
  );
}
