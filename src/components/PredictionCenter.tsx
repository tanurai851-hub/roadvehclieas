import { useState } from 'react';
import { Sparkles, Shield, DollarSign, Fuel, Heart, Lightbulb, Car } from 'lucide-react';
import toast from 'react-hot-toast';

interface PredictionForm {
  vehicleType: string;
  vehicleAge: number;
  fuelType: string;
  engineCapacity: number;
  mileage: number;
  speed: number;
  roadCondition: string;
  driverAge: number;
  trafficDensity: string;
  weatherCondition: string;
  accidentHistory: number;
  serviceFrequency: number;
}

const defaultForm: PredictionForm = {
  vehicleType: 'Sedan', vehicleAge: 5, fuelType: 'Petrol', engineCapacity: 1.6,
  mileage: 50000, speed: 60, roadCondition: 'City', driverAge: 35,
  trafficDensity: 'Medium', weatherCondition: 'Clear', accidentHistory: 0,
  serviceFrequency: 2,
};

export default function PredictionCenter() {
  const [form, setForm] = useState<PredictionForm>(defaultForm);
  const [prediction, setPrediction] = useState<{
    accidentRisk: string;
    maintenanceCost: number;
    fuelConsumption: number;
    healthScore: number;
  } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleChange = (field: keyof PredictionForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      // Simulated ML predictions
      const ageFactor = form.vehicleAge * 0.08;
      const mileageFactor = form.mileage / 100000 * 0.12;
      const accidentFactor = form.accidentHistory * 0.15;

      const riskScore = ageFactor + mileageFactor + accidentFactor;
      const accidentRisk = riskScore < 0.3 ? 'Low' : riskScore < 0.6 ? 'Medium' : riskScore < 0.8 ? 'High' : 'Very High';

      const maintenanceCost = 5000 + form.vehicleAge * 3000 + form.mileage * 0.08 + form.accidentHistory * 5000;
      const fuelConsumption = form.fuelType === 'Electric' ? 0 : form.fuelType === 'Hybrid' ? 5 + form.engineCapacity * 0.5 : 7 + form.engineCapacity * 1.2;
      const healthScore = Math.max(0, Math.min(100, 100 - (riskScore * 100) - (form.vehicleAge * 2) + form.serviceFrequency * 5));

      setPrediction({ accidentRisk, maintenanceCost: Math.round(maintenanceCost), fuelConsumption: Math.round(fuelConsumption * 10) / 10, healthScore: Math.round(healthScore) });
      setIsPredicting(false);
      toast.success('Prediction completed successfully!');
    }, 2000);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setPrediction(null);
    toast.success('Form reset');
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    if (score >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const getHealthBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-amber-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prediction Center</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter vehicle details to get ML-powered predictions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
              <Car className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="card-title">Vehicle Details</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                <select className="select-field" value={form.vehicleType} onChange={(e) => handleChange('vehicleType', e.target.value)}>
                  {['Sedan', 'SUV', 'Hatchback', 'Truck', 'Motorcycle', 'Bus'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Type</label>
                <select className="select-field" value={form.fuelType} onChange={(e) => handleChange('fuelType', e.target.value)}>
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Age (years)</label>
                <input type="number" className="input-field" value={form.vehicleAge} onChange={(e) => handleChange('vehicleAge', parseInt(e.target.value) || 0)} min={0} max={30} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Engine Capacity (L)</label>
                <input type="number" step="0.1" className="input-field" value={form.engineCapacity} onChange={(e) => handleChange('engineCapacity', parseFloat(e.target.value) || 0)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mileage (km)</label>
                <input type="number" className="input-field" value={form.mileage} onChange={(e) => handleChange('mileage', parseInt(e.target.value) || 0)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Speed (km/h)</label>
                <input type="number" className="input-field" value={form.speed} onChange={(e) => handleChange('speed', parseInt(e.target.value) || 0)} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Road Condition</label>
                <select className="select-field" value={form.roadCondition} onChange={(e) => handleChange('roadCondition', e.target.value)}>
                  {['Highway', 'City', 'Rural'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Traffic</label>
                <select className="select-field" value={form.trafficDensity} onChange={(e) => handleChange('trafficDensity', e.target.value)}>
                  {['Low', 'Medium', 'High', 'Very High'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weather</label>
                <select className="select-field" value={form.weatherCondition} onChange={(e) => handleChange('weatherCondition', e.target.value)}>
                  {['Clear', 'Rainy', 'Foggy', 'Snowy'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Driver Age</label>
                <input type="number" className="input-field" value={form.driverAge} onChange={(e) => handleChange('driverAge', parseInt(e.target.value) || 0)} min={18} max={80} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accident History</label>
                <input type="number" className="input-field" value={form.accidentHistory} onChange={(e) => handleChange('accidentHistory', parseInt(e.target.value) || 0)} min={0} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Freq. (per year)</label>
                <input type="number" className="input-field" value={form.serviceFrequency} onChange={(e) => handleChange('serviceFrequency', parseInt(e.target.value) || 0)} min={0} />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={handlePredict} disabled={isPredicting} className="btn-primary flex-1 justify-center">
                {isPredicting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Predicting...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run Prediction
                  </>
                )}
              </button>
              <button onClick={handleReset} className="btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="space-y-6">
          {prediction ? (
            <>
              {/* Accident Risk */}
              <div className="glass-card p-6 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Accident Risk Prediction</h4>
                      <p className="text-xs text-gray-500">Based on vehicle and driver profile</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    prediction.accidentRisk === 'Low' ? 'text-emerald-500' :
                    prediction.accidentRisk === 'Medium' ? 'text-amber-500' :
                    'text-red-500'
                  }`}>{prediction.accidentRisk}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      prediction.accidentRisk === 'Low' ? 'bg-emerald-500 w-3/12' :
                      prediction.accidentRisk === 'Medium' ? 'bg-amber-500 w-6/12' :
                      prediction.accidentRisk === 'High' ? 'bg-orange-500 w-9/12' :
                      'bg-red-500 w-full'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Confidence: {prediction.accidentRisk === 'Low' ? '92%' : prediction.accidentRisk === 'Medium' ? '85%' : '78%'}
                </p>
              </div>

              {/* Maintenance Cost */}
              <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Predicted Maintenance Cost</h4>
                      <p className="text-xs text-gray-500">Estimated annual cost</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{prediction.maintenanceCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Fuel Consumption */}
              <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Fuel className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Fuel Consumption</h4>
                      <p className="text-xs text-gray-500">Per 100 km</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {prediction.fuelConsumption === 0 ? '0' : prediction.fuelConsumption} <span className="text-sm font-normal text-gray-500">L/100km</span>
                  </span>
                </div>
              </div>

              {/* Health Score */}
              <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Vehicle Health Score</h4>
                      <p className="text-xs text-gray-500">Overall vehicle condition</p>
                    </div>
                  </div>
                  <span className={`text-3xl font-bold ${getHealthColor(prediction.healthScore)}`}>
                    {prediction.healthScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${getHealthBg(prediction.healthScore)}`}
                    style={{ width: `${prediction.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="glass-card p-6 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 border-indigo-200 dark:border-indigo-800 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                    <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recommendation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {prediction.healthScore >= 80
                        ? 'Vehicle is in excellent condition. Continue regular maintenance schedule.'
                        : prediction.healthScore >= 60
                        ? 'Vehicle is in good condition. Consider scheduling a routine service check.'
                        : prediction.healthScore >= 40
                        ? 'Vehicle needs attention. Schedule a comprehensive inspection soon.'
                        : 'Vehicle requires immediate service. Visit the service center as soon as possible.'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 mb-4">
                <Sparkles className="w-12 h-12 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Predict</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fill in the vehicle details on the left and click "Run Prediction" to get AI-powered insights
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
