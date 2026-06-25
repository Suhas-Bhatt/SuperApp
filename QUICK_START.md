# Quick Start Guide - The Super App

## 5-Minute Setup

### Step 1: Get API Keys (2 minutes)

1. **OpenWeatherMap** (free tier, no credit card needed):
   - Go to: https://openweathermap.org/api
   - Click "Sign Up"
   - Check your email to verify
   - Copy your API key from the dashboard

2. **NewsAPI** (free tier, no credit card needed):
   - Go to: https://newsapi.org
   - Click "Get API Key"
   - Enter your email
   - Copy your API key

3. **OMDB API** (free tier, no credit card needed):
   - Go to: http://www.omdbapi.com/apikey.aspx
   - Enter your email
   - Check "FREE" tier
   - Check your email and verify
   - Copy your API key

### Step 2: Add API Keys (2 minutes)

Open `src/services/apiServices.js` and replace:

```javascript
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';  // Paste your key here
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';                 // Paste your key here
const MOVIE_API_KEY = 'YOUR_OMDB_API_KEY';               // Paste your key here
```

### Step 3: Run Development Server (1 minute)

```bash
npm run dev
```

Visit: **http://localhost:5173**

## What You'll See

1. **Registration Page** → Fill the form and click Submit
2. **Category Selection** → Select at least 3 categories
3. **Dashboard** → See all your widgets:
   - ✅ Weather (Real-time)
   - ✅ News (Auto-rotating every 2 seconds)
   - ✅ Timer (Customize hours/minutes/seconds)
   - ✅ Notes (Auto-saved to your browser)
4. **Movies** → Discover movies based on your interests

## Test Data

Use this to test registration:
- Name: John Doe
- Username: johndoe123
- Email: john@example.com
- Mobile: 9876543210

## Troubleshooting

**Weather/News/Movies not loading?**
- Check that API keys are correctly pasted in `apiServices.js`
- Check browser console (F12) for error messages
- Verify API services are active

**Styling looks broken?**
- Clear browser cache: Ctrl+Shift+Del
- Restart dev server: npm run dev

**Notes not saving?**
- Check if browser storage is enabled
- Not in private/incognito mode?
- Clear browser cache

## Deploy to Production

### Using Vercel (recommended, 1-click)

1. Push to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_key
   VITE_NEWSAPI_KEY=your_key
   VITE_OMDB_API_KEY=your_key
   ```
5. Click Deploy

### Using Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## File Structure Overview

```
src/
├── components/        # Reusable UI components
├── pages/            # Full page views
├── services/         # API calls (edit for API keys!)
├── store/            # State management (Zustand)
├── routes/           # Navigation setup
└── index.css         # Tailwind CSS styles
```

## Key Features

✅ **Registration** - Form validation (email, phone, name)
✅ **Categories** - Select 3+ interests from 8 genres
✅ **Weather** - Real-time data from OpenWeatherMap
✅ **News** - Auto-rotating headlines every 2 seconds
✅ **Timer** - Countdown with custom duration
✅ **Notes** - Persist to localStorage automatically
✅ **Movies** - Search by category with modal details
✅ **Responsive** - Mobile, tablet, desktop optimized
✅ **State Management** - Zustand for global state
✅ **Styling** - Tailwind CSS with custom utilities

## Customization Ideas

- Change gradient colors in `index.css`
- Modify default city in `WeatherWidget.jsx`
- Adjust news rotation speed (2000ms = 2 seconds)
- Add more categories to `Categories.jsx`
- Customize emoji icons in `CategoryCard.jsx`

## Supported Browsers

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

**Need help?** Check the main README.md for detailed documentation!
