import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WasteLineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        console.log('data', data);
        if (!data || data.length === 0) return;

        // Parse and sort data by date
        const parseDate = d3.timeParse('%Y-%m-%d');
        const formattedData = data.map(d => ({
            category: d.Category,
            cost: d.Cost,
            dateUpdated: d['Date Updated'],
            day: d.Day,
            month: d.Month,
            year: d.Year,
            vendor: d.Vendor,
            materialType: d['Material Type'],
            notes: d.Notes,
            date: parseDate(`${d.Year}-${d.Month}-${d.day}`),
            weight: +d.Weight
        }))

        // Aggregate by month
        const aggregatedData = Array.from(
            d3.rollup(
                formattedData,
                v => d3.sum(v, d => d.weight),
                d => d3.timeMonth(d.date)
            ),
            ([date, weight]) => ({ date, weight })
        );

        const margin = { top: 20, right: 30, bottom: 30, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        svg.selectAll('*').remove(); // Clear previous chart

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(aggregatedData, d => d.date))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.weight)])
            .range([height, 0]);

        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.weight));

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append('g')
            .call(d3.axisLeft(y));

        g.append('path')
            .datum(aggregatedData)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default WasteLineChart;