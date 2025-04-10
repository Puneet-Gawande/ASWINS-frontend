import { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import API from '../services/api';
import 'chart.js/auto';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientRes = await API.get('/api/patients');
      const appointmentRes = await API.get('/api/appointments');
      setPatients(patientRes.data || []);
      setAppointments(appointmentRes.data || []);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Normal BP', 'High BP', 'Low BP'],
    datasets: [
      {
        data: [
          patients.filter(p => p.bloodPressure === '120/80').length,
          patients.filter(p => p.bloodPressure > '130/90').length,
          patients.filter(p => p.bloodPressure < '110/70').length
        ],
        backgroundColor: ['#34d399', '#f87171', '#60a5fa'],
        borderWidth: 1
      }
    ]
  };

  const lineChartData = {
    labels: patients.map(p => p.name),
    datasets: [
      {
        label: 'Heart Rate',
        data: patients.map(p => p.heartRate),
        fill: false,
        borderColor: '#3b82f6'
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to Aswins Healthcare Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Patients</h2>
          <p className="text-3xl font-bold text-blue-700">{patients.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-3xl font-bold text-green-700">{appointments.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Reports Uploaded</h2>
          <p className="text-3xl font-bold text-yellow-700">{patients.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Blood Pressure Overview</h2>
          <Pie data={chartData} />
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Heart Rate by Patient</h2>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(0, 5).map((appt, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2">{appt.name}</td>
                <td className="p-2">{appt.doctor}</td>
                <td className="p-2">{appt.date}</td>
                <td className="p-2">{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;