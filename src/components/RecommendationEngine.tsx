import { useState } from 'react';
import { Lightbulb, Wrench, AlertTriangle, Fuel, TrendingUp, Shield, Car, Clock, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { sampleVehicles } from '../data/sampleData';
import { Recommendation } from '../types';

const generateRecommendations = (vehicle: typeof sampleVehicles[0]): Recommendation[] => {
  const recs: Recommendation[] = [];

  // Age-based recommendations
  if (vehicle.vehicleAge > 8) {
    recs.push({
      title: 'Immediate Service Required',
      description: `Vehicle is ${vehicle.vehicleAge} years old. Schedule comprehensive inspection including engine, transmission, and brake systems.`,
      priority: 'high',
      category: 'Maintenance',
      icon: 'Wrench',
    });
  }

  // Mileage-based
  if (vehicle.mileage > 100000) {
    recs.push({
      title: 'Tire Replacement Suggested',
      description: `High mileage (${(vehicle.mileage / 1000).toFixed(0)}k km) indicates tires may need replacement. Check tread depth and alignment.`,
      priority: 'high',
      category: 'Safety',
      icon: 'AlertTriangle',
    });
  }

  // Fuel efficiency
  if (vehicle.fuelConsumption > 10) {
    recs.push({
      title: 'Fuel Efficiency Improvement',
      description: `Current consumption is ${vehicle.fuelConsumption} L/100km. Consider engine tuning, air filter replacement, and driving habit optimization.`,
      priority: 'medium',
      category: 'Fuel',
      icon: 'Fuel',
    });
  }

  // Accident history
  if (vehicle.accidentHistory > 0) {
    recs.push({
      title: 'Risk Reduction Advice',
      description: `Vehicle has ${vehicle.accidentHistory} accident(s) on record. Recommend advanced driver assistance systems (ADAS) check and defensive driving training.`,
      priority: 'high',
      category: 'Safety',
      icon: 'Shield',
    });
  }

  // Service frequency
  if (vehicle.serviceFrequency < 2 && vehicle.vehicleAge > 3) {
    recs.push({
      title: 'Maintenance Optimization',
      description: 'Service frequency is below recommended levels. Increase to at least 2 services per year for optimal performance.',
      priority: 'medium',
      category: 'Maintenance',
      icon: 'TrendingUp',
    });
  }

  // Routine check recommendations
  recs.push({
    title: 'Regular Oil Change Due',
    description: vehicle.vehicleAge > 5
      ? 'Use high-mileage synthetic oil for better engine protection.'
      : 'Schedule routine oil change every 5,000 km or as per manufacturer recommendation.',
    priority: 'medium',
    category: 'Maintenance',
    icon: 'Clock',
  });

  if (recs.length === 0) {
    recs.push({
      title: 'Vehicle in Excellent Condition',
      description: 'No immediate recommendations. Continue regular maintenance schedule.',
      priority: 'low',
      category: 'General',
      icon: 'Lightbulb',
    });
  }

  return recs;
};

const iconMap: Record<string, React.ElementType> = {
  Wrench, AlertTriangle, Fuel, Shield, TrendingUp, Clock, Lightbulb,
};

export default function RecommendationEngine() {
  const [selectedVehicle, setSelectedVehicle] = useState(sampleVehicles[0]);
  const [expandedRec, setExpandedRec] = useState<number | null>(0);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(generateRecommendations(sampleVehicles[0]));

  const handleVehicleChange = (vehicle: typeof sampleVehicles[0]) => {
    setSelectedVehicle(vehicle);
    setRecommendations(generateRecommendations(vehicle));
    setExpandedRec(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10';
      case 'medium': return 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10';
      case 'low': return 'border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10';
      default: return 'border-l-gray-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-red';
      case 'medium': return 'badge-yellow';
      case 'low': return 'badge-green';
      default: return 'badge-blue';
    }
  };

  const highPriority = recommendations.filter(r => r.priority === 'high').length;
  const mediumPriority = recommendations.filter(r => r.priority === 'medium').length;
  const lowPriority = recommendations.filter(r => r.priority === 'low').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommendation Engine</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-powered maintenance and safety recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary" onClick={() => { setRecommendations(generateRecommendations(selectedVehicle)); }}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{recommendations.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Recommendations</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-2xl font-bold text-red-500">{highPriority}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">High Priority</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-2xl font-bold text-amber-500">{mediumPriority}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Medium Priority</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-2xl font-bold text-emerald-500">{lowPriority}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Low Priority</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Selector */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Select Vehicle</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sampleVehicles.map(v => (
              <button
                key={v.id}
                onClick={() => handleVehicleChange(v)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selectedVehicle.id === v.id
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Car className={`w-5 h-5 ${selectedVehicle.id === v.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{v.id}</p>
                  <p className="text-xs text-gray-500">{v.vehicleType} - {v.vehicleAge} yrs - {v.condition}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="card-title">
                  Recommendations for {selectedVehicle.id}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {selectedVehicle.vehicleType} - {selectedVehicle.vehicleAge} years old - {selectedVehicle.mileage.toLocaleString()} km
                </p>
              </div>
              <Lightbulb className="w-6 h-6 text-amber-500" />
            </div>

            <div className="space-y-3">
              {recommendations.map((rec, i) => {
                const Icon = iconMap[rec.icon] || Lightbulb;
                const isExpanded = expandedRec === i;
                return (
                  <div
                    key={i}
                    className={`border-l-4 rounded-xl overflow-hidden transition-all ${
                      isExpanded ? 'shadow-md' : 'shadow-sm'
                    } ${getPriorityColor(rec.priority)}`}
                  >
                    <button
                      onClick={() => setExpandedRec(isExpanded ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          rec.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                          rec.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' :
                          'bg-emerald-100 dark:bg-emerald-900/30'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            rec.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                            rec.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                            'text-emerald-600 dark:text-emerald-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{rec.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`badge text-xs ${getPriorityBadge(rec.priority)}`}>
                              {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400">{rec.category}</span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <div className="ml-11 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button className="text-xs btn-primary py-1.5 px-3">Apply Recommendation</button>
                            <button className="text-xs btn-secondary py-1.5 px-3">Dismiss</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-4">Recommendation Categories</h3>
            <div className="flex gap-4 flex-wrap">
              {['Maintenance', 'Safety', 'Fuel', 'General'].map(cat => {
                const count = recommendations.filter(r => r.category === cat).length;
                return (
                  <div key={cat} className="flex-1 min-w-[120px] p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
