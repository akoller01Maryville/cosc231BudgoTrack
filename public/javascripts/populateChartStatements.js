document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/recent-receipts')
        .then(response => response.json())
        .then(receipts => {
            const listElement = document.getElementById('receiptsList');
            receipts.forEach(receipt => {
                const listItem = document.createElement('li');
                listItem.textContent = `${receipt.StoreName} - $${receipt.TotalAmount} on ${new Date(receipt.PurchaseDate).toLocaleDateString()}`;
                listElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching receipts:', error));
});
