
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, TrendingUp, ShoppingCart, RefreshCw, Sparkles } from 'lucide-react';
import { useSegmentation } from '@/hooks/useSegmentation';

interface SegmentExplorerProps {
  expanded?: boolean;
}

export const SegmentExplorer = ({ expanded = false }: SegmentExplorerProps) => {
  const { data, loading, refreshData } = useSegmentation();
  const [viewMode, setViewMode] = useState<'pie' | 'bar'>('pie');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  if (loading || !data) {
    return (
      <div className={`bg-white rounded-2xl p-6 border-3 border-black shadow-brutal ${expanded ? 'col-span-full' : ''}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const segmentData = data.segments.map(segment => ({
    name: segment.name,
    value: segment.user_count,
    percentage: ((segment.user_count / data.analytics.totalCustomers) * 100),
    color: segment.color,
    avgOrderValue: segment.avg_order_value,
    conversionRate: segment.conversion_rate,
    description: segment.description
  }));

  const performanceData = segmentData.map(segment => ({
    name: segment.name.split(' ')[0], // Shorter names for mobile
    conversionRate: segment.conversionRate,
    avgOrderValue: segment.avgOrderValue,
    customers: segment.value
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 md:p-6 border-3 border-purple-500 shadow-brutal ${expanded ? 'col-span-full' : ''}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Customer Segments
          </h3>
          <p className="text-sm font-bold text-gray-700">Real-time behavioral clustering</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-white rounded-xl p-1 border-2 border-black">
            <button
              onClick={() => setViewMode('pie')}
              className={`px-3 py-1 text-sm rounded-lg transition-all font-bold ${
                viewMode === 'pie' ? 'bg-black text-white shadow-sm' : 'text-black hover:bg-gray-100'
              }`}
            >
              Distribution
            </button>
            <button
              onClick={() => setViewMode('bar')}
              className={`px-3 py-1 text-sm rounded-lg transition-all font-bold ${
                viewMode === 'bar' ? 'bg-black text-white shadow-sm' : 'text-black hover:bg-gray-100'
              }`}
            >
              Performance
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="p-2 bg-black text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="h-64 md:h-80 bg-white rounded-xl border-2 border-black p-4">
          {viewMode === 'pie' ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(data) => setSelectedSegment(data.name)}
                  onMouseLeave={() => setSelectedSegment(null)}
                >
                  {segmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={selectedSegment === entry.name ? '#000000' : 'none'}
                      strokeWidth={selectedSegment === entry.name ? 3 : 0}
                      style={{
                        filter: selectedSegment === entry.name ? 'brightness(1.1)' : 'none',
                        transform: selectedSegment === entry.name ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: '50% 50%',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border-2 border-black rounded-lg p-3 shadow-brutal font-bold">
                          <p className="font-black text-black">{data.name}</p>
                          <p className="text-sm text-gray-600">{data.value.toLocaleString()} customers</p>
                          <p className="text-sm text-gray-600">{data.percentage.toFixed(1)}% of total</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fontWeight: 'bold' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border-2 border-black rounded-lg p-3 shadow-brutal font-bold">
                          <p className="font-black text-black mb-2">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                              {entry.dataKey === 'conversionRate' ? '%' : 
                               entry.dataKey === 'avgOrderValue' ? '$' : ''}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="conversionRate" fill="#8B5CF6" name="Conversion Rate %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgOrderValue" fill="#06B6D4" name="Avg Order Value $" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Segment Details */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {segmentData.map((segment, index) => (
            <motion.div
              key={segment.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedSegment === segment.name 
                  ? 'bg-white border-black shadow-brutal scale-105' 
                  : 'bg-white/60 border-gray-300 hover:bg-white hover:border-black hover:shadow-brutal'
              }`}
              onMouseEnter={() => setSelectedSegment(segment.name)}
              onMouseLeave={() => setSelectedSegment(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-black"
                    style={{ backgroundColor: segment.color }}
                  />
                  <h4 className="font-black text-black text-sm md:text-base">{segment.name}</h4>
                </div>
                <span className="text-sm font-black text-gray-600">
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
              
              <p className="text-xs md:text-sm text-gray-600 mb-3 font-bold">{segment.description}</p>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 font-bold">{segment.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 font-bold">{segment.conversionRate}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 font-bold">${segment.avgOrderValue.toFixed(0)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
