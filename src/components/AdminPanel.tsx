import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import User from './User';
import AddUser from './AddUser';
import GetUser from './GetUser';
import BulkImportUsers from './BulkImportUsers';
import BulkDebts from './BulkDebts';
import BulkCredits from './BulkCredits';

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isAuthenticated === 'true');
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/bulk-import-users" element={<BulkImportUsers />} />
          <Route path="/get-user" element={<GetUser />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/bulk-debts" element={<BulkDebts />} />
          <Route path="/bulk-credits" element={<BulkCredits />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
