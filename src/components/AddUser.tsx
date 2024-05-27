import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUser: React.FC = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleAddUser = async () => {
        const newUser = { id, name };

        try {
            const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setMessage('User added successfully');
                setId('');
                setName('');
            } else {
                const errorData = await response.json();
                setMessage('Failed to add user: ' + errorData.message);
            }
        } catch (error) {
            setMessage('Error: ' + error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    ID
                </label>
                <input
                    id="id"
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Add User
            </button>
            {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
            <div className="mt-4">
                <Link
                    to="/admin/bulk-import-users"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                    Bulk Import Users
                </Link>
            </div>
        </div>
    );
};

export default AddUser;
