// Check if user is logged in and display their details
fetch('/users/details')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Not logged in');
        }
    })
    .then(user => {
        document.getElementById('userDetails').textContent = `Welcome, ${user.username}`;
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle not logged in state, maybe redirect to login page
        // window.location.href = '/index.html';

    });