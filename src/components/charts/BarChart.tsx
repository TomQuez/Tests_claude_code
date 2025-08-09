import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SalesData } from '../../types';

interface BarChartProps {
  data: SalesData[];
  onTooltip: (x: number, y: number, content: string) => void;
  onTooltipHide: () => void;
}

export const BarChart: React.FC<BarChartProps> = ({ data, onTooltip, onTooltipHide }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.product))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.sales) || 0])
      .range([height, 0]);

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.product) || 0)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', d => d.color)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        onTooltip(event.pageX, event.pageY, `${d.product}<br/>Sales: ${d.sales}`);
      })
      .on('mouseout', () => onTooltipHide())
      .transition()
      .duration(1000)
      .delay((_d, i) => i * 100)
      .attr('y', d => y(d.sales))
      .attr('height', d => height - y(d.sales));

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