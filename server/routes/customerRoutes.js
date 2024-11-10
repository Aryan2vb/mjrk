const express = require('express');
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
} = require('../controllers/customerController');

const router = express.Router();

// Route to create a new customer
router.post('/', createCustomer);

// Route to get all customers
router.get('/', getAllCustomers);

// Route to get a single customer by ID
router.get('/:id', getCustomerById);

// Route to update a customer by ID
router.put('/:id', updateCustomerById);

// Route to delete a customer by ID
router.delete('/:id', deleteCustomerById);

module.exports = router;