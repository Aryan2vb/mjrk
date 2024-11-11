// src/components/CustomerList.jsx
import { useState, useEffect } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Load the customer data from localStorage when the component mounts
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        setCustomers(storedCustomers);
    }, []);

    return customers;
};

export default CustomerList;