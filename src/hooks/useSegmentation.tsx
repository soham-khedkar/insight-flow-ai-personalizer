
import { useState, useEffect } from 'react';
import { generateMockData, performSegmentation, ClusterResult, CustomerData } from '@/utils/clustering';

export const useSegmentation = () => {
  const [data, setData] = useState<ClusterResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const generateNewSegmentation = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockCustomers = generateMockData(1200);
      const result = performSegmentation(mockCustomers);
      
      setCustomers(mockCustomers);
      setData(result);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    generateNewSegmentation();
  }, []);

  const refreshData = () => {
    generateNewSegmentation();
  };

  return {
    data,
    customers,
    loading,
    refreshData
  };
};
