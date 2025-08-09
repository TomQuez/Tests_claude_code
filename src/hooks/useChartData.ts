import { useState, useCallback } from 'react';
import type { SalesData, TrendData } from '../types';

const initialSalesData: SalesData[] = [
  { product: 'Product A', sales: 120, color: '#ff6b6b' },
  { product: 'Product B', sales: 150, color: '#4ecdc4' },
  { product: 'Product C', sales: 80, color: '#45b7d1' },
  { product: 'Product D', sales: 200, color: '#96ceb4' },
  { product: 'Product E', sales: 90, color: '#feca57' },
];

const initialTrendData: TrendData[] = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 130 },
  { month: 'Mar', value: 110 },
  { month: 'Apr', value: 160 },
  { month: 'May', value: 140 },
  { month: 'Jun', value: 180 },
  { month: 'Jul', value: 200 },
  { month: 'Aug', value: 175 },
  { month: 'Sep', value: 210 },
  { month: 'Oct', value: 190 },
  { month: 'Nov', value: 230 },
  { month: 'Dec', value: 250 },
];

export const useChartData = () => {
  const [salesData, setSalesData] = useState<SalesData[]>(initialSalesData);
  const [trendData, setTrendData] = useState<TrendData[]>(initialTrendData);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const updateData = useCallback(() => {
    setSalesData(prevData =>
      prevData.map(d => ({
        ...d,
        sales: Math.floor(Math.random() * 200) + 50,
      }))
    );

    setTrendData(prevData =>
      prevData.map(d => ({
        ...d,
        value: Math.floor(Math.random() * 200) + 100,
      }))
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
  }, []);

  return {
    salesData,
    trendData,
    isDarkTheme,
    updateData,
    toggleTheme,
  };
};