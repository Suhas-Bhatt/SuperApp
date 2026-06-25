import React from 'react';

const CategoryCard = ({ category, isSelected, onToggle }) => {
  const categoryEmojis = {
    Action: '💥',
    Comedy: '😂',
    Drama: '🎭',
    Music: '🎵',
    Sports: '⚽',
    Thriller: '😨',
    Fantasy: '🧙',
    Romance: '💕',
  };

  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 border border-indigo-400/40 scale-105'
          : 'bg-white/75 backdrop-blur-md text-gray-800 border border-white/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/5 hover:bg-white/90'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-32">
        <div className="text-5xl mb-3">{categoryEmojis[category] || '🎬'}</div>
        <h3 className="text-lg font-bold text-center">{category}</h3>
        {isSelected && (
          <div className="mt-3 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
