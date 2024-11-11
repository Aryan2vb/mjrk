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
        <div className="max-w-screen-lg mx-auto p-6">
            <h2 className="text-2xl font-bold text-center text-blue mb-6">Customer Dashboard</h2>

            {customers.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Customer Code</th>
                        <th className="px-4 py-2 border-b">Full Name</th>
                        <th className="px-4 py-2 border-b">Contact Number</th>
                        <th className="px-4 py-2 border-b">Account Balance</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border-b">{customer.customerCode}</td>
                            <td className="px-4 py-2 border-b">{customer.fullName}</td>
                            <td className="px-4 py-2 border-b">{customer.contactNumber}</td>
                            <td className="px-4 py-2 border-b">{customer.openingAccountBalance}</td>
                            <td className="px-4 py-2 border-b">{customer.status}</td>
                            <td className="px-4 py-2 border-b">
                                <Link
                                    to="/add-customer"
                                    state={{ customer }}
                                    className="text-blue-500 hover:text-blue-700 mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(customer.customerCode)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

export default Dashboard;
