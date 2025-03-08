import React from 'react';

const wardData = [
  { ward: '1', name: 'Neuro', numbers: 50 },
  { ward: '2', name: 'Gastro', numbers: 86 },
  { ward: '3', name: 'Cardio', numbers: 77 },
  { ward: '4', name: 'Orw', numbers: 100 },
];

const WardTable: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Ward wise patients list</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">WARD</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">WARD Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Numbers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {wardData.map((ward) => (
              <tr key={ward.ward}>
                <td className="px-4 py-2">{ward.ward}</td>
                <td className="px-4 py-2">{ward.name}</td>
                <td className="px-4 py-2">{ward.numbers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WardTable;