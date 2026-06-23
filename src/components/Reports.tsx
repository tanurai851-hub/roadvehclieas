import { useState } from 'react';
import { FileText, Download, FileSpreadsheet, FilePieChart, Printer, Eye, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Report {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  lastGenerated: string;
  size: string;
}

const reports: Report[] = [
  { id: 'RPT001', title: 'Vehicle Analytics Report', type: 'PDF', description: 'Comprehensive analysis of all vehicles in the fleet with KPIs and trends', icon: FilePieChart, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', lastGenerated: '2 hours ago', size: '2.4 MB' },
  { id: 'RPT002', title: 'Vehicle Health Report', type: 'PDF', description: 'Detailed health scores and parameter breakdown for each vehicle', icon: FileText, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', lastGenerated: '1 day ago', size: '1.8 MB' },
  { id: 'RPT003', title: 'ML Model Performance Report', type: 'PDF', description: 'Performance metrics for all classification, regression and clustering models', icon: FileSpreadsheet, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', lastGenerated: '3 days ago', size: '3.1 MB' },
  { id: 'RPT004', title: 'Maintenance Analysis Report', type: 'PDF', description: 'Analysis of maintenance costs, frequency patterns and optimization recommendations', icon: FileText, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', lastGenerated: '1 week ago', size: '1.5 MB' },
  { id: 'RPT005', title: 'Fuel Consumption Analysis', type: 'PDF', description: 'Fuel efficiency trends, comparisons and optimization opportunities', icon: FileSpreadsheet, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30', lastGenerated: '2 weeks ago', size: '2.0 MB' },
  { id: 'RPT006', title: 'Risk Assessment Report', type: 'PDF', description: 'Risk level distribution, high-risk vehicle identification and mitigation strategies', icon: FilePieChart, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', lastGenerated: '1 month ago', size: '1.2 MB' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = (reportId: string) => {
    setGenerating(reportId);
    setTimeout(() => {
      setGenerating(null);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  const handleDownload = (_reportId: string) => {
    toast.success('Download started!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate and download comprehensive reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary" onClick={() => toast.success('Generating all reports...')}>
            <FileText className="w-4 h-4" />
            Generate All Reports
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: '6', icon: FileText, color: 'text-indigo-600' },
          { label: 'Generated Today', value: '2', icon: Clock, color: 'text-emerald-600' },
          { label: 'Total Size', value: '12.0 MB', icon: Download, color: 'text-blue-600' },
          { label: 'Last Generated', value: '2 hours ago', icon: Calendar, color: 'text-purple-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          const isSelected = selectedReport === report.id;
          const isGenerating = generating === report.id;

          return (
            <div
              key={report.id}
              className={`glass-card p-6 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                isSelected ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedReport(isSelected ? null : report.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${report.bg}`}>
                  <Icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <span className="badge-blue text-xs">{report.type}</span>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{report.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{report.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.lastGenerated}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {report.size}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleGenerate(report.id); }}
                  disabled={isGenerating}
                  className="btn-primary text-sm py-2 flex-1 justify-center"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </div>
                  ) : (
                    <>
                      <Printer className="w-3.5 h-3.5" />
                      Generate
                    </>
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownload(report.id); }}
                  className="btn-secondary text-sm py-2"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview */}
      {selectedReport && (
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title">Report Preview</h3>
            <button className="btn-secondary text-sm" onClick={() => setSelectedReport(null)}>
              Close Preview
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
            <div className="text-center space-y-4">
              <FileText className="w-16 h-16 text-indigo-500 mx-auto" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {reports.find(r => r.id === selectedReport)?.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                This report contains comprehensive analytics data including vehicle statistics, 
                performance metrics, and actionable insights. Download the full report for complete details.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button className="btn-primary" onClick={() => handleDownload(selectedReport)}>
                  <Download className="w-4 h-4" />
                  Download Full Report
                </button>
                <button className="btn-secondary">
                  <Eye className="w-4 h-4" />
                  View Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
