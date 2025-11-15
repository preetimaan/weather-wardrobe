// Weather API service for backend integration

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
  city: {
    name: string;
    country: string;
  };
}

class WeatherApiService {
  private baseUrl: string;

  constructor() {
    // Use Netlify Functions in production, local backend in development
    if (import.meta.env.PROD) {
      // In production, use Netlify Functions (via redirect)
      this.baseUrl = '/api';
    } else {
      // In development, use local Express backend
      this.baseUrl = 'http://localhost:3000/api';
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    // Build URL - handle both absolute and relative URLs
    let url: string;
    if (this.baseUrl.startsWith('http')) {
      // Absolute URL (development)
      const urlObj = new URL(`${this.baseUrl}${endpoint}`);
      Object.entries(params).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });
      url = urlObj.toString();
    } else {
      // Relative URL (production)
      const searchParams = new URLSearchParams(params);
      url = `${this.baseUrl}${endpoint}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Weather API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (err) {
      // Handle network errors and connection failures
      // Network errors typically throw TypeError with messages like:
      // - "Failed to fetch"
      // - "NetworkError when attempting to fetch resource"
      // - "fetch failed"
      if (err instanceof TypeError) {
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes('fetch') || errorMsg.includes('network') || errorMsg.includes('failed')) {
          throw new Error('Unable to connect to the server. Please try again later.');
        }
      }
      if (err instanceof Error) {
        // Re-throw existing error messages
        throw err;
      }
      throw new Error('Something went wrong. Please try again later.');
    }
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    return this.makeRequest<WeatherData>('/weather', { city });
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    return this.makeRequest<WeatherData>('/weather', { 
      lat: lat.toString(), 
      lon: lon.toString() 
    });
  }

  // Note: Forecast endpoints will need to be implemented in the backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getForecast(_city: string): Promise<ForecastData> {
    throw new Error('Forecast not yet implemented in backend');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getForecastByCoords(_lat: number, _lon: number): Promise<ForecastData> {
    throw new Error('Forecast not yet implemented in backend');
  }

  // Helper method to get weather icon URL
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Helper method to convert temperature to different units
  convertTemperature(temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): number {
    if (unit === 'fahrenheit') {
      return (temp * 9/5) + 32;
    }
    return temp;
  }
}

export const weatherApi = new WeatherApiService(); 