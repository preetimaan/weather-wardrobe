import React from 'react';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  className?: string;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ 
  unit, 
  onUnitChange, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Temperature:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onUnitChange('celsius')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            unit === 'celsius'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => onUnitChange('fahrenheit')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            unit === 'fahrenheit'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default TemperatureToggle; 