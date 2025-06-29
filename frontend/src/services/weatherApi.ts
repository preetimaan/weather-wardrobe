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
    // Use our backend API instead of OpenWeatherMap directly
    this.baseUrl = 'http://localhost:3000/api';
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Weather API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
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
  async getForecast(city: string): Promise<ForecastData> {
    throw new Error('Forecast not yet implemented in backend');
  }

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
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