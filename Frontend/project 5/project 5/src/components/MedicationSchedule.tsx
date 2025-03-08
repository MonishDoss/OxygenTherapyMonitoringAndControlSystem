import React from 'react';
import { Clock, User } from 'lucide-react';

const medications = [
  {
    patient: 'Patient 1',
    medications: [
      {
        name: 'Medicine A',
        startDate: 'Mar 2',
        endDate: 'Mar 9',
        schedule: 'In morning (with food)',
        doses: 1,
        status: { FN: true, AN: false, N: false },
        allergens: ['Aspirin'],
        notes: 'Keep refrigerated'
      },
      {
        name: 'Medicine B',
        startDate: 'Apr 6',
        endDate: 'Apr 14',
        schedule: 'Every 12 hours AM/PM',
        doses: 2,
        status: { FN: true, AN: true, N: false },
        allergens: ['Penicillin'],
        notes: 'Keep at room temp'
      }
    ]
  },
  {
    patient: 'Patient 2',
    medications: [
      {
        name: 'Medicine A',
        startDate: 'Feb 20',
        endDate: 'Feb 25',
        schedule: 'Twice a day (with food)',
        doses: 2,
        status: { FN: true, AN: false, N: false },
        allergens: ['Anticoagulants'],
        notes: 'Keep refrigerated'
      }
    ]
  }
];

const MedicationSchedule = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient/Medicine
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dose Schedule
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Allergens
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medications.map((patient, patientIndex) => (
            <React.Fragment key={patientIndex}>
              {patient.medications.map((med, medIndex) => (
                <tr key={`${patientIndex}-${medIndex}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-teal-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {med.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">Dr. Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {med.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {med.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {med.schedule}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <span className={`h-6 w-6 rounded-full ${med.status.FN ? 'bg-green-500' : 'bg-gray-200'}`} />
                      <span className={`h-6 w-6 rounded-full ${med.status.AN ? 'bg-green-500' : 'bg-gray-200'}`} />
                      <span className={`h-6 w-6 rounded-full ${med.status.N ? 'bg-green-500' : 'bg-gray-200'}`} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {med.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 mr-1"
                      >
                        {allergen}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {med.notes}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationSchedule;