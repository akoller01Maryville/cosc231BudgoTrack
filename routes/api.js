const express = require('express');
const bodyParser = require('body-parser');
const { Receipt, Transaction } = require('/models/index'); // Assuming you have these models
const router = express.Router();
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
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });  // Send back a JSON response
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router;
