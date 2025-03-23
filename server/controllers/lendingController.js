const Lending = require('../models/Lending');

// @desc Get all lendings
exports.getAllLendings = async (req, res) => {
  try {
    const lendings = await Lending.find();
    res.status(200).json(lendings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get single lending by ID
exports.getLendingById = async (req, res) => {
  try {
    const lending = await Lending.findById(req.params.id).populate('customerCode', 'name phone');
    if (!lending) {
      return res.status(404).json({ message: 'Lending not found' });
    }
    res.status(200).json(lending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Create a new lending
exports.createLending = async (req, res) => {
  const { customerCode, product_name, total_amount, due_date } = req.body;
  try {
    const newLending = new Lending({
    customerCode,
      product_name,
      total_amount,
      amount_paid: 0,
      balance_due: total_amount,
      due_date
    });

    await newLending.save();
    res.status(201).json(newLending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Add an installment to a lending
exports.addInstallment = async (req, res) => {
  const { amount_paid, paid_by } = req.body;
  try {
    const lending = await Lending.findById(req.params.id);

    if (!lending) {
      return res.status(404).json({ message: 'Lending not found' });
    }

    const newBalanceDue = lending.balance_due - amount_paid;

    const installment = {
      amount_paid,
      balance_remaining: newBalanceDue > 0 ? newBalanceDue : 0,
      paid_by
    };

    lending.installments.push(installment);
    lending.amount_paid += amount_paid;
    lending.balance_due = newBalanceDue > 0 ? newBalanceDue : 0;
    lending.status = lending.balance_due === 0 ? 'Completed' : lending.status;

    await lending.save();
    res.status(200).json({ message: 'Installment added successfully', lending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete a lending
exports.deleteLending = async (req, res) => {
  try {
    const lending = await Lending.findByIdAndDelete(req.params.id);

    if (!lending) {
      return res.status(404).json({ message: 'Lending not found' });
    }

    res.status(200).json({ message: 'Lending deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get lendings by customer code
exports.getLendingsByCustomerCode = async (req, res) => {
  try {
    const { customerCode } = req.params;
    const lendings = await Lending.find({ customerCode })
    
    if (!lendings.length) {
      return res.status(404).json({ message: 'No lendings found for this customer' });
    }
    
    res.status(200).json(lendings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};