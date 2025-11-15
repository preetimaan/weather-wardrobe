import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import useWardrobe from './hooks/useWardrobe';
import { WeatherDisplay } from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import { LocationSearch } from './components/LocationSearch';
import WardrobeSuggestions from './components/WardrobeSuggestions';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { FilterControls } from './components/FilterControls';
import type { TemperatureUnit } from './components/TemperatureToggle';
import type { Gender } from './components/GenderFilter';

function App() {
  const [, setCurrentCity] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [gender, setGender] = useState<Gender>('unisex');

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
    await fetchWardrobeSuggestions(city, undefined, undefined, gender);
  };

  const handleTemperatureUnitChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  const handleGenderChange = (selectedGender: Gender) => {
    setGender(selectedGender);
    // Refetch wardrobe suggestions with new gender if we have a city
    if (currentWeather) {
      fetchWardrobeSuggestions(currentWeather.name, undefined, undefined, selectedGender);
    }
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
                    {/* Show errors in empty state */}
                    {(weatherError || wardrobeError) && (
                      <ErrorMessage
                        message={weatherError || wardrobeError || ''}
                        className="mb-6 w-full"
                      />
                    )}
                    {/* Filters for empty state */}
                    <FilterControls
                      temperatureUnit={temperatureUnit}
                      gender={gender}
                      onTemperatureUnitChange={handleTemperatureUnitChange}
                      onGenderChange={handleGenderChange}
                    />
                  </div>
                ) : (
                  <>
                    <LocationSearch
                      onSearch={handleCitySearch}
                      loading={weatherLoading || wardrobeLoading}
                      className="mb-6"
                    />
                    {/* Filters */}
                    <FilterControls
                      temperatureUnit={temperatureUnit}
                      gender={gender}
                      onTemperatureUnitChange={handleTemperatureUnitChange}
                      onGenderChange={handleGenderChange}
                      className="mb-4"
                    />
                    {(weatherError || wardrobeError) && (
                      <ErrorMessage
                        message={weatherError || wardrobeError || ''}
                        className="mb-6"
                      />
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
                  <EmptyState />
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
