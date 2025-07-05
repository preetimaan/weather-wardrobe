import React from 'react';

interface WeatherDetailsProps {
  weather: {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
  };
  className?: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📊 Weather Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-sm text-gray-600">Temperature</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(weather.feels_like)}°C
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
            {Math.round(weather.wind_speed)} km/h
          </div>
          <div className="text-sm text-gray-600">Wind</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails; 