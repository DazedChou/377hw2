import React, { useState } from 'react';
import './App.css';
import data from './csvjson.json'
import WasteChart from './components/WasteChart';
import WasteTable from './components/WasteTable';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const parsedData = data.map((item) => ({
    Year: item.Year,
    Month: item.Month,
    Day: item.Day,
    Category: item.Category,
    MaterialType: item['Material Type'],
    Vendor: item.Vendor,
    Weight: item['Weight (lbs)'] ? parseFloat(item['Weight (lbs)']) : 0,
    Cost: item.Cost,
    DateUpdated: item['Date Updated'].split(' ')[0],
    Notes: item.Notes,
  })).filter(item => !!item.Day);
  const filteredData = selectedCategory
    ? parsedData.filter(item => item.Category === selectedCategory)
    : parsedData;
  const uniqueCategories = [...new Set(data.map(item => item.Category))];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', display: 'flex', flexDirection: 'column' }}>
      <h1>Waste Dashboard</h1>
      <div style={{height: '550px'}}>
        <WasteChart data={filteredData} 
                  categories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}/>
      </div>
      <div>
        <WasteTable data={filteredData} />
      </div>

    </div>
  );
}

export default App;
