import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { RealTimePanel } from '@/components/RealTimePanel';
import { CustomerJourney } from '@/components/CustomerJourney';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const Analytics = () => {
  return (
    <PageLayout 
      title="Advanced Analytics" 
      subtitle="Deep insights into customer behavior and performance"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Revenue Growth', value: '+23.8%', icon: TrendingUp, color: 'bg-green-500' },
            { label: 'Active Users', value: '2,847', icon: Users, color: 'bg-blue-500' },
            { label: 'Total Revenue', value: '$127,430', icon: DollarSign, color: 'bg-purple-500' },
            { label: 'Engagement Score', value: '8.7/10', icon: Activity, color: 'bg-orange-500' }
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

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RealTimePanel />
          <CustomerJourney />
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Analytics;
