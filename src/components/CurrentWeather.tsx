import { CurrentWeather as CurrentWeatherType } from '../types';
import { getWeatherDetails } from '../lib/weather';
import { Wind, Thermometer } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  data: CurrentWeatherType;
  cityName: string;
}

export function CurrentWeather({ data, cityName }: Props) {
  const { label, icon } = getWeatherDetails(data.weathercode);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center mt-8 transition-colors"
    >
      <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 tracking-tight">{cityName}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{label}</p>
      
      <div className="w-32 h-32 my-6">
        {icon}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold tracking-tighter text-gray-900 dark:text-white">
            {Math.round(data.temperature)}°
          </span>
          <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-sm">
            <Thermometer className="w-4 h-4" />
            <span>Temp</span>
          </div>
        </div>
        
        <div className="w-px h-12 bg-gray-200 dark:bg-gray-800"></div>
        
        <div className="flex flex-col items-center">
          <span className="text-2xl font-medium text-gray-800 dark:text-gray-200 mt-2">
            {data.windspeed} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">km/h</span>
          </span>
          <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-sm">
            <Wind className="w-4 h-4" />
            <span>Wind</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
