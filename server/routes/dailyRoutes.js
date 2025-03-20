const express = require('express');
const router = express.Router();
const {
    createDaily,
    getAllDailies,
    getDaily,
    updateDaily,
    deleteDaily
} = require('../controllers/dailyController');

// Routes
router.post('/', createDaily);
router.get('/', getAllDailies);
router.get('/:id', getDaily);
router.put('/:id',  updateDaily);
router.delete('/:id', deleteDaily);

module.exports = router;