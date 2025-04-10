import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 p-4 text-white">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="text-lg font-bold">Aswins Healthcare</Link>
      <div>
        <Link to="/dashboard" className="mx-2">Dashboard</Link>
        <Link to="/appointments" className="mx-2">Appointments</Link>
        <Link to="/patients" className="mx-2">Patients</Link>
        <Link to="/reports" className="mx-2">Reports</Link>
        <Link to="/chat" className="mx-2">Chat</Link>
        <Link to="/about" className="mx-2">About Us</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;