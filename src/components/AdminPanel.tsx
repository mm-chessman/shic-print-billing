import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import Invoices from './Invoices';

const AdminPanel: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/invoices" element={<Invoices />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
