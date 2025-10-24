import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const getGreetingKey = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "greeting_morning";
  if (h >= 11 && h < 17) return "greeting_noon";
  if (h >= 17 && h < 22) return "greeting_evening";
  return "greeting_night";
};

export default function Slogan() {
  const { t, i18n } = useTranslation();
  const greetingKey = useMemo(getGreetingKey, []);
  const rtl = i18n.language === "ar";

  return (
    <div className={`slogan-wrap ${rtl ? "rtl" : ""}`}>
      <div className="greeting">{t(greetingKey)}</div>
      <h1 className="slogan">
        {t("slogan_part1")}{" "}
        <span className="underline">{t("slogan_part2")}</span>
      </h1>
    </div>
  );
}
