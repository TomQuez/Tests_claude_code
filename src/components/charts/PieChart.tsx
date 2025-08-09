import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SalesData } from '../../types';

interface PieChartProps {
  data: SalesData[];
  onTooltip: (x: number, y: number, content: string) => void;
  onTooltipHide: () => void;
}

export const PieChart: React.FC<PieChartProps> = ({ data, onTooltip, onTooltipHide }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<SalesData>().value(d => d.sales);

    const arc = d3
      .arc<d3.PieArcDatum<SalesData>>()
      .innerRadius(40)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    const totalSales = d3.sum(data, d => d.sales);

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).transition().duration(200).style('opacity', 0.7);
        const percentage = ((d.data.sales / totalSales) * 100).toFixed(1);
        onTooltip(
          event.pageX,
          event.pageY,
          `${d.data.product}<br/>Sales: ${d.data.sales}<br/>Share: ${percentage}%`
        );
      })
      .on('mouseout', function() {
        d3.select(this).transition().duration(200).style('opacity', 1);
        onTooltipHide();
      })
      .transition()
      .duration(1000)
      .delay((_d, i) => i * 100)
      .style('opacity', 1);
  }, [data, onTooltip, onTooltipHide]);

  return <svg ref={svgRef}></svg>;
};