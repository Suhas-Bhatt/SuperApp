import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';
import TimerWidget from '../components/TimerWidget';
import NotesWidget from '../components/NotesWidget';

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);
  const navigate = useNavigate();

  // Redirect if not registered or no categories
  useEffect(() => {
    if (!user.name || selectedCategories.length === 0) {
      navigate('/');
    }
  }, [user.name, selectedCategories, navigate]);

  if (!user.name || selectedCategories.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      {/* Decorative premium background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="container-app relative z-10 fade-in">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
                Welcome, {user.name}! 👋
              </h1>
              <p className="text-indigo-100 font-medium mt-2">
                Your personalized smart dashboard is ready
              </p>
            </div>
            <button
              onClick={() => navigate('/movies')}
              className="btn-primary bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold px-6 py-3 rounded-xl border-none shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              Discover Movies 🍿
            </button>
          </div>
        </div>

        {/* User Profile Widget */}
        <div className="card p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 pl-1">Your Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-lg font-bold text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Username</p>
              <p className="text-lg font-bold text-indigo-600">@{user.username}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email</p>
              <p className="text-lg font-bold text-gray-800 truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Mobile</p>
              <p className="text-lg font-bold text-gray-800">{user.mobile}</p>
            </div>
          </div>

          {/* Category Chips */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 pl-1">Your Interests</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-md shadow-indigo-500/10 hover:scale-105 transition-transform duration-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Weather Widget */}
          <div className="fade-in">
            <WeatherWidget />
          </div>

          {/* News Widget */}
          <div className="md:col-span-2 fade-in" style={{ animationDelay: '100ms' }}>
            <NewsWidget />
          </div>

          {/* Timer Widget */}
          <div className="fade-in" style={{ animationDelay: '200ms' }}>
            <TimerWidget />
          </div>

          {/* Notes Widget */}
          <div className="md:col-span-2 fade-in" style={{ animationDelay: '300ms' }}>
            <NotesWidget />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => navigate('/categories')}
            className="btn-secondary px-6"
          >
            ← Edit Categories
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary px-6"
          >
            ← Reset Account
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-indigo-200/70 text-sm mt-8 pb-4">
          <p className="font-medium">The Super App — Your intelligent assistant</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
