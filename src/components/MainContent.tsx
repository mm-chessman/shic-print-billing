import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Invoices from './Invoices';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
};

export default MainContent;
