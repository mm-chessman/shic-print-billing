import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="text-gray-700">Here you can manage users, view invoices, and perform other administrative tasks.</p>
      </div>
    </div>
  );
};

export default MainContent;
