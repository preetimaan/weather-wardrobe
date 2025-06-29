interface WeatherData {
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
}

interface WardrobeSuggestion {
  category: string;
  items: string[];
  reasoning: string;
}

class WardrobeService {
  getWardrobeSuggestions(weatherData: WeatherData): WardrobeSuggestion[] {
    const suggestions: WardrobeSuggestion[] = [];
    const { temp, feels_like, humidity } = weatherData.main;
    const weatherType = weatherData.weather[0]?.main.toLowerCase() || '';
    const windSpeed = weatherData.wind.speed;

    // Temperature-based suggestions
    if (temp < 0) {
      suggestions.push({
        category: 'Outerwear',
        items: ['Heavy winter coat', 'Scarf', 'Gloves', 'Winter hat'],
        reasoning: 'Very cold temperatures require heavy winter protection'
      });
    } else if (temp < 10) {
      suggestions.push({
        category: 'Outerwear',
        items: ['Winter coat', 'Light scarf', 'Gloves'],
        reasoning: 'Cold weather - bundle up with warm outerwear'
      });
    } else if (temp < 20) {
      suggestions.push({
        category: 'Outerwear',
        items: ['Light jacket', 'Sweater', 'Long sleeve shirt'],
        reasoning: 'Cool weather - light layers recommended'
      });
    } else if (temp < 25) {
      suggestions.push({
        category: 'Clothing',
        items: ['Light sweater', 'Long sleeve shirt', 'Light jacket (optional)'],
        reasoning: 'Mild weather - comfortable light layers'
      });
    } else if (temp < 30) {
      suggestions.push({
        category: 'Clothing',
        items: ['T-shirt', 'Short sleeve shirt', 'Light pants'],
        reasoning: 'Warm weather - light, breathable clothing'
      });
    } else {
      suggestions.push({
        category: 'Clothing',
        items: ['Tank top', 'Shorts', 'Light, breathable fabrics'],
        reasoning: 'Hot weather - minimal, breathable clothing'
      });
    }

    // Weather condition-based suggestions
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      suggestions.push({
        category: 'Rain Protection',
        items: ['Rain jacket', 'Umbrella', 'Waterproof shoes'],
        reasoning: 'Rainy weather - stay dry with waterproof items'
      });
    } else if (weatherType.includes('snow')) {
      suggestions.push({
        category: 'Snow Protection',
        items: ['Waterproof boots', 'Snow jacket', 'Waterproof gloves'],
        reasoning: 'Snowy weather - waterproof and warm items needed'
      });
    } else if (weatherType.includes('storm') || weatherType.includes('thunder')) {
      suggestions.push({
        category: 'Storm Protection',
        items: ['Waterproof jacket', 'Sturdy shoes', 'Avoid metal accessories'],
        reasoning: 'Stormy weather - waterproof and safe clothing'
      });
    }

    // Wind-based suggestions
    if (windSpeed > 20) {
      suggestions.push({
        category: 'Wind Protection',
        items: ['Windbreaker', 'Secure hat', 'Layers that won\'t blow away'],
        reasoning: 'High winds - secure, wind-resistant clothing'
      });
    }

    // Humidity-based suggestions
    if (humidity > 70 && temp > 20) {
      suggestions.push({
        category: 'Humidity Management',
        items: ['Moisture-wicking fabrics', 'Light, breathable clothing', 'Extra deodorant'],
        reasoning: 'High humidity - moisture-wicking and breathable fabrics'
      });
    }

    // General comfort suggestions
    if (temp > 25) {
      suggestions.push({
        category: 'Sun Protection',
        items: ['Sunglasses', 'Hat', 'Sunscreen', 'Light-colored clothing'],
        reasoning: 'Warm weather - protect from sun and stay cool'
      });
    }

    return suggestions;
  }

  getSummaryAdvice(weatherData: WeatherData): string {
    const temp = weatherData.main.temp;
    const weatherType = weatherData.weather[0]?.description || '';

    if (temp < 0) {
      return 'Bundle up! It\'s very cold out there.';
    } else if (temp < 10) {
      return 'Wear warm layers - it\'s chilly today.';
    } else if (temp < 20) {
      return 'A light jacket should keep you comfortable.';
    } else if (temp < 25) {
      return 'Perfect weather for light layers.';
    } else if (temp < 30) {
      return 'Dress lightly - it\'s warm out!';
    } else {
      return 'Stay cool with minimal, breathable clothing.';
    }
  }
}

export default new WardrobeService(); 