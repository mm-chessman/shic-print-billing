import React, { useState, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';

const User: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newDebt, setNewDebt] = useState<any>({
    page: 'A4',
    type: 'one-sided',
    count: 1,
    amount: 2,
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

  const calculateAmount = (page: string, type: string, count: number) => {
    const pageValue = page === 'A4' ? 1 : page === 'A5' ? 0.5 : 2;
    const typeValue = type === 'one-sided' ? 1.5 : type === 'two-sided' ? 2 : 3;
    var toAdd = page === 'A5' && type === 'one-sided' ? 0.75 : page === 'A5' ? 1 : page === 'A4' ? 0.5 : 0;
    return (pageValue * typeValue + toAdd) * count;
  };

  const handleNewDebtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDebt((prevDebt: any) => {
      const updatedDebt = { ...prevDebt, [name]: value };
      const newAmount = calculateAmount(updatedDebt.page, updatedDebt.type, updatedDebt.count);
      return { ...updatedDebt, amount: newAmount };
    });
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
        setUser((prevUser: any) => {
          const updatedDebt = [...(prevUser.debt || []), newTransaction];
          const updatedTransactions = [...(prevUser.transactions || []), { ...newTransaction, type: 'debt' }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          return {
            ...prevUser,
            debt: updatedDebt,
            transactions: updatedTransactions,
          };
        });
        setNewDebt({ page: 'A4', type: 'one-sided', count: 1, amount: 2 });
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
        setUser((prevUser: any) => {
          const updatedCredit = [...(prevUser.credit || []), newTransaction];
          const updatedTransactions = [...(prevUser.transactions || []), { ...newTransaction, type: 'credit' }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          return {
            ...prevUser,
            credit: updatedCredit,
            transactions: updatedTransactions,
          };
        });
        setNewCredit(0);
      } else {
        console.error('Failed to add new credit');
      }
    } catch (error) {
      console.error('Error adding new credit:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  }

  if (loading) {
    return <p className="text-gray-700">Loading user...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  var total: number = 0;

  return (
    <div className="p-6 space-y-6">
      <form className="mr-12 mt-4 grid grid-cols-2 place-items-center absolute right-0" action={`/admin/user/${userId}`}>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleInputChange}
          className="h-11 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter user ID"
          required
        />
        <div>
          <Link
            to={`/admin/user/${userId}`}
            className={`h-11 grid place-items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${userId.length > 2 ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Go to User Page
          </Link>
        </div>
      </form>
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className="text-2xl font-semibold mb-4">Add Debt</h2>
        <form onSubmit={handleNewDebtSubmit} className="mt-4 grid gap-3 grid-cols-5 place-items-stretch">
          <div className='w-full h-20'>
            <label className="block mt-2 mb-2">Page:</label>
            <select id='page' name="page" value={newDebt.page} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option data-page="2" value="A4">A4</option>
              <option data-page="1" value="A5">A5</option>
              <option data-page="3" value="A3">A3</option>
            </select>
          </div>
          <div className='w-full h-20'>
            <label className="block mt-2 mb-2">Type:</label>
            <select id='type' name="type" value={newDebt.type} onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option data-type="1" value="one-sided">One-Sided</option>
              <option data-type="2" value="two-sided">Two-Sided</option>
              <option data-type="3" value="booklet">Booklet</option>
            </select>
          </div>
          <div className='w-full h-20'>
            <label className="block mt-2 mb-2">Count:</label>
            <input id='count' type="number" name="count" value={newDebt.count} min="1" onChange={handleNewDebtChange} className="block w-full border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
          <div className='w-full h-20'>
            <label className="block mt-2 mb-2">Amount:</label>
            <input id='amount' type="number" name="amount" readOnly value={newDebt.amount} min="1" className="block w-full border-gray-300 rounded-md shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
          <button type="submit" className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add</button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
          <button
            onClick={handlePrint}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <FaPrint className="mr-2" />
          Print
          </button>
        </div>
        <table className="printableArea min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Page</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {user.transactions.map((transaction: any, index: number) => (
              <>
                <tr key={index} className={`border-t ${transaction.count ? 'text-red-500' : 'text-green-500'}`}>
                  <td className="px-4 py-2">{transaction.count ? 'Debt' : 'Credit'}</td>
                  <td className="px-4 py-2">{transaction.page || 'N/A'}</td>
                  <td className="px-4 py-2">{transaction.type || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-2">{transaction.date}</td>
                </tr>
                <tr key={index} hidden>
                  {transaction.count ? (total -= Number(transaction.amount)) : (total += Number(transaction.amount))}
                </tr>
              </>
            ))}
            <tr className={`border-t ${total < 0 ? 'text-red-500' : 'text-green-500'}`}>
              <td className="px-4 py-2 font-bold text-xl">Total</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2 font-bold text-xl">{total}</td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold mb-4">Add Credit</h2>
        <form onSubmit={handleNewCreditSubmit} className="mt-4">
          <label className="block mb-2">Credit Amount:</label>
          <input type="number" value={newCredit} min="1" onChange={handleNewCreditChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          <button type="submit" className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add Credit</button>
        </form>
      </div>
      <Link to="/admin/users" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Back to Users</Link>
    </div >
  );
};

export default User;
