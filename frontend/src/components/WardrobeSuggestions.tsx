import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSkeleton } from './LoadingSkeleton';
import { SuggestionCard } from './SuggestionCard';

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
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error loading wardrobe suggestions"
        message={error}
      />
    );
  }

  if (!wardrobeData) {
    return null;
  }

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
          <SuggestionCard
            key={index}
            category={suggestion.category}
            items={suggestion.items}
            reasoning={suggestion.reasoning}
          />
        ))}
      </div>
    </div>
  );
};

export default WardrobeSuggestions; 