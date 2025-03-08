import React, { useState, useEffect } from 'react';
import { Routes, useNavigate, useParams } from 'react-router-dom';
import { Search, Bell, ArrowLeft, Edit, Thermometer, Heart, Activity, Wind, Settings as Lungs } from 'lucide-react';
import IncrementDecrement from '../components/incre';

function VitalSign({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color
}: {
  title: string;
  value: string;
  unit: string;
  change: string;
  icon: React.ElementType;
  color: string;
}): JSX.Element {
  return (
    <div className={`bg-${color}-50 p-4 rounded-lg`}>
      <div className="flex items-center justify-between">
        <h4 className={`text-sm font-medium text-${color}-80t0`}>{title}</h4>
        <span className={`text-${color}-600`}>
          <Icon className="w-5 h-5" />
        </span>
      </div>
      <p className={`text-2xl font-bold text-${color}-900 mt-2`}>{value} {unit}</p>
      <p className={`text-sm text-${color}-600 mt-1`}>{change}</p>
    </div>
  );
}

// function App() {
//   const [heartRate, setHeartRate] = useState(72);
//   const [spo2, setSpo2] = useState(98);
//   const [o2Flow, setO2Flow] = useState(2);

//   // Animate heart rate between 70-74
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeartRate(prev => {
//         const newRate = prev + (Math.random() > 0.5 ? 1 : -1);
//         return Math.min(Math.max(newRate, 70), 74);
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animate SpO2 between 97-99
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSpo2(prev => {
//         const newSpo2 = prev + (Math.random() > 0.5 ? 1 : -1);
//         return Math.min(Math.max(newSpo2, 97), 99);
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);
// }



const PatientDetails = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [o2Flow, setO2Flow] = useState(2);

  // Animate heart rate between 70-74
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const newRate = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.min(Math.max(newRate, 70), 74);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate SpO2 between 97-99
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data');
        const data = await response.json();
        setHeartRate(data.heartRate);
        setSpo2(data.spo2Rate);
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    };
    fetchData(); // Fetch immediately
    const interval = setInterval(fetchData, 3000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const navigate = useNavigate();
  const { id } = useParams(); // Get the patient ID from the route parameters
  const [value, setValue] = useState(0); // State for increment and decrement

  // Mocked patient data
  const patients = [
    {
      id: '1',
      name: 'Jazim',
      status: 'Active',
      dob: 'January 15, 1947',
      age: 76,
      bloodGroup: 'O+',
      careTeam: [
        'Adolph Mccallister (CN)',
        'Stephen Warren (Physician)',
      ],
      vitals: {
        bloodPressure: '120/80',
        heartRate: {heartRate}+'bpm',
        bodyTemperature: '99.4°F',
        o2FlowRate: '0 L/min',
        spo2Rate: {spo2} +'%',
      },
    },
    {
      id: '2',
      name: 'helllo',
      status: 'Active',
      dob: 'January 15, 1947',
      age: 76,
      bloodGroup: 'O+',
      careTeam: [
        'Adolph Mccallister (CN)',
        'Stephen Warren (Physician)',
      ],
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72bpm',
        bodyTemperature: '99.4°F',
        o2FlowRate: '0 L/min',
        spo2Rate: '98%',
      },
    },
    // Add more patient data as needed
  ];

  // Find the patient by ID
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500" />
              <div className="w-8 h-8 rounded-full bg-teal-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Patient:</h2>
              <div className="relative">
                {/* <input
                  type="text"
                  placeholder="Type here to search"
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                /> */}
                <button
                  onClick={() => navigate('/increment')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Go to Control flow
                </button>
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                alt="Alex Smith"
                className="w-24 h-24 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-semibold">{patient.name}</h3>
                      <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                        Status: {patient.status}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-1">PID: {patient.id} | Row: 1 | {patient.age} Years</p>
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Personal Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">DOB:</span> {patient.dob}</p>
                      <p><span className="font-medium">Age:</span> {patient.age}</p>
                      <p><span className="font-medium">Blood group:</span> {patient.bloodGroup}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Care Team</h4>
                    <div className="space-y-2">
                      {patient.careTeam.map((member, index) => (
                        <p key={index}>{index + 1}. {member}</p>
                      ))}
                    </div>
                  </div>
                </div>


              </div>
              <div className="mt-6 flex items-center space-x-4">
                {/* <span className="text-xl font-semibold">{value}</span> */}
              </div>
              <div className="mt-6 flex items-center space-x-4">
                 {/* <button
                  onClick={() => setValue(value - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  -
                </button> */}
                {/* <button
                  onClick={() => navigate('/increment')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Go to Control flow
                </button> */}
                {/* </button> */}
                {/* <IncrementDecrement /> */}
              </div>
            </div>
            {/* <IncrementDecrement /> */}

            {/* Vital Signs */}
            {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-yellow-800">Blood Pressure</h4>
                  <span className="text-yellow-600">
                    <Heart className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-yellow-900 mt-2">{patient.vitals.bloodPressure}</p>
                <p className="text-sm text-yellow-600 mt-1">5% higher</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-green-800">Heart rate</h4>
                  <span className="text-green-600">
                    <Heart className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-2">{patient.vitals.heartRate}</p>
                <p className="text-sm text-green-600 mt-1">2% lower</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-blue-800">Body Temperature</h4>
                  <span className="text-blue-600">
                    <Thermometer className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-2">{patient.vitals.bodyTemperature}</p>
                <p className="text-sm text-blue-600 mt-1">Normal</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-indigo-800">O2 Flow rate</h4>
                  <span className="text-indigo-600">
                    <Wind className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-indigo-900 mt-2">{patient.vitals.o2FlowRate}</p>
                <p className="text-sm text-indigo-600 mt-1">4% higher</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-purple-800">SpO2 rate</h4>
                  <span className="text-purple-600">
                    <Lungs className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-2">{patient.vitals.spo2Rate}</p>
                <p className="text-sm text-purple-600 mt-1">2% lower</p>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <VitalSign
                title="Blood Pressure"
                value="120/80"
                unit="mmHg"
                change="5% higher"
                icon={Activity}
                color="bg-yellow-500"
              />
              <VitalSign
                title="Heart Rate"
                value={`${heartRate}`}
                unit="bpm"
                change="2% lower"
                icon={Heart}
                color="bg-green-500"
              />
              <VitalSign
                title="Body Temperature"
                value="99.4"
                unit="°F"
                change="Normal"
                icon={Thermometer}
                color="bg-blue-500"
              />
              <VitalSign
                title="O2 Flow Rate"
                value={`${o2Flow}`}
                unit="L/min"
                change="4% higher"
                icon={Wind}
                color="bg-indigo-500"
              />
              <VitalSign
                title="SpO2"
                value={`${spo2}`}
                unit="%"
                change="2% lower"
                icon={Activity}
                color="bg-purple-500"
              />
            </div>


            {/* Tabs and Graph */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-teal-500 text-teal-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                    Statistics
                  </button>
                  {/* <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                    RECORDS

                  </button> */}
                  {/* <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                  </button>
                  <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                    HISTORY
                  </button> */}
                </nav>
              </div>

              {/* Graph */}
              <div className="mt-6">
                <div className="border rounded-lg p-4">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="w-24 pr-4 text-sm font-medium text-gray-500">SpO2 ({spo2}%)</td>
                        <td>
                          <div className="h-32 bg-gray-50">
                            {/* <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                              <path
                                d="M0,10 L20,8 L40,12 L60,7 L80,13 L100,9"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="1"
                              />
                            </svg> */}
                            {/* <div className="absolute inset-0 flex items-center justify-center"> */}
                            {/* <svg viewBox="0 0 400 100" className="w-full h-16" preserveAspectRatio="none">
                    <path
                    d="M0,50 Q50,50 100,50 T200,50 T300,50 T400,50"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="animate-pulse"
                    >
                    <animate
                      attributeName="d"
                      dur="3s"
                      repeatCount="indefinite"
                      values="
                      M0,50 Q50,50 100,50 T200,50 T300,50 T400,50;
                      M0,50 Q50,30 100,50 T200,70 T300,30 T400,50;
                      M0,50 Q50,50 100,50 T200,50 T300,50 T400,50;
                      "
                    />
                    </path>
                </svg> */}
                            <svg
                              viewBox="0 0 400 100"
                              className="w-full h-16"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,50 Q25,10 50,50 T100,50 T150,10 T200,50 T250,90 T300,50 T350,10 T400,50"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="d"
                                  dur="1.5s"
                                  repeatCount="indefinite"
                                  values="
            M0,50 Q25,10 50,50 T100,50 T150,10 T200,50 T250,90 T300,50 T350,10 T400,50;
            M0,50 Q25,20 50,60 T100,40 T150,20 T200,50 T250,80 T300,40 T350,20 T400,50;
            M0,50 Q25,15 50,55 T100,45 T150,15 T200,55 T250,85 T300,45 T350,15 T400,50;
            M0,50 Q25,10 50,50 T100,50 T150,10 T200,50 T250,90 T300,50 T350,10 T400,50;
          "
                                />
                              </path>
                            </svg>
                            {/* </div> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-24 pr-4 text-sm font-medium text-gray-500">O2 Flow ({o2Flow}L/min)</td>
                        <td>
                          <div className="h- bg-gray-50">
                            <svg
                              viewBox="0 0 400 100"
                              className="w-full h-20"
                              preserveAspectRatio="none"
                            >
                              {/* Box-Shaped Line Graph */}
                              <path
                                d="M0,80 L50,80 L50,60 L100,60 L100,40 L150,40 L150,20 L200,20 L200,50 L250,50 L250,30 L300,30 L300,10 L350,10 L350,5 L400,5"
                                fill="none"
                                stroke="#2563EB"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="d"
                                  dur="2s"
                                  repeatCount="indefinite"
                                  values="
            M0,80 L50,80 L50,60 L100,60 L100,40 L150,40 L150,20 L200,20 L200,50 L250,50 L250,30 L300,30 L300,10 L350,10 L350,5 L400,5;
            M0,80 L50,70 L50,50 L100,50 L100,30 L150,30 L150,10 L200,10 L200,40 L250,40 L250,20 L300,20 L300,5 L350,5 L350,0 L400,0;
            M0,80 L50,80 L50,60 L100,60 L100,40 L150,40 L150,20 L200,20 L200,50 L250,50 L250,30 L300,30 L300,10 L350,10 L350,5 L400,5;
          "
                                />
                              </path>
                            </svg>
                            {/* <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                              <path
                                d="M0,10 L20,11 L40,11 L60,12 L80,12 L100,13"
                                fill="none"
                                stroke="#6366F1"
                                strokeWidth=""
                              />
                            </svg> */}
                            {/* <svg viewBox="0 0 400 100" className="w-full h-16" preserveAspectRatio="none">
  <path
    d="M0,50 Q50,40 100,60 T200,40 T300,55 T400,45"
    fill="none"
    stroke="#6366F1"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <animate
      attributeName="d"
      dur="2s"
      repeatCount="indefinite"
      values="
        M0,50 Q50,50 100,50 T200,50 T300,50 T400,50;
        M0,50 Q50,30 100,60 T200,40 T300,70 T400,45;
        M0,50 Q50,45 100,55 T200,35 T300,65 T400,50;
        M0,50 Q50,35 100,65 T200,50 T300,40 T400,55;
        M0,50 Q50,50 100,50 T200,50 T300,50 T400,50;
      "
    />
  </path>
</svg> */}

                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-24 pr-4 text-sm font-medium text-gray-500">Pulse ({heartRate}BPM)</td>
                        <td>
                          <div className="h-64 bg-gray-50">
                            <svg viewBox="0 0 200 50" className="w-full h-25" preserveAspectRatio="none">
                              <path
                                d="M0,25 L20,25 L30,10 L40,40 L50,25 L70,25 L80,5 L90,45 L100,25 L120,25 L130,10 L140,40 L150,25 L170,25 L180,5 L190,45 L200,25"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="1"
                                strokeLinecap="round"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="translate"
                                  from="200,0"
                                  to="-10,0"
                                  dur="3s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </svg>
                            </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;