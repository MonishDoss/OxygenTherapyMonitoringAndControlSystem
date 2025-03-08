import { ArrowLeft, Bell } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IncrementDecrement: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fixing TypeScript errors by defining parameter types
  const fetchData = async (url: string, operation: "increment" | "decrement") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { method: "GET" }); // Ensure it's a GET request
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Since API returns no data, update state manually
      if (operation === "increment") {
        setValue((prevValue) => prevValue + 1);
      } else if (operation === "decrement") {
        setValue((prevValue) => prevValue - 1);
      }
    } catch (err) {
      // Fixing error type issue
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const increment = () => {
    fetchData("http://192.168.128.100:5000/api/return-one", "increment");
  };

  const decrement = () => {
    fetchData("http://192.168.128.100:5000/api/return-minus-one", "decrement");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Oxygen Control Flow
        </button>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 text-gray-500" />
          <div className="w-8 h-8 rounded-full bg-teal-500" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              disabled={loading}
            >
              -
            </button>
            <span className="text-xl font-semibold">{value}</span>
            <button
              onClick={increment}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              disabled={loading}
            >
              +
            </button>
          </div>
        </div>

        {loading && <p className="text-blue-500">Updating...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};

export default IncrementDecrement;
