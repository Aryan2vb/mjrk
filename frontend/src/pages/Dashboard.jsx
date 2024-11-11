import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Load the customer data from localStorage when the component mounts
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        setCustomers(storedCustomers);
    }, []);

    const handleDelete = (customerCode) => {
        const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        const updatedCustomers = existingCustomers.filter(customer => customer.customerCode !== customerCode);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        setCustomers(updatedCustomers);
    };

    return (
        <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-[#4962bf] mb-6">Customer Dashboard</h2>

            {customers.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <thead>
                    <tr className="bg-[#4962bf] text-white text-left">
                        <th className="px-6 py-4 font-semibold">Customer Code</th>
                        <th className="px-6 py-4 font-semibold">Full Name</th>
                        <th className="px-6 py-4 font-semibold">Contact Number</th>
                        <th className="px-6 py-4 font-semibold">Account Balance</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-6 py-4 border-t">{customer.customerCode}</td>
                            <td className="px-6 py-4 border-t">{customer.fullName}</td>
                            <td className="px-6 py-4 border-t">{customer.contactNumber}</td>
                            <td className="px-6 py-4 border-t">{customer.openingAccountBalance}</td>
                            <td className="px-6 py-4 border-t">{customer.status}</td>
                            <td className="px-6 py-4 border-t flex items-center space-x-4">
                                <Link
                                    to="/add-customer"
                                    state={{ customer }}
                                    className="text-blue-500 hover:text-blue-700 font-medium"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(customer.customerCode)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-600">No customers found.</p>
            )}
        </div>
    );
};

export default Dashboard;
