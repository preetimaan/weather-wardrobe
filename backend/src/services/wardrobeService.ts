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

type Gender = 'male' | 'female' | 'unisex';

class WardrobeService {
  getWardrobeSuggestions(weatherData: WeatherData, gender: Gender = 'unisex'): WardrobeSuggestion[] {
    const suggestions: WardrobeSuggestion[] = [];
    const { temp, feels_like, humidity } = weatherData.main;
    const weatherType = weatherData.weather[0]?.main.toLowerCase() || '';
    const windSpeed = weatherData.wind.speed;

    // Temperature-based suggestions with gender-specific items
    if (temp < 0) {
      suggestions.push({
        category: 'Outerwear',
        items: this.getGenderSpecificItems(['Heavy winter coat', 'Scarf', 'Gloves', 'Winter hat'], gender),
        reasoning: 'Very cold temperatures require heavy winter protection'
      });
    } else if (temp < 10) {
      suggestions.push({
        category: 'Outerwear',
        items: this.getGenderSpecificItems(['Winter coat', 'Light scarf', 'Gloves'], gender),
        reasoning: 'Cold weather - bundle up with warm outerwear'
      });
    } else if (temp < 20) {
      suggestions.push({
        category: 'Outerwear',
        items: this.getGenderSpecificItems(['Light jacket', 'Sweater', 'Long sleeve shirt'], gender),
        reasoning: 'Cool weather - light layers recommended'
      });
    } else if (temp < 25) {
      suggestions.push({
        category: 'Clothing',
        items: this.getGenderSpecificItems(['Light sweater', 'Long sleeve shirt', 'Light jacket (optional)'], gender),
        reasoning: 'Mild weather - comfortable light layers'
      });
    } else if (temp < 30) {
      suggestions.push({
        category: 'Clothing',
        items: this.getGenderSpecificItems(['T-shirt', 'Short sleeve shirt', 'Light pants'], gender),
        reasoning: 'Warm weather - light, breathable clothing'
      });
    } else {
      suggestions.push({
        category: 'Clothing',
        items: this.getGenderSpecificItems(['Tank top', 'Shorts', 'Light, breathable fabrics'], gender),
        reasoning: 'Hot weather - minimal, breathable clothing'
      });
    }

    // Weather condition-based suggestions
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      suggestions.push({
        category: 'Rain Protection',
        items: this.getGenderSpecificItems(['Rain jacket', 'Umbrella', 'Waterproof shoes'], gender),
        reasoning: 'Rainy weather - stay dry with waterproof items'
      });
    } else if (weatherType.includes('snow')) {
      suggestions.push({
        category: 'Snow Protection',
        items: this.getGenderSpecificItems(['Waterproof boots', 'Snow jacket', 'Waterproof gloves'], gender),
        reasoning: 'Snowy weather - waterproof and warm items needed'
      });
    } else if (weatherType.includes('storm') || weatherType.includes('thunder')) {
      suggestions.push({
        category: 'Storm Protection',
        items: this.getGenderSpecificItems(['Waterproof jacket', 'Sturdy shoes', 'Avoid metal accessories'], gender),
        reasoning: 'Stormy weather - waterproof and safe clothing'
      });
    }

    // Wind-based suggestions
    if (windSpeed > 20) {
      suggestions.push({
        category: 'Wind Protection',
        items: this.getGenderSpecificItems(['Windbreaker', 'Secure hat', 'Layers that won\'t blow away'], gender),
        reasoning: 'High winds - secure, wind-resistant clothing'
      });
    }

    // Humidity-based suggestions
    if (humidity > 70 && temp > 20) {
      suggestions.push({
        category: 'Humidity Management',
        items: this.getGenderSpecificItems(['Moisture-wicking fabrics', 'Light, breathable clothing', 'Extra deodorant'], gender),
        reasoning: 'High humidity - moisture-wicking and breathable fabrics'
      });
    }

    // General comfort suggestions
    if (temp > 25) {
      suggestions.push({
        category: 'Sun Protection',
        items: this.getGenderSpecificItems(['Sunglasses', 'Hat', 'Sunscreen', 'Light-colored clothing'], gender),
        reasoning: 'Warm weather - protect from sun and stay cool'
      });
    }

    return suggestions;
  }

  private getGenderSpecificItems(baseItems: string[], gender: Gender): string[] {
    const genderSpecificItems: Record<Gender, Record<string, string[]>> = {
      male: {
        'Heavy winter coat': ['Heavy winter coat', 'Parka', 'Down jacket'],
        'Winter coat': ['Winter coat', 'Wool coat', 'Peacoat'],
        'Light jacket': ['Light jacket', 'Bomber jacket', 'Denim jacket'],
        'Sweater': ['Sweater', 'Cardigan', 'Pullover'],
        'Long sleeve shirt': ['Long sleeve shirt', 'Button-down shirt', 'Polo shirt'],
        'Light sweater': ['Light sweater', 'Crew neck', 'V-neck'],
        'T-shirt': ['T-shirt', 'Crew neck', 'V-neck'],
        'Short sleeve shirt': ['Short sleeve shirt', 'Polo shirt', 'Casual shirt'],
        'Light pants': ['Chinos', 'Khakis', 'Lightweight pants'],
        'Tank top': ['Tank top', 'Sleeveless shirt', 'Muscle tee'],
        'Shorts': ['Shorts', 'Athletic shorts', 'Casual shorts'],
        'Rain jacket': ['Rain jacket', 'Waterproof jacket', 'Windbreaker'],
        'Umbrella': ['Compact umbrella', 'Windproof umbrella', 'Large umbrella'],
        'Waterproof shoes': ['Waterproof boots', 'Rain shoes', 'Waterproof sneakers'],
        'Waterproof boots': ['Waterproof boots', 'Snow boots', 'Winter boots'],
        'Snow jacket': ['Snow jacket', 'Insulated jacket', 'Winter coat'],
        'Waterproof gloves': ['Waterproof gloves', 'Winter gloves', 'Insulated gloves'],
        'Windbreaker': ['Windbreaker', 'Wind jacket', 'Lightweight jacket'],
        'Secure hat': ['Beanie', 'Winter hat', 'Baseball cap'],
        'Moisture-wicking fabrics': ['Moisture-wicking shirt', 'Athletic wear', 'Performance fabric'],
        'Extra deodorant': ['Deodorant', 'Antiperspirant', 'Body spray'],
        'Sunglasses': ['Sunglasses', 'Polarized sunglasses', 'UV protection glasses'],
        'Hat': ['Baseball cap', 'Sun hat', 'Bucket hat'],
        'Sunscreen': ['SPF 30+ sunscreen', 'Broad spectrum sunscreen', 'Water-resistant sunscreen'],
        'Light-colored clothing': ['Light colored shirt', 'Light pants', 'Light sweater']
      },
      female: {
        'Heavy winter coat': ['Heavy winter coat', 'Parka', 'Down jacket'],
        'Winter coat': ['Winter coat', 'Wool coat', 'Peacoat'],
        'Light jacket': ['Light jacket', 'Bomber jacket', 'Denim jacket'],
        'Sweater': ['Sweater', 'Cardigan', 'Pullover'],
        'Long sleeve shirt': ['Long sleeve shirt', 'Blouse', 'Tunic'],
        'Light sweater': ['Light sweater', 'Crew neck', 'V-neck'],
        'T-shirt': ['T-shirt', 'Crew neck', 'V-neck'],
        'Short sleeve shirt': ['Short sleeve shirt', 'Blouse', 'Casual top'],
        'Light pants': ['Chinos', 'Khakis', 'Lightweight pants'],
        'Tank top': ['Tank top', 'Camisole', 'Sleeveless top'],
        'Shorts': ['Shorts', 'Athletic shorts', 'Casual shorts'],
        'Rain jacket': ['Rain jacket', 'Waterproof jacket', 'Windbreaker'],
        'Umbrella': ['Compact umbrella', 'Windproof umbrella', 'Large umbrella'],
        'Waterproof shoes': ['Waterproof boots', 'Rain shoes', 'Waterproof sneakers'],
        'Waterproof boots': ['Waterproof boots', 'Snow boots', 'Winter boots'],
        'Snow jacket': ['Snow jacket', 'Insulated jacket', 'Winter coat'],
        'Waterproof gloves': ['Waterproof gloves', 'Winter gloves', 'Insulated gloves'],
        'Windbreaker': ['Windbreaker', 'Wind jacket', 'Lightweight jacket'],
        'Secure hat': ['Beanie', 'Winter hat', 'Baseball cap'],
        'Moisture-wicking fabrics': ['Moisture-wicking shirt', 'Athletic wear', 'Performance fabric'],
        'Extra deodorant': ['Deodorant', 'Antiperspirant', 'Body spray'],
        'Sunglasses': ['Sunglasses', 'Polarized sunglasses', 'UV protection glasses'],
        'Hat': ['Baseball cap', 'Sun hat', 'Bucket hat'],
        'Sunscreen': ['SPF 30+ sunscreen', 'Broad spectrum sunscreen', 'Water-resistant sunscreen'],
        'Light-colored clothing': ['Light colored shirt', 'Light pants', 'Light sweater']
      },
      unisex: {
        'Heavy winter coat': ['Heavy winter coat', 'Parka', 'Down jacket'],
        'Winter coat': ['Winter coat', 'Wool coat', 'Peacoat'],
        'Light jacket': ['Light jacket', 'Bomber jacket', 'Denim jacket'],
        'Sweater': ['Sweater', 'Cardigan', 'Pullover'],
        'Long sleeve shirt': ['Long sleeve shirt', 'Button-down shirt', 'Polo shirt'],
        'Light sweater': ['Light sweater', 'Crew neck', 'V-neck'],
        'T-shirt': ['T-shirt', 'Crew neck', 'V-neck'],
        'Short sleeve shirt': ['Short sleeve shirt', 'Polo shirt', 'Casual shirt'],
        'Light pants': ['Chinos', 'Khakis', 'Lightweight pants'],
        'Tank top': ['Tank top', 'Sleeveless shirt', 'Muscle tee'],
        'Shorts': ['Shorts', 'Athletic shorts', 'Casual shorts'],
        'Rain jacket': ['Rain jacket', 'Waterproof jacket', 'Windbreaker'],
        'Umbrella': ['Compact umbrella', 'Windproof umbrella', 'Large umbrella'],
        'Waterproof shoes': ['Waterproof boots', 'Rain shoes', 'Waterproof sneakers'],
        'Waterproof boots': ['Waterproof boots', 'Snow boots', 'Winter boots'],
        'Snow jacket': ['Snow jacket', 'Insulated jacket', 'Winter coat'],
        'Waterproof gloves': ['Waterproof gloves', 'Winter gloves', 'Insulated gloves'],
        'Windbreaker': ['Windbreaker', 'Wind jacket', 'Lightweight jacket'],
        'Secure hat': ['Beanie', 'Winter hat', 'Baseball cap'],
        'Moisture-wicking fabrics': ['Moisture-wicking shirt', 'Athletic wear', 'Performance fabric'],
        'Extra deodorant': ['Deodorant', 'Antiperspirant', 'Body spray'],
        'Sunglasses': ['Sunglasses', 'Polarized sunglasses', 'UV protection glasses'],
        'Hat': ['Baseball cap', 'Sun hat', 'Bucket hat'],
        'Sunscreen': ['SPF 30+ sunscreen', 'Broad spectrum sunscreen', 'Water-resistant sunscreen'],
        'Light-colored clothing': ['Light colored shirt', 'Light pants', 'Light sweater']
      }
    };

    return baseItems.map(item => {
      const genderItems = genderSpecificItems[gender][item];
      return genderItems ? genderItems[Math.floor(Math.random() * genderItems.length)] : item;
    });
  }

  getSummaryAdvice(weatherData: WeatherData, gender: Gender = 'unisex'): string {
    const temp = weatherData.main.temp;
    const weatherType = weatherData.weather[0]?.description || '';

    let baseAdvice = '';
    if (temp < 0) {
      baseAdvice = 'Bundle up! It\'s very cold out there.';
    } else if (temp < 10) {
      baseAdvice = 'Wear warm layers - it\'s chilly today.';
    } else if (temp < 20) {
      baseAdvice = 'A light jacket should keep you comfortable.';
    } else if (temp < 25) {
      baseAdvice = 'Perfect weather for light layers.';
    } else if (temp < 30) {
      baseAdvice = 'Dress lightly - it\'s warm out!';
    } else {
      baseAdvice = 'Stay cool with minimal, breathable clothing.';
    }

    // Add gender-specific advice
    if (gender === 'male') {
      return `${baseAdvice} Consider men's specific styles for the best fit.`;
    } else if (gender === 'female') {
      return `${baseAdvice} Look for women's cuts that complement your style.`;
    } else {
      return `${baseAdvice} Choose unisex options for versatile styling.`;
    }
  }
}

export default new WardrobeService(); 