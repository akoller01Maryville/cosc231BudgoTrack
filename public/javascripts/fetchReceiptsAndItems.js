document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/receipts-with-items')
        .then(response => response.json())
        .then(receipts => {
            const container = document.getElementById('receiptsContainer');
            receipts.forEach(receipt => {
                // Create the div for the receipt
                const receiptDiv = document.createElement('div');
                const receiptHeader = document.createElement('h2');
                receiptHeader.textContent = `Receipt from ${receipt.StoreName} on ${new Date(receipt.PurchaseDate).toLocaleDateString()} - Total: $${receipt.TotalAmount}`;
                receiptDiv.appendChild(receiptHeader);

                // Create a list for transactions, only if Transactions are available
                if (Array.isArray(receipt.Transactions)) {
                    const transactionsList = document.createElement('ul');
                    receipt.Transactions.forEach(transaction => {
                        const transactionItem = document.createElement('li');
                        transactionItem.textContent = `${transaction.Name}: $${transaction.Amount} - ${transaction.Description}`;
                        transactionsList.appendChild(transactionItem);
                    });
                    receiptDiv.appendChild(transactionsList);
                } else {
                    console.log('No transactions found for this receipt:', receipt);
                }

                // Append the receipt div to the container
                container.appendChild(receiptDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching receipts with transactions:', error);
        });
});
