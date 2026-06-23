import { useState } from 'react';
import { sampleVehicles, vehicleTypeDistribution, fuelTypeDistribution } from '../data/sampleData';
import { Download } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#f59e0b'];

export default function EDAPage() {
  const [selectedChart, setSelectedChart] = useState('all');

  // Compute age distribution
  const ageDistribution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(age => ({
    age: `${age} yrs`,
    count: sampleVehicles.filter(v => v.vehicleAge === age).length,
  }));

  // Compute mileage vs maintenance
  const mileageMaintenance = sampleVehicles.map(v => ({
    mileage: v.mileage,
    maintenance: v.maintenanceCost,
    type: v.vehicleType,
  }));

  // Vehicle condition distribution
  const conditionDist = ['Excellent', 'Good', 'Average', 'Poor', 'Critical'].map(c => ({
    name: c,
    value: sampleVehicles.filter(v => v.condition === c).length,
  }));

  // Fuel consumption by vehicle type
  const fuelByType = ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Motorcycle', 'Bus'].map(t => {
    const vehicles = sampleVehicles.filter(v => v.vehicleType === t);
    return {
      name: t,
      consumption: vehicles.length ? vehicles.reduce((s, v) => s + v.fuelConsumption, 0) / vehicles.length : 0,
    };
  });

  const chartCategories = [
    { id: 'all', label: 'All Charts' },
    { id: 'distribution', label: 'Distributions' },
    { id: 'trends', label: 'Trends' },
    { id: 'correlation', label: 'Correlations' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exploratory Data Analysis</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive analysis of vehicle data with visualizations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {chartCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedChart(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedChart === cat.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-sm py-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Vehicle Types', value: '6', sub: 'Categories' },
          { label: 'Avg Vehicle Age', value: '5.2', sub: 'Years' },
          { label: 'Avg Mileage', value: '98.4k', sub: 'Kilometers' },
          { label: 'Avg Maintenance', value: '₹26.5k', sub: 'Per vehicle' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            <p className="text-xs text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Type Distribution */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Vehicle Type Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vehicleTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="name" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {vehicleTypeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Type Analysis */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Fuel Type Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={fuelTypeDistribution}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={100}
                paddingAngle={3} dataKey="value"
              >
                {fuelTypeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Vehicle Age Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ageDistribution}>
              <defs>
                <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="age" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#ageGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Condition Distribution */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Vehicle Condition Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={conditionDist.filter(d => d.value > 0)}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={95}
                paddingAngle={4} dataKey="value"
              >
                {conditionDist.filter(d => d.value > 0).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Mileage vs Maintenance Scatter */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Mileage vs Maintenance Cost</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="mileage" name="Mileage" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis dataKey="maintenance" name="Maintenance" stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={mileageMaintenance} fill="#6366f1" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Consumption by Type */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Avg Fuel Consumption by Vehicle Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fuelByType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis type="number" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis type="category" dataKey="name" stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip />
              <Bar dataKey="consumption" radius={[0, 8, 8, 0]}>
                {fuelByType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Correlation Matrix Visualization */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="card-title mb-4">Feature Correlation Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Key Correlations:</p>
              {[
                { f1: 'Vehicle Age', f2: 'Maintenance Cost', corr: '0.82', level: 'Strong Positive' },
                { f1: 'Mileage', f2: 'Maintenance Cost', corr: '0.79', level: 'Strong Positive' },
                { f1: 'Vehicle Age', f2: 'Fuel Consumption', corr: '0.65', level: 'Moderate Positive' },
                { f1: 'Engine Capacity', f2: 'Fuel Consumption', corr: '0.71', level: 'Strong Positive' },
                { f1: 'Service Frequency', f2: 'Vehicle Age', corr: '0.74', level: 'Strong Positive' },
                { f1: 'Accident History', f2: 'Risk Level', corr: '0.68', level: 'Moderate Positive' },
              ].map((corr, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{corr.f1}</span>
                    <span className="text-xs text-gray-400">↔</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{corr.f2}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${
                      parseFloat(corr.corr) > 0.7 ? 'text-emerald-600 dark:text-emerald-400' :
                      parseFloat(corr.corr) > 0.5 ? 'text-amber-600 dark:text-amber-400' :
                      'text-gray-500'
                    }`}>{corr.corr}</span>
                    <span className={`badge text-xs ${
                      corr.level === 'Strong Positive' ? 'badge-green' :
                      corr.level === 'Moderate Positive' ? 'badge-yellow' : 'badge-blue'
                    }`}>{corr.level}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md"
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${intensity})`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
