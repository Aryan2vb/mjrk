import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const AddCustomer = () => {
    // Initialize the state with empty data or from localStorage
    const navigate = useNavigate();
    const location = useLocation();
    const customerToEdit = location.state?.customer;

    // const [isEditing, setIsEditing] = useState(false);  // Toggle edit/view mode
    // const [isEditMode, setIsEditMode] = useState(false);


    const [formData, setFormData] = useState({
        customerCode: customerToEdit?.customerCode || '',
        fullName: customerToEdit?.fullName || '',
        fatherName: customerToEdit?.fatherName || '',
        address: customerToEdit?.address || '',
        contactNumber: customerToEdit?.contactNumber || '',
        secondaryContactNumber: customerToEdit?.secondaryContactNumber || '',
        facebookId: customerToEdit?.facebookId || '',
        caste: customerToEdit?.caste || '',
        openingAccountBalance: customerToEdit?.openingAccountBalance || '',
        status: customerToEdit?.status || 'Active',
        accountType: customerToEdit?.accountType || '',
        dateOfRegistration: customerToEdit?.dateOfRegistration || new Date().toISOString().substring(0, 10),
        gender: customerToEdit?.gender || '',
        dateOfBirth: customerToEdit?.dateOfBirth || '',
        note: customerToEdit?.note || '',
        profilePicture: customerToEdit?.profilePicture || null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const [isEditing, setIsEditing] = useState(false);  // Use a single state for toggling
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };



    const validate = () => {
        let newErrors = {};
        if (!formData.customerCode) newErrors.customerCode = "Customer Code is required.";
        if (!formData.fullName) newErrors.fullName = "Full Name is required.";
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
        if (!formData.contactNumber) {
            newErrors.contactNumber = "Contact Number is required.";
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = "Invalid phone number. It should be 10 digits.";
        }
        if (!formData.openingAccountBalance) newErrors.openingAccountBalance = "Opening Account Balance is required.";
        if (!formData.gender) newErrors.gender = "Gender is required.";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];

            if (customerToEdit) {
                // Edit existing customer
                const updatedCustomers = existingCustomers.map(customer =>
                    customer.customerCode === customerToEdit.customerCode ? formData : customer
                );
                localStorage.setItem('customers', JSON.stringify(updatedCustomers));
            } else {
                // Add new customer
                existingCustomers.push(formData);
                localStorage.setItem('customers', JSON.stringify(existingCustomers));
            }

            alert(customerToEdit ? "Customer updated successfully" : "Customer added successfully");

            // Redirect to Dashboard
            navigate('/dashboard');
        }
    };
    return (
        <form className="max-w-screen-lg mx-auto bg-light-blue p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <h2 className="col-span-2 text-2xl font-bold text-center text-blue mb-6">Add Customer</h2>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Customer Code</label>
                <input type="text" name="customerCode" value={formData.customerCode} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.customerCode && <p className="text-red-500 text-sm">{errors.customerCode}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Father’s Name</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing}></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Contact Number</label>
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Secondary Contact Number</label>
                <input type="tel" name="secondaryContactNumber" value={formData.secondaryContactNumber} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing} />
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Facebook ID</label>
                <input type="text" name="facebookId" value={formData.facebookId} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing} />
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Caste</label>
                <input type="text" name="caste" value={formData.caste} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing} />
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Opening Account Balance</label>
                <input type="number" name="openingAccountBalance" value={formData.openingAccountBalance} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.openingAccountBalance && <p className="text-red-500 text-sm">{errors.openingAccountBalance}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Account Type</label>
                <select name="accountType" value={formData.accountType} onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing}>
                    <option value="Regular">Regular</option>
                    <option value="Premium">Premium</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Date of Registration</label>
                <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing} />
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" required disabled={!isEditing} />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Note</label>
                <textarea name="note" value={formData.note} onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing}></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-semibold mb-2">Profile Picture</label>
                <input type="file" name="profilePicture" onChange={handleChange}
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue" disabled={!isEditing} />
            </div>

            <div className="flex justify-between items-center col-span-2">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    {isEditing ? 'Save Information' : 'Edit Information'}
                </button>
                <button type="button" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-500"
                        onClick={toggleEdit}>
                    {isEditing ? 'Switch to View Mode' : 'Switch to Edit Mode'}
                </button>
            </div>
        </form>
    );
};

export default AddCustomer;
