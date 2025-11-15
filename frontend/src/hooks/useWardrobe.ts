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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: WardrobeData = await response.json();
      setWardrobeData(data);
    } catch (err) {
      // Handle network errors and connection failures gracefully
      let errorMessage: string;
      
      if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('Failed to fetch'))) {
        errorMessage = 'Unable to connect to the server. Please try again later.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = 'Something went wrong. Please try again later.';
      }
      
      setError(errorMessage);
      setWardrobeData(null);
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