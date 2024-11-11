import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Customer } from '../types.jsx';
import { formatDate, formatCurrency } from '../utils/formatters.jsx';

interface CustomerDetailProps {
    customer: Customer;
    onBack: () => void;
}

export function CustomerDetail({ customer, onBack }: CustomerDetailProps) {
    const details = [
        { label: 'Customer Code', value: customer.customerCode },
        { label: 'Full Name', value: customer.fullName },
        { label: "Father's Name", value: customer.fathersName },
        { label: 'Address', value: customer.address },
        { label: 'Contact Number', value: customer.contactNumber },
        { label: 'Opening Balance', value: formatCurrency(customer.openingAccountBalance) },
        { label: 'Gender', value: customer.gender },
        { label: 'Date of Birth', value: formatDate(customer.dateOfBirth) },
        { label: 'Registration Date', value: formatDate(customer.dateOfRegistration) },
        { label: 'Caste', value: customer.caste || 'N/A' },  // Display caste if available, otherwise 'N/A'
        { label: 'Last Purchase Date', value: customer.lastPurchaseDate ? formatDate(customer.lastPurchaseDate) : 'N/A' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={onBack}
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                        </div>
                    </div>

                    <div className="px-6 py-6">
                        {/* Profile Picture Section */}
                        {customer.profilePicture && (
                            <div className="mb-6">
                                <img
                                    src={customer.profilePicture}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            </div>
                        )}

                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {details.map(({ label, value }) => (
                                <div key={label} className="border-b border-gray-100 pb-4">
                                    <dt className="text-sm font-medium text-gray-500">{label}</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}