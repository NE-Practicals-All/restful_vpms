import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/dashboard" className="text-2xl font-semibold tracking-wide hover:text-accent transition-colors">
          🚗 Parking Admin
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-accent font-medium transition-colors">
            Dashboard
          </Link>
          <Link to="/slot-requests" className="hover:text-accent font-medium transition-colors">
            Slot Requests
          </Link>
          <Link to="/logs" className="hover:text-accent font-medium transition-colors">
            Logs
          </Link>
          <button
            onClick={handleLogout}
            className="bg-secondary hover:bg-[#16a34a] text-white flex items-center px-4 py-2 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
