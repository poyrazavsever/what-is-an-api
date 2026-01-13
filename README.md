# Backend API Örneği

Bu basit Node.js API örneği, istemci-sunucu iletişimini göstermektedir.

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm start
```

API `http://localhost:5000` adresinde çalışacaktır.

## Endpoints

- `GET /api/users` - Tüm kullanıcıları getirir
- `GET /api/users/:id` - Belirli bir kullanıcıyı getirir
- `GET /api/health` - API sağlık kontrolü

## Akış

1. İstemci istek gönderir
2. API isteği kontrol eder
3. Yetki kontrolü yapar
4. Veritabanından (mock data) veriyi alır
5. Cevabı istemciye gönderir

Her adım console'da loglanır.
