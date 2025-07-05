import React from 'react';
import type { TemperatureUnit } from './TemperatureToggle';
import { formatTemperature, formatWindSpeed } from '../utils/temperature';

interface WeatherDetailsProps {
  weather: {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
  };
  temperatureUnit: TemperatureUnit;
  className?: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ 
  weather, 
  temperatureUnit, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📊 Weather Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {formatTemperature(weather.temperature, temperatureUnit)}
          </div>
          <div className="text-sm text-gray-600">Temperature</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {formatTemperature(weather.feels_like, temperatureUnit)}
          </div>
          <div className="text-sm text-gray-600">Feels Like</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {weather.humidity}%
          </div>
          <div className="text-sm text-gray-600">Humidity</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {formatWindSpeed(weather.wind_speed, temperatureUnit)}
          </div>
          <div className="text-sm text-gray-600">Wind</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails; 