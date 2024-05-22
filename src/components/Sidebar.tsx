import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaFileInvoice } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaHome className="inline mr-2" /> Dashboard
        </Link>
        <Link to="/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaUsers className="inline mr-2" /> Users
        </Link>
        <Link to="/invoices" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaFileInvoice className="inline mr-2" /> Invoices
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
