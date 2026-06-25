import React, { useState, useEffect } from 'react';
import { fetchTopHeadlines } from '../services/apiServices';

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTopHeadlines('general');
        setArticles(data.slice(0, 10));
      } catch (err) {
        setError('Failed to load news. Please check your API key.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [articles.length]);

  const currentArticle = articles[currentIndex];

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📰 Latest News
      </h2>

      {loading && (
        <div className="flex justify-center gap-1.5 py-8">
          <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
          <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      )}

      {error && <p className="error-text text-center">{error}</p>}

      {!loading && articles.length > 0 && (
        <div className="space-y-4">
          {/* Article image */}
          {currentArticle.urlToImage && (
            <div className="overflow-hidden rounded-xl">
              <img
                src={currentArticle.urlToImage}
                alt={currentArticle.title}
                className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Article text */}
          <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50/40 rounded-r-xl py-2 pr-3">
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">{currentArticle.title}</h3>
            {currentArticle.description && (
              <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">{currentArticle.description}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <a
                href={currentArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xs transition-colors duration-150 flex items-center gap-1"
              >
                Read more →
              </a>
              <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">
                {currentArticle.source?.name}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {articles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-indigo-600 w-6' : 'bg-gray-200 hover:bg-gray-300 w-2'
                }`}
                aria-label={`Go to article ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center font-medium">
            {currentIndex + 1} of {articles.length} · Auto-rotating
          </p>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-gray-500 text-center py-6 font-medium">No news articles found.</p>
      )}
    </div>
  );
};

export default NewsWidget;
