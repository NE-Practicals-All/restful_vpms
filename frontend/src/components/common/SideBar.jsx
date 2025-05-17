import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-primary text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-xl`}
      >
        {/* Sidebar header */}
        <div className="p-6 border-b border-green-700">
          <h2 className="text-3xl font-extrabold tracking-wide text-accent">
            Admin Dashboard
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-3">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/slot-requests', label: 'Slot Requests' },
            { to: '/users', label: 'Users' },
            { to: '/vehicles', label: 'Vehicles' },
            { to: '/parking-slots', label: 'Parking Slots' },
            { to: '/logs', label: 'Activity Logs' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `p-3 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-secondary text-primary shadow-md'
                    : 'hover:bg-secondary/90 hover:text-accent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="mt-auto p-3 text-left rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-semibold shadow"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
