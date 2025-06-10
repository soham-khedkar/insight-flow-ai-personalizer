
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { Zap, Play, Pause, Settings, Plus, Mail, MessageSquare, Bell } from 'lucide-react';

const Automation = () => {
  const automations = [
    {
      name: 'Welcome Email Series',
      trigger: 'New user signup',
      status: 'active',
      runs: '2,847',
      success: '94.2%',
      icon: Mail
    },
    {
      name: 'Churn Prevention',
      trigger: 'High churn risk detected',
      status: 'active',
      runs: '156',
      success: '87.5%',
      icon: Bell
    },
    {
      name: 'Upsell Campaign',
      trigger: 'High-value segment entry',
      status: 'paused',
      runs: '923',
      success: '76.8%',
      icon: MessageSquare
    },
    {
      name: 'Re-engagement Flow',
      trigger: '30 days inactive',
      status: 'active',
      runs: '445',
      success: '62.3%',
      icon: Zap
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'stopped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <PageLayout 
      title="Marketing Automation" 
      subtitle="Automate your marketing workflows and campaigns"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Automation Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Flows', value: '3', color: 'bg-green-500' },
            { label: 'Total Triggers', value: '4,371', color: 'bg-blue-500' },
            { label: 'Success Rate', value: '85.2%', color: 'bg-purple-500' },
            { label: 'Time Saved', value: '127h', color: 'bg-orange-500' }
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

        {/* Create New Automation */}
        <div className="flex justify-end">
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
            <Plus className="w-4 h-4" />
            <span>Create Automation</span>
          </button>
        </div>

        {/* Automation List */}
        <div className="space-y-4">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg border-2 border-black">
                    <automation.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-black">{automation.name}</h3>
                    <p className="text-sm text-gray-600 font-bold">{automation.trigger}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-bold">Runs</p>
                    <p className="text-lg font-black text-black">{automation.runs}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-bold">Success Rate</p>
                    <p className="text-lg font-black text-green-600">{automation.success}</p>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${getStatusColor(automation.status)} text-white text-sm font-bold`}>
                    <span className="capitalize">{automation.status}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                      {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button className="p-2 bg-gray-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Automation;
