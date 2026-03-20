const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventories');

// Get all inventories
router.get('/', async (req, res) => {
    try {
        const data = await inventoryController.GetAllInventories();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get inventory by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await inventoryController.GetInventoryById(req.params.id);
        if (!data) return res.status(404).send({ message: "Không tìm thấy inventory" });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Add stock
router.post('/add-stock', async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const data = await inventoryController.AddStock(product, quantity);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Remove stock
router.post('/remove-stock', async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const data = await inventoryController.RemoveStock(product, quantity);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Reservation
router.post('/reservation', async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const data = await inventoryController.Reservation(product, quantity);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Sold
router.post('/sold', async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const data = await inventoryController.Sold(product, quantity);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
