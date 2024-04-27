const express = require('express');
const router = express.Router();
const { Receipt, Transaction } = require('../models');

// POST /api/receipts
router.post('/receipts', async (req, res) => {
    try {
        // Assuming `userId` is stored in session upon user login
        const userId = req.session.userId; // Correctly access session data
        const { PurchaseDate, TotalAmount, StoreName, items } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const newReceipt = await Receipt.create({
            PurchaseDate,
            TotalAmount,
            StoreName,
            userId // Use the userId from session
        });

        for (const item of items) {
            await Transaction.create({
                ReceiptId: newReceipt.id,
                Name: item.Name,
                Amount: item.Amount,
                Description: item.Description
            });
        }

        res.json({ status: 'success', message: 'Receipt saved successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
