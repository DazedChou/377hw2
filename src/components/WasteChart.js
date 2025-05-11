import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export default function WasteChart({ data, categories, selectedCategory, onCategoryChange }) {
  const [yAxisType, setYAxisType] = useState('Weight');

  const dates = data.map(row => `${row.Year}-${String(row.Month).padStart(2, '0')}`);
  const yValues = data.map(row => yAxisType === 'Weight' ? row.Weight : row.Cost);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="category-select" style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
        <select id="category-select" value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label htmlFor="y-axis-select" style={{ marginLeft: '1rem', marginRight: '0.5rem' }}>Y-Axis:</label>
        <select id="y-axis-select" value={yAxisType} onChange={e => setYAxisType(e.target.value)}>
          <option value="Weight">Weight</option>
          <option value="Cost">Cost</option>
        </select>
      </div>

      <Plot
        data={[
          {
            x: dates,
            y: yValues,
            type: 'bar',
            marker: { color: 'teal' },
          },
        ]}
        layout={{
          title: { text: `Waste ${yAxisType} Over Time` },
          xaxis: { title: { text: 'Date' } },
          yaxis: { title: { text: yAxisType === 'Weight' ? 'Weight (lbs)' : 'Cost ($)' } },
        }}
        style={{ width: '100%' }}
        useResizeHandler
        config={{ responsive: true }}
      />
    </div>
  );
}