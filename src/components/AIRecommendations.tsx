import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { DailyForecast, CurrentWeather } from '../types';

interface Props {
  location: string;
  forecast: DailyForecast;
  currentWeather: CurrentWeather;
}

export function AIRecommendations({ location, forecast, currentWeather }: Props) {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location, forecast, currentWeather }),
        });
        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch recommendations');
        }
        
        setRecommendations(data.recommendations);
      } catch (err: any) {
        setError(err.message || 'Could not load AI recommendations at this time.');
      } finally {
        setIsLoading(false);
      }
    }

    if (location && forecast) {
      fetchRecommendations();
    }
  }, [location, forecast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-3xl p-6 md:p-8 border border-indigo-100 dark:border-indigo-900 shadow-sm transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 tracking-tight">Planning Recommendations</h3>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-4 bg-indigo-200/50 dark:bg-indigo-800/50 rounded w-3/4"></div>
          <div className="h-4 bg-indigo-200/50 dark:bg-indigo-800/50 rounded w-1/2"></div>
          <div className="h-4 bg-indigo-200/50 dark:bg-indigo-800/50 rounded w-5/6"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
      ) : recommendations ? (
        <div className="prose prose-sm md:prose-base prose-indigo text-indigo-900 dark:text-indigo-100 max-w-none">
          {/* Simple markdown-like rendering for bullet points */}
          {recommendations.split('\n').map((line, i) => {
            if (line.startsWith('* ') || line.startsWith('- ')) {
              return (
                <div key={i} className="flex gap-2 mt-2">
                  <span className="text-indigo-400 dark:text-indigo-500 mt-0.5">•</span>
                  <span>{line.replace(/^[-*]\s*/, '').replace(/\*\*/g, '')}</span>
                </div>
              );
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="mb-2">{line.replace(/\*\*/g, '')}</p>;
          })}
        </div>
      ) : null}
    </motion.div>
  );
}
