import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Weather API endpoint
router.get('/weather', async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, lat, lon } = req.query;
    
    // Debug: Log environment variables
    console.log('Environment variables:', {
      OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV
    });
    
    // Validate input
    if (!city && (!lat || !lon)) {
      res.status(400).json({ 
        error: 'Please provide either city name or latitude and longitude' 
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

    // Debug: Log the URL (without API key for security)
    console.log('Making request to OpenWeatherMap:', url.replace(apiKey, '***'));

    // Make request to OpenWeatherMap
    const response = await axios.get(url);
    
    // Debug: Log successful response
    console.log('OpenWeatherMap response status:', response.status);
    
    // Return the weather data
    res.json(response.data);
    
  } catch (error: any) {
    console.error('Weather API error:', error.message);
    
    // Debug: Log the full error response
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    
    if (error.response?.status === 404) {
      res.status(404).json({ 
        error: 'City not found' 
      });
      return;
    }
    
    if (error.response?.status === 401) {
      res.status(500).json({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      });
      return;
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch weather data' 
    });
  }
});

export default router; 