const express = require("express");
const router = express.Router();

const {
  createLedgerEntry,
  getLedgerEntries,
  deleteLedgerById,
} = require("../controllers/ledgerController");

router.post("/createledger", createLedgerEntry);

router.get("/getledgers", getLedgerEntries); // Optional parameter

router.delete("/deleteledger/:id", deleteLedgerById);
module.exports = router;
