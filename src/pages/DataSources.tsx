import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { FileUpload } from '@/components/FileUpload';
import { useFileImport } from '@/hooks/useFileImport';
import { Database, Cloud, Smartphone, Globe, CheckCircle, AlertTriangle, Plus, Upload, FileText, TrendingUp } from 'lucide-react';

const DataSources = () => {
  const [activeTab, setActiveTab] = useState<'connected' | 'import'>('connected');
  const { imports, processImportedData, clearImports, removeImport } = useFileImport();

  const dataSources = [
    {
      name: 'E-commerce Database',
      type: 'PostgreSQL',
      status: 'connected',
      records: '2.4M',
      lastSync: '5 minutes ago',
      icon: Database
    },
    {
      name: 'Google Analytics',
      type: 'Analytics',
      status: 'connected',
      records: '45.7K sessions',
      lastSync: '10 minutes ago',
      icon: Globe
    },
    {
      name: 'Mobile App Events',
      type: 'Firebase',
      status: 'syncing',
      records: '1.8M',
      lastSync: 'Syncing...',
      icon: Smartphone
    },
    {
      name: 'Customer Support',
      type: 'Zendesk',
      status: 'error',
      records: '234K',
      lastSync: '2 hours ago',
      icon: Cloud
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'syncing': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'syncing': return Database;
      case 'error': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const handleFileUploadComplete = async (data: any) => {
    try {
      await processImportedData(data);
    } catch (error) {
      console.error('Error processing uploaded file:', error);
    }
  };

  const totalImportedRecords = imports.reduce((sum, imp) => sum + imp.recordCount, 0);

  return (
    <PageLayout 
      title="Data Sources" 
      subtitle="Manage and monitor your data connections"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 border-2 border-black">
          <button
            onClick={() => setActiveTab('connected')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-bold ${
              activeTab === 'connected' 
                ? 'bg-black text-white shadow-brutal' 
                : 'text-black hover:text-gray-700 hover:bg-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Connected Sources</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-bold ${
              activeTab === 'import' 
                ? 'bg-black text-white shadow-brutal' 
                : 'text-black hover:text-gray-700 hover:bg-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
          </button>
        </div>

        {/* Data Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Connected Sources', value: '3', color: 'bg-green-500' },
            { label: 'Total Records', value: `${(4.6 + totalImportedRecords / 1000000).toFixed(1)}M`, color: 'bg-blue-500' },
            { label: 'Imported Files', value: imports.length.toString(), color: 'bg-purple-500' },
            { label: 'Data Quality', value: '96.8%', color: 'bg-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} text-white p-4 rounded-xl border-3 border-black shadow-brutal`}
            >
              <p className="text-white/80 text-sm font-bold">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Connected Sources Tab */}
        {activeTab === 'connected' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Add New Source Button */}
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
                <Plus className="w-4 h-4" />
                <span>Add Data Source</span>
              </button>
            </div>

            {/* Data Sources Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dataSources.map((source, index) => {
                const StatusIcon = getStatusIcon(source.status);
                return (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg border-2 border-black">
                          <source.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-black">{source.name}</h3>
                          <p className="text-sm text-gray-600 font-bold">{source.type}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(source.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-bold capitalize">{source.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Records</p>
                        <p className="text-lg font-black text-black">{source.records}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Last Sync</p>
                        <p className="text-sm font-bold text-gray-700">{source.lastSync}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
                        Sync Now
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Import Data Tab */}
        {activeTab === 'import' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal">
              <h3 className="text-xl font-black text-black mb-4">Import Customer Data</h3>
              <p className="text-gray-600 font-bold mb-6">
                Upload CSV, PDF, JSON, or Excel files containing customer data. Our AI will automatically extract and structure the information for segmentation.
              </p>
              
              <FileUpload onUploadComplete={handleFileUploadComplete} />
            </div>

            {/* Import History */}
            {imports.length > 0 && (
              <div className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black text-black">Import History</h3>
                  <button
                    onClick={clearImports}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {imports.map((importItem) => (
                    <motion.div
                      key={importItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-bold text-black">{importItem.fileName}</p>
                          <p className="text-sm text-gray-600">
                            {importItem.recordCount} records • {new Date(importItem.importedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          importItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                          importItem.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {importItem.status}
                        </span>
                        <button
                          onClick={() => removeImport(importItem.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </PageLayout>
  );
};

export default DataSources;
