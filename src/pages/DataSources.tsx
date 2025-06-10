
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { Database, Cloud, Smartphone, Globe, CheckCircle, AlertTriangle, Plus } from 'lucide-react';

const DataSources = () => {
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
        {/* Data Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Connected Sources', value: '3', color: 'bg-green-500' },
            { label: 'Total Records', value: '4.6M', color: 'bg-blue-500' },
            { label: 'Data Quality', value: '96.8%', color: 'bg-purple-500' },
            { label: 'Sync Frequency', value: '5 min', color: 'bg-orange-500' }
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
    </PageLayout>
  );
};

export default DataSources;
