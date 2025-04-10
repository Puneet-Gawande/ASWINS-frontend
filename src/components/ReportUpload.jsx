import { useState } from 'react';
import API from '../services/api';

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('report', file);
    try {
      await API.post('/api/upload', formData);
      setMsg('Report uploaded successfully');
    } catch {
      setMsg('Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl mb-4 font-semibold">Upload Patient Report</h2>
      {msg && <p className="text-green-600">{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 w-full" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default ReportUpload;