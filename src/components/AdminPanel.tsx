import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const AdminPanel: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AdminPanel;