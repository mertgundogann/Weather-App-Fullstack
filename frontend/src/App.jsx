import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendRequest() {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error("İstek atılamadı.", error);
      setError("Şehir bulunamadı veya bir hata oluştu.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  // Hava durumuna göre dinamik arka plan rengi belirleme
  const getBgColor = () => {
    if (!weather) return "from-slate-100 to-slate-200";
    const main = weather.weather[0].main;
    switch (main) {
      case 'Clear': return "from-orange-300 to-blue-400"; // Güneşli
      case 'Clouds': return "from-slate-300 to-slate-500"; // Bulutlu
      case 'Rain':
      case 'Drizzle': return "from-blue-600 to-indigo-800"; // Yağmurlu
      case 'Snow': return "from-blue-100 to-slate-300"; // Karlı
      default: return "from-blue-400 to-emerald-400";
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 bg-gradient-to-br ${getBgColor()} flex flex-col items-center py-10 px-4`}>
      
      {/* Arama Alanı */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input 
          type="text" 
          placeholder="Şehir giriniz (Örn: London)..."
          onChange={(e) => setCity(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
          value={city}
          className="flex-1 px-6 py-3 rounded-2xl bg-white/90 shadow-lg border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          onClick={sendRequest}
          disabled={loading}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? '...' : 'Sorgula'}
        </button>
      </div>

      {/* Hata Mesajı */}
      {error && <p className="mt-4 text-red-600 font-bold bg-white/50 px-4 py-2 rounded-lg">{error}</p>}

      {/* Hava Durumu Kartı */}
      {weather && (
        <div className="mt-10 p-8 w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter">{weather.name}</h2>
              <p className="text-slate-500 font-medium italic capitalize">{weather.weather[0].description}</p>
            </div>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">BUGÜN</span>
          </div>

          <div className="flex items-center justify-between py-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl px-6 text-white shadow-lg">
            <div>
              <span className="text-6xl font-extrabold">{Math.round(weather.main.temp)}°</span>
              <p className="text-blue-50 text-xs mt-1 font-semibold uppercase tracking-wider">Hissedilen: {Math.round(weather.main.feels_like)}°</p>
            </div>
            <img 
              className="w-24 h-24 drop-shadow-md"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
              alt="weather icon" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/50 p-4 rounded-2xl text-center border border-white/50">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Nem</p>
              <p className="text-slate-700 text-xl font-bold">%{weather.main.humidity}</p>
            </div>
            <div className="bg-white/50 p-4 rounded-2xl text-center border border-white/50">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Rüzgar</p>
              <p className="text-slate-700 text-xl font-bold">{Math.round(weather.wind.speed * 3.6)} km/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App