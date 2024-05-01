const express = require('express');
const router = express.Router();
const { Receipt, Transaction, sequelize} = require('../models');

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
            where: { userId: userId },
            include: [Transaction],
            order: [
                ['PurchaseDate', 'DESC'],
                [Transaction, 'createdAt', 'ASC']
            ]
        });

        console.log("Receipts fetched: ", receipts);
        res.json(receipts);
    } catch (error) {
        console.error('Error fetching receipts with items:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// API route to get monthly expenditure
router.get('/expenditure-by-month', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const monthlyExpenditure = await Receipt.findAll({
            where: { userId },
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('PurchaseDate')), 'month'],
                [sequelize.fn('sum', sequelize.col('TotalAmount')), 'total_spent']
            ],
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('PurchaseDate'))],
            order: [[sequelize.fn('date_trunc', 'month', sequelize.col('PurchaseDate')), 'ASC']]
        });
        res.json(monthlyExpenditure.map(item => {
            return {
                month: item.dataValues.month,
                total_spent: parseFloat(item.dataValues.total_spent)
            };
        }));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch monthly expenditure' });
    }
});

// API route to get expenditure by store
router.get('/expenditure-by-store', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const expenditureByStore = await Receipt.findAll({
            where: { userId },
            attributes: [
                'StoreName',
                [sequelize.fn('sum', sequelize.col('TotalAmount')), 'total_spent']
            ],
            group: 'StoreName',
            order: [['StoreName', 'ASC']],
        });
        res.json(expenditureByStore);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch expenditure by store' });
    }
});


module.exports = router;
