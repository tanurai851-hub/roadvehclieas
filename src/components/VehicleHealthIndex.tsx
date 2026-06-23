import { useState } from 'react';
import { Heart, Activity, Gauge, Car, Battery, Shield, Wrench } from 'lucide-react';
import { sampleVehicles } from '../data/sampleData';
import { HealthScore } from '../types';

const calculateHealthScore = (vehicle: typeof sampleVehicles[0]): HealthScore => {
  const ageScore = Math.max(0, 100 - vehicle.vehicleAge * 8);
  const mileageScore = Math.max(0, 100 - (vehicle.mileage / 5000));
  const maintenanceScore = Math.min(100, vehicle.serviceFrequency * 20);
  const accidentScore = Math.max(0, 100 - vehicle.accidentHistory * 30);
  const fuelScore = vehicle.fuelType === 'Electric' ? 95 :
    Math.max(0, 100 - (vehicle.fuelConsumption * 3));

  const score = Math.round((ageScore * 0.25 + mileageScore * 0.25 + maintenanceScore * 0.2 + accidentScore * 0.15 + fuelScore * 0.15));

  const category: HealthScore['category'] =
    score >= 80 ? 'Excellent' :
    score >= 60 ? 'Good' :
    score >= 40 ? 'Average' :
    score >= 20 ? 'Poor' : 'Critical';

  return {
    score,
    category,
    parameters: [
      { label: 'Vehicle Age', value: Math.round(ageScore), max: 100, status: ageScore >= 60 ? 'good' : ageScore >= 30 ? 'warning' : 'danger' },
      { label: 'Mileage', value: Math.round(mileageScore), max: 100, status: mileageScore >= 60 ? 'good' : mileageScore >= 30 ? 'warning' : 'danger' },
      { label: 'Maintenance Frequency', value: Math.round(maintenanceScore), max: 100, status: maintenanceScore >= 60 ? 'good' : maintenanceScore >= 30 ? 'warning' : 'danger' },
      { label: 'Accident History', value: Math.round(accidentScore), max: 100, status: accidentScore >= 60 ? 'good' : accidentScore >= 30 ? 'warning' : 'danger' },
      { label: 'Fuel Efficiency', value: Math.round(fuelScore), max: 100, status: fuelScore >= 60 ? 'good' : fuelScore >= 30 ? 'warning' : 'danger' },
    ],
  };
};

export default function VehicleHealthIndex() {
  const [selectedVehicle, setSelectedVehicle] = useState(sampleVehicles[0]);
  const [healthScore, setHealthScore] = useState<HealthScore>(calculateHealthScore(sampleVehicles[0]));

  const handleVehicleSelect = (vehicle: typeof sampleVehicles[0]) => {
    setSelectedVehicle(vehicle);
    setHealthScore(calculateHealthScore(vehicle));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Excellent': return 'text-emerald-500';
      case 'Good': return 'text-blue-500';
      case 'Average': return 'text-amber-500';
      case 'Poor': return 'text-orange-500';
      case 'Critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Health Index</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive health scoring and analysis for each vehicle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Selector */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Select Vehicle</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {sampleVehicles.map(v => (
              <button
                key={v.id}
                onClick={() => handleVehicleSelect(v)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                  selectedVehicle.id === v.id
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Car className={`w-5 h-5 ${selectedVehicle.id === v.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{v.id}</p>
                    <p className="text-xs text-gray-500">{v.vehicleType} - {v.vehicleAge} yrs</p>
                  </div>
                </div>
                <span className={`text-xs font-bold ${getCategoryColor(calculateHealthScore(v).category)}`}>
                  {calculateHealthScore(v).score}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Health Score Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Score */}
          <div className="glass-card p-8 text-center">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getCategoryColor(healthScore.category)}`}>
                      {healthScore.score}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Heart className={`w-8 h-8 ${getCategoryColor(healthScore.category)} animate-pulse`} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedVehicle.id} - {selectedVehicle.vehicleType}
            </h3>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
              healthScore.category === 'Excellent' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
              healthScore.category === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              healthScore.category === 'Average' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
              healthScore.category === 'Poor' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {healthScore.category}
            </span>
          </div>

          {/* Parameter Breakdown */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-6">Parameter Breakdown</h3>
            <div className="space-y-5">
              {healthScore.parameters.map((param, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(param.status)}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{param.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{param.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-1000 ${getStatusColor(param.status)}`}
                      style={{ width: `${param.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Vehicle Type', value: selectedVehicle.vehicleType, icon: Car },
                { label: 'Vehicle Age', value: `${selectedVehicle.vehicleAge} years`, icon: Activity },
                { label: 'Fuel Type', value: selectedVehicle.fuelType, icon: Battery },
                { label: 'Mileage', value: `${selectedVehicle.mileage.toLocaleString()} km`, icon: Gauge },
                { label: 'Accident History', value: `${selectedVehicle.accidentHistory} accidents`, icon: Shield },
                { label: 'Service Frequency', value: `${selectedVehicle.serviceFrequency}/year`, icon: Wrench },
              ].map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{detail.label}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{detail.value}</p>
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
