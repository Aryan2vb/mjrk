const Ledger = require("../models/Ledger");
const Customer = require("../models/Customer");

const createLedgerEntry = async (req, res) => {
  try {
    const {
      customerCode,
      description,
      transactionType,
      amount,
      paymentMode,
      referenceNumber,
    } = req.body;

    // Find the customer
    const customer = await Customer.findOne({ customerCode });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const lastLedgerEntry = await Ledger.findOne({ customerCode }).sort({
      transactionDate: -1,
    });
    let balanceAfterTransaction = lastLedgerEntry
      ? lastLedgerEntry.balanceAfterTransaction
      : customer.openingAccountBalance;

    // Calculate new balance
    if (transactionType === "credit") {
      balanceAfterTransaction -= amount;
    } else if (transactionType === "debit") {
      balanceAfterTransaction += amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    // Create new ledger entry
    const newLedgerEntry = new Ledger({
      customerCode,
      description,
      transactionType,
      amount,
      balanceAfterTransaction,
      paymentMode,
      referenceNumber,
    });

    // Save the ledger entry
    await newLedgerEntry.save();

    // Update customer's opening balance
    await Customer.findOneAndUpdate(
      { customerCode },
      { openingAccountBalance: balanceAfterTransaction },
      { new: true },
    );

    return res.status(201).json({
      message: "Ledger entry created successfully and customer balance updated",
      data: {
        ledgerEntry: newLedgerEntry,
        updatedBalance: balanceAfterTransaction,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getLedgerEntries = async (req, res) => {
  try {
    const customerCode = req.query.customerCode; // Get from params

    let ledgers;

    if (customerCode) {
      // Fetch ledger entries for the specific customerCode
      ledgers = await Ledger.find({ customerCode });

      // If no entries are found for the given customerCode
      if (ledgers.length === 0) {
        return res.status(404).json({
          message: `No ledger entries found for customer code: ${customerCode}`,
        });
      }
    } else {
      // Fetch all ledger entries if customerCode is not provided
      ledgers = await Ledger.find();

      if (ledgers.length === 0) {
        return res.status(404).json({
          message: "No ledger entries found",
        });
      }
    }

    return res.status(200).json({
      message: "Ledger entries retrieved successfully",
      data: ledgers,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message }); // Include error message
  }
};

const deleteLedgerById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLedger = await Ledger.findByIdAndDelete(id);
    if (deletedLedger) {
      res.status(200).json({ message: "Ledger deleted successfully" });
    } else {
      res.status(404).json({ error: "Ledger not found" });
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { createLedgerEntry, getLedgerEntries, deleteLedgerById };
