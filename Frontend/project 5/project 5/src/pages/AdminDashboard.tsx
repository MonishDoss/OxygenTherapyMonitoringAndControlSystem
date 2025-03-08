import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Calendar, Users, Laptop, Layout } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { title: 'Doctors', value: '60', icon: Users },
    { title: 'Patients', value: '100', icon: Users },
    { title: 'Devices', value: '40', icon: Laptop },
    { title: 'Programs', value: '125', icon: Layout },
  ];

  const patients = [
    { id: 'PT001', name: 'Michael Scott', current: '5 l/m', predicted: '6 l/m', doctor: 'Dr. Michael Scott', condition: 'COPD' },
    { id: 'PT002', name: 'Dwight Schrute', current: '5 l/m', predicted: '6 l/m', doctor: 'Dr. Dwight Schrute', condition: 'COPD' },
    { id: 'PT003', name: 'Jim Halpert', current: '5 l/m', predicted: '6 l/m', doctor: 'Dr. Jim Halpert', condition: 'COPD' },
    { id: 'PT004', name: 'Pam Beesly', current: '5 l/m', predicted: '6 l/m', doctor: 'Dr. Pam Beesly', condition: 'COPD' },
    { id: 'PT005', name: 'Stanley Hudson', current: '5 l/m', predicted: '6 l/m', doctor: 'Dr. Stanley Hudson', condition: 'COPD' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Research and Analysis</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={logout}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Date Range Picker */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">Date Range</span>
            </div>
            <div className="text-gray-700">22/2/22, Tue</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donut Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Patient may need supplement O2
            </h3>
            {/* Add donut chart component here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Patients weaning off
            </h3>
            {/* Add donut chart component here */}
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">
              PATIENTS (10)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present O2 supplement
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prediction
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.predicted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.condition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;