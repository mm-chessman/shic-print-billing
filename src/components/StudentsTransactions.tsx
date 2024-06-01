import React, { useState, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import './print.css';

const StudentTransactionsPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/api/users');
        const data = await response.json();

        const studentSummary: any[] = data.map((user: any) => {
          const totalDebts = user.debt ? user.debt.reduce((sum: number, debt: any) => sum += debt.amount, 0) : 0;
          const totalCredits = user.credit ? user.credit.reduce((sum: number, credit: any) => sum += credit.amount, 0) : 0;
          const balance = totalCredits - totalDebts;
          return {
            id: user.id,
            name: user.name,
            totalDebts,
            totalCredits,
            balance
          };
        });

        setStudents(studentSummary);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Student Transactions</h1>
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          <FaPrint className="mr-2" />
          Print
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="printableArea bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Student Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left border-b">ID</th>
                  <th className="py-2 px-4 text-left border-b">Name</th>
                  <th className="py-2 px-4 text-left border-b">Total Debts</th>
                  <th className="py-2 px-4 text-left border-b">Total Credits</th>
                  <th className="py-2 px-4 text-left border-b">Balance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-100 ${
                      student.totalDebts > student.totalCredits ? 'text-red-500' : 'text-black'
                    }`}
                  >
                    <td className="py-2 px-4">{student.id}</td>
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">₹{student.totalDebts.toFixed(2)}</td>
                    <td className="py-2 px-4">₹{student.totalCredits.toFixed(2)}</td>
                    <td className="py-2 px-4">₹{student.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='invisible'>By MM_CHESSMAN</p>
        </div>
      )}
    </div>
  );
};

export default StudentTransactionsPage;