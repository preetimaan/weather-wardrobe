import { useWeather } from './hooks/useWeather';
import { WeatherDisplay } from './components/WeatherDisplay';
import { LocationSearch } from './components/LocationSearch';

function App() {
  const {
    currentWeather,
    loading,
    error,
    fetchWeatherByCity,
  } = useWeather();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Weather Wardrobe
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  Your personal weather-based outfit recommendation app
                </p>
                
                {/* Location Search */}
                <LocationSearch 
                  onSearch={fetchWeatherByCity}
                  loading={loading}
                  className="mb-6"
                />

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weather Display */}
                {currentWeather && (
                  <WeatherDisplay 
                    weather={currentWeather}
                    className="mt-6"
                  />
                )}

                {/* Loading State */}
                {loading && !currentWeather && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
