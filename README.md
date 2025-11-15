# Weather Wardrobe

A weather-based outfit recommendation application that helps users choose appropriate clothing based on current weather conditions.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Yarn

### Backend
- Node.js
- Express.js
- TypeScript
- Axios

### Infrastructure
- Docker
- Docker Compose

## ✅ Existing Features

### Core Functionality
- **🌤️ Weather Data Integration** - Real-time weather data from OpenWeatherMap API
- **👗 Wardrobe Recommendations** - Smart clothing suggestions based on weather conditions
- **🌡️ Temperature Unit Toggle** - Switch between Celsius and Fahrenheit
- **👔 Gender Filter** - Personalized suggestions for Men's, Women's, and Unisex styles
- **📍 Location Search** - Search for cities worldwide
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

### Weather Features
- **Current Weather Display** - Temperature, feels like, humidity, wind speed, pressure
- **Weather Icons** - Visual weather condition representation
- **Weather Details** - Comprehensive weather information in organized cards
- **Real-time Updates** - Live weather data with timestamps

### Wardrobe Intelligence
- **Temperature-Based Suggestions** - Clothing recommendations for different temperature ranges
- **Weather Condition Logic** - Special recommendations for rain, snow, storms
- **Wind Protection** - Suggestions for windy conditions
- **Humidity Management** - Moisture-wicking recommendations for high humidity
- **Sun Protection** - UV protection suggestions for warm weather
- **Gender-Specific Recommendations** - Personalized clothing suggestions based on style preferences
- **Categorized Recommendations** - Organized by clothing type (Outerwear, Clothing, etc.)

### User Interface
- **Modern UI Design** - Clean, intuitive interface with Tailwind CSS
- **Two-Column Layout** - Weather information and wardrobe suggestions side by side
- **Loading States** - Smooth loading animations and skeleton screens
- **Error Handling** - User-friendly error messages and recovery
- **Empty States** - Helpful guidance when no data is available
- **Filter Controls** - Temperature unit and gender style toggles

### Technical Features
- **TypeScript Integration** - Full type safety across the application
- **Docker Containerization** - Easy deployment and development setup
- **API Proxy** - Secure backend proxy for weather API calls
- **CORS Support** - Cross-origin resource sharing for frontend-backend communication
- **Environment Configuration** - Secure API key management

## 🚀 Potential Features

### High Priority
- **🔍 Location Autocomplete** - Google Places API integration for city search suggestions
- **📍 GPS Location Detection** - "Use my location" button with geolocation
- **🌤️ Weather Forecast** - 5-day/7-day weather predictions
- **⏰ Hourly Forecast** - Detailed hourly weather breakdown
- **👤 User Profiles** - Personal preferences and style settings

### Medium Priority
- **🎨 Dark Mode** - Theme switching capability
- **📱 PWA Support** - Progressive Web App features for mobile installation
- **🌅 Sunrise/Sunset Times** - Daily sun timing information
- **🌤️ UV Index** - Sun protection recommendations
- **🎯 Style Preferences** - Casual, formal, sporty, etc.
- **💾 Local Storage** - Save user preferences locally

### Advanced Features
- **👕 Personal Wardrobe** - Add/remove items from your closet
- **❤️ Favorite Outfits** - Save and organize favorite combinations
- **🎭 Occasion-Based Suggestions** - Work, casual, formal, outdoor activities
- **🧥 Layering Recommendations** - How to layer clothing effectively


### Technical Enhancements
- **🔒 User Authentication** - Login system for personalized features
- **📊 Database Integration** - Store user data and preferences
- **🤖 AI-Powered Suggestions** - Machine learning for better recommendations

### Weather Alerts
- **⚠️ Severe Weather Warnings** - Real-time weather alerts
- **🌪️ Storm Tracking** - Severe weather notifications
- **🌡️ Temperature Alerts** - Extreme temperature warnings

## Prerequisites

- Node.js (v20.19.2 or higher)
- Yarn
- Docker (optional)

## Getting Started

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-wardrobe.git
cd weather-wardrobe
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
# Create .env file in backend directory
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Docker Development

1. Build and start the development container
```bash
docker compose up dev
```

2. Access the application at `http://localhost:5173`

### Docker Production Preview

1. Build and start the production preview
```bash
docker compose up preview
```

2. Access the application at `http://localhost:4173`

## Development

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn clean` - Clean yarn cache
- `yarn upgrade` - Interactive upgrade of dependencies

## Docker Commands

- `docker compose up dev` - Start development environment
- `docker compose up preview` - Start production preview
- `docker compose down` - Stop all containers
- `docker compose logs -f` - View logs
- `docker compose build` - Rebuild containers

## Project Structure

```
weather-wardrobe/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── assets/        # Static assets
│   │   └── App.tsx        # Main application component
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── backend/
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Server entry point
│   └── package.json       # Backend dependencies
├── docker-compose.yml     # Docker services
└── README.md             # Project documentation
```

## API Endpoints

### Weather API
- `GET /api/weather?city={city}` - Get current weather by city
- `GET /api/weather?lat={lat}&lon={lon}` - Get current weather by coordinates

### Wardrobe API
- `GET /api/wardrobe-suggestions?city={city}&gender={gender}` - Get wardrobe suggestions by city
- `GET /api/wardrobe-suggestions?lat={lat}&lon={lon}&gender={gender}` - Get wardrobe suggestions by coordinates
- **Gender Parameter**: `gender` can be `male`, `female`, or `unisex` (defaults to `unisex`)

## Deployment

This application is configured for deployment on Netlify. The backend has been converted to Netlify Functions (serverless), and the frontend is deployed as static files.

### Netlify Deployment

#### Prerequisites
- A Netlify account
- Your OpenWeatherMap API key

#### Steps

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select this repository

2. **Configure build settings** (Netlify should auto-detect from `netlify.toml`, but verify):
   - Build command: `cd frontend && yarn install && yarn build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

3. **Set environment variables**
   - Go to Site settings → Environment variables
   - Add `OPENWEATHER_API_KEY` with your OpenWeatherMap API key

4. **Install Netlify Functions dependencies**
   - Netlify will automatically install dependencies from `netlify/functions/package.json` during build
   - If you need to test locally, run: `cd netlify/functions && yarn install`

5. **Deploy!**
   - Push to your main branch or trigger a manual deploy
   - Netlify will build the frontend and deploy the functions automatically

#### Local Testing with Netlify Functions

To test Netlify Functions locally:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Install function dependencies
cd netlify/functions && yarn install

# Run Netlify dev (from project root)
netlify dev
```

This will start both the frontend and Netlify Functions locally.

#### Docker vs Netlify

**Docker** is still useful for:
- Local development consistency
- Deployment to other platforms (AWS, GCP, Azure, etc.)
- Production deployments on containerized infrastructure

**Netlify** uses:
- Static site hosting for the frontend
- Serverless functions for the backend (no Docker needed)
- Automatic scaling and CDN distribution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT