const express = require('express');
const router = express.Router();
const { Receipt, Transaction } = require('../models'); // Adjust the path as needed

// POST /api/receipts
router.post('/receipts', async (req, res) => {
    try {
        const { PurchaseDate, TotalAmount, StoreName, items } = req.body;
        const newReceipt = await Receipt.create({
            PurchaseDate,
            TotalAmount,
            StoreName,
            SessionId: req.sessionID // Ensure sessionID is being set elsewhere in your code
        });

        for (const item of items) {
            await Transaction.create({
                ReceiptId: newReceipt.id,
                Name: item.Name,
                Amount: item.Amount,
                Description: item.Description,
                TransactionDate: item.TransactionDate
            });
        }

        res.json({ status: 'success', message: 'Receipt saved successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });  // Send back a JSON response
    }
});

module.exports = router;
