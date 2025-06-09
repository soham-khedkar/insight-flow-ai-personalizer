
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, TrendingUp, ShoppingCart, Clock, Eye } from 'lucide-react';

interface SegmentExplorerProps {
  expanded?: boolean;
}

export const SegmentExplorer = ({ expanded = false }: SegmentExplorerProps) => {
  const [viewMode, setViewMode] = useState<'pie' | 'bar'>('pie');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const segmentData = [
    { 
      name: 'VIP Customers', 
      value: 2847, 
      percentage: 23.2,
      color: '#8B5CF6',
      avgOrderValue: 245.80,
      conversionRate: 8.7,
      description: 'High-value repeat customers with premium preferences'
    },
    { 
      name: 'Frequent Buyers', 
      value: 4521, 
      percentage: 36.8,
      color: '#06B6D4',
      avgOrderValue: 127.50,
      conversionRate: 5.2,
      description: 'Regular customers with consistent purchase behavior'
    },
    { 
      name: 'Potential Converts', 
      value: 3102, 
      percentage: 25.3,
      color: '#10B981',
      avgOrderValue: 89.20,
      conversionRate: 2.8,
      description: 'High engagement users ready for conversion'
    },
    { 
      name: 'New Visitors', 
      value: 1897, 
      percentage: 14.7,
      color: '#F59E0B',
      avgOrderValue: 67.40,
      conversionRate: 1.3,
      description: 'First-time visitors exploring products'
    }
  ];

  const performanceData = segmentData.map(segment => ({
    name: segment.name,
    conversionRate: segment.conversionRate,
    avgOrderValue: segment.avgOrderValue,
    customers: segment.value
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${expanded ? 'col-span-full' : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Customer Segments</h3>
          <p className="text-sm text-slate-600">AI-powered behavioral segmentation</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('pie')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                viewMode === 'pie' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
              }`}
            >
              Distribution
            </button>
            <button
              onClick={() => setViewMode('bar')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                viewMode === 'bar' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
              }`}
            >
              Performance
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="h-80">
          {viewMode === 'pie' ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(data) => setSelectedSegment(data.name)}
                  onMouseLeave={() => setSelectedSegment(null)}
                >
                  {segmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={selectedSegment === entry.name ? '#ffffff' : 'none'}
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
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
                          <p className="font-semibold text-slate-900">{data.name}</p>
                          <p className="text-sm text-slate-600">{data.value.toLocaleString()} customers</p>
                          <p className="text-sm text-slate-600">{data.percentage}% of total</p>
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
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
                          <p className="font-semibold text-slate-900 mb-2">{label}</p>
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
                <Bar dataKey="conversionRate" fill="#8B5CF6" name="Conversion Rate %" />
                <Bar dataKey="avgOrderValue" fill="#06B6D4" name="Avg Order Value $" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Segment Details */}
        <div className="space-y-3">
          {segmentData.map((segment, index) => (
            <motion.div
              key={segment.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-white/20 transition-all duration-200 cursor-pointer ${
                selectedSegment === segment.name 
                  ? 'bg-white shadow-md scale-105' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              onMouseEnter={() => setSelectedSegment(segment.name)}
              onMouseLeave={() => setSelectedSegment(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <h4 className="font-semibold text-slate-900">{segment.name}</h4>
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {segment.percentage}%
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-3">{segment.description}</p>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-600">{segment.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-600">{segment.conversionRate}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-600">${segment.avgOrderValue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
