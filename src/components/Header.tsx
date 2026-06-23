import { PageType } from '../types';
import { Moon, Sun, Bell, Search, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: PageType;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
}

const pageTitles: Record<PageType, string> = {
  dashboard: 'Dashboard',
  'data-management': 'Data Management',
  eda: 'EDA & Analytics',
  'ml-models': 'Machine Learning Models',
  'prediction-center': 'Prediction Center',
  'vehicle-health': 'Vehicle Health Index',
  recommendations: 'Recommendation Engine',
  reports: 'Reports & Analytics',
  'model-comparison': 'Model Comparison',
  settings: 'Settings',
};

export default function Header({ currentPage, darkMode, onToggleDarkMode }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {pageTitles[currentPage]}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Road Vehicle Analytical System
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pr-1 hidden sm:block">Admin</span>
        </button>
      </div>
    </header>
  );
}
