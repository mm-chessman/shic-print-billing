import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaAddressCard, FaFileInvoice, FaPowerOff } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <h1 className="text-2xl font-bold text-center">SHIC Print Billing</h1>
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
          to="/admin/get-user"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaAddressCard className="inline mr-2" /> Get User
        </NavLink>
        <NavLink
          to="/admin/bulk-debts"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaFileInvoice className="inline mr-2" /> Bulk Debts
        </NavLink>
        <NavLink
          to="/admin/bulk-credits"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaFileInvoice className="inline mr-2" /> Bulk Credits
        </NavLink>
        <button
        onClick={handleLogout}
          className="text-red-500 block absolute bottom-0 py-2.5 pl-4 pr-36 rounded transition duration-200 hover:bg-red-500 hover:text-white">
          <FaPowerOff className="inline mr-2" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;