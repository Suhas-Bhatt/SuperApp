import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  const user = useStore((state) => state.user);
  const setCategories = useStore((state) => state.setCategories);
  const navigate = useNavigate();

  const availableCategories = [
    'Action',
    'Comedy',
    'Drama',
    'Music',
    'Sports',
    'Thriller',
    'Fantasy',
    'Romance',
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleContinue = () => {
    if (selectedCategories.length >= 3) {
      setCategories(selectedCategories);
      navigate('/dashboard');
    }
  };

  // Set title & redirect if not registered
  useEffect(() => {
    document.title = 'Select Interests | SuperApp';
    if (!user.name) {
      navigate('/');
    }
  }, [user.name, navigate]);

  if (!user.name) {
    return null;
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative premium background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="container-app max-w-6xl relative z-10 fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3">
            Choose Your Interests
          </h1>
          <p className="text-slate-100/90 text-lg max-w-xl mx-auto">
            Select at least 3 categories to personalize your smart dashboard
          </p>
          <p className="text-indigo-200 text-sm font-semibold mt-3 bg-indigo-500/20 backdrop-blur-md px-4 py-1.5 rounded-full inline-block border border-indigo-400/20">
            Welcome, {user.name}! 👋
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-8">
          {availableCategories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={selectedCategories.includes(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))}
        </div>

        {/* Selection Info */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-800 font-bold text-lg">
                Selected: {selectedCategories.length} categories
              </p>
              <p className={`text-sm mt-1 font-semibold ${selectedCategories.length >= 3 ? 'text-emerald-600' : 'text-slate-500'}`}>
                {selectedCategories.length > 0 && selectedCategories.length < 3
                  ? `Select ${3 - selectedCategories.length} more to continue`
                  : selectedCategories.length >= 3
                    ? '✓ You are ready to proceed to the dashboard!'
                    : 'Select at least 3 categories'}
              </p>
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300"
                    >
                      {cat}
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="ml-1 text-indigo-600 hover:text-red-500 font-black cursor-pointer transition-colors duration-150"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className={`text-4xl md:text-5xl font-black self-end sm:self-center transition-all duration-300 ${selectedCategories.length >= 3 ? 'text-emerald-500 scale-110' : 'text-slate-300'}`}>
              {selectedCategories.length >= 3 ? '✓' : '○'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary px-6"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedCategories.length < 3}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
          >
            Continue to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
