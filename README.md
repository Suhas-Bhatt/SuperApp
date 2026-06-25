# The Super App - Multi-Feature React Dashboard

A comprehensive, feature-rich web application that combines user registration, entertainment category selection, real-time weather updates, news feeds, productivity tools, and movie discovery into a single unified dashboard.

## 🎯 Project Overview

The Super App consolidates multiple utilities into one personalized web dashboard:
- **User Registration** with robust validation
- **Entertainment Category Selection** with minimum threshold
- **Real-time Weather Updates** from OpenWeatherMap API
- **Auto-rotating News Feed** with 2-second rotation
- **Countdown Timer** with custom duration controls
- **Persistent Notes** saved to browser storage
- **Movie Discovery** based on selected interests
- **Detailed Movie Information** in interactive modals

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18+
- **Bundler**: Vite
- **Routing**: React Router v6+
- **State Management**: Zustand
- **Styling**: Tailwind CSS v3+
- **HTTP Client**: Axios
- **APIs**:
  - OpenWeatherMap (Weather)
  - NewsAPI (News Headlines)
  - OMDB (Movie Information)

## 📋 Prerequisites

- Node.js v18.0.0 or higher
- npm or yarn package manager
- API Keys (free tier available):
  - OpenWeatherMap API Key
  - NewsAPI Key
  - OMDB API Key

## 🚀 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd super-app

# Install dependencies
npm install
```

### 2. Configure API Keys

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local and add your API keys
# VITE_OPENWEATHERMAP_API_KEY=your_key_here
# VITE_NEWSAPI_KEY=your_key_here
# VITE_OMDB_API_KEY=your_key_here
```

**How to get API Keys:**

1. **OpenWeatherMap**:
   - Visit: https://openweathermap.org/api
   - Sign up and get your free API key
   - No credit card required for free tier

2. **NewsAPI**:
   - Visit: https://newsapi.org
   - Sign up and get your free API key
   - Limit: 100 requests per day (free tier)

3. **OMDB API**:
   - Visit: http://www.omdbapi.com/apikey.aspx
   - Sign up and get your free API key
   - Limit: 1,000 requests per day (free tier)

### 3. Update API Keys in Code

Open `src/services/apiServices.js` and replace the placeholder API keys:

```javascript
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';
const MOVIE_API_KEY = 'YOUR_OMDB_API_KEY';
```

### 4. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📦 Project Structure

```
super-app/
├── public/
├── src/
│   ├── components/
│   │   ├── RegistrationForm.jsx      # User registration with validation
│   │   ├── CategoryCard.jsx          # Category selection cards
│   │   ├── WeatherWidget.jsx         # Real-time weather display
│   │   ├── NewsWidget.jsx            # Auto-rotating news feed
│   │   ├── TimerWidget.jsx           # Countdown timer
│   │   ├── NotesWidget.jsx           # Persistent notes
│   │   ├── MovieCard.jsx             # Movie card component
│   │   └── MovieModal.jsx            # Movie details modal
│   ├── pages/
│   │   ├── Register.jsx              # Registration page
│   │   ├── Categories.jsx            # Category selection page
│   │   ├── Dashboard.jsx             # Main dashboard
│   │   └── Movies.jsx                # Movie discovery page
│   ├── services/
│   │   └── apiServices.js            # API integration
│   ├── store/
│   │   └── useStore.js               # Zustand state management
│   ├── routes/
│   │   └── AppRoutes.jsx             # Route configuration
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles + Tailwind
├── .env.example                      # Environment variables template
├── .gitignore
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── vite.config.js                    # Vite configuration
├── package.json
└── README.md
```

## ✨ Features

### 1. User Registration
- Multi-field form (Name, Username, Email, Mobile)
- Real-time validation with error messages
- Email format validation (RFC regex)
- 10-digit mobile number validation
- Prevents navigation without successful registration

### 2. Category Selection
- 8 entertainment categories with emoji icons
- Single-click toggle selection
- Minimum 3 categories required
- Visual feedback for selected categories
- Category chip display in dashboard

### 3. Dashboard Widgets
- **User Profile**: Displays registration data with category chips
- **Weather Widget**: Real-time temperature, humidity, pressure, wind speed
- **News Widget**: Auto-rotating headlines every 2 seconds with images
- **Timer Widget**: Custom hours/minutes/seconds with start/pause/reset
- **Notes Widget**: Quick memos with localStorage persistence

### 4. Movie Discovery
- Dynamic search based on selected categories
- Movie cards with poster images, title, year, and type
- Hover animations (1.05× scale, shadow enhancement)
- Interactive modal with detailed information:
  - Movie poster
  - Title, year, rating (IMDb)
  - Plot summary
  - Genre, director, cast
  - Runtime, language, country
  - Link to IMDb

### 5. Responsive Design
- Mobile-first approach
- Works on all screen sizes:
  - Mobile (320px+)
  - Tablet (768px+)
  - Desktop (1024px+)
- Adaptive grid layouts
- Touch-friendly UI

## 🎨 UI/UX Highlights

- **Gradient Background**: Purple to pink gradient theme
- **Card-based Layout**: Modular widget design
- **Custom Animations**: Fade-in effects, smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during data loading
- **Navigation**: Seamless routing with route protection

## 🔄 Data Persistence

- **User Data**: Stored in Zustand global store
- **Notes**: Persisted to browser localStorage
- **Categories**: Maintained across navigation
- **Movie Selection**: Preserved for modal display

## ⚡ Performance Optimization

- Code splitting with React.lazy() (where applicable)
- Image optimization with lazy loading
- Efficient state management with Zustand
- CSS optimization with Tailwind CSS
- Minimal re-renders with React optimization

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### API Keys Not Working?
1. Verify API keys are correctly copied to `apiServices.js`
2. Check API service website for rate limits
3. Ensure API keys are active and not expired
4. Try the free tier endpoints

### Weather/News/Movies Not Loading?
1. Check browser console for error messages
2. Verify internet connection
3. Confirm API keys have remaining requests
4. Try a different search term or city

### Styling Issues?
1. Clear browser cache (Ctrl+Shift+Del)
2. Run `npm run dev` again
3. Check if Tailwind CSS is properly installed

### localStorage Not Working?
1. Check if browser storage is enabled
2. Ensure not in private/incognito mode
3. Check storage quota limits

## 📦 Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist` directory, ready for deployment.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages
Update `vite.config.js`:
```javascript
export default {
  base: '/super-app/',
  // ... rest of config
}
```

## 📝 Notes

- **API Limits**: Free tier APIs have request limits. Plan accordingly.
- **CORS**: Some APIs may have CORS restrictions. Use appropriate endpoints.
- **Data Privacy**: Never commit API keys to version control.
- **localStorage**: Limited storage capacity (typically 5-10MB).

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a comprehensive React learning project demonstrating:
- Component-based architecture
- State management patterns
- API integration
- Form validation
- Responsive design
- Modern CSS practices

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for error messages
4. Verify all dependencies are installed

---

**Happy coding! 🚀**

Built with ❤️ using React, Vite, and Tailwind CSS
