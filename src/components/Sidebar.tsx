import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaFileInvoice, FaUserPlus } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      <nav>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
          end
        >
          <FaHome className="inline mr-2" /> Dashboard
        </NavLink>
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => 
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaUsers className="inline mr-2" /> Users
        </NavLink>
        <NavLink 
          to="/admin/add-user" 
          className={({ isActive }) => 
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaUserPlus className="inline mr-2" /> Add User
        </NavLink>
        <NavLink 
          to="/admin/invoices" 
          className={({ isActive }) => 
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaFileInvoice className="inline mr-2" /> Invoices
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;