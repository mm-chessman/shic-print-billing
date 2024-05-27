import React, { useState } from 'react';

const BulkDebts: React.FC = () => {
    const [message, setMessage] = useState('');
    const [newDebt, setNewDebt] = useState({
        page: 'A4',
        type: 'one-sided',
        count: 1,
        amount: 2,
        date: '',
    });
    const [ids, setIds] = useState<string[]>([]);

    const calculateAmount = (page: string, type: string, count: number) => {
        const pageValue = page === 'A4' ? 1 : page === 'A5' ? 0.5 : 2;
        const typeValue = type === 'one-sided' ? 1.5 : type === 'two-sided' ? 2 : 3;
        var toAdd = pageValue * typeValue > 1 ? 0.5 : 0.25;
        return (pageValue * typeValue + toAdd) * count;
    };

    const handleNewDebtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDebt((prevDebt:any) => {
            const updatedDebt = { ...prevDebt, [name]: value };
            const newAmount = calculateAmount(updatedDebt.page, updatedDebt.type, updatedDebt.count);
            return { ...updatedDebt, amount: newAmount };
        });
    };

    const handleIdsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setIds(value.split(',').map(id => id.trim()));
    };

    const handleBulkDebtSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date().toLocaleDateString();
        const newTransaction = { ...newDebt, date: today };

        try {
            const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/bulk-debt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids, newTransaction }),
            });
            if (response.ok) {
                setMessage('Debts added successfully');
                setNewDebt({ page: 'A4', type: 'one-sided', count: 1, amount: 2, date: '' });
                setIds([]);
            } else {
                console.error('Failed to add bulk debts');
                setMessage('Failed to add bulk debts');
            }
        } catch (error) {
            console.error('Error adding bulk debts:', error);
            setMessage('Error adding bulk debts');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bulk Add Debts</h2>
            <form onSubmit={handleBulkDebtSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ids">
                        User IDs (comma separated)
                    </label>
                    <textarea
                        id="ids"
                        value={ids.join(', ')}
                        onChange={handleIdsChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="page">
                            Page
                        </label>
                        <select
                            id="page"
                            name="page"
                            value={newDebt.page}
                            onChange={handleNewDebtChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                            <option value="A3">A3</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={newDebt.type}
                            onChange={handleNewDebtChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="one-sided">One-Sided</option>
                            <option value="two-sided">Two-Sided</option>
                            <option value="booklet">Booklet</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
                            Count
                        </label>
                        <input
                            id="count"
                            type="number"
                            name="count"
                            value={newDebt.count}
                            min="1"
                            onChange={handleNewDebtChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            name="amount"
                            readOnly
                            value={newDebt.amount}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Add Bulk Debts
                </button>
                {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
            </form>
        </div>
    );
};

export default BulkDebts;
