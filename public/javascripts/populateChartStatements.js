document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/recent-receipts')
        .then(response => response.json())
        .then(receipts => {
            const gridContainer = document.getElementById('receiptsList');
            receipts.forEach(receipt => {
                // Create a container for each receipt
                const receiptContainer = document.createElement('div');
                receiptContainer.className = 'receipt';

                // Create and append store name
                const storeName = document.createElement('div');
                storeName.textContent = `Store: ${receipt.StoreName}`;
                storeName.className = 'recentStoreName';
                receiptContainer.appendChild(storeName);

                // Create and append total amount
                const totalAmount = document.createElement('div');
                totalAmount.textContent = `Total: $${receipt.TotalAmount}`;
                totalAmount.className = 'recentTotalAmount';
                receiptContainer.appendChild(totalAmount);

                // Create and append purchase date
                const purchaseDate = document.createElement('div');
                let localDate = new Date(receipt.PurchaseDate);
                localDate = localDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                purchaseDate.textContent = `Date of purchase: ${localDate}`;
                purchaseDate.className = `recentPurchaseDate`;
                receiptContainer.appendChild(purchaseDate);

                // Append the receipt container to the grid container
                gridContainer.appendChild(receiptContainer);
            });
        })
        .catch(error => console.error('Error fetching receipts:', error));
});
