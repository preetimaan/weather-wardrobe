import { useState } from 'react';
import type { Gender } from '../components/GenderFilter';

interface WardrobeSuggestion {
  category: string;
  items: string[];
  reasoning: string;
}

interface WardrobeData {
  weather: {
    temperature: number;
    feels_like: number;
    humidity: number;
    description: string;
    wind_speed: number;
  };
  suggestions: WardrobeSuggestion[];
  summary: string;
  location: string;
  gender: Gender;
}

interface UseWardrobeReturn {
  wardrobeData: WardrobeData | null;
  loading: boolean;
  error: string | null;
  fetchWardrobeSuggestions: (city?: string, lat?: number, lon?: number, gender?: Gender) => Promise<void>;
}

const useWardrobe = (): UseWardrobeReturn => {
  const [wardrobeData, setWardrobeData] = useState<WardrobeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWardrobeSuggestions = async (
    city?: string, 
    lat?: number, 
    lon?: number, 
    gender: Gender = 'unisex'
  ): Promise<void> => {
    if (!city && (!lat || !lon)) {
      setError('Please provide a city name or coordinates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use Netlify Functions in production, local backend in development
      const baseUrl = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';
      
      let url = `${baseUrl}/wardrobe-suggestions?`;
      
      if (city) {
        url += `city=${encodeURIComponent(city)}`;
      } else {
        url += `lat=${lat}&lon=${lon}`;
      }

      url += `&gender=${gender}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { error?: string; code?: string };
        const error = new Error(errorData.error || `HTTP error! status: ${response.status}`) as Error & { code?: string };
        error.code = errorData.code;
        throw error;
      }

      const data: WardrobeData = await response.json();
      setWardrobeData(data);
    } catch (err) {
      // Handle network errors and connection failures gracefully
      // For connection errors, don't show error on wardrobe side - let it show placeholder
      // Only show errors for API issues (like invalid API key) or city not found
      const isConnectionError = err instanceof TypeError && 
        (err.message.includes('fetch') || err.message.includes('Failed to fetch'));
      
      if (isConnectionError) {
        // Don't set error for connection issues - wardrobe will show placeholder
        setError(null);
        setWardrobeData(null);
      } else if (err instanceof Error) {
        const errorMessage = err.message;
        const errorCode = (err as Error & { code?: string })?.code;
        setError(errorCode ? `${errorMessage} [${errorCode}]` : errorMessage);
        setWardrobeData(null);
      } else {
        setError('Something went wrong. Please try again later.');
        setWardrobeData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    wardrobeData,
    loading,
    error,
    fetchWardrobeSuggestions
  };
};

export default useWardrobe; 