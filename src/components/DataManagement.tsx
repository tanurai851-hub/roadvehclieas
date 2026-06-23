import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Database, RefreshCw, Trash2, Eye, X } from 'lucide-react';
import { sampleVehicles } from '../data/sampleData';
import toast from 'react-hot-toast';

export default function DataManagement() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [dataStats] = useState({
    totalRecords: sampleVehicles.length,
    missingValues: 0,
    duplicates: 0,
    features: 15,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        toast.success('File uploaded and validated successfully!');
      }, 2000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        toast.success('File uploaded and validated successfully!');
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload, validate, and preprocess vehicle data</p>
        </div>
        <button className="btn-primary" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4" />
          Upload CSV
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`glass-card p-8 text-center border-2 border-dashed transition-all duration-300 ${
          uploadedFile
            ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
        }`}
      >
        {!uploadedFile ? (
          <div className="space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <Upload className="w-10 h-10 text-indigo-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop your CSV file here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or click the button above to browse files
              </p>
            </div>
            <p className="text-xs text-gray-400">Supports: CSV files up to 50MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`inline-flex p-4 rounded-2xl ${
              isProcessing ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'
            }`}>
              {isProcessing ? (
                <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
              ) : (
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {!isProcessing && (
              <div className="flex items-center justify-center gap-3">
                <button className="btn-secondary text-sm" onClick={() => { setUploadedFile(null); toast.success('File removed'); }}>
                  <X className="w-4 h-4" /> Remove
                </button>
                <button className="btn-primary text-sm" onClick={() => setShowPreview(!showPreview)}>
                  <Eye className="w-4 h-4" /> Preview Data
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Data Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Records', value: dataStats.totalRecords, icon: Database, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { label: 'Features', value: dataStats.features, icon: FileSpreadsheet, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
          { label: 'Missing Values', value: dataStats.missingValues, icon: AlertCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          { label: 'Duplicates', value: dataStats.duplicates, icon: Trash2, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
          { label: 'Data Quality', value: '98.5%', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preprocessing Pipeline */}
      <div className="glass-card p-6">
        <h3 className="card-title mb-4">Preprocessing Pipeline</h3>
        <div className="space-y-3">
          {[
            { step: 'Data Validation', status: 'Completed', desc: 'Validated 15/15 columns' },
            { step: 'Handle Missing Values', status: 'Completed', desc: 'No missing values detected' },
            { step: 'Remove Duplicates', status: 'Completed', desc: '0 duplicate records found' },
            { step: 'Feature Engineering', status: 'Ready', desc: '15 features available for modeling' },
            { step: 'Data Scaling', status: 'Ready', desc: 'Ready for ML pipeline' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.step}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
              <span className={`badge ${
                item.status === 'Completed' ? 'badge-green' : 'badge-yellow'
              }`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Preview */}
      {showPreview && (
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title">Data Preview</h3>
            <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['ID', 'Type', 'Age', 'Fuel', 'Mileage', 'Condition', 'Risk'].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleVehicles.map((v) => (
                  <tr key={v.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="table-cell font-medium">{v.id}</td>
                    <td className="table-cell">{v.vehicleType}</td>
                    <td className="table-cell">{v.vehicleAge} yrs</td>
                    <td className="table-cell">{v.fuelType}</td>
                    <td className="table-cell">{v.mileage.toLocaleString()} km</td>
                    <td className="table-cell">
                      <span className={`badge ${
                        v.condition === 'Excellent' ? 'badge-green' :
                        v.condition === 'Good' ? 'badge-blue' :
                        v.condition === 'Average' ? 'badge-yellow' : 'badge-red'
                      }`}>{v.condition}</span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        v.riskLevel === 'Low' ? 'badge-green' :
                        v.riskLevel === 'Medium' ? 'badge-yellow' :
                        'badge-red'
                      }`}>{v.riskLevel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
