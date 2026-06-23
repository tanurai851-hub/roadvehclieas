import { useState } from 'react';
import { kpiData, monthlyTrends, vehicleTypeDistribution, fuelTypeDistribution, riskDistribution } from '../data/sampleData';
import {
  Truck, Activity, MapPin, Fuel, Wrench, AlertTriangle,
  Download, Filter, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';

const iconMap: Record<string, React.ElementType> = {
  Truck, Activity, MapPin, Fuel, Wrench, AlertTriangle
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('yearly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time overview of your vehicle fleet analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select-field text-sm py-2 px-3 w-auto"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-secondary text-sm py-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = iconMap[kpi.icon] || Activity;
          const isPositive = kpi.changeType === 'positive';
          return (
            <div key={index} className="glass-card p-4 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  isPositive ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <Icon className={`w-4 h-4 ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
                </div>
                <span className="text-xs text-gray-400">Today</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{kpi.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${
                  isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="card-title">Monthly Trends</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Vehicle and maintenance trends over time</p>
            </div>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMaintenance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="month" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis yAxisId="left" stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  backdropFilter: 'blur(12px)',
                }}
              />
              <Area yAxisId="left" type="monotone" dataKey="vehicles" stroke="#6366f1" fill="url(#colorVehicles)" strokeWidth={2} name="Vehicles" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="card-title">Vehicle Distribution</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Distribution by vehicle type</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {vehicleTypeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  backdropFilter: 'blur(12px)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fuel Type Analysis */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Fuel Type Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fuelTypeDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis type="number" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis type="category" dataKey="name" stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {fuelTypeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Analysis */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Risk Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance Cost Trend */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Maintenance Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="colorMC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="month" stroke="currentColor" className="text-xs text-gray-400" />
              <YAxis stroke="currentColor" className="text-xs text-gray-400" />
              <Tooltip />
              <Area type="monotone" dataKey="maintenance" stroke="#f59e0b" fill="url(#colorMC)" strokeWidth={2} name="Maintenance Cost (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Vehicles Table */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="card-title">Recent Vehicles</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest vehicle records in the system</p>
          </div>
          <button className="btn-secondary text-sm py-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="table-header">Vehicle ID</th>
                <th className="table-header">Type</th>
                <th className="table-header">Age</th>
                <th className="table-header">Mileage</th>
                <th className="table-header">Fuel Type</th>
                <th className="table-header">Condition</th>
                <th className="table-header">Risk Level</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'VH001', type: 'Sedan', age: '3 yrs', mileage: '45,000 km', fuel: 'Petrol', condition: 'Good', risk: 'Low' },
                { id: 'VH004', type: 'Truck', age: '8 yrs', mileage: '180,000 km', fuel: 'Diesel', condition: 'Poor', risk: 'High' },
                { id: 'VH007', type: 'Motorcycle', age: '4 yrs', mileage: '35,000 km', fuel: 'Petrol', condition: 'Good', risk: 'Medium' },
                { id: 'VH012', type: 'Truck', age: '12 yrs', mileage: '320,000 km', fuel: 'Diesel', condition: 'Critical', risk: 'Very High' },
              ].map((v) => (
                <tr key={v.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="table-cell font-medium">{v.id}</td>
                  <td className="table-cell">{v.type}</td>
                  <td className="table-cell">{v.age}</td>
                  <td className="table-cell">{v.mileage}</td>
                  <td className="table-cell">{v.fuel}</td>
                  <td className="table-cell">
                    <span className={`badge ${
                      v.condition === 'Excellent' ? 'badge-green' :
                      v.condition === 'Good' ? 'badge-blue' :
                      v.condition === 'Poor' ? 'badge-yellow' : 'badge-red'
                    }`}>{v.condition}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${
                      v.risk === 'Low' ? 'badge-green' :
                      v.risk === 'Medium' ? 'badge-yellow' :
                      v.risk === 'High' ? 'badge-red' : 'badge-red'
                    }`}>{v.risk}</span>
                  </td>
                  <td className="table-cell">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
