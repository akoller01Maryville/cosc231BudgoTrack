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

module.exports = router;
