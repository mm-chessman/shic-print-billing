import React from 'react';

const Users: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <p className="text-gray-700">Here you can add, edit, or delete users.</p>
      </div>
    </div>
  );
};

export default Users;
