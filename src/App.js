
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
import PatientList from './components/PatientList';
import ReportUpload from './components/ReportUpload';
import ChatInterface from './components/ChatInterface';
import AboutUs from './components/AboutUs';
import LoginRegister from './components/LoginRegister';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentBooking />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/reports" element={<ReportUpload />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;