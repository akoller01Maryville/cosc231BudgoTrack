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
                storeName.textContent = receipt.StoreName;
                storeName.className = 'recentStoreName';
                receiptContainer.appendChild(storeName);

                // Create and append total amount
                const totalAmount = document.createElement('div');
                totalAmount.textContent = `$${receipt.TotalAmount}`;
                totalAmount.className = 'recentTotalAmount';
                receiptContainer.appendChild(totalAmount);

                // Create and append purchase date
                const purchaseDate = document.createElement('div');
                purchaseDate.textContent = new Date(receipt.PurchaseDate).toLocaleDateString();
                purchaseDate.className = 'recentPurchaseDate';
                receiptContainer.appendChild(purchaseDate);

                // Append the receipt container to the grid container
                gridContainer.appendChild(receiptContainer);
            });
        })
        .catch(error => console.error('Error fetching receipts:', error));
});
