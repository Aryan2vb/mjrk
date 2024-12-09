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

    const customerExists = await Customer.findOne({ customerCode });
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const lastLedgerEntry = await Ledger.findOne({ customerCode }).sort({
      transactionDate: -1,
    });
    let balanceAfterTransaction = lastLedgerEntry
      ? lastLedgerEntry.balanceAfterTransaction
      : customerExists.openingAccountBalance;

    if (transactionType === "credit") {
      balanceAfterTransaction += amount;
    } else if (transactionType === "debit") {
      balanceAfterTransaction -= amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    const newLedgerEntry = new Ledger({
      customerCode,
      description,
      transactionType,
      amount,
      balanceAfterTransaction,
      paymentMode,
      referenceNumber,
    });

    await newLedgerEntry.save();

    return res.status(201).json({
      message: "Ledger entry created successfully",
      data: newLedgerEntry,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
// const getLedgerEntries = async (req, res) => {
//   try {
//     const { customerCode } = req.query; // Extract customerCode from query parameters

//     let ledgers;

//     if (customerCode) {
//       // Fetch ledger entries for the specific customerCode
//       ledgers = await Ledger.find({ customerCode });

//       // If no entries are found for the given customerCode
//       if (ledgers.length === 0) {
//         return res.status(404).json({
//           message: `No ledger entries found for customer code: ${customerCode}`,
//         });
//       }
//     } else {
//       ledgers = await Ledger.find();

//       if (ledgers.length === 0) {
//         return res.status(404).json({
//           message: "No ledger entries found",
//         });
//       }
//     }

//     return res.status(200).json({
//       message: "Ledger entries retrieved successfully",
//       data: ledgers,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
const getLedgerEntries = async (req, res) => {
  try {
    const customerCode = req.params.customerCode; // Get from params

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

module.exports = { createLedgerEntry, getLedgerEntries };
