document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/recent-receipts')
        .then(response => response.json())
        .then(receipts => {
            const listElement = document.getElementById('receiptsList');
            receipts.forEach((receipt, index) => {
                const listItem = document.createElement('li');
                listItem.className = `recentItem`; // General class for all items

                // Create elements for each piece of data
                const storeName = document.createElement('div');
                storeName.textContent = receipt.StoreName;
                storeName.className = 'recent1'; // Style for the store name

                const totalAmount = document.createElement('div');
                totalAmount.textContent = `$${receipt.TotalAmount}`;
                totalAmount.className = 'recent2'; // Style for the amount

                const purchaseDate = document.createElement('div');
                purchaseDate.textContent = new Date(receipt.PurchaseDate).toLocaleDateString();
                purchaseDate.className = 'recent3'; // Style for the date

                // Append all to the list item
                listItem.appendChild(storeName);
                listItem.appendChild(totalAmount);
                listItem.appendChild(purchaseDate);

                // Append the list item to the list
                listElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching receipts:', error));
});
