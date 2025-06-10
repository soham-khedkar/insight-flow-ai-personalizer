
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Target, TrendingUp } from 'lucide-react';
import { DashboardMetrics } from '@/components/DashboardMetrics';
import { SegmentExplorer } from '@/components/SegmentExplorer';
import { CustomerJourney } from '@/components/CustomerJourney';
import { CampaignManager } from '@/components/CampaignManager';
import { RealTimePanel } from '@/components/RealTimePanel';
import { PageLayout } from '@/components/PageLayout';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageLayout 
      title="AI Customer Segmentation" 
      subtitle="Real-time behavioral analytics & targeting"
    >
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-xl p-1 border-2 border-black overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'segments', label: 'Segments', icon: Users },
          { id: 'campaigns', label: 'Campaigns', icon: Target },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 font-bold whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-black text-white shadow-brutal' 
                : 'text-black hover:text-gray-700 hover:bg-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline text-sm md:text-base">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          key="overview"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <DashboardMetrics />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <SegmentExplorer />
            </div>
            <div>
              <RealTimePanel />
            </div>
          </div>
          <CustomerJourney />
        </motion.div>
      )}
      
      {activeTab === 'segments' && (
        <motion.div
          key="segments"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <SegmentExplorer expanded />
        </motion.div>
      )}
      
      {activeTab === 'campaigns' && (
        <motion.div
          key="campaigns"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <CampaignManager />
        </motion.div>
      )}
      
      {activeTab === 'analytics' && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <RealTimePanel />
          <CustomerJourney />
        </motion.div>
      )}
    </PageLayout>
  );
};

export default Index;
