import React, { useState } from 'react';

const BulkCredits: React.FC = () => {
    const [message, setMessage] = useState('');
    const [excludedIds, setExcludedIds] = useState<string[]>([]);

    const handleExcludedIdsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setExcludedIds(value.split(',').map(id => id.trim()));
    };

    const handleBulkCredit = async () => {
        try {
            const response = await fetch('https://8d2bef02-5170-441c-82c1-00571422b3d7-00-1676bxo36y4w5.pike.replit.dev/bulk-credit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ excludedIds }),
            });
            if (response.ok) {
                setMessage('Credits added successfully');
                setExcludedIds([]);
            } else {
                console.error('Failed to add bulk credits');
                setMessage('Failed to add bulk credits');
            }
        } catch (error) {
            console.error('Error adding bulk credits:', error);
            setMessage('Error adding bulk credits');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bulk Add Credits</h2>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excludedIds">
                    Exclude User IDs (comma separated)
                </label>
                <textarea
                    id="excludedIds"
                    value={excludedIds.join(', ')}
                    onChange={handleExcludedIdsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                onClick={handleBulkCredit}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
                Add Bulk Credits
            </button>
            {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
        </div>
    );
};

export default BulkCredits;
