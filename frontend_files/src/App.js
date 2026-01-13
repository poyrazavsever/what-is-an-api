import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString("tr-TR");
    setLogs((prev) => [...prev, { message, type, timestamp }]);
  };

  const fetchUsers = async () => {
    addLog("İSTEK: Kullanıcı listesini al", "request");
    setLoading(true);
    setError(null);

    try {
      addLog("Bekleniyor: API yanıtı...", "waiting");

      const response = await fetch("http://localhost:5000/api/users");

      if (!response.ok) {
        throw new Error("API isteği başarısız oldu");
      }

      const data = await response.json();

      addLog(`CEVAP: ${data.count} kullanıcı getirildi`, "success");
      addLog("VERİ İŞLENDİ: Ekranda gösteriliyor", "success");

      setUsers(data.data);
    } catch (err) {
      addLog(`HATA: ${err.message}`, "error");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>API İletişim Örneği</h1>
        <p>İstemci - API - Sunucu</p>
      </header>

      <div className="container">
        <div className="control-panel">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="fetch-button"
          >
            {loading ? "Yükleniyor..." : "Kullanıcıları Getir"}
          </button>

          {logs.length > 0 && (
            <button onClick={clearLogs} className="clear-button">
              Logları Temizle
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            Hata: {error}
            <br />
            <small>
              Backend'in çalıştığından emin olun (npm start - backend
              klasöründe)
            </small>
          </div>
        )}

        <div className="content-grid">
          {/* Sol Taraf - Loglar */}
          <div className="logs-section">
            <h2>İletişim Logları</h2>
            <div className="logs-container">
              {logs.length === 0 ? (
                <p className="no-logs">
                  Henüz log yok. "Kullanıcıları Getir" butonuna tıklayın.
                </p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className={`log-item log-${log.type}`}>
                    <span className="log-time">[{log.timestamp}]</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sağ Taraf - Kullanıcılar */}
          <div className="users-section">
            <h2>Kullanıcı Listesi</h2>
            {users.length === 0 ? (
              <p className="no-users">Henüz kullanıcı yüklenmedi.</p>
            ) : (
              <div className="users-grid">
                {users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p className="user-email">{user.email}</p>
                      <span className="user-role">{user.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>
          Akış: İstemci - İstek Gönder - API Kontrol - Yetki - Veri Al - Cevap
          Gönder - İstemci Göster
        </p>
      </footer>
    </div>
  );
}

export default App;
