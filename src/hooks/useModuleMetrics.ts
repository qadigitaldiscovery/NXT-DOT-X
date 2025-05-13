
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

export type MetricDataPoint = {
  timestamp: string;
  value: number;
  module_id: string;
};

export type ModuleMetric = {
  id: string;
  name: string;
  unit: string;
  data: MetricDataPoint[];
};

export function useModuleMetrics(moduleId?: string, timeRange: 'day' | 'week' | 'month' = 'week') {
  const [metrics, setMetrics] = useState<ModuleMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch data from the database
        // For now, we'll generate mock data
        
        // Generate timestamps based on the selected time range
        const now = new Date();
        const dataPoints = generateTimeSeriesData(timeRange);
        
        // Create mock metrics
        const mockMetrics: ModuleMetric[] = [
          {
            id: '1',
            name: 'CPU Usage',
            unit: '%',
            data: dataPoints.map(timestamp => ({
              timestamp,
              value: Math.floor(Math.random() * 30) + 40, // Random value between 40-70%
              module_id: moduleId || 'all'
            }))
          },
          {
            id: '2',
            name: 'Memory Usage',
            unit: 'MB',
            data: dataPoints.map(timestamp => ({
              timestamp,
              value: Math.floor(Math.random() * 500) + 1000, // Random value between 1000-1500MB
              module_id: moduleId || 'all'
            }))
          },
          {
            id: '3',
            name: 'Response Time',
            unit: 'ms',
            data: dataPoints.map(timestamp => ({
              timestamp,
              value: Math.floor(Math.random() * 200) + 50, // Random value between 50-250ms
              module_id: moduleId || 'all'
            }))
          },
          {
            id: '4',
            name: 'Error Rate',
            unit: 'errors/min',
            data: dataPoints.map(timestamp => ({
              timestamp,
              value: Math.floor(Math.random() * 5), // Random value between 0-5 errors/min
              module_id: moduleId || 'all'
            }))
          }
        ];
        
        setMetrics(mockMetrics);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [moduleId, timeRange]);

  // Helper function to generate time series data points
  const generateTimeSeriesData = (range: 'day' | 'week' | 'month'): string[] => {
    const now = new Date();
    const dataPoints: string[] = [];
    const intervals = range === 'day' ? 24 : range === 'week' ? 7 : 30;
    const intervalType = range === 'day' ? 'hours' : 'days';
    
    for (let i = intervals - 1; i >= 0; i--) {
      const date = new Date(now);
      if (intervalType === 'hours') {
        date.setHours(date.getHours() - i);
      } else {
        date.setDate(date.getDate() - i);
      }
      dataPoints.push(date.toISOString());
    }
    
    return dataPoints;
  };

  return { metrics, loading, error };
}

export function useSystemHealthScore() {
  const [score, setScore] = useState<number>(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const calculateScore = () => {
      // In a real implementation, this would be calculated from actual system metrics
      const randomScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      const randomTrend = Math.random();
      let trendDirection: 'up' | 'down' | 'stable';
      
      if (randomTrend < 0.33) trendDirection = 'up';
      else if (randomTrend < 0.66) trendDirection = 'down';
      else trendDirection = 'stable';
      
      setScore(randomScore);
      setTrend(trendDirection);
      setLoading(false);
    };
    
    calculateScore();
  }, []);

  return { score, trend, loading };
}
