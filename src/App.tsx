import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataManagement from './components/DataManagement';
import EDAPage from './components/EDAPage';
import MLModels from './components/MLModels';
import PredictionCenter from './components/PredictionCenter';
import VehicleHealthIndex from './components/VehicleHealthIndex';
import RecommendationEngine from './components/RecommendationEngine';
import Reports from './components/Reports';
import ModelComparison from './components/ModelComparison';
import { PageType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'data-management':
        return <DataManagement />;
      case 'eda':
        return <EDAPage />;
      case 'ml-models':
        return <MLModels />;
      case 'prediction-center':
        return <PredictionCenter />;
      case 'vehicle-health':
        return <VehicleHealthIndex />;
      case 'recommendations':
        return <RecommendationEngine />;
      case 'reports':
        return <Reports />;
      case 'model-comparison':
        return <ModelComparison />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: darkMode ? '#1e293b' : '#fff',
            color: darkMode ? '#e2e8f0' : '#1e293b',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
          },
        }}
      />
      
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header
          currentPage={currentPage}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
