import axios from 'axios';

// API Keys — loaded from .env (never committed to git)
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY || '';

// Helper to check if key is placeholder or missing
const isPlaceholder = (key) => !key || key.startsWith('YOUR_') || key.trim() === '';

// Create axios instances
const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const newsClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

const movieClient = axios.create({
  baseURL: 'https://www.omdbapi.com',
});

// Weather API
/**
 * Fetches the current weather for a specific city.
 * Fallbacks to mock data if no API key is set.
 * 
 * @param {string} city - The city name to fetch weather for.
 * @returns {Promise<Object>} The OpenWeatherMap weather object.
 */
export const fetchCurrentWeather = async (city) => {
  if (isPlaceholder(WEATHER_API_KEY)) {
    console.log('Using mock weather data');
    return {
      name: city,
      sys: {
        country: 'IN',
      },
      main: {
        temp: 28.4,
        feels_like: 32.1,
        humidity: 62,
        pressure: 1010,
        temp_min: 26.0,
        temp_max: 30.5,
      },
      wind: {
        speed: 4.1,
      },
      weather: [
        {
          main: 'Clouds',
          description: 'scattered clouds',
        },
      ],
    };
  }

  try {
    const response = await weatherClient.get('/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather service failure:', error);
    throw error;
  }
};

// News API
/**
 * Fetches top headlines for a specific category.
 * Fallbacks to mock headlines if no API key is set.
 * 
 * @param {string} category - The news category (e.g. general, technology, health).
 * @returns {Promise<Array>} List of articles.
 */
export const fetchTopHeadlines = async (category = 'general') => {
  if (isPlaceholder(NEWS_API_KEY)) {
    console.log('Using mock news data');
    return [
      {
        title: "Vite 8 Released with Instant HMR and Rolldown",
        description: "The Vite team has officially released version 8 with major performance improvements and native integration of Rolldown bundling.",
        urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        url: "https://vite.dev",
        source: { name: "TechCrunch" },
      },
      {
        title: "React 19 Adoption Reaches New Heights in 2026",
        description: "React 19's new features like Actions, Server Components, and native document metadata have driven massive enterprise adoption.",
        urlToImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        url: "https://react.dev",
        source: { name: "Dev.to" },
      },
      {
        title: "Tailwind CSS v4.0 is Now Stable",
        description: "Tailwind CSS v4.0 features a brand new rust engine, multi-theme support, and first-class CSS configuration without post-css bottlenecks.",
        urlToImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
        url: "https://tailwindcss.com",
        source: { name: "CSS Tricks" },
      },
    ];
  }

  try {
    const response = await newsClient.get('/top-headlines', {
      params: {
        category,
        language: 'en',
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('News service failure:', error);
    throw error;
  }
};

// Movie Search
/**
 * Searches movies by a specific query string (or genre key).
 * Fallbacks to mock movie list if no API key is set.
 * 
 * @param {string} query - The search query term.
 * @returns {Promise<Array>} List of matching movie objects.
 */
export const searchMovieByGenre = async (query) => {
  if (isPlaceholder(MOVIE_API_KEY)) {
    console.log('Using mock movie search data');
    const mockMovies = {
      Action: [
        {
          Title: 'The Dark Knight',
          Year: '2008',
          imdbID: 'tt0468569',
          Type: 'movie',
          Poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=60',
        },
        {
          Title: 'Inception',
          Year: '2010',
          imdbID: 'tt1375666',
          Type: 'movie',
          Poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60',
        },
        {
          Title: 'Mad Max: Fury Road',
          Year: '2015',
          imdbID: 'tt1392190',
          Type: 'movie',
          Poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60',
        },
      ],
      Comedy: [
        {
          Title: 'Superbad',
          Year: '2007',
          imdbID: 'tt0829482',
          Type: 'movie',
          Poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60',
        },
        {
          Title: 'The Hangover',
          Year: '2009',
          imdbID: 'tt1119646',
          Type: 'movie',
          Poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=60',
        },
      ],
    };
    return mockMovies[query] || [
      {
        Title: `${query} Classic`,
        Year: '2024',
        imdbID: `tt_mock_${query}`,
        Type: 'movie',
        Poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=60',
      },
    ];
  }

  try {
    const response = await movieClient.get('/', {
      params: {
        s: query,
        type: 'movie',
        apikey: MOVIE_API_KEY,
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error('Movie query service failure:', error);
    throw error;
  }
};

/**
 * Fetches the full details of a specific movie using its IMDb ID.
 * Fallbacks to mock details if no API key is set or mock ID is used.
 * 
 * @param {string} imdbID - The IMDb ID of the movie.
 * @returns {Promise<Object>} Movie detail object containing plot, ratings, cast, etc.
 */
export const fetchMovieDetails = async (imdbID) => {
  if (isPlaceholder(MOVIE_API_KEY) || imdbID.startsWith('tt_mock_')) {
    console.log('Using mock movie details');
    return {
      Title: imdbID === 'tt0468569' ? 'The Dark Knight' : imdbID === 'tt1375666' ? 'Inception' : 'Mock Film Detail',
      Year: '2008',
      imdbRating: '9.0',
      Genre: 'Action, Crime, Drama',
      Director: 'Christopher Nolan',
      Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
      Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      Poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=60',
      imdbID: imdbID,
    };
  }

  try {
    const response = await movieClient.get('/', {
      params: {
        i: imdbID,
        plot: 'full',
        apikey: MOVIE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Movie detail payload query error:', error);
    throw error;
  }
};

