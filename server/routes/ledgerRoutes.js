const express = require("express");
const router = express.Router();

const {
  createLedgerEntry,
  getLedgerEntries,
} = require("../controllers/ledgerController");

router.post("/createledger", createLedgerEntry);

router.get("/getledgers", getLedgerEntries); // Optional parameter

module.exports = router;
