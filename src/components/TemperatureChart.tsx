import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DailyForecast } from '../types';
import { formatDate } from '../lib/weather';
import { motion } from 'motion/react';

interface Props {
  data: DailyForecast;
}

export function TemperatureChart({ data }: Props) {
  // Format data for Recharts
  const chartData = data.time.slice(0, 7).map((date, index) => ({
    name: index === 0 ? 'Today' : formatDate(date).split(',')[0],
    maxTemp: Math.round(data.temperature_2m_max[index]),
    minTemp: Math.round(data.temperature_2m_min[index]),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6 px-2 tracking-tight">
        Temperature Trends
      </h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMaxTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMinTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '12px',
              }}
              itemStyle={{ fontSize: '14px', fontWeight: 500 }}
              labelStyle={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}
            />
            <Area
              type="monotone"
              dataKey="maxTemp"
              name="Max Temp (°C)"
              stroke="#4F46E5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMaxTemp)"
            />
            <Area
              type="monotone"
              dataKey="minTemp"
              name="Min Temp (°C)"
              stroke="#9CA3AF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMinTemp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
