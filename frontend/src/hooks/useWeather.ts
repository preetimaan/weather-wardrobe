import { useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import type { WeatherData, ForecastData } from '../services/weatherApi';

interface UseWeatherReturn {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  fetchForecastByCity: (city: string) => Promise<void>;
  fetchForecastByCoords: (lat: number, lon: number) => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await weatherApi.getCurrentWeather(city);
      setCurrentWeather(weather);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      const errorCode = (err as Error & { code?: string })?.code;
      setError(errorCode ? `${errorMessage} [${errorCode}]` : errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await weatherApi.getCurrentWeatherByCoords(lat, lon);
      setCurrentWeather(weather);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      const errorCode = (err as Error & { code?: string })?.code;
      setError(errorCode ? `${errorMessage} [${errorCode}]` : errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecastByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const forecastData = await weatherApi.getForecast(city);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecastByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const forecastData = await weatherApi.getForecastByCoords(lat, lon);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchForecastByCity,
    fetchForecastByCoords,
  };
}; 