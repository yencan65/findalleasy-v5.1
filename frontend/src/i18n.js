import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./lang/tr.json";
import en from "./lang/en.json";
import ar from "./lang/ar.json";
import zh from "./lang/zh.json";

// 🌍 Dil kaynakları
const resources = {
  tr: { translation: tr },
  en: { translation: en },
  ar: { translation: ar },
  zh: { translation: zh },
};

// Tarayıcı dilini otomatik algıla
const browserLang = (navigator.language || "tr").slice(0, 2);
const defaultLang = ["tr", "en", "ar", "zh"].includes(browserLang)
  ? browserLang
  : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
