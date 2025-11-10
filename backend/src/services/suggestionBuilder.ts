import { WeatherData, Gender, WardrobeSuggestion } from './types';
import { getGenderSpecificItems } from './genderItems';

export function buildSuggestions(weatherData: WeatherData, gender: Gender): WardrobeSuggestion[] {
  const suggestions: WardrobeSuggestion[] = [];
  const { temp, feels_like, humidity } = weatherData.main;
  const weatherType = weatherData.weather[0]?.main.toLowerCase() || '';
  const windSpeed = weatherData.wind.speed;

  // Temperature-based suggestions with gender-specific items
  if (temp < 0) {
    suggestions.push({
      category: 'Outerwear',
      items: getGenderSpecificItems(['Heavy winter coat', 'Scarf', 'Gloves', 'Winter hat'], gender),
      reasoning: 'Very cold temperatures require heavy winter protection'
    });
  } else if (temp < 10) {
    suggestions.push({
      category: 'Outerwear',
      items: getGenderSpecificItems(['Winter coat', 'Light scarf', 'Gloves'], gender),
      reasoning: 'Cold weather - bundle up with warm outerwear'
    });
  } else if (temp < 20) {
    suggestions.push({
      category: 'Outerwear',
      items: getGenderSpecificItems(['Light jacket', 'Sweater', 'Long sleeve shirt'], gender),
      reasoning: 'Cool weather - light layers recommended'
    });
  } else if (temp < 25) {
    suggestions.push({
      category: 'Clothing',
      items: getGenderSpecificItems(['Light sweater', 'Long sleeve shirt', 'Light jacket (optional)'], gender),
      reasoning: 'Mild weather - comfortable light layers'
    });
  } else if (temp < 30) {
    suggestions.push({
      category: 'Clothing',
      items: getGenderSpecificItems(['T-shirt', 'Short sleeve shirt', 'Light pants'], gender),
      reasoning: 'Warm weather - light, breathable clothing'
    });
  } else {
    suggestions.push({
      category: 'Clothing',
      items: getGenderSpecificItems(['Tank top', 'Shorts', 'Light, breathable fabrics'], gender),
      reasoning: 'Hot weather - minimal, breathable clothing'
    });
  }

  // Weather condition-based suggestions
  if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
    suggestions.push({
      category: 'Rain Protection',
      items: getGenderSpecificItems(['Rain jacket', 'Umbrella', 'Waterproof shoes'], gender),
      reasoning: 'Rainy weather - stay dry with waterproof items'
    });
  } else if (weatherType.includes('snow')) {
    suggestions.push({
      category: 'Snow Protection',
      items: getGenderSpecificItems(['Waterproof boots', 'Snow jacket', 'Waterproof gloves'], gender),
      reasoning: 'Snowy weather - waterproof and warm items needed'
    });
  } else if (weatherType.includes('storm') || weatherType.includes('thunder')) {
    suggestions.push({
      category: 'Storm Protection',
      items: getGenderSpecificItems(['Waterproof jacket', 'Sturdy shoes', 'Avoid metal accessories'], gender),
      reasoning: 'Stormy weather - waterproof and safe clothing'
    });
  }

  // Wind-based suggestions
  if (windSpeed > 20) {
    suggestions.push({
      category: 'Wind Protection',
      items: getGenderSpecificItems(['Windbreaker', 'Secure hat', 'Layers that won\'t blow away'], gender),
      reasoning: 'High winds - secure, wind-resistant clothing'
    });
  }

  // Humidity-based suggestions
  if (humidity > 70 && temp > 20) {
    suggestions.push({
      category: 'Humidity Management',
      items: getGenderSpecificItems(['Moisture-wicking fabrics', 'Light, breathable clothing', 'Extra deodorant'], gender),
      reasoning: 'High humidity - moisture-wicking and breathable fabrics'
    });
  }

  // General comfort suggestions
  if (temp > 25) {
    suggestions.push({
      category: 'Sun Protection',
      items: getGenderSpecificItems(['Sunglasses', 'Hat', 'Sunscreen', 'Light-colored clothing'], gender),
      reasoning: 'Warm weather - protect from sun and stay cool'
    });
  }

  return suggestions;
}

