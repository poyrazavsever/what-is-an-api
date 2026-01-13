const express = require("express");
const cors = require("cors");
const { users } = require("./mockData");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Loglama middleware'i - Her istek için
app.use((req, res, next) => {
  console.log("\n📥 YENİ İSTEK GELDİ:");
  console.log(`   Zaman: ${new Date().toLocaleString("tr-TR")}`);
  console.log(`   Metod: ${req.method}`);
  console.log(`   URL: ${req.url}`);
  next();
});

// API Endpoint'leri

// 1. Kullanıcı listesini getir
app.get("/api/users", (req, res) => {
  console.log("\n🔍 İSTEK KONTROL EDİLİYOR...");
  console.log("   ✅ İstek formatı geçerli");

  console.log("\n🔐 YETKİ KONTROLÜ YAPILIYOR...");
  // Gerçek uygulamada burada token kontrolü yapılır
  console.log("   ✅ Yetki onaylandı");

  console.log("\n💾 VERİTABANINDAN VERİ ALINIYOR...");
  // Mock data'yı kullanıyoruz
  console.log(`   ✅ ${users.length} kullanıcı bulundu`);

  console.log("\n📤 CEVAP GÖNDERİLİYOR...");
  console.log("   ✅ Veri istemciye iletildi\n");

  res.json({
    success: true,
    message: "Kullanıcılar başarıyla getirildi",
    data: users,
    count: users.length,
  });
});

// 2. Tekil kullanıcı getir
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  console.log("\n🔍 İSTEK KONTROL EDİLİYOR...");
  console.log(`   Aranan kullanıcı ID: ${userId}`);

  console.log("\n🔐 YETKİ KONTROLÜ YAPILIYOR...");
  console.log("   ✅ Yetki onaylandı");

  console.log("\n💾 VERİTABANINDAN VERİ ALINIYOR...");
  const user = users.find((u) => u.id === userId);

  if (user) {
    console.log(`   ✅ Kullanıcı bulundu: ${user.name}`);
    console.log("\n📤 CEVAP GÖNDERİLİYOR...\n");

    res.json({
      success: true,
      message: "Kullanıcı başarıyla getirildi",
      data: user,
    });
  } else {
    console.log(`   ❌ Kullanıcı bulunamadı`);
    console.log("\n📤 HATA CEVABI GÖNDERİLİYOR...\n");

    res.status(404).json({
      success: false,
      message: "Kullanıcı bulunamadı",
      data: null,
    });
  }
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log("╔═══════════════════════════════════════╗");
  console.log("║    🚀 API SUNUCUSU BAŞLATILDI         ║");
  console.log("╠═══════════════════════════════════════╣");
  console.log(`║    📡 Port: ${PORT}                   ║`);
  console.log(`║    🌐 URL: http://localhost:${PORT}   ║`);
  console.log("║    📋 Endpoints:                      ║");
  console.log("║       GET /api/users                  ║");
  console.log("║       GET /api/users/:id              ║");
  console.log("╚═══════════════════════════════════════╝\n");
  console.log("İstekleri bekliyorum...\n");
});
