import React, { useState, useEffect } from 'react';
import './print.css';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/users');
        const data = await response.json();

        const allTransactions: any[] = [];

        data.forEach((user: any) => {
          if (user.debt) {
            user.debt.forEach((debt: any) => {
              allTransactions.push({
                ...debt,
                userId: user.id,
                userName: user.name,
                type: 'debt'
              });
            });
          }
          if (user.credit) {
            user.credit.forEach((credit: any) => {
              allTransactions.push({
                ...credit,
                userId: user.id,
                userName: user.name,
                type: 'credit'
              });
            });
          }
        });

        setTransactions(allTransactions);
        setFilteredTransactions(allTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date).getTime();
        const start = startDate ? new Date(startDate).getTime() : -Infinity;
        const end = endDate ? new Date(endDate).getTime() : Infinity;
        return transactionDate >= start && transactionDate <= end;
      });
      setFilteredTransactions(filtered);
    }
  }, [startDate, endDate, transactions]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left border-b">ID</th>
                  <th className="py-2 px-4 text-left border-b">Name</th>
                  <th className="py-2 px-4 text-left border-b">Type</th>
                  <th className="py-2 px-4 text-left border-b">Page</th>
                  <th className="py-2 px-4 text-left border-b">Count</th>
                  <th className="py-2 px-4 text-left border-b">Amount</th>
                  <th className="py-2 px-4 text-left border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={index} className={`border-b hover:bg-gray-100 ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                    <td className="py-2 px-4">{transaction.userId}</td>
                    <td className="py-2 px-4">{transaction.userName}</td>
                    <td className="py-2 px-4">{transaction.type}</td>
                    <td className="py-2 px-4">{transaction.page}</td>
                    <td className="py-2 px-4">{transaction.count}</td>
                    <td className="py-2 px-4">₹{transaction.amount}</td>
                    <td className="py-2 px-4">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
