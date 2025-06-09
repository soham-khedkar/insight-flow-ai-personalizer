
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Activity, Users, ShoppingCart, Eye, TrendingUp, Clock } from 'lucide-react';

export const RealTimePanel = () => {
  const [liveEvents, setLiveEvents] = useState<Array<{
    id: string;
    type: 'view' | 'purchase' | 'signup' | 'segment_change';
    user: string;
    detail: string;
    timestamp: Date;
    value?: number;
  }>>([]);

  const [liveStats, setLiveStats] = useState({
    activeUsers: 342,
    conversionRate: 3.8,
    avgSessionTime: 185,
    segmentChanges: 12
  });

  // Simulate real-time events
  useEffect(() => {
    const eventTypes = [
      { type: 'view' as const, messages: ['Viewed product page', 'Browsed category', 'Searched for items'], icon: Eye },
      { type: 'purchase' as const, messages: ['Made a purchase', 'Completed checkout', 'Added to cart'], icon: ShoppingCart },
      { type: 'signup' as const, messages: ['Created account', 'Signed up for newsletter', 'Completed profile'], icon: Users },
      { type: 'segment_change' as const, messages: ['Moved to VIP segment', 'Became frequent buyer', 'Upgraded segment'], icon: TrendingUp }
    ];

    const generateEvent = () => {
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const message = eventType.messages[Math.floor(Math.random() * eventType.messages.length)];
      const users = ['John D.', 'Sarah M.', 'Mike R.', 'Emma S.', 'David L.', 'Lisa K.', 'Tom W.', 'Anna B.'];
      
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: eventType.type,
        user: users[Math.floor(Math.random() * users.length)],
        detail: message,
        timestamp: new Date(),
        value: eventType.type === 'purchase' ? Math.floor(Math.random() * 500) + 50 : undefined
      };

      setLiveEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    };

    // Generate initial events
    for (let i = 0; i < 5; i++) {
      setTimeout(() => generateEvent(), i * 200);
    }

    // Continue generating events
    const interval = setInterval(generateEvent, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() * 0.4) - 0.2),
        avgSessionTime: prev.avgSessionTime + Math.floor(Math.random() * 20) - 10,
        segmentChanges: prev.segmentChanges + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'view': return Eye;
      case 'purchase': return ShoppingCart;
      case 'signup': return Users;
      case 'segment_change': return TrendingUp;
      default: return Activity;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'view': return 'text-blue-600 bg-blue-50';
      case 'purchase': return 'text-green-600 bg-green-50';
      case 'signup': return 'text-purple-600 bg-purple-50';
      case 'segment_change': return 'text-orange-600 bg-orange-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 h-fit"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Real-time Activity</h3>
          <p className="text-sm text-slate-600">Live customer behavior tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Active Users', value: liveStats.activeUsers, icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Conversion', value: `${liveStats.conversionRate.toFixed(1)}%`, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
          { label: 'Avg Session', value: `${Math.floor(liveStats.avgSessionTime / 60)}m ${liveStats.avgSessionTime % 60}s`, icon: Clock, color: 'from-purple-500 to-pink-500' },
          { label: 'Segments', value: liveStats.segmentChanges, icon: Activity, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 rounded-lg p-3 border border-white/30"
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className={`p-1 rounded bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-slate-600">{stat.label}</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Live Events Feed */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Activity</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {liveEvents.map((event, index) => {
            const Icon = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-colors"
              >
                <div className={`p-1.5 rounded-lg ${getEventColor(event.type)}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">{event.user}</p>
                    <span className="text-xs text-slate-500">
                      {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{event.detail}</p>
                  {event.value && (
                    <p className="text-xs text-green-600 font-medium mt-0.5">${event.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-2">
          <button className="text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
            Export Data
          </button>
          <button className="text-xs bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors">
            Set Alerts
          </button>
        </div>
      </div>
    </motion.div>
  );
};
