import React from 'react';

const MovieCard = ({ movie, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(movie)}
      className="relative cursor-pointer overflow-hidden rounded-2xl group
                 bg-white/80 backdrop-blur-md border border-white/50
                 shadow-md hover:shadow-2xl hover:shadow-indigo-500/10
                 transition-all duration-350 hover:-translate-y-2"
    >
      {/* Poster */}
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <div className="overflow-hidden">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/300x400/e0e7ff/6366f1?text=No+Image';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-52 bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">🎬</span>
          <span className="text-gray-500 text-sm font-medium">No Image</span>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none rounded-b-2xl" />

      {/* Info */}
      <div className="p-4 relative">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
          {movie.Title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 font-medium">{movie.Year}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold capitalize">
            {movie.Type}
          </span>
          <span className="text-xs text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
