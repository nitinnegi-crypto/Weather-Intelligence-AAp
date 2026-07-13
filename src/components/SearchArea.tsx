import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchArea({ onSearch, isLoading }: Props) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-3 pl-12 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        disabled={isLoading}
      />
      <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
