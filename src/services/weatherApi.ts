// Weather API service for OpenWeatherMap integration

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
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    this.baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    
    if (!this.apiKey) {
      throw new Error('OpenWeatherMap API key is required. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set('appid', this.apiKey);
    url.searchParams.set('units', 'metric'); // Use Celsius
    
    // Add additional parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    return this.makeRequest<WeatherData>('/weather', { q: city });
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    return this.makeRequest<WeatherData>('/weather', { 
      lat: lat.toString(), 
      lon: lon.toString() 
    });
  }

  async getForecast(city: string): Promise<ForecastData> {
    return this.makeRequest<ForecastData>('/forecast', { q: city });
  }

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
    return this.makeRequest<ForecastData>('/forecast', { 
      lat: lat.toString(), 
      lon: lon.toString() 
    });
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