const Daily = require('../models/Daily');

// Create new daily entry
const createDaily = async (req, res) => {
    try {
        const daily = new Daily(req.body);
        await daily.save();
        res.status(201).json(daily);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all daily entries
const getAllDailies = async (req, res) => {
    try {
        const dailies = await Daily.find();
        res.json(dailies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single daily entry
const getDaily = async (req, res) => {
    try {
        const daily = await Daily.findById(req.params.id);
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }
        res.json(daily);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update daily entry
const updateDaily = async (req, res) => {
    try {
        const daily = await Daily.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }
        res.json(daily);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete daily entry
const deleteDaily = async (req, res) => {
    try {
        const daily = await Daily.findByIdAndDelete(req.params.id);
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }
        res.json({ message: 'Daily entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDaily,
    getAllDailies,
    getDaily,
    updateDaily,
    deleteDaily
};