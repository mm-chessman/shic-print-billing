import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Debt {
  page: string;
  type: string;
  count: number;
  amount: number;
  date: string;
}

interface Credit {
  amount: number;
  date: string;
}

interface User {
  id: string;
  name: string;
  debt: Debt[];
  credit: Credit[];
}

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newDebt, setNewDebt] = useState<Debt>({
    page: '',
    type: '',
    count: 0,
    amount: 0,
    date: '',
  });
  const [newCredit, setNewCredit] = useState<number>(0);

  useEffect(() => {
    fetch(`https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/user/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user.');
        setLoading(false);
      });
  }, [id]);

  const handleNewDebtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDebt({ ...newDebt, [e.target.name]: e.target.value });
  };

  const handleNewCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCredit(parseFloat(e.target.value));
  };

  const handleNewDebtSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const newTransaction = { ...newDebt, date: today };
    try {
      const response = await fetch(`https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/user/${id}/add-debt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (response.ok) {
        setUser(prevUser => prevUser ? ({
          ...prevUser,
          debt: [...prevUser.debt, newTransaction],
        }) : prevUser);
        setNewDebt({ page: '', type: '', count: 0, amount: 0, date: '' });
      } else {
        console.error('Failed to add new debt');
      }
    } catch (error) {
      console.error('Error adding new debt:', error);
    }
  };

  const handleNewCreditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const newTransaction = { amount: newCredit, date: today };
    try {
      const response = await fetch(`https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/user/${id}/add-credit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (response.ok) {
        setUser(prevUser => prevUser ? ({
          ...prevUser,
          credit: [...prevUser.credit, newTransaction],
        }) : prevUser);
        setNewCredit(0);
      } else {
        console.error('Failed to add new credit');
      }
    } catch (error) {
      console.error('Error adding new credit:', error);
    }
  };

  if (loading) {
    return <p className="text-gray-700">Loading user...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Name:</strong> {user?.name}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Debt Transactions</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Page</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Count</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {user?.debt.map((transaction: any, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{transaction.page}</td>
                <td className="px-4 py-2">{transaction.type}</td>
                <td className="px-4 py-2">{transaction.count}</td>
                <td className="px-4 py-2 text-red-500">{transaction.amount}</td>
                <td className="px-4 py-2">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleNewDebtSubmit} className="mt-4">
          <label className="block mb-2">Page:</label>
          <select name="page" value={newDebt.page} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select Page</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="A3">A3</option>
          </select>
          <label className="block mt-2 mb-2">Type:</label>
          <select name="type" value={newDebt.type} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select Type</option>
            <option value="one-sided">One-Sided</option>
            <option value="two-sided">Two-Sided</option>
            <option value="booklet">Booklet</option>
          </select>
          <label className="block mt-2 mb-2">Count:</label>
          <input type="number" name="count" value={newDebt.count} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <label className="block mt-2 mb-2">Amount:</label>
          <input type="number" name="amount" value={newDebt.amount} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Debt</button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Credit Transactions</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {user?.credit.map((transaction: any, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-green-500">{transaction.amount}</td>
                <td className="px-4 py-2">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleNewCreditSubmit} className="mt-4">
          <label className="block mb-2">Credit Amount:</label>
          <input type="number" value={newCredit} onChange={handleNewCreditChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <button type="submit" className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add Credit</button>
        </form>
      </div>
      <Link to="/users" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Back to Users</Link>
    </div>
  );
};

export default User;
