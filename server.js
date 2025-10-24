import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

// Basit mood (ruh) hesaplama: sabah-öğlen-akşam-gece
const getMood = () => {
  const h = new Date().getHours();
  if (h >= 10 && h < 16) return "dingin";   // öğlen
  if (h >= 16 && h < 21) return "huzurlu";  // akşam
  if (h >= 21 || h < 6) return "sakin";     // gece
  return "enerjik";                          // sabah
};

// Akıllı vitrin (basit seed veriler)
app.get("/api/vitrin", (req, res) => {
  const mood = getMood();
  const data = [
    { title: "Akıllı Saat", price: "$149", currency: "USD", tag: "Bugün Popüler", image: "https://picsum.photos/seed/1/640/480", mood },
    { title: "Yoga Matı", price: "$39",  currency: "USD", tag: "Ruh Haline Uygun", image: "https://picsum.photos/seed/2/640/480", mood },
    { title: "Kahve Makinesi", price: "$79", currency: "USD", tag: "Sana Özel", image: "https://picsum.photos/seed/3/640/480", mood },
    { title: "Gece Lambası", price: "$25", currency: "USD", tag: "Rahatlatıcı Seçim", image: "https://picsum.photos/seed/4/640/480", mood }
  ];
  res.json(data);
});

// React build serve
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
