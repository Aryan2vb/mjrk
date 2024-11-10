const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByCode,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController'); // Import the controller methods

// Route to create a new customer
router.post('/customers', createCustomer);

// Route to get all customers
router.get('/customers', getAllCustomers);

// Route to get a single customer by ID
router.get('/customers/:id', getCustomerById);

// Route to get a single customer by customer code
router.get('/customers/code/:customerCode', getCustomerByCode);

// Route to update a customer by ID
router.put('/customers/:id', updateCustomer);

// Route to delete a customer by ID
router.delete('/customers/:id', deleteCustomer);

module.exports = router;