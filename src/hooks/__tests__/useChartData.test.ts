import { renderHook, act } from '@testing-library/react';
import { useChartData } from '../useChartData';

describe('useChartData', () => {
  test('should initialize with default data', () => {
    const { result } = renderHook(() => useChartData());
    
    expect(result.current.salesData).toHaveLength(5);
    expect(result.current.trendData).toHaveLength(12);
    expect(result.current.isDarkTheme).toBe(false);
  });

  test('should toggle theme', () => {
    const { result } = renderHook(() => useChartData());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDarkTheme).toBe(true);
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDarkTheme).toBe(false);
  });

  test('should update data with random values', () => {
    const { result } = renderHook(() => useChartData());
    const initialSalesData = result.current.salesData;
    const initialTrendData = result.current.trendData;
    
    act(() => {
      result.current.updateData();
    });
    
    expect(result.current.salesData).toHaveLength(5);
    expect(result.current.trendData).toHaveLength(12);
    
    // Values should be different (with very high probability due to randomness)
    const salesChanged = result.current.salesData.some((item, index) => 
      item.sales !== initialSalesData[index].sales
    );
    const trendsChanged = result.current.trendData.some((item, index) => 
      item.value !== initialTrendData[index].value
    );
    
    expect(salesChanged || trendsChanged).toBe(true);
  });

  test('should maintain product names and colors when updating data', () => {
    const { result } = renderHook(() => useChartData());
    const initialProducts = result.current.salesData.map(d => ({ product: d.product, color: d.color }));
    
    act(() => {
      result.current.updateData();
    });
    
    const updatedProducts = result.current.salesData.map(d => ({ product: d.product, color: d.color }));
    expect(updatedProducts).toEqual(initialProducts);
  });

  test('should maintain month names when updating trend data', () => {
    const { result } = renderHook(() => useChartData());
    const initialMonths = result.current.trendData.map(d => d.month);
    
    act(() => {
      result.current.updateData();
    });
    
    const updatedMonths = result.current.trendData.map(d => d.month);
    expect(updatedMonths).toEqual(initialMonths);
  });
});