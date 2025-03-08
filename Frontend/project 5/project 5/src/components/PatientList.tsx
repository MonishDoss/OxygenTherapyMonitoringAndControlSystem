import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialPatients = [
  {
    id: '1',
    ward: '4',
    room: '402',
    uhid: '344912',
    name: 'JEBA',
    status: 'CRITICAL',
  },
  // Add more patient data as needed
];

const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ id: '', ward: '', room: '', uhid: '', name: '', status: 'STABLE' });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = { ...newPatient, id: String(patients.length + 1) };
    setPatients([...patients, newEntry]);
    setNewPatient({ id: '', ward: '', room: '', uhid: '', name: '', status: 'STABLE' });
    setShowForm(false);
  };

  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        {/* <h3 className="text-lg font-medium">Patients List</h3> */}
        {/* <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
        >
          Add Patients
        </button> */}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
            <form onSubmit={handleAddPatient}>
              <input
                type="text"
                placeholder="Ward"
                value={newPatient.ward}
                onChange={(e) => setNewPatient({ ...newPatient, ward: e.target.value })}
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
                placeholder="UHID"
                value={newPatient.uhid}
                onChange={(e) => setNewPatient({ ...newPatient, uhid: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <select
                value={newPatient.status}
                onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="STABLE">STABLE</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UHID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.ward}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.room}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.uhid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/patient/${patient.id}`)}
                    className="text-teal-600 hover:text-teal-900"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;