export const detectLang = () => {
  const userLang = (navigator.language || "en").slice(0, 2);
  const supported = ["tr","en","de","fr","es","ru","ar","zh","ja"];
  return supported.includes(userLang) ? userLang : "en";
};
