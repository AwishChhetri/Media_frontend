import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [accountID, setAccountID] = useState('');
    const [introducerID, setIntroducerID] = useState('');
    const [accounts, setAccounts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/addAccount', {
                accountID: parseInt(accountID),
                introducerID: parseInt(introducerID)
            });
            alert('Account added successfully');
            fetchAccounts();
        } catch (error) {
            console.error(error);
            alert('Failed to add account');
        }
    };

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/accounts');
            setAccounts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Bank Promotion</h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account ID:</label>
                        <input
                            type="number"
                            value={accountID}
                            onChange={(e) => setAccountID(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Introducer ID:</label>
                        <input
                            type="number"
                            value={introducerID}
                            onChange={(e) => setIntroducerID(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-blue-600">Accounts</h2>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Introducer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {accounts.map((account) => (
                            <tr key={account.accountid}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.accountid}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.introducerid}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.beneficiaryid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;