const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByCode,
    updateCustomer,
    deleteCustomer,
    createBulkCustomers
} = require('../controllers/customerController'); // Import the controller methods

// Route to create a new customer
router.post('/createcustomer', createCustomer);

// Route to get all customers
router.get('/getallcustomers', getAllCustomers);

// Route to get a single customer by ID
router.get('/getcustomersbyid/:id', getCustomerById);

// Route to get a single customer by customer code
router.get('/getcustomersbycode/:customerCode', getCustomerByCode);

// Route to update a customer by ID
router.put('/updatecustomer/:id', updateCustomer);

// Route to delete a customer by ID
router.delete('/deletecustomer/:id', deleteCustomer);

router.post('/customers/bulk', createBulkCustomers);

module.exports = router;