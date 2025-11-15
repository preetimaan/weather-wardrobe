export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name?: string;
}

export interface WardrobeSuggestion {
  category: string;
  items: string[];
  reasoning: string;
}

export type Gender = 'male' | 'female' | 'unisex';

