import { Handler } from '@netlify/functions';
import axios from 'axios';
import { buildSuggestions } from './services/suggestionBuilder';
import { getSummaryAdvice } from './services/summaryBuilder';
import { Gender } from './services/types';

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { city, lat, lon, weatherData, gender } = event.queryStringParameters || {};

    let weather: any;

    // If weather data is provided directly, use it
    if (weatherData) {
      try {
        weather = JSON.parse(weatherData);
      } catch (error) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid weather data format' }),
        };
      }
    } else {
      // Otherwise, fetch weather data first
      if (!city && (!lat || !lon)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Please provide either city name, latitude/longitude, or weather data',
          }),
        };
      }

      // Get API key from environment
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            error: 'OpenWeatherMap API key not configured',
          }),
        };
      }

      // Build the API URL
      let url = 'https://api.openweathermap.org/data/2.5/weather?';

      if (city) {
        url += `q=${encodeURIComponent(city)}`;
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
    const selectedGender: Gender =
      gender && validGenders.includes(gender as Gender) ? (gender as Gender) : 'unisex';

    // Get wardrobe suggestions with gender parameter
    const suggestions = buildSuggestions(weather, selectedGender);
    const summary = getSummaryAdvice(weather, selectedGender);

    // Return the wardrobe suggestions
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        weather: {
          temperature: weather.main.temp,
          feels_like: weather.main.feels_like,
          humidity: weather.main.humidity,
          description: weather.weather[0]?.description,
          wind_speed: weather.wind.speed,
        },
        suggestions,
        summary,
        location: weather.name,
        gender: selectedGender,
      }),
    };
  } catch (error: any) {
    console.error('Wardrobe suggestions error:', error.message);

    if (error.response?.status === 404) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'City not found',
        }),
      };
    }

    if (error.response?.status === 401) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Invalid API key',
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to get wardrobe suggestions',
      }),
    };
  }
};

