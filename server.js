import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// CORS ve JSON ayarları
app.use(cors({ origin: "*" }));
app.use(express.json());

// __dirname ayarı (ESM uyumlu)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err.message));

// Basit test endpoint
app.get("/api/slogan", (req, res) => {
  res.json({ message: "FindAllEasy v5.1 AI backend aktif!" });
});

// Örnek vitrin verisi
app.get("/api/vitrin", (req, res) => {
  res.json({
    items: [
      { title: "AI Smart Watch", price: "$89", image: "https://via.placeholder.com/200" },
      { title: "Wireless Headphones", price: "$59", image: "https://via.placeholder.com/200" },
      { title: "AI Drone Camera", price: "$299", image: "https://via.placeholder.com/200" },
      { title: "Foldable Tablet", price: "$499", image: "https://via.placeholder.com/200" }
    ]
  });
});

// AI Asistan önerileri
app.get("/api/suggestions", (req, res) => {
  res.json({
    items: [
      { title: "Trend: Smart Glasses ✨" },
      { title: "Yeni: AI Speaker" },
      { title: "Popüler: Virtual Keyboard" }
    ]
  });
});

// Frontend build'i Render için yönlendirme
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Sunucu portu
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
