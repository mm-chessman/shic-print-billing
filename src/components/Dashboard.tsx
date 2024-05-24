import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-gray-700 text-3xl">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Invoices</h3>
          <p className="text-gray-700 text-3xl">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Revenue</h3>
          <p className="text-gray-700 text-3xl">$12,345</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="text-gray-700">User John Doe created an invoice for $500</li>
          <li className="text-gray-700">User Jane Smith updated her profile</li>
          <li className="text-gray-700">User Michael Brown marked an invoice as paid</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/admin/add-user')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add User
          </button>
          <button
            onClick={() => navigate('/admin/create-invoice')}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
