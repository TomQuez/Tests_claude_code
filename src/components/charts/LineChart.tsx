import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { TrendData } from '../../types';

interface LineChartProps {
  data: TrendData[];
  onTooltip: (x: number, y: number, content: string) => void;
  onTooltipHide: () => void;
}

export const LineChart: React.FC<LineChartProps> = ({ data, onTooltip, onTooltipHide }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(data.map(d => d.month))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([height, 0]);

    const line = d3
      .line<TrendData>()
      .x(d => x(d.month) || 0)
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = g
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', 0)
      .attr('y2', 0);

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#667eea')
      .attr('stop-opacity', 0.1);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#667eea')
      .attr('stop-opacity', 0.8);

    // Add area
    const area = d3
      .area<TrendData>()
      .x(d => x(d.month) || 0)
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#gradient)')
      .attr('d', area)
      .style('opacity', 0)
      .transition()
      .duration(1500)
      .style('opacity', 1);

    // Add line
    const path = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#667eea')
      .attr('stroke-width', 3)
      .attr('d', line);

    const totalLength = path.node()?.getTotalLength() || 0;

    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.month) || 0)
      .attr('cy', d => y(d.value))
      .attr('r', 0)
      .attr('fill', '#667eea')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).transition().duration(200).attr('r', 8);
        onTooltip(event.pageX, event.pageY, `${d.month}<br/>Value: ${d.value}`);
      })
      .on('mouseout', function() {
        d3.select(this).transition().duration(200).attr('r', 5);
        onTooltipHide();
      })
      .transition()
      .duration(1000)
      .delay((_d, i) => i * 100 + 1000)
      .attr('r', 5);

    // Add axes
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));
  }, [data, onTooltip, onTooltipHide]);

  return <svg ref={svgRef}></svg>;
};