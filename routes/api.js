const express = require('express');
const router = express.Router();
const { Receipt, Transaction } = require('../models');

// POST /api/receipts
router.post('/receipts', async (req, res) => {
    try {
        const userId = req.session.userId;
        const { PurchaseDate, TotalAmount, StoreName, items } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const newReceipt = await Receipt.create({
            PurchaseDate,
            TotalAmount,
            StoreName,
            userId
        });
        // create item
        const transactions = items.map(item => ({
            Name: item.Name,
            Amount: item.Amount,
            Description: item.Description,
            ReceiptId: newReceipt.id  // Link each transaction to the receipt
        }));
        // upload items
        await Transaction.bulkCreate(transactions);

        res.json({ status: 'success', message: 'Receipt and transactions saved successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get recent receipts
router.get('/recent-receipts', async (req, res) => {
    const userId = req.session.userId;
    try {
        const recentReceipts = await Receipt.findAll({
            where: {
                userId: userId // Filter receipts by userId
            },
            order: [['PurchaseDate', 'DESC']],
            limit: 3 // this can be changed or we can use a switch to reuse this endpoint on the statements page
        });
        res.json(recentReceipts);
    } catch (error) {
        console.error('Error fetching recent receipts:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.get('/receipts-with-items', async (req, res) => {
    const userId = req.session.userId;
    console.log("Fetching items for user:", userId); // Log to verify user ID
    try {
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const receipts = await Receipt.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: Transaction,
                as: 'Transactions'
            }],
            order: [
                ['PurchaseDate', 'DESC'],
                [Transaction, 'createdAt', 'ASC']
            ]
        });
        res.json(receipts);
    } catch (error) {
        console.error('Error fetching receipts with items:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


module.exports = router;
