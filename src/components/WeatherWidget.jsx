import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/apiServices';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Bangalore');
  const [inputCity, setInputCity] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCurrentWeather(city);
        setWeather(data);
      } catch (err) {
        setError('Failed to load weather. Please check your API key.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  const handleCityChange = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity('');
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('wind')) return '💨';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getBgGradient = (description) => {
    if (!description) return 'from-sky-400 to-blue-500';
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return 'from-slate-400 to-slate-600';
    if (desc.includes('cloud')) return 'from-gray-400 to-slate-500';
    if (desc.includes('clear') || desc.includes('sunny')) return 'from-amber-400 to-orange-500';
    if (desc.includes('snow')) return 'from-sky-200 to-blue-300';
    return 'from-sky-400 to-indigo-500';
  };

  return (
    <div className="card p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🌍 Weather
      </h2>

      {/* City Input */}
      <form onSubmit={handleCityChange} className="mb-5 flex gap-2">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Search city..."
          className="input-field flex-1 text-sm py-2"
        />
        <button type="submit" className="btn-primary text-sm px-4 py-2">
          Go
        </button>
      </form>

      {loading && (
        <div className="flex justify-center gap-1.5 py-8">
          <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
          <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      )}

      {error && <p className="error-text text-center">{error}</p>}

      {weather && !loading && (
        <div>
          {/* Hero weather display */}
          <div className={`bg-gradient-to-br ${getBgGradient(weather.weather[0].description)} rounded-2xl p-5 text-white text-center mb-4`}>
            <p className="text-6xl mb-2">{getWeatherIcon(weather.weather[0].description)}</p>
            <h3 className="text-5xl font-extrabold tracking-tight">{Math.round(weather.main.temp)}°C</h3>
            <p className="capitalize mt-1 text-white/80 font-medium">{weather.weather[0].description}</p>
            <p className="text-sm text-white/70 mt-1 font-semibold">
              {weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ''}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Humidity', value: `${weather.main.humidity}%`, icon: '💧' },
              { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: '🌡️' },
              { label: 'Wind', value: `${weather.wind.speed} m/s`, icon: '💨' },
              { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°C`, icon: '🤔' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors duration-200">
                <p className="text-lg mb-0.5">{icon}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{label}</p>
                <p className="text-base font-bold text-indigo-600 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
