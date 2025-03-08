import React from 'react';
import { Bell, Clock, User } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'patient',
    title: 'New Patient Admitted',
    message: 'Patient John Doe has been admitted to Ward A',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'medication',
    title: 'Medication Schedule Updated',
    message: 'Changes in medication schedule for Patient ID: PT003',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Critical Patient Status',
    message: 'Patient in Room 402 needs immediate attention',
    time: '2 hours ago',
    read: false,
  },
];

const NotificationsPage = () => {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          {/* <button className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-800">
            Mark all as read
          </button> */}
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow p-6 ${
                !notification.read ? 'border-l-4 border-teal-500' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    notification.type === 'patient'
                      ? 'bg-blue-100'
                      : notification.type === 'medication'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {notification.type === 'patient' ? (
                      <User className="h-6 w-6 text-blue-600" />
                    ) : notification.type === 'medication' ? (
                      <Bell className="h-6 w-6 text-green-600" />
                    ) : (
                      <Bell className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      {notification.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {notification.time}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;