import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalDebts, setTotalDebts] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [userDebts, setUserDebts] = useState<any[]>([]);
  const [userCredits, setUserCredits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/users');
        const data = await response.json();

        const userCount = data.length;

        let debtSum = 0;
        let creditSum = 0;
        const debts: any[] = [];
        const credits: any[] = [];

        data.forEach((user: any) => {
          if (user.debt) {
            user.debt.forEach((debt: any) => {
              debtSum += debt.amount;
              debts.push({ ...debt, userName: user.name });
            });
          }
          if (user.credit) {
            user.credit.forEach((credit: any) => {
              creditSum += credit.amount;
              credits.push({ ...credit, userName: user.name });
            });
          }
        });

        setTotalUsers(userCount);
        setTotalDebts(debtSum);
        setTotalCredits(creditSum);
        setUserDebts(debts);
        setUserCredits(credits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-500 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-xl font-semibold mb-2">Total Users</h3>
              <p className="text-gray-100 text-3xl">{totalUsers}</p>
            </div>
            <div className="bg-red-500 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-xl font-semibold mb-2">Total Debts</h3>
              <p className="text-gray-100 text-3xl">₹{totalDebts.toFixed(2)}</p>
            </div>
            <div className="bg-green-500 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-xl font-semibold mb-2">Total Credits</h3>
              <p className="text-gray-100 text-3xl">₹{totalCredits.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white p-6 text-green-500 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Credits</h2>
            <ul className="space-y-4">
              {userCredits.slice(0, 5).map((credit, index) => (
                <li key={index} className="text-green-700">
                  {credit.userName} has credited ₹{credit.amount} on {credit.date}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 text-red-500 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Debts</h2>
            <ul className="space-y-4">
              {userDebts.slice(0, 5).map((debt, index) => (
                <li key={index} className="text-red-700">
                  {debt.userName} owes ₹{debt.amount} for {debt.count} {debt.type}(s) on {debt.page} (Date: {debt.date})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link
            to="/admin/add-user"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add User
          </Link>
          <Link
            to="/admin/get-user"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Get User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
