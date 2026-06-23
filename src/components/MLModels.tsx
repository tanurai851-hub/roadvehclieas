import { useState } from 'react';
import { sampleMLResults, sampleVehicles } from '../data/sampleData';
import { Brain, Play, RefreshCw, Download, Award } from 'lucide-react';
import {
  BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default function MLModels() {
  const [activeTab, setActiveTab] = useState<'classification' | 'regression' | 'clustering'>('classification');
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'training' | 'complete'>('idle');

  const results = activeTab === 'classification' ? sampleMLResults.classification : sampleMLResults.regression;
  const bestModel = results.find(r => r.bestModel);

  const handleTrain = () => {
    setTrainingStatus('training');
    setTimeout(() => {
      setTrainingStatus('complete');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Machine Learning Models</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Train, evaluate, and compare ML models</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleTrain}
            disabled={trainingStatus === 'training'}
            className="btn-primary"
          >
            {trainingStatus === 'training' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {trainingStatus === 'idle' ? 'Train All Models' : trainingStatus === 'training' ? 'Training...' : 'Retrain'}
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        {([
          { id: 'classification' as const, label: 'Classification' },
          { id: 'regression' as const, label: 'Regression' },
          { id: 'clustering' as const, label: 'Clustering' },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Training Status */}
      {trainingStatus !== 'idle' && (
        <div className={`glass-card p-4 ${trainingStatus === 'training' ? 'animate-pulse' : 'animate-fade-in'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              trainingStatus === 'training' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'
            }`}>
              {trainingStatus === 'training' ? (
                <RefreshCw className="w-5 h-5 text-amber-500 animate-spin" />
              ) : (
                <Award className="w-5 h-5 text-emerald-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {trainingStatus === 'training' ? 'Training in Progress...' : 'Training Complete!'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {trainingStatus === 'training'
                  ? `Training ${activeTab} models with ${sampleVehicles.length} samples`
                  : `All ${activeTab} models trained successfully. Best: ${bestModel?.name}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Classification / Regression Results */}
      {activeTab !== 'clustering' && (
        <>
          {/* Best Model Highlight */}
          {bestModel && (
            <div className="glass-card bg-gradient-to-br from-indigo-600/5 to-purple-600/5 dark:from-indigo-600/10 dark:to-purple-600/10 border-indigo-200 dark:border-indigo-800 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Best Performing Model</p>
                  <p className="text-xl font-bold gradient-text">{bestModel.name}</p>
                </div>
                <div className="flex gap-6">
                  {[
                    { label: 'Accuracy', value: `${(bestModel.accuracy * 100).toFixed(1)}%` },
                    { label: 'Precision', value: `${(bestModel.precision * 100).toFixed(1)}%` },
                    { label: 'Recall', value: `${(bestModel.recall * 100).toFixed(1)}%` },
                    { label: 'F1 Score', value: `${(bestModel.f1Score * 100).toFixed(1)}%` },
                  ].map((m, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{m.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Model Comparison Chart */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-4">Model Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
                <XAxis dataKey="name" stroke="currentColor" className="text-xs text-gray-400" angle={-20} textAnchor="end" height={80} />
                <YAxis stroke="currentColor" className="text-xs text-gray-400" domain={[0, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="accuracy" name="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="precision" name="Precision" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recall" name="Recall" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1Score" name="F1 Score" fill="#d946ef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Model Details Table */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-4">Model Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="table-header">Model</th>
                    <th className="table-header">Accuracy</th>
                    <th className="table-header">Precision</th>
                    <th className="table-header">Recall</th>
                    <th className="table-header">F1 Score</th>
                    <th className="table-header">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((model, i) => (
                    <tr key={i} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${model.bestModel ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          {model.bestModel && <Award className="w-4 h-4 text-amber-500" />}
                          <span className="font-medium">{model.name}</span>
                        </div>
                      </td>
                      <td className="table-cell">{(model.accuracy * 100).toFixed(1)}%</td>
                      <td className="table-cell">{(model.precision * 100).toFixed(1)}%</td>
                      <td className="table-cell">{(model.recall * 100).toFixed(1)}%</td>
                      <td className="table-cell">{(model.f1Score * 100).toFixed(1)}%</td>
                      <td className="table-cell">
                        <span className={`badge ${model.bestModel ? 'badge-green' : 'badge-blue'}`}>
                          {model.bestModel ? 'Best Model' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Clustering */}
      {activeTab === 'clustering' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'K-Means', clusters: 4, silhouette: 0.72, desc: 'Best for distinct vehicle segments' },
              { name: 'DBSCAN', clusters: 3, silhouette: 0.65, desc: 'Good for outlier detection' },
              { name: 'Hierarchical', clusters: 4, silhouette: 0.68, desc: 'Reveals hierarchical relationships' },
            ].map((algo, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <Brain className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{algo.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{algo.desc}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Clusters</span>
                    <span className="font-medium">{algo.clusters}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Silhouette Score</span>
                    <span className="font-medium text-emerald-600">{algo.silhouette}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cluster Visualization */}
          <div className="glass-card p-6">
            <h3 className="card-title mb-4">Cluster Visualization (K-Means)</h3>
            <div className="flex items-center justify-center p-8">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'].map((color, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-full opacity-80 animate-float"
                        style={{
                          backgroundColor: color,
                          animationDelay: `${i * 0.5}s`,
                          transform: `translate(${Math.sin(i * 1.5) * 20}px, ${Math.cos(i * 1.5) * 20}px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
                <span className="text-gray-600 dark:text-gray-400">Cluster 1: Sedans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                <span className="text-gray-600 dark:text-gray-400">Cluster 2: SUVs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
                <span className="text-gray-600 dark:text-gray-400">Cluster 3: Trucks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d946ef]" />
                <span className="text-gray-600 dark:text-gray-400">Cluster 4: Others</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
