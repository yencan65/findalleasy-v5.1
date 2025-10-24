import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Vitrin from "./components/Vitrin";
import Footer from "./components/Footer";
import AIAsistan from "./components/AIAsistan";
import "./styles/global.css";

export default function App() {
  const [mood, setMood] = useState("enerjik");
  const [vitrin, setVitrin] = useState([]);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 10 && h < 16) setMood("dingin");
    else if (h >= 16 && h < 21) setMood("huzurlu");
    else if (h >= 21 || h < 6) setMood("sakin");
    else setMood("enerjik");
  }, []);

  // Canlı AI slogan (kısa, yaşayan)
  const getLiveSlogan = () => {
    if (mood === "enerjik") return "Hazır mısın? 🚀";
    if (mood === "dingin")  return "Rahatla, birlikte bakalım. ☀️";
    if (mood === "huzurlu") return "Bugün seni ne mutlu eder? 🌇";
    return "Huzurlu alışveriş burada. 🌙";
  };

  return (
    <div className={`app mood-${mood}`}>
      <Header />
      {/* Arama çubuğunun ÜSTÜNDE kısa, canlı AI slogan */}
      <div className="live-slogan">{getLiveSlogan()}</div>
      <SearchBar mood={mood} />
      <Vitrin mood={mood} vitrin={vitrin} setVitrin={setVitrin} />
      <Footer />
      <AIAsistan setVitrin={setVitrin} />
    </div>
  );
}
