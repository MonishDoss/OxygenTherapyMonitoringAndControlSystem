import React from 'react';

import { Users, UserX, UserRound, Bell } from 'lucide-react';

import StatsCard from '../components/StatsCard';

import WardDonut from '../components/WardDonut';

import WardTable from '../components/WardTable';

import PatientList from '../components/PatientList';

import TodayTasks from '../components/TodayTasks';



function Dashboard() {

const currentDate = new Date().toLocaleDateString('en-US', {

year: 'numeric',

month: 'long',

day: 'numeric'

});


const currentTime = new Date().toLocaleTimeString('en-US', {

hour: '2-digit',

minute: '2-digit'

});



return (

<div className="min-h-screen bg-gray-50">

{/* Header */}

<header className="bg-white shadow-sm">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

<div className="flex justify-between items-center">

<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

<div className="flex items-center space-x-4">

<Bell className="w-6 h-6 text-gray-500" />

<div className="w-8 h-8 rounded-full bg-teal-500" />

</div>

</div>

</div>

</header>



<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

{/* Stats Section */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<StatsCard

icon={<Users className="w-8 h-8 text-teal-500" />}

title="Patients active"

value="550"

trend="10% Since last month"

/>

<StatsCard

icon={<UserX className="w-8 h-8 text-teal-500" />}

title="Patients death"

value="10"

trend="05% Since last month"

/>

<StatsCard

icon={<UserRound className="w-8 h-8 text-teal-500" />}

title="Patients critical"

value="50"

trend="08% Since last month"

/>

</div>



{/* Date and Time */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

<div className="bg-white rounded-lg shadow p-6">

<h2 className="text-lg font-medium mb-2">DATE</h2>

<p className="text-2xl font-semibold">{currentDate}</p>

</div>

<div className="bg-white rounded-lg shadow p-6">

<h2 className="text-lg font-medium mb-2">TIME</h2>

<p className="text-2xl font-semibold">{currentTime}</p>

</div>

</div>



{/* Charts and Tables Section */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

<div className="lg:col-span-2">

<div className="bg-white rounded-lg shadow p-6">

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<WardDonut />

<WardTable />

</div>

</div>

</div>

<div className="bg-white rounded-lg shadow p-6">

<TodayTasks />

</div>

</div>



{/* Patient List Section */}

<div className="bg-white rounded-lg shadow overflow-hidden">

<PatientList />

</div>

</main>

</div>

);

}



export default Dashboard;