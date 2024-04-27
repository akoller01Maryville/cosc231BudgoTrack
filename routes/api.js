const express = require('express');
const bodyParser = require('body-parser');
const { Receipt, Transaction } = require('/models/index'); // Assuming you have these models

const app = express();
app.use(bodyParser.json());

app.post('/api/receipts', async (req, res) => {
    try {
        const { PurchaseDate, TotalAmount, StoreName, items } = req.body;
        const newReceipt = await Receipt.create({
            PurchaseDate,
            TotalAmount,
            StoreName,
            SessionId: req.sessionID
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

        res.send({ status: 'success', message: 'Receipt saved successfully!' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
