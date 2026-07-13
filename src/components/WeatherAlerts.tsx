import { AlertTriangle } from 'lucide-react';
import { DailyForecast } from '../types';
import { motion } from 'motion/react';
import { formatDate } from '../lib/weather';

interface Props {
  data: DailyForecast;
}

export function WeatherAlerts({ data }: Props) {
  const alerts: { date: string; type: string; severity: 'high' | 'medium' }[] = [];

  data.time.forEach((dateStr, i) => {
    const code = data.weathercode[i];
    const maxTemp = data.temperature_2m_max[i];
    const minTemp = data.temperature_2m_min[i];

    // Thunderstorms
    if ([95, 96, 99].includes(code)) {
      alerts.push({ date: dateStr, type: 'Thunderstorms expected', severity: 'high' });
    }
    // Heavy rain/showers
    if ([65, 67, 82].includes(code)) {
      alerts.push({ date: dateStr, type: 'Heavy rain expected', severity: 'medium' });
    }
    // Heavy snow/blizzard
    if ([75, 77, 86].includes(code)) {
      alerts.push({ date: dateStr, type: 'Heavy snow expected', severity: 'high' });
    }
    // Extreme Heat
    if (maxTemp >= 35) {
      alerts.push({ date: dateStr, type: `Extreme heat (${Math.round(maxTemp)}°C)`, severity: 'high' });
    }
    // Extreme Cold
    if (minTemp <= -10) {
      alerts.push({ date: dateStr, type: `Extreme cold (${Math.round(minTemp)}°C)`, severity: 'high' });
    }
  });

  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 bg-red-50 dark:bg-red-950/30 rounded-3xl p-6 border border-red-100 dark:border-red-900/50 shadow-sm transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 tracking-tight">Weather Alerts & Warnings</h3>
      </div>
      <div className="flex flex-col gap-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white/60 dark:bg-gray-900/50 rounded-xl p-4 border border-red-50 dark:border-red-900/30">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${alert.severity === 'high' ? 'bg-red-500 dark:bg-red-400' : 'bg-orange-400 dark:bg-orange-400'}`}></span>
              <span className="font-medium text-red-900 dark:text-red-200">{alert.type}</span>
            </div>
            <span className="text-sm font-medium text-red-700 dark:text-red-300">{formatDate(alert.date)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
