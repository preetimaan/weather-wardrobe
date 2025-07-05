import React from 'react';

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
}

interface WardrobeSuggestionsProps {
  wardrobeData: WardrobeData | null;
  loading: boolean;
  error: string | null;
}

const WardrobeSuggestions: React.FC<WardrobeSuggestionsProps> = ({ 
  wardrobeData, 
  loading, 
  error 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-red-800 font-medium">Error loading wardrobe suggestions</span>
        </div>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (!wardrobeData) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'outerwear':
        return '🧥';
      case 'clothing':
        return '👕';
      case 'rain protection':
        return '☔';
      case 'snow protection':
        return '❄️';
      case 'storm protection':
        return '⛈️';
      case 'wind protection':
        return '💨';
      case 'humidity management':
        return '💧';
      case 'sun protection':
        return '☀️';
      default:
        return '👔';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'outerwear':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'clothing':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'rain protection':
        return 'bg-blue-50 border-blue-300 text-blue-900';
      case 'snow protection':
        return 'bg-gray-50 border-gray-300 text-gray-900';
      case 'storm protection':
        return 'bg-purple-50 border-purple-300 text-purple-900';
      case 'wind protection':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      case 'humidity management':
        return 'bg-teal-50 border-teal-300 text-teal-900';
      case 'sun protection':
        return 'bg-orange-50 border-orange-300 text-orange-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          👗 Wardrobe Suggestions
        </h2>
        
        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg font-medium text-gray-800">
            💡 {wardrobeData.summary}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Recommended Clothing
        </h3>
        
        {wardrobeData.suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 ${getCategoryColor(suggestion.category)}`}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">
                {getCategoryIcon(suggestion.category)}
              </span>
              <h4 className="text-lg font-semibold">
                {suggestion.category}
              </h4>
            </div>
            
            <div className="mb-3">
              <h5 className="font-medium text-sm mb-2">Recommended Items:</h5>
              <ul className="space-y-1">
                {suggestion.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-current rounded-full mr-2 opacity-60"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm opacity-80">
              <span className="font-medium">Why:</span> {suggestion.reasoning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardrobeSuggestions; 