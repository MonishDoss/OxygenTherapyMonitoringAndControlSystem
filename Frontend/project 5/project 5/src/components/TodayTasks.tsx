import React from 'react';

const patients = [
  {
    name: 'Patient 1',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    name: 'Patient 2',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    name: 'Patient 3',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
  {
    name: 'Patient 4',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
  },
  {
    name: 'Patient 5',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
  },
  {
    name: 'Patient 6',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop',
  },
];

const TodayTasks: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Today Task's</h3>
        <button className="text-teal-600 text-sm hover:text-teal-900">View All</button>
      </div>
      <div className="space-y-4">
        {patients.map((patient, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium">{patient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayTasks;