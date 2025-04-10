import { useState } from 'react';
import API from '../services/api';

const PatientForm = ({ onPatientAdded }) => {
  const [formData, setFormData] = useState({
    name: '', age: '', heartRate: '', bloodPressure: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/api/patients', formData);
    onPatientAdded();
    setFormData({ name: '', age: '', heartRate: '', bloodPressure: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold">Add Patient</h3>
      <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} className="w-full border p-2" required />
      <input name="age" placeholder="Age" onChange={handleChange} value={formData.age} className="w-full border p-2" required />
      <input name="heartRate" placeholder="Heart Rate" onChange={handleChange} value={formData.heartRate} className="w-full border p-2" required />
      <input name="bloodPressure" placeholder="Blood Pressure" onChange={handleChange} value={formData.bloodPressure} className="w-full border p-2" required />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default PatientForm;