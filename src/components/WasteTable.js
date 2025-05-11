import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function WasteTable({ data }) {
    console.log('data', data);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Year', headerName: 'Year', width: 130 },
    { field: 'Month', headerName: 'Month', width: 130 },
    { field: 'Category', headerName: 'Category', width: 130 },
    { field: 'MaterialType', headerName: 'Material Type', width: 150 },
    { field: 'Weight', headerName: 'Weight (lbs)', width: 130 },
    { field: 'Cost', headerName: 'Cost ($)', width: 100 },
    { field: 'Vendor', headerName: 'Vendor', width: 150 },
    { field: 'Notes', headerName: 'Notes', width: 250 },
  ];

  const rows = data.map((row, index) => ({
    id: index + 1,
    date: `${row.Year}-${String(row.Month).padStart(2, '0')}-${String(row.Day).padStart(2, '0')}`,
    ...row,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}