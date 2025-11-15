import React from 'react';

interface SuggestionCardProps {
  category: string;
  items: string[];
  reasoning: string;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  category,
  items,
  reasoning,
}) => {
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
    <div className={`border rounded-lg p-4 ${getCategoryColor(category)}`}>
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">
          {getCategoryIcon(category)}
        </span>
        <h4 className="text-lg font-semibold">
          {category}
        </h4>
      </div>
      
      <div className="mb-3">
        <h5 className="font-medium text-sm mb-2">Recommended Items:</h5>
        <ul className="space-y-1">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center text-sm">
              <span className="w-2 h-2 bg-current rounded-full mr-2 opacity-60"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-sm opacity-80">
        <span className="font-medium">Why:</span> {reasoning}
      </div>
    </div>
  );
};

