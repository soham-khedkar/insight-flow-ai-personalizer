
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { SegmentExplorer } from '@/components/SegmentExplorer';
import { RefreshCw, Plus, Filter } from 'lucide-react';
import { useSegmentation } from '@/hooks/useSegmentation';

const Segments = () => {
  const { refreshData, loading } = useSegmentation();

  return (
    <PageLayout 
      title="Customer Segments" 
      subtitle="AI-powered customer segmentation and analysis"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Re-cluster</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Segment</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-black rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Segment Explorer */}
        <SegmentExplorer expanded />
      </motion.div>
    </PageLayout>
  );
};

export default Segments;
