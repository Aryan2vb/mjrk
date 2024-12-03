const Ledger = require("../models/Ledger");
const Customer = require("../models/Customer");

const createLedgerEntry = async (req, res) => {
  try {
    const { customerCode, transactionType, amount, note } = req.body;

    const customerExists = await Customer.findOne({ customerCode });
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newEntry = new Ledger({
      customerCode,
      transactionType,
      amount,
      note,
    });

    return res
      .status(201)
      .json({ message: "Ledger entry created successfully", ledgerEntry });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createLedgerEntry };
