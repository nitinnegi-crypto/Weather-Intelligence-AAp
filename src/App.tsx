/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SearchArea } from './components/SearchArea';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { TemperatureChart } from './components/TemperatureChart';
import { WeatherAlerts } from './components/WeatherAlerts';
import { ThemeToggle } from './components/ThemeToggle';
import { WeatherData } from './types';
import { CloudRain } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    
    try {
      // 1. Geocode the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try another name.');
      }
      
      const { latitude, longitude, name, country, admin1 } = geoData.results[0];
      const statePart = admin1 ? `${admin1}, ` : '';
      setLocationName(`${name}, ${statePart}${country}`);

      // 2. Fetch weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
      const data = await weatherRes.json();
      
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 p-4 md:p-8 transition-colors duration-300">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto pt-12 pb-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <CloudRain className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 mb-3">
            Weather Intelligence
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Get accurate forecasts for any city.
          </p>
        </div>

        {/* Search */}
        <SearchArea onSearch={handleSearch} isLoading={isLoading} />
        
        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center text-red-500 mt-6"
          >
            {error}
          </motion.div>
        )}

        {/* Weather Results */}
        {weatherData && (
          <div className="mt-8 flex flex-col items-center w-full gap-4">
            <CurrentWeather data={weatherData.current_weather} cityName={locationName} />
            <WeatherAlerts data={weatherData.daily} />
            <TemperatureChart data={weatherData.daily} />
            <Forecast data={weatherData.daily} />
          </div>
        )}
      </div>
    </div>
  );
}
