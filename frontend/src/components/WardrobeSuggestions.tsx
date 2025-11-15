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
    const codeMatch = error.match(/\[(ERR_\w+)\]/);
    const code = codeMatch ? codeMatch[1] : undefined;
    const message = error.replace(/\s*\[ERR_\w+\]\s*$/, '').trim();
    // Show as warning if it's a city not found error, otherwise show as error
    const isWarning = code === 'ERR_CITY_NOT_FOUND' || (!code && message.toLowerCase().includes('city not found'));
    return (
      <ErrorMessage
        title="Error loading wardrobe suggestions"
        message={message}
        code={code}
        variant={isWarning ? 'warning' : 'error'}
      />
    );
  }

  // If no data and no error (e.g., connection errors don't set error), return null
  // The parent component will show the placeholder
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