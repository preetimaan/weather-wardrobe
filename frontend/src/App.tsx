import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import useWardrobe from './hooks/useWardrobe';
import { WeatherDisplay } from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import { LocationSearch } from './components/LocationSearch';
import WardrobeSuggestions from './components/WardrobeSuggestions';
import TemperatureToggle from './components/TemperatureToggle';
import type { TemperatureUnit } from './components/TemperatureToggle';
import Closet from './assets/walk-in closet flat background.jpg';

function App() {
  const [, setCurrentCity] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const {
    currentWeather,
    loading: weatherLoading,
    error: weatherError,
    fetchWeatherByCity,
  } = useWeather();

  const {
    wardrobeData,
    loading: wardrobeLoading,
    error: wardrobeError,
    fetchWardrobeSuggestions,
  } = useWardrobe();

  const handleCitySearch = async (city: string) => {
    setCurrentCity(city);
    await fetchWeatherByCity(city);
    await fetchWardrobeSuggestions(city);
  };

  const handleTemperatureUnitChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12">
          <div className="max-w-5xl mx-auto">
            {/* Header - Full width */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Weather Wardrobe
              </h1>
              <p className="text-gray-600 mb-2">
                Your personal weather-based outfit recommendation app
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[400px]">
              {/* Left: Location + Weather */}
              <div className="flex flex-col">
                {!currentWeather ? (
                  <div className="flex flex-col items-center justify-start h-full pt-12">
                    <LocationSearch
                      onSearch={handleCitySearch}
                      loading={weatherLoading || wardrobeLoading}
                      className="mb-6"
                    />
                    {/* Temperature Toggle for empty state */}
                    <TemperatureToggle
                      unit={temperatureUnit}
                      onUnitChange={handleTemperatureUnitChange}
                      className="mt-4"
                    />
                  </div>
                ) : (
                  <>
                    <LocationSearch
                      onSearch={handleCitySearch}
                      loading={weatherLoading || wardrobeLoading}
                      className="mb-6"
                    />
                    {/* Temperature Toggle */}
                    <div className="mb-4">
                      <TemperatureToggle
                        unit={temperatureUnit}
                        onUnitChange={handleTemperatureUnitChange}
                      />
                    </div>
                    {(weatherError || wardrobeError) && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              Error
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                              {weatherError || wardrobeError}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {(weatherLoading || wardrobeLoading) && !currentWeather && (
                      <div className="flex justify-center items-center py-8 flex-1">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    {currentWeather && (
                      <div className="flex flex-col flex-1">
                        <WeatherDisplay
                          weather={currentWeather}
                          temperatureUnit={temperatureUnit}
                          className="mt-6"
                        />

                        {/* Weather Details */}
                        {wardrobeData && (
                          <WeatherDetails
                            weather={wardrobeData.weather}
                            temperatureUnit={temperatureUnit}
                            className="mt-6"
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Right: Wardrobe Suggestions or Empty State */}
              <div className="flex flex-col">
                {currentWeather ? (
                  <div className="flex flex-col h-full">
                    <WardrobeSuggestions
                      wardrobeData={wardrobeData}
                      loading={wardrobeLoading}
                      error={wardrobeError}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-start h-full pt-12">
                    <img
                      src={Closet}
                      alt="Closet with clothing"
                      className="w-72 h-66 mx-auto mb-6 opacity-80"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                      Ready to get dressed?
                    </h3>
                    <p className="text-gray-600 text-center">
                      Search for a city to see weather and wardrobe
                      suggestions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
