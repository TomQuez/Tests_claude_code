export interface SalesData {
  product: string;
  sales: number;
  color: string;
}

export interface TrendData {
  month: string;
  value: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface TooltipData {
  x: number;
  y: number;
  content: string;
  visible: boolean;
}