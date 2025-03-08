import React from 'react';
import MedicationSchedule from '../components/MedicationSchedule';
import { Search, Calendar, Plus } from 'lucide-react';

const MedicationsPage = () => {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Medication Management
          </h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            <Plus className="h-5 w-5 mr-2" />
            Add New Medication
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medications..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                  <option>All Patients</option>
                  <option>Critical Patients</option>
                  <option>Stable Patients</option>
                </select>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="date"
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Medication Schedule
            </h2>
          </div>
          <MedicationSchedule />
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;