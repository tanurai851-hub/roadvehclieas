import { PageType } from '../types';
import {
  LayoutDashboard, Upload, BarChart3, Brain, Sparkles,
  HeartPulse, Lightbulb, FileText, GitCompare, ChevronLeft, ChevronRight,
  Car
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems: { page: PageType; label: string; icon: React.ElementType; badge?: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'data-management', label: 'Data Management', icon: Upload },
  { page: 'eda', label: 'EDA & Analytics', icon: BarChart3 },
  { page: 'ml-models', label: 'ML Models', icon: Brain, badge: '7' },
  { page: 'prediction-center', label: 'Prediction Center', icon: Sparkles },
  { page: 'vehicle-health', label: 'Vehicle Health', icon: HeartPulse },
  { page: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { page: 'reports', label: 'Reports', icon: FileText },
  { page: 'model-comparison', label: 'Model Comparison', icon: GitCompare },
];

export default function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-gray-200 dark:border-gray-800 ${!isOpen && 'justify-center'}`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
          <Car className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Road Vehicle</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Analytical System</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`w-full ${isOpen ? 'justify-start' : 'justify-center'} ${
                isActive ? 'nav-link-active' : 'nav-link-inactive'
              }`}
              title={!isOpen ? item.label : undefined}
            >
              <div className="relative">
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              {isOpen && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
