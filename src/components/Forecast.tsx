import { DailyForecast } from '../types';
import { getWeatherDetails, formatDate } from '../lib/weather';
import { motion } from 'motion/react';

interface Props {
  data: DailyForecast;
}

export function Forecast({ data }: Props) {
  const days = data.time.slice(1, 8); // Skip today (index 0) if we want next 7 days, or keep 0-6. Let's do 0-6 to show 7 days including today.

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 px-2">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {data.time.slice(0, 7).map((date, index) => {
          const { icon } = getWeatherDetails(data.weathercode[index]);
          const maxTemp = Math.round(data.temperature_2m_max[index]);
          const minTemp = Math.round(data.temperature_2m_min[index]);
          
          return (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center transition-colors"
            >
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {index === 0 ? 'Today' : formatDate(date).split(',')[0]}
              </span>
              <div className="w-10 h-10 my-3">
                {icon}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{maxTemp}°</span>
                <span className="text-gray-400 dark:text-gray-500">{minTemp}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
