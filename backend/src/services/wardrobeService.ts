import { WeatherData, Gender, WardrobeSuggestion } from './types';
import { buildSuggestions } from './suggestionBuilder';
import { getSummaryAdvice } from './summaryBuilder';

class WardrobeService {
  getWardrobeSuggestions(weatherData: WeatherData, gender: Gender = 'unisex'): WardrobeSuggestion[] {
    return buildSuggestions(weatherData, gender);
  }

  getSummaryAdvice(weatherData: WeatherData, gender: Gender = 'unisex'): string {
    return getSummaryAdvice(weatherData, gender);
  }
}

export default new WardrobeService();
