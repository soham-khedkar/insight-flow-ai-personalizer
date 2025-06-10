
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { Brain, Zap, Target, BarChart, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AIModels = () => {
  const models = [
    {
      name: 'Customer Segmentation',
      description: 'K-means clustering for behavioral segmentation',
      status: 'active',
      accuracy: '94.2%',
      lastTrained: '2 hours ago',
      icon: Target
    },
    {
      name: 'Churn Prediction',
      description: 'Predict customer churn risk with 95% accuracy',
      status: 'training',
      accuracy: '95.7%',
      lastTrained: 'Training...',
      icon: AlertCircle
    },
    {
      name: 'Lifetime Value',
      description: 'Calculate customer lifetime value predictions',
      status: 'active',
      accuracy: '91.8%',
      lastTrained: '1 day ago',
      icon: BarChart
    },
    {
      name: 'Recommendation Engine',
      description: 'Personalized product recommendations',
      status: 'pending',
      accuracy: '88.5%',
      lastTrained: '3 days ago',
      icon: Zap
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'training': return Clock;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <PageLayout 
      title="AI Models" 
      subtitle="Manage and monitor machine learning models"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Model Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Models', value: '3', color: 'bg-green-500' },
            { label: 'Training', value: '1', color: 'bg-yellow-500' },
            { label: 'Avg. Accuracy', value: '92.5%', color: 'bg-blue-500' },
            { label: 'Predictions/Day', value: '15.2K', color: 'bg-purple-500' }
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

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {models.map((model, index) => {
            const StatusIcon = getStatusIcon(model.status);
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg border-2 border-black">
                      <model.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-black">{model.name}</h3>
                      <p className="text-sm text-gray-600 font-bold">{model.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${getStatusColor(model.status)} text-white text-xs font-bold`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{model.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Accuracy</p>
                    <p className="text-lg font-black text-black">{model.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Last Trained</p>
                    <p className="text-sm font-bold text-gray-700">{model.lastTrained}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
                    Configure
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
                    View Metrics
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

export default AIModels;
