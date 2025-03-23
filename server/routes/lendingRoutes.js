const express = require('express');
const router = express.Router();
const {
  getAllLendings,
  getLendingById,
  createLending,
  addInstallment,
  deleteLending
} = require('../controllers/lendingController');

// Routes
router.get('/', getAllLendings);
router.get('/:id', getLendingById);
router.post('/', createLending);
router.post('/:id/installment', addInstallment);
router.delete('/:id', deleteLending);

module.exports = router;