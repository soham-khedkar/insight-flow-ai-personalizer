
// K-means clustering implementation for customer segmentation
export interface CustomerData {
  user_id: string;
  purchase_frequency: number;
  avg_order_value: number;
  session_duration: number;
  bounce_rate: number;
  days_since_last_visit: number;
  total_purchases: number;
  engagement_score: number;
}

export interface Segment {
  id: number;
  name: string;
  description: string;
  color: string;
  characteristics: Record<string, any>;
  user_count: number;
  avg_order_value: number;
  conversion_rate: number;
}

export interface ClusterResult {
  segments: Segment[];
  customerSegments: { [userId: string]: number };
  analytics: {
    totalCustomers: number;
    averageOrderValue: number;
    conversionRate: number;
    segmentDistribution: { [segmentId: number]: number };
  };
}

// Normalize data for clustering
function normalizeData(data: CustomerData[]): number[][] {
  const features = ['purchase_frequency', 'avg_order_value', 'session_duration', 'engagement_score'];
  const normalized: number[][] = [];
  
  // Calculate min/max for each feature
  const stats = features.map(feature => {
    const values = data.map(d => d[feature as keyof CustomerData] as number);
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  });
  
  // Normalize each data point
  data.forEach(customer => {
    const point = features.map((feature, index) => {
      const value = customer[feature as keyof CustomerData] as number;
      const { min, max } = stats[index];
      return max === min ? 0 : (value - min) / (max - min);
    });
    normalized.push(point);
  });
  
  return normalized;
}

// K-means clustering algorithm
function kmeans(data: number[][], k: number, maxIterations: number = 100): number[] {
  const n = data.length;
  const d = data[0]?.length || 0;
  
  if (n === 0 || d === 0) return [];
  
  // Initialize centroids randomly
  const centroids: number[][] = [];
  for (let i = 0; i < k; i++) {
    centroids.push(data[Math.floor(Math.random() * n)].slice());
  }
  
  let assignments = new Array(n).fill(0);
  
  for (let iter = 0; iter < maxIterations; iter++) {
    const newAssignments = new Array(n);
    
    // Assign points to nearest centroid
    for (let i = 0; i < n; i++) {
      let minDistance = Infinity;
      let bestCluster = 0;
      
      for (let j = 0; j < k; j++) {
        const distance = euclideanDistance(data[i], centroids[j]);
        if (distance < minDistance) {
          minDistance = distance;
          bestCluster = j;
        }
      }
      
      newAssignments[i] = bestCluster;
    }
    
    // Check for convergence
    if (assignments.every((a, i) => a === newAssignments[i])) {
      break;
    }
    
    assignments = newAssignments;
    
    // Update centroids
    for (let j = 0; j < k; j++) {
      const clusterPoints = data.filter((_, i) => assignments[i] === j);
      if (clusterPoints.length > 0) {
        for (let dim = 0; dim < d; dim++) {
          centroids[j][dim] = clusterPoints.reduce((sum, point) => sum + point[dim], 0) / clusterPoints.length;
        }
      }
    }
  }
  
  return assignments;
}

function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 0), 0));
}

// Generate mock customer data
export function generateMockData(count: number = 1000): CustomerData[] {
  const customers: CustomerData[] = [];
  
  for (let i = 0; i < count; i++) {
    // Create different customer types with realistic patterns
    const customerType = Math.random();
    
    let customer: CustomerData;
    
    if (customerType < 0.2) {
      // VIP Customers
      customer = {
        user_id: `user_${i}`,
        purchase_frequency: 15 + Math.random() * 10,
        avg_order_value: 200 + Math.random() * 300,
        session_duration: 15 + Math.random() * 10,
        bounce_rate: 0.1 + Math.random() * 0.2,
        days_since_last_visit: 1 + Math.random() * 5,
        total_purchases: 20 + Math.random() * 30,
        engagement_score: 0.8 + Math.random() * 0.2
      };
    } else if (customerType < 0.5) {
      // Frequent Buyers
      customer = {
        user_id: `user_${i}`,
        purchase_frequency: 8 + Math.random() * 7,
        avg_order_value: 80 + Math.random() * 120,
        session_duration: 8 + Math.random() * 7,
        bounce_rate: 0.2 + Math.random() * 0.3,
        days_since_last_visit: 3 + Math.random() * 10,
        total_purchases: 8 + Math.random() * 15,
        engagement_score: 0.6 + Math.random() * 0.3
      };
    } else if (customerType < 0.8) {
      // Potential Converts
      customer = {
        user_id: `user_${i}`,
        purchase_frequency: 2 + Math.random() * 5,
        avg_order_value: 40 + Math.random() * 80,
        session_duration: 5 + Math.random() * 8,
        bounce_rate: 0.4 + Math.random() * 0.3,
        days_since_last_visit: 7 + Math.random() * 20,
        total_purchases: 2 + Math.random() * 8,
        engagement_score: 0.4 + Math.random() * 0.4
      };
    } else {
      // New/Casual Visitors
      customer = {
        user_id: `user_${i}`,
        purchase_frequency: 0.5 + Math.random() * 2,
        avg_order_value: 20 + Math.random() * 60,
        session_duration: 2 + Math.random() * 5,
        bounce_rate: 0.6 + Math.random() * 0.3,
        days_since_last_visit: 15 + Math.random() * 60,
        total_purchases: 0 + Math.random() * 3,
        engagement_score: 0.1 + Math.random() * 0.4
      };
    }
    
    customers.push(customer);
  }
  
  return customers;
}

// Perform customer segmentation
export function performSegmentation(customers: CustomerData[]): ClusterResult {
  if (customers.length === 0) {
    return {
      segments: [],
      customerSegments: {},
      analytics: {
        totalCustomers: 0,
        averageOrderValue: 0,
        conversionRate: 0,
        segmentDistribution: {}
      }
    };
  }
  
  const normalizedData = normalizeData(customers);
  const k = 4; // Number of segments
  const assignments = kmeans(normalizedData, k);
  
  // Create segments with characteristics
  const segments: Segment[] = [
    {
      id: 0,
      name: "VIP Customers",
      description: "High-value repeat customers with premium preferences",
      color: "#8B5CF6",
      characteristics: { high_value: true, frequent_buyer: true, premium_preference: true },
      user_count: 0,
      avg_order_value: 0,
      conversion_rate: 8.7
    },
    {
      id: 1,
      name: "Frequent Buyers",
      description: "Regular customers with consistent purchase behavior",
      color: "#06B6D4",
      characteristics: { regular_buyer: true, consistent_behavior: true },
      user_count: 0,
      avg_order_value: 0,
      conversion_rate: 5.2
    },
    {
      id: 2,
      name: "Potential Converts",
      description: "High engagement users ready for conversion",
      color: "#10B981",
      characteristics: { high_engagement: true, conversion_ready: true },
      user_count: 0,
      avg_order_value: 0,
      conversion_rate: 2.8
    },
    {
      id: 3,
      name: "New Visitors",
      description: "First-time visitors exploring products",
      color: "#F59E0B",
      characteristics: { new_user: true, exploring: true },
      user_count: 0,
      avg_order_value: 0,
      conversion_rate: 1.3
    }
  ];
  
  // Calculate segment statistics
  const customerSegments: { [userId: string]: number } = {};
  const segmentStats: { [segmentId: number]: { count: number; totalValue: number } } = {};
  
  assignments.forEach((segmentId, index) => {
    const customer = customers[index];
    customerSegments[customer.user_id] = segmentId;
    
    if (!segmentStats[segmentId]) {
      segmentStats[segmentId] = { count: 0, totalValue: 0 };
    }
    
    segmentStats[segmentId].count++;
    segmentStats[segmentId].totalValue += customer.avg_order_value;
  });
  
  // Update segment data
  Object.entries(segmentStats).forEach(([segmentId, stats]) => {
    const id = parseInt(segmentId);
    if (segments[id]) {
      segments[id].user_count = stats.count;
      segments[id].avg_order_value = stats.totalValue / stats.count;
    }
  });
  
  // Calculate analytics
  const totalCustomers = customers.length;
  const averageOrderValue = customers.reduce((sum, c) => sum + c.avg_order_value, 0) / totalCustomers;
  const conversionRate = customers.filter(c => c.total_purchases > 0).length / totalCustomers * 100;
  
  const segmentDistribution: { [segmentId: number]: number } = {};
  Object.values(segmentStats).forEach((stats, index) => {
    segmentDistribution[index] = (stats.count / totalCustomers) * 100;
  });
  
  return {
    segments: segments.filter(s => s.user_count > 0),
    customerSegments,
    analytics: {
      totalCustomers,
      averageOrderValue,
      conversionRate,
      segmentDistribution
    }
  };
}
