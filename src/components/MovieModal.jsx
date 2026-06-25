import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/apiServices';

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieDetails(movie.imdbID);
        setDetails(data);
      } catch (err) {
        setError('Failed to load movie details. Please check your API key.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movie.imdbID) {
      loadDetails();
    }
  }, [movie.imdbID]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading movie details...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="error-text">{error}</p>
          </div>
        )}

        {!loading && details && (
          <div className="space-y-6">
            {/* Movie Poster and Title */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster */}
              <div className="md:col-span-1">
                {details.Poster && details.Poster !== 'N/A' ? (
                  <img
                    src={details.Poster}
                    alt={details.Title}
                    className="w-full rounded-lg shadow-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x225?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{details.Title}</h2>
                  <p className="text-gray-600 mt-1">
                    {details.Year} • {details.Runtime} • {details.Rated}
                  </p>
                </div>

                {/* Rating */}
                {details.imdbRating && details.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-lg text-gray-800">{details.imdbRating}</span>
                    <span className="text-gray-600">/ 10</span>
                  </div>
                )}

                {/* Genre */}
                {details.Genre && details.Genre !== 'N/A' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Genre</p>
                    <div className="flex flex-wrap gap-2">
                      {details.Genre.split(', ').map((genre) => (
                        <span key={genre} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Director */}
                {details.Director && details.Director !== 'N/A' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Director</p>
                    <p className="text-gray-800 font-semibold">{details.Director}</p>
                  </div>
                )}

                {/* Cast */}
                {details.Actors && details.Actors !== 'N/A' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cast</p>
                    <p className="text-gray-800">{details.Actors}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Plot */}
            {details.Plot && details.Plot !== 'N/A' && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Plot</h3>
                <p className="text-gray-700 leading-relaxed">{details.Plot}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {details.Language && details.Language !== 'N/A' && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Language</p>
                  <p className="font-semibold text-gray-800">{details.Language}</p>
                </div>
              )}
              {details.Country && details.Country !== 'N/A' && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Country</p>
                  <p className="font-semibold text-gray-800">{details.Country}</p>
                </div>
              )}
              {details.BoxOffice && details.BoxOffice !== 'N/A' && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Box Office</p>
                  <p className="font-semibold text-gray-800">{details.BoxOffice}</p>
                </div>
              )}
            </div>

            {/* IMDb Link */}
            <div className="pt-4">
              <a
                href={`https://www.imdb.com/title/${details.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                View on IMDb →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
