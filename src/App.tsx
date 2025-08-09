import { useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useChartData } from './hooks/useChartData';
import { BarChart } from './components/charts/BarChart';
import { PieChart } from './components/charts/PieChart';
import { LineChart } from './components/charts/LineChart';
import { Controls } from './components/ui/Controls';
import { Tooltip } from './components/ui/Tooltip';
import styles from './styles/App.module.css';

function App() {
  const { salesData, trendData, isDarkTheme, updateData, toggleTheme } = useChartData();
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    content: '',
    visible: false,
  });

  const showTooltip = useCallback((x: number, y: number, content: string) => {
    setTooltip({ x, y, content, visible: true });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  const handleAnimate = useCallback(() => {
    d3.selectAll('.bar')
      .transition()
      .duration(1000)
      .attr('transform', 'scale(1.1)')
      .transition()
      .duration(1000)
      .attr('transform', 'scale(1)');
  }, []);

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.dark : ''}`}>
      <h1 className={styles.title}>🚀 Interactive Data Dashboard</h1>
      
      <Controls
        onGenerateData={updateData}
        onAnimate={handleAnimate}
        onToggleTheme={toggleTheme}
      />

      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <h3 className={styles.chartTitle}>📊 Sales Performance</h3>
          <BarChart
            data={salesData}
            onTooltip={showTooltip}
            onTooltipHide={hideTooltip}
          />
        </div>
        
        <div className={styles.chart}>
          <h3 className={styles.chartTitle}>🥧 Market Share</h3>
          <PieChart
            data={salesData}
            onTooltip={showTooltip}
            onTooltipHide={hideTooltip}
          />
        </div>
      </div>

      <div className={styles.chart}>
        <h3 className={styles.chartTitle}>📈 Trend Analysis</h3>
        <LineChart
          data={trendData}
          onTooltip={showTooltip}
          onTooltipHide={hideTooltip}
        />
      </div>

      <Tooltip
        x={tooltip.x}
        y={tooltip.y}
        content={tooltip.content}
        visible={tooltip.visible}
      />
    </div>
  );
}

export default App
