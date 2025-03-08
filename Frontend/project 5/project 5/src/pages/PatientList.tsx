import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Search, Eye } from 'lucide-react';

const PatientList = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([
    { id: '1', name: 'John Doe', room: '101', ward: 'A', status: 'Stable' },
  ]);
  const [newPatient, setNewPatient] = useState({ name: '', room: '', ward: '', status: 'Stable' });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm) ||
    patient.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = useCallback((id: string) => {
    navigate(`/patient/${id}`);
  }, [navigate]);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = { ...newPatient, id: String(patients.length + 1) };
    setPatients([...patients, newEntry]);
    setNewPatient({ name: '', room: '', ward: '', status: 'Stable' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Patient List</h1>
              <button
  onClick={() => setShowForm(true)}
  className="text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
>
  Add Patients
</button>


            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop"
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

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
            <form onSubmit={handleAddPatient}>
              <input
                type="text"
                placeholder="Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Room"
                value={newPatient.room}
                onChange={(e) => setNewPatient({ ...newPatient, room: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Ward"
                value={newPatient.ward}
                onChange={(e) => setNewPatient({ ...newPatient, ward: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <select
                value={newPatient.status}
                onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
              </select>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name, room, or ward..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
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
                    {patient.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.ward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'Critical'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleNavigate(patient.id)}
                      className="text-teal-600 hover:text-teal-900">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PatientList;