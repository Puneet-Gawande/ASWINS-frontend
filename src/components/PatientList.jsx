import { useEffect, useState } from 'react';
import API from '../services/api';
import PatientForm from './PatientForm';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

 
  const fetchPatients = async () => {
    try{
    const res = await API.get('/api/patients');
    setPatients(res.data);}
    catch(err){  
      console.error('Error in fetching patient: ', err)
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientAdded = (newPatient) => {
    setPatients(prev => [...prev, newPatient]); // add new patient to the list immediately
  };

  return (
    <div className="p-6">
      <PatientForm onPatientAdded={handlePatientAdded} />
      <h2 className="text-2xl mt-6 mb-2">Patient List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Heart Rate</th>
            <th className="p-2 border">Blood Pressure</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.heartRate}</td>
              <td className="p-2">{p.bloodPressure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;