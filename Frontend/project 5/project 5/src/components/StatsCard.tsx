import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-3xl font-bold text-teal-500">{value}</p>
          <p className="text-sm text-gray-500">{trend}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;