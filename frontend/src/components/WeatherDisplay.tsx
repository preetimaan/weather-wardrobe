import type { WeatherData } from '../services/weatherApi';
import type { TemperatureUnit } from './TemperatureToggle';
import { formatTemperature, formatWindSpeed } from '../utils/temperature';

interface WeatherDisplayProps {
  weather: WeatherData;
  temperatureUnit: TemperatureUnit;
  className?: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  weather, 
  temperatureUnit, 
  className = '' 
}) => {
  const formatHumidity = (humidity: number) => `${humidity}%`;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{weather.name}</h2>
          <p className="text-gray-600 capitalize">
            {weather.weather[0]?.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-blue-600">
            {formatTemperature(weather.main.temp, temperatureUnit)}
          </div>
          <div className="text-sm text-gray-500">
            Feels like {formatTemperature(weather.main.feels_like, temperatureUnit)}
          </div>
        </div>
      </div>

      {weather.weather[0]?.icon && (
        <div className="flex justify-center mb-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="text-gray-600">Humidity</span>
          <span className="font-semibold">{formatHumidity(weather.main.humidity)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-600">Wind</span>
          <span className="font-semibold">{formatWindSpeed(weather.wind.speed, temperatureUnit)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-gray-600">Pressure</span>
          <span className="font-semibold">{weather.main.pressure} hPa</span>
        </div>

        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-600">Updated</span>
          <span className="font-semibold">
            {new Date(weather.dt * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}; 