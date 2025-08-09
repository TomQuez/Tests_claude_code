import type { SalesData, TrendData, ChartDimensions, TooltipData } from '../index';

describe('Type definitions', () => {
  test('SalesData should have correct structure', () => {
    const salesData: SalesData = {
      product: 'Test Product',
      sales: 100,
      color: '#ff0000',
    };

    expect(typeof salesData.product).toBe('string');
    expect(typeof salesData.sales).toBe('number');
    expect(typeof salesData.color).toBe('string');
  });

  test('TrendData should have correct structure', () => {
    const trendData: TrendData = {
      month: 'January',
      value: 150,
    };

    expect(typeof trendData.month).toBe('string');
    expect(typeof trendData.value).toBe('number');
  });

  test('ChartDimensions should have correct structure', () => {
    const dimensions: ChartDimensions = {
      width: 800,
      height: 400,
      margin: {
        top: 20,
        right: 30,
        bottom: 40,
        left: 50,
      },
    };

    expect(typeof dimensions.width).toBe('number');
    expect(typeof dimensions.height).toBe('number');
    expect(typeof dimensions.margin.top).toBe('number');
    expect(typeof dimensions.margin.right).toBe('number');
    expect(typeof dimensions.margin.bottom).toBe('number');
    expect(typeof dimensions.margin.left).toBe('number');
  });

  test('TooltipData should have correct structure', () => {
    const tooltipData: TooltipData = {
      x: 100,
      y: 200,
      content: 'Tooltip content',
      visible: true,
    };

    expect(typeof tooltipData.x).toBe('number');
    expect(typeof tooltipData.y).toBe('number');
    expect(typeof tooltipData.content).toBe('string');
    expect(typeof tooltipData.visible).toBe('boolean');
  });
});