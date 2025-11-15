import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
    const { city, lat, lon } = event.queryStringParameters || {};

    // Validate input
    if (!city && (!lat || !lon)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Please provide either city name or latitude and longitude',
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

    // Return the weather data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data),
    };
  } catch (error: unknown) {
    const axiosError = error as { message?: string; response?: { status?: number } };
    console.error('Weather API error:', axiosError.message);

    if (axiosError.response?.status === 404) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'City not found',
          code: 'ERR_CITY_NOT_FOUND',
        }),
      };
    }

    if (axiosError.response?.status === 401) {
      // Error code: API_KEY_INVALID - See DEPLOYMENT.md for details
      console.error('API_KEY_INVALID: OpenWeatherMap API key is invalid or missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Service temporarily unavailable. Please try again later.',
          code: 'ERR_SERVICE_UNAVAILABLE',
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch weather data',
        code: 'ERR_FETCH_FAILED',
      }),
    };
  }
};

