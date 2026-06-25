import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { searchMovieByGenre } from '../services/apiServices';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Movies = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);
  const selectedMovie = useStore((state) => state.selectedMovie);
  const setSelectedMovie = useStore((state) => state.setSelectedMovie);
  const navigate = useNavigate();

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user.name || selectedCategories.length === 0) {
      return;
    }
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = {};

        // Fetch movies for each selected category
        for (const category of selectedCategories) {
          try {
            const movies = await searchMovieByGenre(category);
            movieData[category] = movies.slice(0, 8); // Limit to 8 movies per category
          } catch (err) {
            console.error(`Error fetching ${category} movies:`, err);
            movieData[category] = [];
          }
        }

        setMoviesByCategory(movieData);
      } catch (err) {
        setError('Failed to load movies. Please check your API key and try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedCategories, user.name]);

  // Redirect if not registered
  useEffect(() => {
    if (!user.name || selectedCategories.length === 0) {
      navigate('/');
    }
  }, [user.name, selectedCategories, navigate]);

  if (!user.name || selectedCategories.length === 0) {
    return null;
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="container-app relative z-10">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3">
            🎬 Discover Movies
          </h1>
          <p className="text-indigo-100/90 text-lg max-w-xl mx-auto">
            Personalized recommendations based on your interests
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="flex justify-center gap-2">
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-4 h-4 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-4 h-4 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
            <p className="text-white/80 font-semibold">Loading your movies…</p>
          </div>
        )}

        {error && (
          <div className="card p-6 mb-8 text-center border-red-200">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-bold text-gray-800 text-lg mb-1">Could Not Load Movies</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && Object.keys(moviesByCategory).length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-gray-600 text-lg font-medium">No movies found. Please check your API key.</p>
          </div>
        )}

        {/* Movies by Category */}
        {!loading && Object.entries(moviesByCategory).map(([category, movies], i) => (
          <div key={category} className="mb-14 fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{category}</h2>
              <span className="text-xs font-bold bg-white/15 text-white px-3 py-1 rounded-full border border-white/20">
                {movies.length} film{movies.length !== 1 ? 's' : ''}
              </span>
            </div>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} onCardClick={handleMovieClick} />
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <p className="text-gray-500 font-medium">No movies found for this category.</p>
              </div>
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center my-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary px-6"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Movie Modal */}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default Movies;
