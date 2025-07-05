import React from 'react';

export type Gender = 'male' | 'female' | 'unisex';

interface GenderFilterProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  className?: string;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ 
  gender, 
  onGenderChange, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Style:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onGenderChange('male')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            gender === 'male'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Men's
        </button>
        <button
          onClick={() => onGenderChange('female')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            gender === 'female'
              ? 'bg-pink-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Women's
        </button>
        <button
          onClick={() => onGenderChange('unisex')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            gender === 'unisex'
              ? 'bg-purple-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Unisex
        </button>
      </div>
    </div>
  );
};

export default GenderFilter; 