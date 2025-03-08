import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Users, Pill as Pills, Bell, Settings, LogOut, Menu, Plus } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: user?.role === 'doctor' ? '/admin' : '/nurse',
    },
    {
      name: 'Patients',
      icon: Users,
      path: '/nurse/patients',
    },
    {
      name: 'Medications',
      icon: Pills,
      path: '/medications',
    },
    {
      name: 'Notifications',
      icon: Bell,
      path: '/notifications',
    },
    {
      name: 'Patients Details',
      icon: Settings,
      path: '/patient/1',
    },
    // {
    //   name: 'Add Patient',
    //   icon: Plus,
    //   path: '/IncrementDecrement',
    // },
    {
      name: 'O2 controller',
      icon: Plus,
      path: '/increment',
    },

  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 m-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:inset-0 z-40`}>
        <div className="flex flex-col h-full w-64 bg-gray-900">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <h1 className="text-white text-xl font-bold">Medical Dashboard</h1>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    isActive(item.path)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </button>
              ))}
              <button >
              <a className=" text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full" href="http://localhost:5174/add_product">
              <Plus className="mr-3 h-6 w-6" />AddPatient
              </a>
              </button>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs font-medium text-gray-300">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-4 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white w-full"
              >
                <LogOut className="mr-3 h-6 w-6" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;