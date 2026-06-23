import { useState } from 'react';
import { sampleMLResults } from '../data/sampleData';
import { Award, BarChart3, TrendingUp, GitCompare, Download, ChevronDown, ChevronUp, Star } from 'lucide-react';
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default function ModelComparison() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const allModels = [...sampleMLResults.classification, ...sampleMLResults.regression];
  const bestOverall = allModels.reduce((best, current) =>
    current.accuracy > best.accuracy ? current : best
  );

  const radarData = [
    { metric: 'Accuracy', ...Object.fromEntries(allModels.map(m => [m.name, m.accuracy * 100])) },
    { metric: 'Precision', ...Object.fromEntries(allModels.map(m => [m.name, m.precision * 100])) },
    { metric: 'Recall', ...Object.fromEntries(allModels.map(m => [m.name, m.recall * 100])) },
    { metric: 'F1 Score', ...Object.fromEntries(allModels.map(m => [m.name, m.f1Score * 100])) },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#14b8a6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Model Comparison</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive comparison of all ML models</p>
        </div>
        <button className="btn-secondary">
          <Download className="w-4 h-4" />
          Export Comparison
        </button>
      </div>

      {/* Best Model Highlight */}
      <div className="glass-card bg-gradient-to-br from-amber-600/10 to-yellow-600/10 dark:from-amber-600/20 dark:to-yellow-600/20 border-amber-200 dark:border-amber-800 p-6">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-200 dark:shadow-amber-900/30">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Best Overall</span>
              <span className="text-xs text-amber-600 dark:text-amber-400">Top Performing Model</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{bestOverall.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Highest accuracy across all metrics with {(bestOverall.accuracy * 100).toFixed(1)}% accuracy score
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { label: 'Accuracy', value: `${(bestOverall.accuracy * 100).toFixed(1)}%` },
              { label: 'Precision', value: `${(bestOverall.precision * 100).toFixed(1)}%` },
              { label: 'F1 Score', value: `${(bestOverall.f1Score * 100).toFixed(1)}%` },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{m.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Comparison */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Model Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={allModels} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="name" stroke="currentColor" className="text-xs text-gray-400" angle={-35} textAnchor="end" height={100} interval={0} />
              <YAxis stroke="currentColor" className="text-xs text-gray-400" domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="precision" name="Precision" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recall" name="Recall" fill="#d946ef" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1Score" name="F1 Score" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h3 className="card-title mb-4">Radar Comparison</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <PolarAngleAxis dataKey="metric" stroke="currentColor" className="text-xs text-gray-400" />
              <PolarRadiusAxis stroke="currentColor" className="text-xs text-gray-400" domain={[0, 100]} />
              <Tooltip />
              {allModels.slice(0, 6).map((model, i) => (
                <Radar
                  key={model.name}
                  name={model.name}
                  dataKey={model.name}
                  stroke={COLORS[i]}
                  fill={COLORS[i]}
                  fillOpacity={0.1}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Rankings Table */}
      <div className="glass-card p-6">
        <h3 className="card-title mb-4">Model Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="table-header">Rank</th>
                <th className="table-header">Model</th>
                <th className="table-header">Type</th>
                <th className="table-header">Accuracy</th>
                <th className="table-header">Precision</th>
                <th className="table-header">Recall</th>
                <th className="table-header">F1 Score</th>
                <th className="table-header">Status</th>
                <th className="table-header">Details</th>
              </tr>
            </thead>
            <tbody>
              {[...allModels]
                .sort((a, b) => b.accuracy - a.accuracy)
                .map((model, index) => (
                  <tr
                    key={model.name}
                    className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      model.bestModel ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''
                    }`}
                  >
                    <td className="table-cell">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        index === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' :
                        index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        {model.bestModel && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        allModels.indexOf(model) < 7 ? 'badge-purple' : 'badge-blue'
                      }`}>
                        {allModels.indexOf(model) < 7 ? 'Classification' : 'Regression'}
                      </span>
                    </td>
                    <td className="table-cell font-medium">{(model.accuracy * 100).toFixed(1)}%</td>
                    <td className="table-cell">{(model.precision * 100).toFixed(1)}%</td>
                    <td className="table-cell">{(model.recall * 100).toFixed(1)}%</td>
                    <td className="table-cell">{(model.f1Score * 100).toFixed(1)}%</td>
                    <td className="table-cell">
                      <span className={`badge ${model.bestModel ? 'badge-green' : 'badge-blue'}`}>
                        {model.bestModel ? 'Best Model' : 'Active'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => setExpandedModel(expandedModel === model.name ? null : model.name)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        {expandedModel === model.name ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Expanded Model Details */}
        {expandedModel && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-fade-in">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white">{expandedModel}</strong> - 
              This model has been trained on the vehicle dataset and evaluated using standard ML metrics.
              {(allModels.find(m => m.name === expandedModel)?.bestModel) && ' It is currently the best performing model for this task.'}
            </p>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {['Accuracy', 'Precision', 'Recall', 'F1 Score'].map(metric => {
                const model = allModels.find(m => m.name === expandedModel);
                const value = model ? model[metric.toLowerCase().replace(' ', '') as keyof typeof model] as number * 100 : 0;
                return (
                  <div key={metric} className="text-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${value}%` }} />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{value.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">{metric}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recommendation */}
      <div className="glass-card p-6 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
            <GitCompare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Automated Model Selection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Based on comprehensive evaluation of all models, <strong className="text-indigo-600 dark:text-indigo-400">{bestOverall.name}</strong> is recommended 
              for production deployment with {(bestOverall.accuracy * 100).toFixed(1)}% accuracy. 
              The model shows superior performance across all metrics and is suitable for real-time vehicle analytics.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="btn-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                Deploy {bestOverall.name}
              </button>
              <button className="btn-secondary text-sm">
                <BarChart3 className="w-4 h-4" />
                View SHAP Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
