
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { CampaignManager } from '@/components/CampaignManager';
import { Plus, Send, BarChart3, Calendar } from 'lucide-react';

const Campaigns = () => {
  return (
    <PageLayout 
      title="Campaign Management" 
      subtitle="Create and manage targeted marketing campaigns"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Campaigns', value: '12', icon: Send, color: 'bg-blue-500' },
            { label: 'Avg. Open Rate', value: '24.7%', icon: BarChart3, color: 'bg-green-500' },
            { label: 'This Month', value: '8', icon: Calendar, color: 'bg-purple-500' },
            { label: 'Total Sent', value: '45,231', icon: Send, color: 'bg-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} text-white p-4 rounded-xl border-3 border-black shadow-brutal`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-bold">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        {/* Campaign Manager */}
        <CampaignManager />
      </motion.div>
    </PageLayout>
  );
};

export default Campaigns;
