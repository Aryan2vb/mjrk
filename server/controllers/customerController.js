const Customer = require("../models/Customer"); // Assuming you're using Mongoose

// 1. Create a new customer
const createCustomer = async (req, res) => {
  try {
    const customerCode = await generateCustomerCode();
    const customer = new Customer({ ...req.body, customerCode });

    await customer.save();
    return res.status(201).json({ res: "Succesfully Created Customer" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create customer" });
  }
};

// 2. Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
};

// 3. Get a single customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
};

// 4. Get a single customer by customer code
const getCustomerByCode = async (req, res) => {
  const { customerCode } = req.params;
  try {
    const customer = await Customer.findOne({ customerCode });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
};

// 5. Update a customer by ID
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedCustomer) {
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// 6. Delete a customer by ID
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (deletedCustomer) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

// Function to generate customer code (RK00001, RK00002, etc.)
const generateCustomerCode = async () => {
  try {
    const lastCustomer = await Customer.findOne()
      .sort({ customerCode: -1 })
      .limit(1);
    const lastCode = lastCustomer ? lastCustomer.customerCode : "RK00000";
    const newCode = `RK${(parseInt(lastCode.substring(2)) + 1).toString().padStart(5, "0")}`;
    return newCode;
  } catch (error) {
    throw new Error("Error generating customer code");
  }
};

const createBulkCustomers = async (req, res) => {
  const customersData = req.body; // Array of customer data
  let addedCustomers = [];
  let failedCustomers = [];

  // Iterate over each customer in the array
  for (let customerData of customersData) {
    try {
      // Call the existing `createCustomer` function and push successful results to `addedCustomers`
      const addedCustomer = await createCustomer({ body: customerData });
      addedCustomers.push(addedCustomer);
    } catch (error) {
      // Add to `failedCustomers` if there's an error with this customer
      failedCustomers.push({ customer: customerData, error: error.message });
    }
  }

  // Respond with the result, including successfully added and failed customers
  res.status(201).json({
    message: `${addedCustomers.length} customers added successfully`,
    addedCustomers,
    failedCustomers,
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByCode,
  updateCustomer,
  deleteCustomer,
  createBulkCustomers,
};
