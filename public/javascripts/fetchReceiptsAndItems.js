document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/receipts-with-items')
        .then(response => response.json())
        .then(receipts => {
            const container = document.getElementById('receiptsContainer');
            receipts.forEach(receipt => {
                const receiptDiv = document.createElement('div');
                const receiptHeader = document.createElement('h2');
                receiptHeader.textContent = `Receipt from ${receipt.StoreName} on ${new Date(receipt.PurchaseDate).toLocaleDateString()} - Total: $${receipt.TotalAmount}`;
                receiptDiv.appendChild(receiptHeader);

                const transactionsList = document.createElement('ul');
                receipt.Transactions.forEach(transaction => {
                    const transactionItem = document.createElement('li');
                    transactionItem.textContent = `${transaction.Name}: $${transaction.Amount} - ${transaction.Description}`;
                    transactionsList.appendChild(transactionItem);
                });

                receiptDiv.appendChild(transactionsList);
                container.appendChild(receiptDiv);
            });
        })
        .catch(error => console.error('Error fetching receipts with transactions:', error));
});
