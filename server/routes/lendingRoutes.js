const express = require('express');
const router = express.Router();
const {
  getAllLendings,
  getLendingById,
  createLending,
  addInstallment,
  deleteLending,
  getLendingsByCustomerCode,
} = require('../controllers/lendingController');
const { get } = require('mongoose');

// Routes
router.get('/', getAllLendings);
router.get('/:id', getLendingById);
router.post('/', createLending);
router.post('/:id/installment', addInstallment);
router.delete('/:id', deleteLending);
router.get('/customer/:customerCode', getLendingsByCustomerCode);

module.exports = router;