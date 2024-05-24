import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
        setLoading(false);
      });
  }, []);

  const handleEditUser = async (id: string) => {
    const newName = prompt('Enter new name for user:');
    if (newName) {
      try {
        const response = await fetch(`https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/users/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        const updatedUser = await response.json();
        const updatedUsers = users.map(user => (user.id === id ? updatedUser : user));
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  

  const handleDeleteUser = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

        {loading ? (
          <p className="text-gray-700">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{user.name}</td>
                    <td className="py-4 px-6 flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditUser(user.id)}>
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
