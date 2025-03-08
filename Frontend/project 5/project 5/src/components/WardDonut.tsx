import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 50 },
  { name: 'A2', value: 86 },
  { name: 'B1', value: 77 },
  { name: 'B2', value: 100 },

];
const WardDonut: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-10">Number of patients under respiratory support</h3>
      <div className="relative w-200 h-48 mx-auto mt-6">
        
          {/* Add more segments as needed */}
          <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-xl font-bold">WARDS</span>
            <p className="text-sm">Total: 400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardDonut;