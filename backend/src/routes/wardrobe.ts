import { Router, Request, Response } from 'express';
import axios from 'axios';
import wardrobeService from '../services/wardrobeService';
import { Gender } from '../services/types';

const router = Router();

// Wardrobe suggestions endpoint
router.get('/wardrobe-suggestions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, lat, lon, weatherData, gender } = req.query;

    let weather: any;

    // If weather data is provided directly, use it
    if (weatherData) {
      try {
        weather = JSON.parse(weatherData as string);
      } catch (error) {
        res.status(400).json({ error: 'Invalid weather data format' });
        return;
      }
    } else {
      // Otherwise, fetch weather data first
      if (!city && (!lat || !lon)) {
        res.status(400).json({ 
          error: 'Please provide either city name, latitude/longitude, or weather data' 
        });
        return;
      }

      // Get API key from environment
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        res.status(500).json({ 
          error: 'OpenWeatherMap API key not configured' 
        });
        return;
      }

      // Build the API URL
      let url = 'https://api.openweathermap.org/data/2.5/weather?';
      
      if (city) {
        url += `q=${encodeURIComponent(city as string)}`;
      } else {
        url += `lat=${lat}&lon=${lon}`;
      }
      
      url += `&appid=${apiKey}&units=metric`;

      // Make request to OpenWeatherMap
      const response = await axios.get(url);
      weather = response.data;
    }

    // Validate gender parameter
    const validGenders: Gender[] = ['male', 'female', 'unisex'];
    const selectedGender: Gender = gender && validGenders.includes(gender as Gender) 
      ? (gender as Gender) 
      : 'unisex';

    // Get wardrobe suggestions with gender parameter
    const suggestions = wardrobeService.getWardrobeSuggestions(weather, selectedGender);
    const summary = wardrobeService.getSummaryAdvice(weather, selectedGender);

    // Return the wardrobe suggestions
    res.json({
      weather: {
        temperature: weather.main.temp,
        feels_like: weather.main.feels_like,
        humidity: weather.main.humidity,
        description: weather.weather[0]?.description,
        wind_speed: weather.wind.speed
      },
      suggestions,
      summary,
      location: weather.name,
      gender: selectedGender
    });

  } catch (error: any) {
    console.error('Wardrobe suggestions error:', error.message);
    
    if (error.response?.status === 404) {
      res.status(404).json({ 
        error: 'City not found' 
      });
      return;
    }
    
    if (error.response?.status === 401) {
      res.status(500).json({ 
        error: 'Invalid API key' 
      });
      return;
    }
    
    res.status(500).json({ 
      error: 'Failed to get wardrobe suggestions' 
    });
  }
});

export default router; 